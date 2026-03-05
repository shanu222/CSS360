#!/usr/bin/env python3
"""
Inspect the cssprep.com.pk website to understand its structure
"""

import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time
import re

WEBSITE_URL = "https://cssprep.com.pk/css-past-papers-descriptive/"

def inspect_with_selenium():
    """Inspect website structure using Selenium"""
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    
    driver = None
    try:
        print("Loading website with Selenium...")
        driver = webdriver.Chrome(options=chrome_options)
        driver.get(WEBSITE_URL)
        time.sleep(5)
        
        # Save page source for inspection
        with open('debug_page_source.html', 'w', encoding='utf-8') as f:
            f.write(driver.page_source)
        print("✓ Page source saved to debug_page_source.html")
        
        # Look for all links
        links = driver.find_elements(By.TAG_NAME, 'a')
        print(f"\n✓ Found {len(links)} links on the page")
        
        # Find links that might contain year information
        year_links = []
        for link in links:
            try:
                href = link.get_attribute('href')
                text = link.text.strip()
                
                if href and (re.search(r'20(16|17|18|19|20|21|22|23|24|25)', href) or 
                           re.search(r'20(16|17|18|19|20|21|22|23|24|25)', text)):
                    year_links.append({
                        'href': href,
                        'text': text[:100]
                    })
            except:
                continue
        
        print(f"\n✓ Found {len(year_links)} links with year information:")
        for i, link in enumerate(year_links[:20], 1):  # Show first 20
            print(f"{i}. {link['text']}")
            print(f"   URL: {link['href'][:100]}")
        
        # Look for expandable sections or specific year sections
        print("\n\nLooking for year-specific sections...")
        sections = driver.find_elements(By.CSS_SELECTOR, "div, section, article")
        year_sections = []
        
        for section in sections:
            try:
                text = section.text.strip()
                if re.search(r'20(16|17|18|19|20|21)', text) and len(text) < 200:
                    year_sections.append(text)
            except:
                continue
        
        if year_sections:
            print(f"✓ Found {len(year_sections)} sections with year keywords:")
            for section in year_sections[:10]:
                print(f"  - {section[:150]}")
        
        # Look for buttons or accordions
        buttons = driver.find_elements(By.TAG_NAME, 'button')
        print(f"\n✓ Found {len(buttons)} buttons")
        
        # Try clicking on year-related buttons to expand content
        print("\nAttempting to expand year sections...")
        for button in buttons:
            try:
                text = button.text.strip()
                if re.search(r'20(16|17|18|19|20|21)', text):
                    print(f"  Clicking: {text}")
                    button.click()
                    time.sleep(1)
            except:
                continue
        
        # Check for PDFs again after expanding
        time.sleep(2)
        links = driver.find_elements(By.TAG_NAME, 'a')
        pdf_links = []
        
        for link in links:
            try:
                href = link.get_attribute('href')
                text = link.text.strip()
                
                if href and '.pdf' in href.lower():
                    year = re.search(r'20\d{2}', href + ' ' + text)
                    pdf_links.append({
                        'href': href[:100],
                        'text': text[:100],
                        'year': year.group() if year else 'unknown'
                    })
            except:
                continue
        
        print(f"\n\n{'='*60}")
        print(f"PDF Links Found: {len(pdf_links)}")
        print(f"{'='*60}")
        
        if pdf_links:
            # Group by year
            by_year = {}
            for link in pdf_links:
                year = link['year']
                if year not in by_year:
                    by_year[year] = []
                by_year[year].append(link)
            
            for year in sorted(by_year.keys()):
                print(f"\n{year}: {len(by_year[year])} papers")
                for link in by_year[year][:5]:  # Show first 5 per year
                    print(f"  - {link['text']}")
                    print(f"    {link['href']}")
        else:
            print("No PDF links found!")
            print("\nThe website might:")
            print("1. Load PDFs through JavaScript after page load")
            print("2. Require user interaction (clicks, scrolls)")
            print("3. Use a different structure for older papers")
            print("4. Host papers on a different page or subdomain")
        
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
    finally:
        if driver:
            driver.quit()

if __name__ == "__main__":
    inspect_with_selenium()
