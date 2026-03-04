import os
import re
import sys
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Set, Tuple
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup


BASE_URL = "https://fpsc.gov.pk"
INDEX_URL = "https://fpsc.gov.pk/category/previous-question-papers"
ROOT_DIR = Path(__file__).resolve().parents[2]
PAPERS_DIR = ROOT_DIR / "CSS_Past_Papers"

YEAR_LINK_RE = re.compile(r"/category/previous-question-papers/(\d{4})")
DESCRIPTIVE_RE = re.compile(r"/category/css-\d{4}.*descriptive-papers", re.IGNORECASE)
FILE_EXT_RE = re.compile(r"\.(pdf|doc|docx)$", re.IGNORECASE)


def norm(value: str) -> str:
    return re.sub(r"[^a-z0-9]", "", value.lower())


def clean_label(value: str) -> str:
    value = value.strip().replace("/", "-")
    value = re.sub(r"\s+", " ", value)
    return value


def safe_filename(value: str) -> str:
    value = clean_label(value)
    value = re.sub(r"[^A-Za-z0-9() _\-.&]", "", value)
    value = value.strip().replace(" ", "_")
    value = re.sub(r"_+", "_", value)
    return value or "paper"


def fetch(url: str, session: requests.Session) -> Optional[str]:
    try:
        response = session.get(url, timeout=30)
        response.raise_for_status()
        response.encoding = response.apparent_encoding or response.encoding
        return response.text
    except requests.RequestException as ex:
        print(f"[WARN] Failed to fetch {url}: {ex}")
        return None


def extract_links(html: str, page_url: str) -> List[Tuple[str, str]]:
    soup = BeautifulSoup(html, "html.parser")
    links: List[Tuple[str, str]] = []
    for a in soup.find_all("a", href=True):
        href = a.get("href", "").strip()
        if not href:
            continue
        if href.startswith("assets/media/"):
            abs_url = urljoin(BASE_URL + "/", href)
        else:
            abs_url = urljoin(page_url, href)
        text = a.get_text(" ", strip=True)
        links.append((abs_url, text))
    return links


def get_year_pages(session: requests.Session) -> Dict[int, str]:
    html = fetch(INDEX_URL, session)
    if not html:
        return {}

    pages: Dict[int, str] = {}
    for url, _ in extract_links(html, INDEX_URL):
        m = YEAR_LINK_RE.search(url)
        if not m:
            continue
        year = int(m.group(1))
        pages[year] = url
    return pages


def optional_and_compulsory_dirs(year_dir: Path) -> Tuple[Dict[str, str], Dict[str, str]]:
    comp = year_dir / "Compulsory_Papers"
    opt = year_dir / "Optional_Subjects"
    comp_map: Dict[str, str] = {}
    opt_map: Dict[str, str] = {}

    if comp.exists():
        for d in comp.iterdir():
            if d.is_dir():
                comp_map[norm(d.name)] = d.name
    if opt.exists():
        for d in opt.iterdir():
            if d.is_dir():
                opt_map[norm(d.name)] = d.name

    return comp_map, opt_map


