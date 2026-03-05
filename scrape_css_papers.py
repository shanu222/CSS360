#!/usr/bin/env python3
"""
Scrape CSS past papers from cssprep.com.pk and organize them into year/subject folders
"""

import os
import requests
import re
from pathlib import Path
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
from datetime import datetime

# Base folder for organizing papers
BASE_FOLDER = "CSS_Past_Papers"

# Website to scrape
WEBSITE_URL = "https://cssprep.com.pk/css-past-papers-descriptive/"

# Mapping of detected subject patterns to folder names
SUBJECT_MAPPING = {
    # Compulsory
    'essay': 'English_Essay',
    'english': 'English_Essay',
    'english.*composition': 'English_Precis_and_Composition',
    'precis.*composition': 'English_Precis_and_Composition',
    'precis & composition': 'English_Precis_and_Composition',
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
}

def extract_year(filename_or_url):
    """Extract year from filename or URL"""
    match = re.search(r'20\d{2}', filename_or_url)
    if match:
        return int(match.group())
    return None

def get_subject_folder(filename_or_text):
    """Determine subject folder from filename or text"""
    text_lower = filename_or_text.lower()
    
    for pattern, folder in SUBJECT_MAPPING.items():
        if re.search(pattern, text_lower):
            return folder
    
    # Default: put in optional subjects folder if can't determine
    return 'Other'

def ensure_folder_structure(year, category, subject_folder):
    """Create the folder structure: CSS{year}/{category}/{subject}"""
    if subject_folder == 'Other':
        folder_path = f"{BASE_FOLDER}/CSS{year}/Optional_Subjects/Generic"
    elif subject_folder in ['English_Essay', 'English_Precis_and_Composition', 'Pakistan_Affairs', 
                            'Current_Affairs', 'General_Science_and_Ability', 'Islamic_Studies']:
        folder_path = f"{BASE_FOLDER}/CSS{year}/Compulsory_Papers/{subject_folder}"
    else:
        folder_path = f"{BASE_FOLDER}/CSS{year}/Optional_Subjects/{subject_folder}"
    
    Path(folder_path).mkdir(parents=True, exist_ok=True)
    return folder_path

def download_pdf(url, filename, folder_path):
    """Download a PDF file"""
    try:
        response = requests.get(url, timeout=30, stream=True)
        response.raise_for_status()
        
        file_path = os.path.join(folder_path, filename)
        
        # Avoid overwriting
        if os.path.exists(file_path):
            print(f"  ✓ Already exists: {filename}")
            return
        
        with open(file_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        
        print(f"  ✓ Downloaded: {filename}")
        return True
    except Exception as e:
        print(f"  ✗ Failed to download {filename}: {str(e)}")
        return False

def scrape_cssprep():
    """Main scraper function"""
    print(f"\n{'='*60}")
    print(f"CSS Past Papers Scraper")
    print(f"{'='*60}\n")
    
    try:
        print(f"Fetching: {WEBSITE_URL}")
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
            if href.lower().endswith('.pdf'):
                pdf_links.append({
                    'url': urljoin(WEBSITE_URL, href),
                    'text': link.get_text(strip=True),
                    'filename': os.path.basename(urlparse(href).path) or 'paper.pdf'
                })
        
        if not pdf_links:
            print("✗ No PDFs found on the website")
            print("\nTip: The website might require JavaScript rendering.")
            print("Consider using Selenium or Playwright for dynamic content.")
            return
        
        print(f"\nFound {len(pdf_links)} PDFs\n")
        
        downloaded = 0
        failed = 0
        
        for idx, item in enumerate(pdf_links, 1):
            url = item['url']
            filename = item['filename']
            text = item['text']
            
            # Extract year and subject
            year = extract_year(filename) or extract_year(text) or 2024
            subject_folder = get_subject_folder(filename + ' ' + text)
            
            print(f"\n[{idx}/{len(pdf_links)}] Year: {year} | Subject: {subject_folder}")
            print(f"  Name: {filename[:50]}")
            
            folder_path = ensure_folder_structure(year, 'Compulsory_Papers' if subject_folder != 'Other' else 'Optional_Subjects', subject_folder)
            
            if download_pdf(url, filename, folder_path):
                downloaded += 1
            else:
                failed += 1
        
        print(f"\n{'='*60}")
        print(f"Summary: {downloaded} downloaded, {failed} failed")
        print(f"{'='*60}\n")
        
    except Exception as e:
        print(f"✗ Error: {str(e)}")
        print("\nTroubleshooting:")
        print("1. Check internet connection")
        print("2. Verify the website URL is accessible")
        print("3. Website may require JavaScript - use Selenium/Playwright")

if __name__ == "__main__":
    scrape_cssprep()
