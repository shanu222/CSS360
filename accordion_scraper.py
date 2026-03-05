#!/usr/bin/env python3
"""
Accordion-aware scraper for CSS Past Papers
Expands all accordion sections and finds all subject links
"""

import asyncio
import re
from playwright.async_api import async_playwright

BASE_URL = "https://cssprep.com.pk/css-past-papers-descriptive/"

async def scrape_with_accordions():
    print(f"\n{'='*80}")
    print(f"🎯 ACCORDION-AWARE SCRAPER FOR CSS 2016-2021")
    print(f"{'='*80}\n")
    
    all_papers = {}
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)  # Show browser for debugging
        page = await browser.new_page(viewport={'width': 1920, 'height': 1080})
        
        print(f"📄 Loading main page...")
        await page.goto(BASE_URL, wait_until='networkidle', timeout=60000)
        await asyncio.sleep(5)
        print(f"   ✅ Page loaded\n")
        
        # Find and expand all accordions
        print(f"🔽 Expanding all accordions...")
        accordion_count = await page.evaluate('''() => {
            let count = 0;
            // Try common accordion selectors
            const selectors = [
                '.wp-block-kadence-accordion',
                '.kb-accordion-pane',
                '.accordion',
                '[data-toggle="collapse"]',
                '.collapse-trigger',
                '[aria-expanded="false"]'
            ];
            
            selectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(el => {
                    el.click();
                    count++;
                });
            });
            
            return count;
        }''')
        print(f"   ✅ Clicked {accordion_count} accordion elements")
        await asyncio.sleep(3)
        
        # Now find ALL links that might lead to subject pages
        print(f"\n🔍 Finding all subject page links...")
        subject_links = await page.evaluate('''() => {
            const links = new Map();
            const years = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
            
            document.querySelectorAll('a').forEach(link => {
                const href = link.href;
                const text = link.textContent.trim();
                
                // Look for subject-specific pages (not main pages or MCQs)
                if (href && 
                    href.includes('cssprep.com.pk') && 
                    !href.includes('mcq') &&
                    !href.includes('product') &&
                    !href.endsWith('css-past-papers-descriptive/') &&
                    !href.endsWith('css-past-papers-desc/') &&
                    text.length > 3) {
                    
                    // Try to identify if this is a subject page
                    const hasYear = years.some(y => text.includes(y) || href.includes(y));
                    if (hasYear || text.length < 50) {
                        links.set(href, text);
                    }
                }
            });
            
            return Array.from(links.entries()).map(([url, title]) => ({url, title}));
        }''')
        
        print(f"   ✅ Found {len(subject_links)} potential subject links\n")
        
        # Display found links
        print(f"{'─'*80}")
        for idx, link in enumerate(subject_links, 1):
            print(f"{idx:2}. {link['title'][:60]}")
            print(f"    → {link['url']}")
        print(f"{'─'*80}\n")
        
        # Ask user which links to scan (or scan all)
        print(f"💡 Found {len(subject_links)} links to scan")
        
        # Visit each subject page
        for idx, link_info in enumerate(subject_links, 1):
            url = link_info['url']
            title = link_info['title']
            
            print(f"\n📖 [{idx}/{len(subject_links)}] {title}")
            
            try:
                await page.goto(url, wait_until='networkidle', timeout=30000)
                await asyncio.sleep(2)
                
                # Look for year buttons and Google Drive links
                papers = await page.evaluate('''() => {
                    const years = ['2016', '2017', '2018', '2019', '2020', '2021'];
                    const results = [];
                    
                    // Search all clickable elements
                    document.querySelectorAll('a, button, [onclick]').forEach(el => {
                        const text = el.textContent.trim();
                        const href = el.href || el.getAttribute('data-url') || el.getAttribute('onclick') || '';
                        
                        // Check if element mentions a year from 2016-2021
                        years.forEach(year => {
                            if (text.includes(year) && href.includes('drive.google.com')) {
                                // Extract Google Drive URL
                                const match = href.match(/https:\/\/drive\.google\.com\/file\/d\/[^'"\/\s]+\/view/);
                                if (match) {
                                    results.push({
                                        year: year,
                                        url: match[0],
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
                        print(f"      • {paper['year']}")
                    
                    if title not in all_papers:
                        all_papers[title] = []
                    all_papers[title].extend(papers)
                else:
                    print(f"   ⚠️  No papers found for 2016-2021")
                    
            except Exception as e:
                print(f"   ❌ Error: {str(e)[:60]}")
        
        print(f"\n\n⏸️  Keeping browser open for 10 seconds for inspection...")
        await asyncio.sleep(10)
        await browser.close()
    
    # Summary
    print(f"\n{'='*80}")
    print(f"📊 FINAL RESULTS")
    print(f"{'='*80}\n")
    
    total_papers = sum(len(papers) for papers in all_papers.values())
    print(f"✅ Total Subjects with Papers: {len(all_papers)}")
    print(f"✅ Total Papers Found: {total_papers}\n")
    
    if all_papers:
        for subject, papers in sorted(all_papers.items()):
            print(f"\n📚 {subject} ({len(papers)} papers)")
            years = sorted(set(p['year'] for p in papers))
            print(f"   Years: {', '.join(years)}")
    
    return all_papers

if __name__ == "__main__":
    asyncio.run(scrape_with_accordions())
