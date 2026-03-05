"""
CSS Past Papers Selenium Scraper
Scrapes CSS past papers from cssprep.com.pk using Selenium for JavaScript rendering
Organizes papers by year and subject into CSS_Past_Papers folder structure
"""

import os
import re
import time
import requests
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager

# Base configuration
BASE_URL = "https://cssprep.com.pk/css-past-papers-descriptive/"
BASE_DIR = Path(__file__).parent / "CSS_Past_Papers"
TIMEOUT = 20

# Subject mapping for classification
SUBJECT_MAPPING = {
    # Compulsory Papers
    'current affairs': 'Compulsory_Papers/Current_Affairs',
    'current-affairs': 'Compulsory_Papers/Current_Affairs',
    'essay': 'Compulsory_Papers/English_Essay',
    'english essay': 'Compulsory_Papers/English_Essay',
    'precis': 'Compulsory_Papers/English_Precis_and_Composition',
    'composition': 'Compulsory_Papers/English_Precis_and_Composition',
    'p&c': 'Compulsory_Papers/English_Precis_and_Composition',
    'general science': 'Compulsory_Papers/General_Science_and_Ability',
    'general knowledge': 'Compulsory_Papers/General_Science_and_Ability',
    'gk': 'Compulsory_Papers/General_Science_and_Ability',
    'islamic studies': 'Compulsory_Papers/Islamic_Studies',
    'islamic history': 'Compulsory_Papers/Islamic_Studies',
    'pakistan affairs': 'Compulsory_Papers/Pakistan_Affairs',
    'pak affairs': 'Compulsory_Papers/Pakistan_Affairs',
    
    # Optional Subjects
    'accountancy': 'Optional_Subjects/Accountancy_and_Auditing',
    'auditing': 'Optional_Subjects/Accountancy_and_Auditing',
    'agriculture': 'Optional_Subjects/Agriculture_and_Forestry',
    'forestry': 'Optional_Subjects/Agriculture_and_Forestry',
    'anthropology': 'Optional_Subjects/Anthropology',
    'arabic': 'Optional_Subjects/Arabic',
    'balochi': 'Optional_Subjects/Balochi',
    'botany': 'Optional_Subjects/Botany',
    'business administration': 'Optional_Subjects/Business_Administration',
    'chemistry': 'Optional_Subjects/Chemistry',
    'computer science': 'Optional_Subjects/Computer_Science',
    'constitutional law': 'Optional_Subjects/Constitutional_Law',
    'criminology': 'Optional_Subjects/Criminology',
    'economics': 'Optional_Subjects/Economics',
    'education': 'Optional_Subjects/Education',
    'english literature': 'Optional_Subjects/English_Literature',
    'environmental science': 'Optional_Subjects/Environmental_Science',
    'european history': 'Optional_Subjects/European_History',
    'gender studies': 'Optional_Subjects/Gender_Studies',
    'geography': 'Optional_Subjects/Geography',
    'geology': 'Optional_Subjects/Geology',
    'governance': 'Optional_Subjects/Governance_and_Public_Policies',
    'public policies': 'Optional_Subjects/Governance_and_Public_Policies',
    'history of pakistan': 'Optional_Subjects/History_of_Pakistan_and_India',
    'history of india': 'Optional_Subjects/History_of_Pakistan_and_India',
    'history of usa': 'Optional_Subjects/History_of_USA',
    'international law': 'Optional_Subjects/International_Law',
    'international relations': 'Optional_Subjects/International_Relations',
    'islamic history and culture': 'Optional_Subjects/Islamic_History_and_Culture',
    'journalism': 'Optional_Subjects/Journalism_and_Mass_Communication',
    'mass communication': 'Optional_Subjects/Journalism_and_Mass_Communication',
    'law': 'Optional_Subjects/Law',
    'mercantile law': 'Optional_Subjects/Mercantile_Law',
    'muslim law': 'Optional_Subjects/Muslim_Law_and_Jurisprudence',
    'jurisprudence': 'Optional_Subjects/Muslim_Law_and_Jurisprudence',
    'philosophy': 'Optional_Subjects/Philosophy',
    'physics': 'Optional_Subjects/Physics',
    'political science': 'Optional_Subjects/Political_Science',
    'psychology': 'Optional_Subjects/Psychology',
    'public administration': 'Optional_Subjects/Public_Administration',
    'punjabi': 'Optional_Subjects/Punjabi',
    'pashto': 'Optional_Subjects/Pashto',
    'sindhi': 'Optional_Subjects/Sindhi',
    'sociology': 'Optional_Subjects/Sociology',
    'statistics': 'Optional_Subjects/Statistics',
    'town planning': 'Optional_Subjects/Town_Planning_and_Urban_Management',
    'urban management': 'Optional_Subjects/Town_Planning_and_Urban_Management',
    'urdu literature': 'Optional_Subjects/Urdu_Literature',
    'zoology': 'Optional_Subjects/Zoology',
}

def setup_driver():
    """Initialize Chrome WebDriver with headless options"""
    print("\n🔧 Setting up Chrome WebDriver...")
    
    chrome_options = Options()
    chrome_options.add_argument('--headless')  # Run in background
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--window-size=1920,1080')
    chrome_options.add_argument('--disable-blink-features=AutomationControlled')
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option('useAutomationExtension', False)
    
    # Install and setup ChromeDriver automatically
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    
    print("✓ WebDriver ready")
    return driver

