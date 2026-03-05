#!/usr/bin/env python3
"""
Network Monitor Scraper - Captures all Google Drive requests from the website
"""

import asyncio
import json
from playwright.async_api import async_playwright

BASE_URL = "https://cssprep.com.pk/css-past-papers-descriptive/"

async def monitor_network():
    print(f"\n{'='*80}")
    print(f"🌐 NETWORK MONITOR - CAPTURING ALL REQUESTS")
    print(f"{'='*80}\n")
    
    captured_urls = []
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()
        
        # Listen to all requests
        async def handle_route(route):
            request = route.request
            url = request.url
            
            if 'drive.google.com' in url:
                print(f"📥 Captured Google Drive request: {url[:80]}...")
                captured_urls.append(url)
            
            await route.continue_()
        
        await page.route('**/*', handle_route)
        
        print(f"📄 Loading main page...")
        print(f"⏭️  Page will load in browser - please interact with elements and expand sections")
        print(f"⏭️  I'm monitoring all network requests...")
        print(f"⏭️  Press Ctrl+C in the browser to continue\n")
        
        await page.goto(BASE_URL, wait_until='domcontentloaded', timeout=60000)
        
        print(f"\n✅ Page loaded. Capture is running...")
        print(f"{'─'*80}")
        print(f"💡 TIP: Click buttons, expand accordions, scroll down")
        print(f"🔴 All Google Drive links will be captured and printed above")
        print(f"{'─'*80}\n")
        
        # Keep page open for 60 seconds to capture all interactions
        print(f"⏳ Monitoring for 60 seconds. Interact with the page...\n")
        await asyncio.sleep(60)
        
        await browser.close()
    
    # Report captured URLs
    print(f"\n{'='*80}")
    print(f"📊 CAPTURED GOOGLE DRIVE LINKS")
    print(f"{'='*80}\n")
    
    if captured_urls:
        unique_urls = list(set(captured_urls))
        print(f"✅ Captured {len(unique_urls)} unique Google Drive URLs:\n")
        
        for idx, url in enumerate(unique_urls, 1):
            # Extract file ID
            file_id = None
            if '/d/' in url:
                parts = url.split('/d/')
                if len(parts) > 1:
                    file_id = parts[1].split('/')[0]
            
            print(f"{idx:2}. {url[:70]}")
            if file_id:
                print(f"    File ID: {file_id}")
        
        # Save to file
        with open('captured_drive_urls.txt', 'w') as f:
            f.write("CAPTURED GOOGLE DRIVE URLS\n")
            f.write("="*80 + "\n\n")
            for idx, url in enumerate(unique_urls, 1):
                f.write(f"{idx}. {url}\n")
        
        print(f"\n✅ Saved to 'captured_drive_urls.txt'")
    else:
        print(f"❌ No Google Drive URLs captured")
        print(f"   Try clicking on paper buttons or expanding sections")
    
    print(f"\n{'='*80}\n")

if __name__ == "__main__":
    asyncio.run(monitor_network())
