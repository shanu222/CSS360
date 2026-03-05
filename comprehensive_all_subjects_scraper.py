#!/usr/bin/env python3
"""
Comprehensive scraper for ALL CSS subjects from 2016-2021
"""

import asyncio
import re
from playwright.async_api import async_playwright

BASE_URL = "https://cssprep.com.pk/css-past-papers-descriptive/"

async def scrape_all_subjects():
    print(f"\n{'='*80}")
    print(f"🔍 COMPREHENSIVE ALL-SUBJECTS SCRAPER FOR CSS 2016-2021")
    print(f"{'='*80}\n")
    
    all_papers = {}
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={'width': 1920, 'height': 1080})
        
        print(f"📄 Step 1: Loading main page...")
        try:
            await page.goto(BASE_URL, wait_until='networkidle', timeout=60000)
            await asyncio.sleep(3)
            print(f"   ✅ Main page loaded")
        except Exception as e:
            print(f"   ⚠️  Timeout/Error: {str(e)[:60]}")
        
        # Find ALL subject links on the main page
        print(f"\n📋 Step 2: Finding all subject links...")
        subject_links = await page.evaluate('''() => {
            const links = [];
            // Look for accordion items, subject links, or any relevant containers
            document.querySelectorAll('a[href*="css-past-papers"]').forEach(link => {
                const href = link.href;
                const text = link.textContent.trim();
                if (href && text && !href.endsWith('css-past-papers-descriptive/')) {
                    links.push({url: href, title: text});
                }
            });
            return links;
        }''')
        
        print(f"   ✅ Found {len(subject_links)} subject links")
        
        # Visit each subject page
        for idx, link_info in enumerate(subject_links, 1):
            url = link_info['url']
            title = link_info['title']
            
            print(f"\n📖 [{idx}/{len(subject_links)}] Scanning: {title}")
            print(f"   URL: {url}")
            
            try:
                await page.goto(url, wait_until='networkidle', timeout=30000)
                await asyncio.sleep(2)
                
                # Extract all Google Drive links for years 2016-2021
                papers = await page.evaluate('''() => {
                    const years = ['2016', '2017', '2018', '2019', '2020', '2021'];
                    const results = [];
                    
                    // Method 1: Search in all buttons and links
                    document.querySelectorAll('a, button').forEach(el => {
                        const href = el.href || el.getAttribute('data-url') || el.getAttribute('data-href') || '';
                        const text = el.textContent;
                        
                        if (href.includes('drive.google.com')) {
                            // Try to extract year from text or surrounding context
                            let year = null;
                            years.forEach(y => {
                                if (text.includes(y) || el.innerHTML.includes(y)) {
                                    year = y;
                                }
                            });
                            
                            if (year) {
                                results.push({
                                    year: year,
                                    url: href,
                                    context: text.substring(0, 50)
                                });
                            }
                        }
                    });
                    
                    // Method 2: Search in onclick attributes
                    document.querySelectorAll('[onclick]').forEach(el => {
                        const onclick = el.getAttribute('onclick');
                        const match = onclick.match(/https:\/\/drive\.google\.com\/file\/d\/([^'"\/]+)/);
                        if (match) {
                            const text = el.textContent;
                            let year = null;
                            years.forEach(y => {
                                if (text.includes(y)) year = y;
                            });
                            if (year) {
                                results.push({
                                    year: year,
                                    url: match[0],
                                    context: text.substring(0, 50)
                                });
                            }
                        }
                    });
                    
                    // Method 3: Search in data attributes
                    document.querySelectorAll('[data-src], [data-url], [data-file]').forEach(el => {
                        ['data-src', 'data-url', 'data-file'].forEach(attr => {
                            const val = el.getAttribute(attr);
                            if (val && val.includes('drive.google.com')) {
                                const text = el.textContent;
                                let year = null;
                                years.forEach(y => {
                                    if (text.includes(y)) year = y;
                                });
                                if (year) {
                                    results.push({
                                        year: year,
                                        url: val,
                                        context: text.substring(0, 50)
                                    });
                                }
                            }
                        });
                    });
                    
                    return results;
                }''')
                
                if papers:
                    print(f"   ✅ Found {len(papers)} paper(s)")
                    for paper in papers:
                        print(f"      • {paper['year']}: {paper['url'][:60]}...")
                    
                    if title not in all_papers:
                        all_papers[title] = []
                    all_papers[title].extend(papers)
                else:
                    print(f"   ⚠️  No papers found for 2016-2021")
                    
            except Exception as e:
                print(f"   ❌ Error: {str(e)[:60]}")
        
        await browser.close()
    
    # Summary
    print(f"\n{'='*80}")
    print(f"📊 RESULTS SUMMARY")
    print(f"{'='*80}\n")
    
    total_papers = sum(len(papers) for papers in all_papers.values())
    print(f"Total Subjects Found: {len(all_papers)}")
    print(f"Total Papers Found: {total_papers}")
    print(f"\n{'─'*80}\n")
    
    # Print organized results
    for subject, papers in sorted(all_papers.items()):
        print(f"\n📚 {subject} ({len(papers)} papers)")
        print(f"{'─'*80}")
        for paper in papers:
            print(f"  {paper['year']}: {paper['url']}")
    
    # Save to file for processing
    print(f"\n{'='*80}")
    print(f"💾 Saving results to 'all_papers_found.txt'...")
    
    with open('all_papers_found.txt', 'w', encoding='utf-8') as f:
        f.write("CSS PAST PAPERS 2016-2021 - ALL SUBJECTS\n")
        f.write("="*80 + "\n\n")
        
        for subject, papers in sorted(all_papers.items()):
            f.write(f"\n{subject}\n")
            f.write("-"*80 + "\n")
            for paper in papers:
                f.write(f"{paper['year']}: {paper['url']}\n")
    
    print(f"✅ Results saved!")
    print(f"{'='*80}\n")
    
    return all_papers

if __name__ == "__main__":
    asyncio.run(scrape_all_subjects())