def extract_year(text):
    """Extract year from text (filename or URL)"""
    # Look for 4-digit year (2016-2026)
    match = re.search(r'20(1[6-9]|2[0-6])', text)
    if match:
        return match.group(0)
    
    # Try CSS year format
    match = re.search(r'CSS[\s-]?(20\d{2})', text, re.IGNORECASE)
    if match:
        return match.group(1)
    
    return None

def get_subject_folder(text):
    """Determine subject folder from filename or text"""
    text_lower = text.lower()
    
    for keyword, folder_path in SUBJECT_MAPPING.items():
        if keyword in text_lower:
            return folder_path
    
    return None

def ensure_folder_structure(year, subject_path):
    """Create folder structure: CSS_Past_Papers/CSS{year}/{subject_path}"""
    if not year:
        return None
    
    folder = BASE_DIR / f"CSS{year}" / subject_path
    folder.mkdir(parents=True, exist_ok=True)
    return folder

def download_pdf(url, save_path):
    """Download PDF file from URL"""
    try:
        # Skip if already exists
        if save_path.exists():
            print(f"  ⏭️  Already exists: {save_path.name}")
            return True
        
        response = requests.get(url, stream=True, timeout=30)
        response.raise_for_status()
        
        with open(save_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        print(f"  ✓ Downloaded: {save_path.name}")
        return True
        
    except Exception as e:
        print(f"  ✗ Failed: {url} - {e}")
        return False

def scrape_cssprep_selenium():
    """Main scraping function using Selenium"""
    print("\n" + "="*60)
    print("CSS Past Papers Selenium Scraper")
    print("="*60)
    
    driver = None
    downloaded_count = 0
    skipped_count = 0
    failed_count = 0
    
    try:
        # Setup Selenium driver
        driver = setup_driver()
        
        # Load the page
        print(f"\n📥 Loading: {BASE_URL}")
        driver.get(BASE_URL)
        
        # Wait for page to load
        print("⏳ Waiting for JavaScript to render...")
        time.sleep(5)  # Initial wait
        
        # Scroll to load lazy content
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)
        
        # Find all PDF links
        print("\n🔍 Searching for PDF links...")
        pdf_links = driver.find_elements(By.XPATH, "//a[contains(@href, '.pdf')]")
        
        if not pdf_links:
            # Try alternative selectors
            pdf_links = driver.find_elements(By.CSS_SELECTOR, "a[href$='.pdf']")
        
        if not pdf_links:
            print("✗ No PDF links found on the page")
            print("\n💡 Debugging info:")
            print(f"Page title: {driver.title}")
            print(f"Page source length: {len(driver.page_source)} chars")
            
            # Save page source for debugging
            debug_file = Path("debug_page_source.html")
            with open(debug_file, 'w', encoding='utf-8') as f:
                f.write(driver.page_source)
            print(f"Page source saved to: {debug_file}")
            return
        
        print(f"✓ Found {len(pdf_links)} PDF links")
        
        # Extract PDF URLs and text
        pdf_data = []
        for link in pdf_links:
            try:
                url = link.get_attribute('href')
                text = link.text or link.get_attribute('title') or url.split('/')[-1]
                pdf_data.append({'url': url, 'text': text})
            except:
                continue
        
        print(f"\n📦 Processing {len(pdf_data)} PDFs...")
        print("-" * 60)
        
        # Process each PDF
        for idx, pdf in enumerate(pdf_data, 1):
            url = pdf['url']
            text = pdf['text']
            filename = url.split('/')[-1].split('?')[0]  # Clean filename
            
            print(f"\n[{idx}/{len(pdf_data)}] Processing: {filename}")
            
            # Extract year
            year = extract_year(filename) or extract_year(text)
            if not year:
                print(f"  ⚠️  No year found, skipping")
                skipped_count += 1
                continue
            
            # Determine subject folder
            subject_path = get_subject_folder(filename) or get_subject_folder(text)
            if not subject_path:
                print(f"  ⚠️  Subject not recognized, skipping")
                skipped_count += 1
                continue
            
            # Create folder structure
            folder = ensure_folder_structure(year, subject_path)
            if not folder:
                print(f"  ⚠️  Could not create folder, skipping")
                skipped_count += 1
                continue
            
            # Download PDF
            save_path = folder / filename
            if download_pdf(url, save_path):
                downloaded_count += 1
            else:
                failed_count += 1
        
        print("\n" + "="*60)
        print("📊 Scraping Summary")
        print("="*60)
        print(f"✓ Downloaded: {downloaded_count} papers")
        print(f"⏭️  Skipped: {skipped_count} papers (already exist or unclassified)")
        print(f"✗ Failed: {failed_count} papers")
        print(f"📁 Saved to: {BASE_DIR}")
        
    except Exception as e:
        print(f"\n✗ Error during scraping: {e}")
        import traceback
        traceback.print_exc()
        
    finally:
        if driver:
            driver.quit()
            print("\n🔒 Browser closed")

if __name__ == "__main__":
    scrape_cssprep_selenium()