def classify_compulsory(raw_name: str, compulsory_map: Dict[str, str]) -> Optional[str]:
    n = norm(raw_name)
    aliases = {
        "englishessay": "English_Essay",
        "essay": "English_Essay",
        "englishpc": "English_Precis_and_Composition",
        "englishprecisandcomposition": "English_Precis_and_Composition",
        "englishprecis": "English_Precis_and_Composition",
        "englishcomposition": "English_Precis_and_Composition",
        "gki": "General_Science_and_Ability",
        "generalscienceandability": "General_Science_and_Ability",
        "generalability": "General_Science_and_Ability",
        "gk1": "General_Science_and_Ability",
        "gk2ca": "Current_Affairs",
        "currentaffairs": "Current_Affairs",
        "gk3pakaffairs": "Pakistan_Affairs",
        "pakaffairs": "Pakistan_Affairs",
        "pakistanaffairs": "Pakistan_Affairs",
        "islamicstudies": "Islamic_Studies",
        "islamiat": "Islamic_Studies",
    }

    if n in aliases:
        candidate = aliases[n]
        if norm(candidate) in compulsory_map:
            return candidate

    # Rule-based fallback for noisy names
    if "essay" in n:
        candidate = "English_Essay"
    elif "english" in n and ("pc" in n or "precis" in n or "composition" in n):
        candidate = "English_Precis_and_Composition"
    elif "gki" in n or "gk1" in n or "generalscience" in n or "ability" in n:
        candidate = "General_Science_and_Ability"
    elif "gk2" in n or "currentaffairs" in n:
        candidate = "Current_Affairs"
    elif "gk3" in n or "pakaffairs" in n or "pakistanaffairs" in n:
        candidate = "Pakistan_Affairs"
    elif ("islamic" in n and "history" not in n and "culture" not in n) or "islamiat" in n:
        candidate = "Islamic_Studies"
    else:
        return None

    if norm(candidate) in compulsory_map:
        return candidate
    return None


def classify_optional(raw_name: str, optional_map: Dict[str, str]) -> Optional[str]:
    n = norm(raw_name)
    n = re.sub(r"(?:paper|[\-_ ])(?:i{1,3}|[12])$", "", n)
    alias_map = {
        "accountancyauditing": "Accountancy_and_Auditing",
        "agricultureforestry": "Agriculture_and_Forestry",
        "appliedmaths": "Applied_Mathematics",
        "appliedmathematics": "Applied_Mathematics",
        "businessadmn": "Business_Administration",
        "businessadministration": "Business_Administration",
        "chemistry": "Chemistry",
        "comparativestnm": "Comparative_Study_of_Major_Religions",
        "computerscience": "Computer_Science",
        "economics": "Economics",
        "environmentalsc": "Environmental_Science",
        "governancepp": "Governance_and_Public_Policies",
        "historyofusa": "History_of_USA",
        "historyoftheusa": "History_of_USA",
        "historyofpakistanandindia": "History_of_Pakistan_and_India",
        "historyofpakistanindia": "History_of_Pakistan_and_India",
        "historypakistanindia": "History_of_Pakistan_and_India",
        "historypakindia": "History_of_Pakistan_and_India",
        "ir": "International_Relations",
        "internationrelations": "International_Relations",
        "internationalrelations": "International_Relations",
        "islamichistory": "Islamic_History_and_Culture",
        "journalismmasscommunication": "Journalism_and_Mass_Communication",
        "journalismmasscom": "Journalism_and_Mass_Communication",
        "islamichistory": "Islamic_History_and_Culture",
        "islamichistoryandculture": "Islamic_History_and_Culture",
        "mercantilelaw": "Mercantile_Law",
        "muslimlawjuris": "Muslim_Law_and_Jurisprudence",
        "pashto": "Pashto",
        "pushto": "Pashto",
        "polscience": "Political_Science",
        "politicalscience": "Political_Science",
        "publicadmnistration": "Public_Administration",
        "publicadministration": "Public_Administration",
        "puremaths": "Pure_Mathematics",
        "townplanning": "Town_Planning_and_Urban_Management",
        "townplanningurbanmanagement": "Town_Planning_and_Urban_Management",
    }

    direct = optional_map.get(n)
    if direct:
        return direct

    for key, val in alias_map.items():
        if key in n and norm(val) in optional_map:
            return val

    # Closest contains match against existing optional folders
    for k, v in optional_map.items():
        if k in n or n in k:
            return v

    return None


def infer_paper_name(text: str, url: str) -> str:
    if text:
        text = re.sub(r"\.(pdf|doc|docx)$", "", text.strip(), flags=re.IGNORECASE)
        return clean_label(text)
    parsed = urlparse(url)
    name = os.path.basename(parsed.path)
    name = re.sub(r"^\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}-", "", name)
    name = re.sub(r"\.(pdf|doc|docx)$", "", name, flags=re.IGNORECASE)
    return clean_label(name)


