#!/usr/bin/env python3
"""
Advanced multi-level scraper - follows links to find actual PDFs
"""

import os
import re
import asyncio
from pathlib import Path
from urllib.parse import urljoin, urlparse
import requests
from playwright.async_api import async_playwright

BASE_FOLDER = "CSS_Past_Papers"
WEBSITE_URL = "https://cssprep.com.pk/css-past-papers-descriptive/"
TARGET_YEARS = [2016, 2017, 2018, 2019, 2020, 2021]

SUBJECT_MAPPING = {
    'essay': 'English_Essay',
    'composition': 'English_Precis_and_Composition',
    'precis': 'English_Precis_and_Composition',
    'pakistan': 'Pakistan_Affairs',
    'current': 'Current_Affairs',
    'science': 'General_Science_and_Ability',
    'islamic': 'Islamic_Studies',
    'economics': 'Economics',
    'chemistry': 'Chemistry',
    'physics': 'Physics',
    'math': 'Pure_Mathematics',
    'computer': 'Computer_Science',
    'history': 'History_of_Pakistan_and_India',
    'geography': 'Geography',
    'political': 'Political_Science',
    'sociology': 'Sociology',
    'philosophy': 'Philosophy',
    'gender': 'Gender_Studies',
    'environmental': 'Environmental_Science',
    'criminology': 'Criminology',
}

def extract_year(text):
    match = re.search(r'20(16|17|18|19|20|21)', text)
    return int(match.group()) if match else None

def get_subject_folder(text):
    text_lower = text.lower()
    for pattern, folder in SUBJECT_MAPPING.items():
        if pattern in text_lower:
            return folder
    return 'Other'

def ensure_folder_structure(year, subject_folder):
    compulsory = ['English_Essay', 'English_Precis_and_Composition', 'Pakistan_Affairs', 
                  'Current_Affairs', 'General_Science_and_Ability', 'Islamic_Studies']
    
    category = 'Compulsory_Papers' if subject_folder in compulsory else 'Optional_Subjects'
    folder_path = f"{BASE_FOLDER}/CSS{year}/{category}/{subject_folder}"
    
    Path(folder_path).mkdir(parents=True, exist_ok=True)
    return folder_path

