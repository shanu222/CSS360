#!/usr/bin/env python3
"""
Final comprehensive scraper - checks embedded viewers, JS variables, and hidden mechanisms
"""

import os
import re
import json
import asyncio
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote
import requests
from playwright.async_api import async_playwright

BASE_FOLDER = "CSS_Past_Papers"
TARGET_YEARS = [2016, 2017, 2018, 2019, 2020, 2021]

def extract_year(text):
    match = re.search(r'20(16|17|18|19|20|21)', text)
    return int(match.group()) if match else None

async def deep_scan_page(page, url):
    """Deep scan of page for any PDF references"""
    pdfs = []
    
    try:
        print(f"  🔬 Deep scanning: {url[:50]}...")
        await page.goto(url, wait_until='networkidle', timeout=30000)
        await page.wait_for_timeout(2000)
        
        # Method 1: Execute JavaScript to find any PDF references
        js_pdfs = await page.evaluate('''() => {
            const pdfs = [];
            
            // Check all script tags for PDF URLs
            document.querySelectorAll('script').forEach(script => {
                const text = script.textContent || script.innerText;
                const matches = text.match(/https?:\\/\\/[^\\s"']+\\.pdf/gi);
                if (matches) pdfs.push(...matches);
            });
            
            // Check all data attributes
            document.querySelectorAll('[data-src], [data-url], [data-file], [data-pdf]').forEach(el => {
                ['data-src', 'data-url', 'data-file', 'data-pdf'].forEach(attr => {
                    const val = el.getAttribute(attr);
                    if (val && val.includes('.pdf')) pdfs.push(val);
                });
            });
            
            // Check all links including hidden ones
            document.querySelectorAll('a').forEach(a => {
                const href = a.href || a.getAttribute('href');
                if (href && href.includes('.pdf')) pdfs.push(href);
            });
            
            // Check for Google Drive embeds
            document.querySelectorAll('iframe').forEach(iframe => {
                const src = iframe.src || iframe.getAttribute('src');
                if (src) pdfs.push(src);
            });
            
            return pdfs;
        }''')
        
        for pdf_url in js_pdfs:
            if '.pdf' in pdf_url.lower() or 'drive.google.com' in pdf_url or 'docs.google.com' in pdf_url:
                year = extract_year(pdf_url)
                if year and year in TARGET_YEARS:
                    pdfs.append(pdf_url)
                    print(f"    ✨ Found: {pdf_url[:60]}")
        
        # Method 2: Check page source for PDF references
        content = await page.content()
        
        # Look for various PDF URL patterns
        patterns = [
            r'https?://[^\s<>"\']+\.pdf',
            r'drive\.google\.com/file/d/([^/]+)',
            r'docs\.google\.com/[^\s<>"\']+',
        ]
        
        for pattern in patterns:
            matches = re.findall(pattern, content, re.IGNORECASE)
            for match in matches:
                if isinstance(match, tuple):
                    match = match[0]
                
                year = extract_year(match) if not match.startswith('http') else extract_year(match)
                if year and year in TARGET_YEARS:
                    pdfs.append(match)
                    print(f"    ✨ Pattern: {match[:60]}")
        
        # Method 3: Look for download buttons and get their actual URLs
        download_buttons = await page.query_selector_all('a[download], button[data-file], .download-btn, .kb-button')
        
        for button in download_buttons[:10]:  # Limit to first 10
            try:
                href = await button.get_attribute('href')
                data_file = await button.get_attribute('data-file')
                text = await button.inner_text() or ''
                
                url_to_check = href or data_file
                if url_to_check:
                    year = extract_year(url_to_check + ' ' + text)
                    if year and year in TARGET_YEARS:
                        pdfs.append(url_to_check)
                        print(f"    ✨ Button: {text[:40]}")
            except:
                pass
        
    except Exception as e:
        print(f"    ⚠️  Scan error: {str(e)[:50]}")
    
    return pdfs

async def comprehensive_scrape():
    print(f"\n{'='*70}")
    print(f"🔥 COMPREHENSIVE DEEP SCAN - All Detection Methods")
    print(f"{'='*70}\n")
    
    base_url = "https://cssprep.com.pk/css-past-papers-descriptive/"
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        )
        
        page = await context.new_page()
        
        print("📄 Step 1: Scanning main page")
        main_pdfs = await deep_scan_page(page, base_url)
        
        print(f"\n📊 Main page scan: {len(main_pdfs)} potential PDFs")
        
        # Get subject pages
        await page.goto(base_url, wait_until='networkidle', timeout=60000)
        all_links = await page.query_selector_all('a')
        
        subject_urls = []
        for link in all_links:
            try:
                href = await link.get_attribute('href')
                text = await link.inner_text() or ''
                
                if href and any(str(year) in text for year in TARGET_YEARS):
                    if not href.startswith('http'):
                        href = urljoin(base_url, href)
                    if href not in subject_urls:
                        subject_urls.append(href)
            except:
                pass
        
        print(f"\n📄 Step 2: Scanning {len(subject_urls)} subject pages\n")
        
        all_pdfs = main_pdfs.copy()
        
        for idx, url in enumerate(subject_urls[:10], 1):  # Limit to 10 pages
            print(f"[{idx}/{min(len(subject_urls), 10)}] Scanning subject page")
            page_pdfs = await deep_scan_page(page, url)
            all_pdfs.extend(page_pdfs)
            await asyncio.sleep(1)
        
        await browser.close()
    
    # Deduplicate
    unique_pdfs = list(set(all_pdfs))
    
    print(f"\n{'='*70}")
    print(f"📊 TOTAL FOUND: {len(unique_pdfs)} unique PDF references")
    print(f"{'='*70}\n")
    
    if unique_pdfs:
        print("📋 Found PDF URLs:")
        for idx, pdf in enumerate(unique_pdfs[:20], 1):
            print(f"  {idx}. {pdf[:80]}")
        
        if len(unique_pdfs) > 20:
            print(f"  ... and {len(unique_pdfs) - 20} more")
    else:
        print("❌ NO PDFs FOUND")
        print("\n🔍 The website appears to:")
        print("   • Not expose PDFs through standard HTML/JavaScript")
        print("   • Use a backend API or authentication system")
        print("   • Store PDFs in a way that requires user interaction")
        print("   • Have moved or restructured the content")
        print("\n💡 RECOMMENDATION:")
        print("   1. Try manual download from the website")
        print("   2. Check FPSC official website: http://www.fpsc.gov.pk/")
        print("   3. Look for alternative sources (CSS forums, study groups)")
        print("   4. Contact the website administrator for bulk download options")

if __name__ == "__main__":
    asyncio.run(comprehensive_scrape())