def collect_file_links(page_url: str, session: requests.Session) -> List[Tuple[str, str]]:
    html = fetch(page_url, session)
    if not html:
        return []

    out: List[Tuple[str, str]] = []
    for link, text in extract_links(html, page_url):
        if FILE_EXT_RE.search(link):
            out.append((link, text))
    return out


def download_file(url: str, destination: Path, session: requests.Session) -> bool:
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists() and destination.stat().st_size > 0:
        return False

    try:
        with session.get(url, timeout=45, stream=True) as r:
            r.raise_for_status()
            with open(destination, "wb") as f:
                for chunk in r.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
        return True
    except requests.RequestException as ex:
        print(f"[WARN] Failed downloading {url}: {ex}")
        return False


def resolve_target_folder(
    year_dir: Path,
    paper_name: str,
    compulsory_map: Dict[str, str],
    optional_map: Dict[str, str],
) -> Optional[Path]:
    c = classify_compulsory(paper_name, compulsory_map)
    if c:
        return year_dir / "Compulsory_Papers" / c

    o = classify_optional(paper_name, optional_map)
    if o:
        return year_dir / "Optional_Subjects" / o

    return None


def run(target_years: Optional[Set[int]] = None) -> int:
    if not PAPERS_DIR.exists():
        print(f"[ERROR] Missing directory: {PAPERS_DIR}")
        return 1

    with requests.Session() as session:
        session.headers.update({
            "User-Agent": "Mozilla/5.0 (compatible; CSS360-FPSC-Scraper/1.0)",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        })

        year_pages = get_year_pages(session)
        if not year_pages:
            print("[ERROR] Could not discover year pages from index.")
            return 1

        downloaded = 0
        skipped = 0
        unmapped = 0
        seen_file_urls: Set[str] = set()

        for year, year_page_url in sorted(year_pages.items()):
            if target_years and year not in target_years:
                continue

            year_dir = PAPERS_DIR / f"CSS{year}"
            if not year_dir.exists():
                continue

            print(f"\n[INFO] Processing year {year}: {year_page_url}")
            comp_map, opt_map = optional_and_compulsory_dirs(year_dir)

            year_html = fetch(year_page_url, session)
            if not year_html:
                continue

            links = extract_links(year_html, year_page_url)
            detail_pages = []
            direct_files: List[Tuple[str, str]] = []

            for link, text in links:
                if DESCRIPTIVE_RE.search(link):
                    detail_pages.append(link)
                elif FILE_EXT_RE.search(link):
                    direct_files.append((link, text))

            file_links: List[Tuple[str, str]] = []
            for detail in sorted(set(detail_pages)):
                file_links.extend(collect_file_links(detail, session))
            file_links.extend(direct_files)

            for file_url, text in file_links:
                if file_url in seen_file_urls:
                    continue
                seen_file_urls.add(file_url)

                paper_name = infer_paper_name(text, file_url)
                target_folder = resolve_target_folder(year_dir, paper_name, comp_map, opt_map)
                if not target_folder:
                    unmapped += 1
                    print(f"[WARN] Unmapped ({year}): {paper_name} -> {file_url}")
                    continue

                ext = os.path.splitext(urlparse(file_url).path)[1] or ".pdf"
                target_file = target_folder / f"{safe_filename(paper_name)}{ext.lower()}"
                ok = download_file(file_url, target_file, session)
                if ok:
                    downloaded += 1
                    print(f"[DL] {year}: {target_file.relative_to(PAPERS_DIR)}")
                else:
                    skipped += 1

        print("\n[SUMMARY]")
        print(f"Downloaded: {downloaded}")
        print(f"Skipped(existing/failed): {skipped}")
        print(f"Unmapped: {unmapped}")

    return 0


if __name__ == "__main__":
    selected_years: Optional[Set[int]] = None
    if len(sys.argv) > 1:
        try:
            selected_years = {int(arg) for arg in sys.argv[1:]}
        except ValueError:
            print("Usage: python fpsc_papers_scraper.py [year year ...]")
            raise SystemExit(1)

    raise SystemExit(run(selected_years))
