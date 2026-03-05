#!/usr/bin/env python3
"""
Scrape CSS past papers from 2016-2021 from cssprep.com.pk
Only downloads papers for years 2016-2021 that don't already exist
"""

import os
import requests
import re
from pathlib import Path
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Base folder for organizing papers
BASE_FOLDER = "CSS_Past_Papers"

# Website to scrape
WEBSITE_URL = "https://cssprep.com.pk/css-past-papers-descriptive/"

# Target years
TARGET_YEARS = [2016, 2017, 2018, 2019, 2020, 2021]

# Mapping of detected subject patterns to folder names
SUBJECT_MAPPING = {
    # Compulsory
    'essay': 'English_Essay',
    'english essay': 'English_Essay',
    'english.*composition': 'English_Precis_and_Composition',
    'precis.*composition': 'English_Precis_and_Composition',
    'precis & composition': 'English_Precis_and_Composition',
    'precis and composition': 'English_Precis_and_Composition',
    'pakistan affairs': 'Pakistan_Affairs',
    'pak affairs': 'Pakistan_Affairs',
    'pakistan.*studies': 'Pakistan_Affairs',
    'current affairs': 'Current_Affairs',
    'general science': 'General_Science_and_Ability',
    'science.*ability': 'General_Science_and_Ability',
    'gsa': 'General_Science_and_Ability',
    'islamic.*studies': 'Islamic_Studies',
    'islamiat': 'Islamic_Studies',
    
    # Optional - major ones
    'economics': 'Economics',
    'chemistry': 'Chemistry',
    'physics': 'Physics',
    'biology': 'Botany',
    'botany': 'Botany',
    'zoology': 'Zoology',
    'mathematics': 'Pure_Mathematics',
    'pure.*math': 'Pure_Mathematics',
    'applied.*math': 'Applied_Mathematics',
    'computer.*science': 'Computer_Science',
    'history': 'History_of_Pakistan_and_India',
    'geography': 'Geography',
    'political.*science': 'Political_Science',
    'sociology': 'Sociology',
    'law': 'Law',
    'philosophy': 'Philosophy',
    'urdu': 'Urdu_Literature',
    'english.*literature': 'English_Literature',
    'islam.*history': 'Islamic_History_and_Culture',
    'international.*relations': 'International_Relations',
    'international.*law': 'International_Law',
    'statistics': 'Statistics',
    'psychology': 'Psychology',
    'public administration': 'Public_Administration',
    'business administration': 'Business_Administration',
    'accountancy': 'Accountancy_and_Auditing',
    'journalism': 'Journalism',
    'anthropology': 'Anthropology',
    'forestry': 'Forestry',
    'agriculture': 'Agriculture',
}

def extract_year(text):
    """Extract year from text"""
    match = re.search(r'20(16|17|18|19|20|21)', text)
    if match:
        return int(match.group())
    return None

def get_subject_folder(text):
    """Determine subject folder from text"""
    text_lower = text.lower()
    
    for pattern, folder in SUBJECT_MAPPING.items():
        if re.search(pattern, text_lower):
            return folder
    
    return 'Other'

def ensure_folder_structure(year, subject_folder):
    """Create the folder structure: CSS{year}/{category}/{subject}"""
    compulsory_subjects = ['English_Essay', 'English_Precis_and_Composition', 'Pakistan_Affairs', 
                          'Current_Affairs', 'General_Science_and_Ability', 'Islamic_Studies']
    
    if subject_folder in compulsory_subjects:
        folder_path = f"{BASE_FOLDER}/CSS{year}/Compulsory_Papers/{subject_folder}"
    else:
        folder_path = f"{BASE_FOLDER}/CSS{year}/Optional_Subjects/{subject_folder}"
    
    Path(folder_path).mkdir(parents=True, exist_ok=True)
    return folder_path

