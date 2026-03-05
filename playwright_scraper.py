#!/usr/bin/env python3
"""
Powerful Playwright scraper for CSS past papers 2016-2021
Handles JavaScript, network interception, and dynamic content
"""

import os
import re
import time
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
    'pakistan affairs': 'Pakistan_Affairs',
    'current affairs': 'Current_Affairs',
    'general science': 'General_Science_and_Ability',
    'islamic': 'Islamic_Studies',
    'economics': 'Economics',
    'chemistry': 'Chemistry',
    'physics': 'Physics',
    'mathematics': 'Pure_Mathematics',
    'computer': 'Computer_Science',
    'history': 'History_of_Pakistan_and_India',
    'geography': 'Geography',
    'political': 'Political_Science',
    'sociology': 'Sociology',
    'philosophy': 'Philosophy',
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
            print(f"  ✓ Exists: {filename}")
            return True
        
        response = requests.get(url, timeout=30, stream=True, allow_redirects=True)
        response.raise_for_status()
        
        # Check if it's actually a PDF
        content_type = response.headers.get('content-type', '').lower()
        if 'pdf' not in content_type and not url.lower().endswith('.pdf'):
            print(f"  ✗ Not a PDF: {content_type}")
            return False
        
        with open(file_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        
        print(f"  ✓ Downloaded: {filename}")
        return True
    except Exception as e:
        print(f"  ✗ Failed: {str(e)[:50]}")
        return False

async def scrape_with_playwright():
    print(f"\n{'='*70}")
    print(f"POWERFUL PLAYWRIGHT SCRAPER - CSS Past Papers (2016-2021)")
    print(f"{'='*70}\n")
    
    pdf_links = []
    network_pdfs = []
    
    async with async_playwright() as p:
        print("🚀 Launching browser...")
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        )
        
        page = await context.new_page()
        
        # Network interception to catch PDF URLs
        def handle_request(request):
            url = request.url
            if '.pdf' in url.lower():
                network_pdfs.append(url)
                print(f"  📡 Network: {url[:60]}...")
        
        page.on('request', handle_request)
        
        print(f"📄 Loading: {WEBSITE_URL}")
        await page.goto(WEBSITE_URL, wait_until='networkidle', timeout=60000)
        await page.wait_for_timeout(3000)
        
        # Take screenshot for debugging
        await page.screenshot(path='page_screenshot.png')
        print("📸 Screenshot saved: page_screenshot.png")
        
        # Find all buttons and clickable elements
        print("\n🔍 Searching for interactive elements...")
        
        # Try to find year-specific buttons/accordions
        buttons = await page.query_selector_all('button, .kb-button, .wp-block-button__link, [role="button"]')
        print(f"Found {len(buttons)} buttons/clickable elements")
        
        clicked = 0
        for button in buttons:
            try:
                text = await button.inner_text()
                text = text.strip()
                
                # Check if button contains target year
                if any(str(year) in text for year in TARGET_YEARS):
                    print(f"  🖱️  Clicking: {text[:50]}")
                    await button.scroll_into_view_if_needed()
                    await button.click()
                    await page.wait_for_timeout(1000)
                    clicked += 1
            except Exception as e:
                pass
        
        print(f"✅ Clicked {clicked} elements")
        
        # Wait for any dynamic content
        await page.wait_for_timeout(3000)
        
        # Find all links
        print("\n🔗 Extracting all links...")
        all_links = await page.query_selector_all('a')
        
        for link in all_links:
            try:
                href = await link.get_attribute('href')
                text = await link.inner_text()
                text = text.strip() if text else ''
                
                if not href:
                    continue
                
                # Make absolute URL
                if not href.startswith('http'):
                    href = urljoin(WEBSITE_URL, href)
                
                # Check for year and PDF
                year = extract_year(href + ' ' + text)
                is_pdf = '.pdf' in href.lower()
                
                if year and year in TARGET_YEARS:
                    if is_pdf or text:
                        filename = os.path.basename(urlparse(href).path)
                        if not filename or not filename.endswith('.pdf'):
                            filename = f"CSS_{year}_{text.replace(' ', '_')}.pdf"
                            filename = re.sub(r'[^a-zA-Z0-9_.-]', '', filename)
                        
                        pdf_links.append({
                            'url': href,
                            'text': text,
                            'filename': filename,
                            'year': year
                        })
                        print(f"  ✓ Found: {year} - {text[:40]}")
            except:
                continue
        
        # Check page content for embedded PDFs
        print("\n📋 Checking page content...")
        content = await page.content()
        
        # Look for PDF URLs in the HTML
        pdf_pattern = r'https?://[^\s<>"]+\.pdf'
        found_pdfs = re.findall(pdf_pattern, content)
        
        for pdf_url in found_pdfs:
            year = extract_year(pdf_url)
            if year and year in TARGET_YEARS:
                filename = os.path.basename(urlparse(pdf_url).path)
                pdf_links.append({
                    'url': pdf_url,
                    'text': '',
                    'filename': filename,
                    'year': year
                })
                print(f"  ✓ HTML: {year} - {filename}")
        
        await browser.close()
    
    # Combine and deduplicate
    all_pdfs = pdf_links + [{'url': url, 'text': '', 'filename': os.path.basename(urlparse(url).path), 
                             'year': extract_year(url)} for url in network_pdfs]
    
    # Remove duplicates
    seen = set()
    unique_pdfs = []
    for pdf in all_pdfs:
        if pdf['url'] not in seen:
            seen.add(pdf['url'])
            unique_pdfs.append(pdf)
    
    print(f"\n{'='*70}")
    print(f"📊 SUMMARY: Found {len(unique_pdfs)} unique PDF links")
    print(f"{'='*70}\n")
    
    if not unique_pdfs:
        print("❌ No PDFs found for target years")
        print("\n💡 The website might:")
        print("   1. Require user login/authentication")
        print("   2. Use iframe or embedded viewers")
        print("   3. Load PDFs through AJAX after specific interactions")
        print("   4. Have changed its structure")
        return
    
    # Download PDFs
    downloaded = failed = skipped = 0
    
    for idx, item in enumerate(unique_pdfs, 1):
        url = item['url']
        filename = item['filename']
        text = item.get('text', '')
        year = item['year']
        
        if not year:
            continue
        
        subject = get_subject_folder(filename + ' ' + text)
        
        print(f"\n[{idx}/{len(unique_pdfs)}] {year} | {subject}")
        print(f"  📁 {filename[:60]}")
        
        folder = ensure_folder_structure(year, subject)
        file_path = os.path.join(folder, filename)
        
        if os.path.exists(file_path):
            print(f"  ↷ Skipped")
            skipped += 1
        elif download_pdf(url, filename, folder):
            downloaded += 1
            await asyncio.sleep(0.5)
        else:
            failed += 1
    
    print(f"\n{'='*70}")
    print(f"📈 FINAL RESULTS:")
    print(f"   ✅ Downloaded: {downloaded}")
    print(f"   ↷  Skipped: {skipped}")
    print(f"   ❌ Failed: {failed}")
    print(f"{'='*70}\n")

if __name__ == "__main__":
    asyncio.run(scrape_with_playwright())