def download_pdf(url, filename, folder_path):
    try:
        file_path = os.path.join(folder_path, filename)
        
        if os.path.exists(file_path):
            print(f"  ✓ Exists")
            return True
        
        response = requests.get(url, timeout=30, stream=True, allow_redirects=True)
        response.raise_for_status()
        
        content_type = response.headers.get('content-type', '').lower()
        if 'pdf' not in content_type:
            return False
        
        with open(file_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        
        file_size = os.path.getsize(file_path)
        print(f"  ✅ Downloaded ({file_size // 1024} KB)")
        return True
    except Exception as e:
        print(f"  ❌ Failed: {str(e)[:40]}")
        return False

async def find_pdfs_in_page(page, url, subject_hint=''):
    """Navigate to a page and find all PDFs"""
    pdfs = []
    
    try:
        await page.goto(url, wait_until='networkidle', timeout=30000)
        await page.wait_for_timeout(2000)
        
        # Method 1: Look for direct PDF links
        links = await page.query_selector_all('a[href*=".pdf"], a[href*="download"]')
        
        for link in links:
            href = await link.get_attribute('href')
            text = await link.inner_text() or ''
            
            if href:
                if not href.startswith('http'):
                    href = urljoin(url, href)
                
                if '.pdf' in href.lower():
                    year = extract_year(href + ' ' + text)
                    if year and year in TARGET_YEARS:
                        filename = os.path.basename(urlparse(href).path)
                        if not filename.endswith('.pdf'):
                            filename = f"CSS_{year}_{subject_hint}.pdf"
                        
                        pdfs.append({
                            'url': href,
                            'filename': filename,
                            'year': year,
                            'subject': subject_hint
                        })
        
        # Method 2: Look in page content for PDF URLs
        content = await page.content()
        pdf_urls = re.findall(r'https?://[^\s<>"\']+\.pdf', content)
        
        for pdf_url in pdf_urls:
            year = extract_year(pdf_url)
            if year and year in TARGET_YEARS:
                filename = os.path.basename(urlparse(pdf_url).path)
                pdfs.append({
                    'url': pdf_url,
                    'filename': filename,
                    'year': year,
                    'subject': subject_hint
                })
        
        # Method 3: Check for iframe with PDF
        iframes = await page.query_selector_all('iframe')
        for iframe in iframes:
            src = await iframe.get_attribute('src')
            if src and '.pdf' in src.lower():
                if not src.startswith('http'):
                    src = urljoin(url, src)
                
                year = extract_year(src)
                if year and year in TARGET_YEARS:
                    filename = os.path.basename(urlparse(src).path)
                    pdfs.append({
                        'url': src,
                        'filename': filename,
                        'year': year,
                        'subject': subject_hint
                    })
        
    except Exception as e:
        print(f"  ⚠️  Error scanning page: {str(e)[:40]}")
    
    return pdfs

async def scrape_multilevel():
    print(f"\n{'='*70}")
    print(f"🔥 MULTI-LEVEL SCRAPER - Following Links to Find PDFs")
    print(f"{'='*70}\n")
    
    all_pdfs = []
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        )
        
        page = await context.new_page()
        
        print(f"📄 Loading main page: {WEBSITE_URL}")
        await page.goto(WEBSITE_URL, wait_until='networkidle', timeout=60000)
        await page.wait_for_timeout(3000)
        
        # Find all subject links for target years
        print("\n🔍 Finding subject pages for 2016-2021...")
        all_links = await page.query_selector_all('a')
        
        subject_pages = []
        for link in all_links:
            try:
                href = await link.get_attribute('href')
                text = await link.inner_text() or ''
                
                if not href:
                    continue
                
                # Check if link contains target year
                if any(str(year) in text for year in TARGET_YEARS):
                    if not href.startswith('http'):
                        href = urljoin(WEBSITE_URL, href)
                    
                    subject_pages.append({
                        'url': href,
                        'text': text.strip(),
                        'subject': get_subject_folder(text)
                    })
                    print(f"  📌 {text[:50]}")
            except:
                continue
        
        print(f"\n✅ Found {len(subject_pages)} subject pages to scan")
        
        # Visit each subject page to find PDFs
        print("\n🌐 Visiting subject pages to find PDFs...\n")
        
        for idx, page_info in enumerate(subject_pages, 1):
            print(f"[{idx}/{len(subject_pages)}] {page_info['text'][:40]}")
            print(f"  🔗 {page_info['url'][:60]}")
            
            pdfs = await find_pdfs_in_page(page, page_info['url'], page_info['subject'])
            
            if pdfs:
                print(f"  ✨ Found {len(pdfs)} PDFs")
                all_pdfs.extend(pdfs)
            else:
                print(f"  ⚠️  No PDFs found")
            
            await asyncio.sleep(1)  # Be polite
        
        await browser.close()
    
    # Remove duplicates
    seen = set()
    unique_pdfs = []
    for pdf in all_pdfs:
        if pdf['url'] not in seen:
            seen.add(pdf['url'])
            unique_pdfs.append(pdf)
    
    print(f"\n{'='*70}")
    print(f"📊 SUMMARY: Found {len(unique_pdfs)} unique PDFs")
    print(f"{'='*70}\n")
    
    if not unique_pdfs:
        print("❌ No PDFs found")
        print("\n💡 The website structure may require:")
        print("   • User authentication/login")
        print("   • JavaScript interactions we haven't captured")
        print("   • Manual download from a different section")
        return
    
    # Download PDFs
    downloaded = failed = skipped = 0
    
    for idx, pdf in enumerate(unique_pdfs, 1):
        subject = get_subject_folder(pdf.get('subject', '') + ' ' + pdf['filename'])
        
        print(f"\n[{idx}/{len(unique_pdfs)}] {pdf['year']} | {subject}")
        print(f"  📁 {pdf['filename'][:50]}")
        
        folder = ensure_folder_structure(pdf['year'], subject)
        
        if download_pdf(pdf['url'], pdf['filename'], folder):
            if not os.path.exists(os.path.join(folder, pdf['filename'])):
                failed += 1
            elif os.path.getsize(os.path.join(folder, pdf['filename'])) < 1000:
                failed += 1
            else:
                downloaded += 1
        else:
            failed += 1
        
        await asyncio.sleep(0.5)
    
    print(f"\n{'='*70}")
    print(f"🎯 FINAL RESULTS:")
    print(f"   ✅ Successfully Downloaded: {downloaded}")
    print(f"   ❌ Failed: {failed}")
    print(f"{'='*70}\n")

if __name__ == "__main__":
    asyncio.run(scrape_multilevel())