def download_pdf(url, filename, folder_path):
    """Download a PDF file"""
    try:
        file_path = os.path.join(folder_path, filename)
        
        # Avoid overwriting
        if os.path.exists(file_path):
            print(f"  ✓ Already exists: {filename}")
            return True
        
        response = requests.get(url, timeout=30, stream=True)
        response.raise_for_status()
        
        with open(file_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        
        print(f"  ✓ Downloaded: {filename}")
        return True
    except Exception as e:
        print(f"  ✗ Failed to download {filename}: {str(e)}")
        return False

def scrape_with_selenium():
    """Scrape using Selenium for JavaScript-rendered content"""
    print(f"\n{'='*60}")
    print(f"CSS Past Papers Scraper (2016-2021)")
    print(f"{'='*60}\n")
    
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')
    
    driver = None
    
    try:
        print("Initializing browser...")
        driver = webdriver.Chrome(options=chrome_options)
        
        print(f"Loading: {WEBSITE_URL}")
        driver.get(WEBSITE_URL)
        
        # Wait for page to load
        time.sleep(5)
        
        # Try to find PDF links
        print("Searching for PDF links...")
        pdf_links = []
        
        # Find all links
        links = driver.find_elements(By.TAG_NAME, 'a')
        
        for link in links:
            try:
                href = link.get_attribute('href')
                text = link.text.strip()
                
                if href and '.pdf' in href.lower():
                    year = extract_year(href + ' ' + text)
                    
                    # Only process target years
                    if year and year in TARGET_YEARS:
                        pdf_links.append({
                            'url': href,
                            'text': text,
                            'filename': os.path.basename(urlparse(href).path) or f'paper_{year}.pdf',
                            'year': year
                        })
            except:
                continue
        
        if not pdf_links:
            print("✗ No PDFs found for years 2016-2021")
            print("Trying alternative method...")
            
            # Try to find download buttons or specific sections
            page_source = driver.page_source
            soup = BeautifulSoup(page_source, 'html.parser')
            
            # Look for PDF links in page source
            for link in soup.find_all('a', href=True):
                href = link['href']
                text = link.get_text(strip=True)
                
                if '.pdf' in href.lower():
                    year = extract_year(href + ' ' + text)
                    
                    if year and year in TARGET_YEARS:
                        full_url = urljoin(WEBSITE_URL, href)
                        pdf_links.append({
                            'url': full_url,
                            'text': text,
                            'filename': os.path.basename(urlparse(href).path) or f'paper_{year}.pdf',
                            'year': year
                        })
        
        if not pdf_links:
            print("No PDFs found. The website structure may have changed.")
            return
        
        print(f"\nFound {len(pdf_links)} PDFs for years 2016-2021\n")
        
        downloaded = 0
        failed = 0
        skipped = 0
        
        for idx, item in enumerate(pdf_links, 1):
            url = item['url']
            filename = item['filename']
            text = item['text']
            year = item['year']
            
            subject_folder = get_subject_folder(filename + ' ' + text)
            
            print(f"\n[{idx}/{len(pdf_links)}] Year: {year} | Subject: {subject_folder}")
            print(f"  Name: {filename[:60]}")
            
            folder_path = ensure_folder_structure(year, subject_folder)
            file_path = os.path.join(folder_path, filename)
            
            if os.path.exists(file_path):
                print(f"  ↷ Skipped (already exists)")
                skipped += 1
            elif download_pdf(url, filename, folder_path):
                downloaded += 1
            else:
                failed += 1
        
        print(f"\n{'='*60}")
        print(f"Summary:")
        print(f"  Downloaded: {downloaded}")
        print(f"  Skipped (existing): {skipped}")
        print(f"  Failed: {failed}")
        print(f"{'='*60}\n")
        
    except Exception as e:
        print(f"✗ Error: {str(e)}")
        import traceback
        traceback.print_exc()
    finally:
        if driver:
            driver.quit()

def scrape_with_requests():
    """Try simple requests-based scraping first"""
    print(f"\n{'='*60}")
    print(f"CSS Past Papers Scraper (2016-2021)")
    print(f"{'='*60}\n")
    print("Trying simple HTTP request first...")
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(WEBSITE_URL, headers=headers, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find all PDF links
        pdf_links = []
        for link in soup.find_all('a', href=True):
            href = link['href']
            text = link.get_text(strip=True)
            
            if '.pdf' in href.lower():
                year = extract_year(href + ' ' + text)
                
                if year and year in TARGET_YEARS:
                    full_url = urljoin(WEBSITE_URL, href)
                    pdf_links.append({
                        'url': full_url,
                        'text': text,
                        'filename': os.path.basename(urlparse(href).path) or f'paper_{year}.pdf',
                        'year': year
                    })
        
        if pdf_links:
            print(f"✓ Found {len(pdf_links)} PDFs using simple request\n")
            
            downloaded = 0
            failed = 0
            skipped = 0
            
            for idx, item in enumerate(pdf_links, 1):
                url = item['url']
                filename = item['filename']
                text = item['text']
                year = item['year']
                
                subject_folder = get_subject_folder(filename + ' ' + text)
                
                print(f"\n[{idx}/{len(pdf_links)}] Year: {year} | Subject: {subject_folder}")
                print(f"  Name: {filename[:60]}")
                
                folder_path = ensure_folder_structure(year, subject_folder)
                file_path = os.path.join(folder_path, filename)
                
                if os.path.exists(file_path):
                    print(f"  ↷ Skipped (already exists)")
                    skipped += 1
                elif download_pdf(url, filename, folder_path):
                    downloaded += 1
                else:
                    failed += 1
            
            print(f"\n{'='*60}")
            print(f"Summary:")
            print(f"  Downloaded: {downloaded}")
            print(f"  Skipped (existing): {skipped}")
            print(f"  Failed: {failed}")
            print(f"{'='*60}\n")
            return True
        else:
            print("No PDFs found with simple request. Trying Selenium...")
            return False
            
    except Exception as e:
        print(f"Simple request failed: {str(e)}")
        print("Trying Selenium instead...")
        return False

if __name__ == "__main__":
    # Try simple requests first, fall back to Selenium if needed
    if not scrape_with_requests():
        scrape_with_selenium()
