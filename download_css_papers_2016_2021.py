#!/usr/bin/env python3
"""
Advanced scraper for CSS past papers 2016-2021 from cssprep.com.pk
Handles dynamic content and accordion interactions
"""

import os
import requests
import re
import time
from pathlib import Path
from urllib.parse import urljoin, urlparse
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

BASE_FOLDER = "CSS_Past_Papers"
WEBSITE_URL = "https://cssprep.com.pk/css-past-papers-descriptive/"
TARGET_YEARS = [2016, 2017, 2018, 2019, 2020, 2021]

SUBJECT_MAPPING = {
    'essay': 'English_Essay',
    'english essay': 'English_Essay',
    'composition': 'English_Precis_and_Composition',
    'precis': 'English_Precis_and_Composition',
    'pakistan affairs': 'Pakistan_Affairs',
    'current affairs': 'Current_Affairs',
    'general science': 'General_Science_and_Ability',
    'islamic studies': 'Islamic_Studies',
    'islamiat': 'Islamic_Studies',
    'economics': 'Economics',
    'chemistry': 'Chemistry',
    'physics': 'Physics',
    'mathematics': 'Pure_Mathematics',
    'computer': 'Computer_Science',
    'history': 'History_of_Pakistan_and_India',
    'geography': 'Geography',
    'political science': 'Political_Science',
    'sociology': 'Sociology',
    'law': 'Law',
    'philosophy': 'Philosophy',
    'urdu': 'Urdu_Literature',
    'english literature': 'English_Literature',
    'international relations': 'International_Relations',
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
        if pattern in text_lower:
            return folder
    
    return 'Other'

def ensure_folder_structure(year, subject_folder):
    """Create the folder structure"""
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
        
        if os.path.exists(file_path):
            print(f"  ✓ Already exists: {filename}")
            return True
        
        print(f"  Downloading: {filename}")
        response = requests.get(url, timeout=30, stream=True)
        response.raise_for_status()
        
        with open(file_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        
        print(f"  ✓ Downloaded: {filename}")
        return True
    except Exception as e:
        print(f"  ✗ Failed: {str(e)}")
        return False

def scrape_with_advanced_selenium():
    """Advanced Selenium scraping with accordion expansion"""
    print(f"\n{'='*60}")
    print(f"CSS Past Papers Scraper (2016-2021)")
    print(f"Using Advanced Selenium with Interaction")
    print(f"{'='*60}\n")
    
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')
    
    driver = None
    
    try:
        print("Initializing browser...")
        driver = webdriver.Chrome(options=chrome_options)
        driver.set_page_load_timeout(30)
        
        print(f"Loading: {WEBSITE_URL}")
        driver.get(WEBSITE_URL)
        time.sleep(5)
        
        # Try to find and click all accordion/button elements
        print("Looking for expandable sections...")
        
        # Try to find buttons, accordions, or clickable elements
        clickable_elements = []
        
        # Try various selectors for accordions/buttons
        selectors = [
            "button",
            ".kt-blocks-accordion-header",
            ".accordion-button",
            "[role='button']",
            ".wp-block-button__link",
            "a.kb-button",
        ]
        
        for selector in selectors:
            try:
                elements = driver.find_elements(By.CSS_SELECTOR, selector)
                for elem in elements:
                    try:
                        text = elem.text.strip()
                        if text and any(str(year) in text for year in TARGET_YEARS):
                            clickable_elements.append(elem)
                            print(f"  Found: {text[:50]}")
                    except:
                        continue
            except:
                continue
        
        print(f"\nFound {len(clickable_elements)} potentially clickable elements")
        
        # Click elements to expand content
        for elem in clickable_elements:
            try:
                driver.execute_script("arguments[0].scrollIntoView(true);", elem)
                time.sleep(0.5)
                driver.execute_script("arguments[0].click();", elem)
                time.sleep(1)
                print(f"  Clicked element")
            except Exception as e:
                print(f"  Could not click: {str(e)}")
        
        # Wait for content to load
        time.sleep(3)
        
        # Now search for PDF links
        print("\nSearching for PDF links...")
        pdf_links = []
        
        # Find all links
        all_links = driver.find_elements(By.TAG_NAME, 'a')
        
        for link in all_links:
            try:
                href = link.get_attribute('href')
                text = link.text.strip()
                
                if not href:
                    continue
                
                # Check if it's a PDF or contains year info
                is_pdf = '.pdf' in href.lower()
                has_year = any(str(year) in href or str(year) in text for year in TARGET_YEARS)
                
                if is_pdf or has_year:
                    year = extract_year(href + ' ' + text)
                    
                    if year and year in TARGET_YEARS:
                        # Generate filename from URL or text
                        if '.pdf' in href.lower():
                            filename = os.path.basename(urlparse(href).path)
                        else:
                            # This might be a download button, try to extract filename
                            filename = f"CSS_{year}_{text.replace(' ', '_')}.pdf"
                            filename = re.sub(r'[^a-zA-Z0-9_.-]', '', filename)
                        
                        pdf_links.append({
                            'url': href,
                            'text': text,
                            'filename': filename,
                            'year': year
                        })
                        print(f"  Found: {text[:50]} -> {year}")
            except:
                continue
        
        # Remove duplicates
        seen = set()
        unique_links = []
        for link in pdf_links:
            identifier = (link['url'], link['year'])
            if identifier not in seen:
                seen.add(identifier)
                unique_links.append(link)
        
        pdf_links = unique_links
        
        if not pdf_links:
            print("\n✗ No PDF links found for target years")
            print("The website might require different interaction or authentication")
            return
        
        print(f"\nFound {len(pdf_links)} PDF links for years 2016-2021\n")
        
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
            print(f"  File: {filename[:60]}")
            
            folder_path = ensure_folder_structure(year, subject_folder)
            file_path = os.path.join(folder_path, filename)
            
            if os.path.exists(file_path):
                print(f"  ↷ Skipped (already exists)")
                skipped += 1
            elif download_pdf(url, filename, folder_path):
                downloaded += 1
                time.sleep(0.5)  # Be polite
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

if __name__ == "__main__":
    scrape_with_advanced_selenium()
