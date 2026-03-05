#!/usr/bin/env python3
"""
Direct subject URL scraper - tries known CSS subjects
Based on the pattern: https://cssprep.com.pk/css-past-papers-descriptive/[subject-name]/
"""

import asyncio
from playwright.async_api import async_playwright

BASE_URL = "https://cssprep.com.pk/css-past-papers-descriptive/"

# Common CSS subjects (URL-formatted)
SUBJECTS = [
    # Compulsory Papers
    'essay',
    'precis-and-composition',
    'english-precis-and-composition',
    'pakistan-affairs',
    'current-affairs',
    'islamic-studies',
    'general-science-and-ability',
    'general-science',
    
    # Optional - Social Sciences
    'political-science',
    'international-relations',
    'economics',
    'public-administration',
    'constitutional-law',
    'law',
    'history-of-pakistan',
    'history',
    'sociology',
    'psychology',
    'philosophy',
    'geography',
    'anthropology',
    
    # Optional - Natural Sciences
    'physics',
    'chemistry',
    'mathematics',
    'statistics',
    'botany',
    'zoology',
    'geology',
    
    # Already found (re-checking for completeness)
    'gender-studies',
    'environmental-science',
    'criminology',
    
    # Optional - Languages & Literature
    'english-literature',
    'urdu',
    'punjabi',
    'sindhi',
    'balochi',
    'pashto',
    'arabic',
    'persian',
    
    # Optional - Others
    'journalism',
    'business-administration',
    'computer-science',
    'accountancy',
    'commerce',
    'civil-engineering',
    'mechanical-engineering',
    'electrical-engineering',
]

async def scrape_subject(page, subject_name):
    """Scrape a single subject page for papers from 2016-2021"""
    url = f"{BASE_URL}{subject_name}/"
    
    try:
        response = await page.goto(url, wait_until='domcontentloaded', timeout=20000)
        
        # Check if page exists (not 404)
        if response.status == 404:
            return None
            
        await asyncio.sleep(1)
        
        # Look for papers from 2016-2021
        papers = await page.evaluate('''() => {
            const years = ['2016', '2017', '2018', '2019', '2020', '2021'];
            const results = [];
            
            // Search all elements for Google Drive links with years
            document.querySelectorAll('a, button, [onclick], [data-url]').forEach(el => {
                const text = el.textContent.trim();
                const href = el.href || el.getAttribute('data-url') || el.getAttribute('onclick') || '';
                
                // Check for year and Google Drive link
                years.forEach(year => {
                    if (text.includes(year) && href.includes('drive.google.com')) {
                        const match = href.match(/https:\/\/drive\.google\.com\/file\/d\/[^'"\\/\\s]+/);
                        if (match) {
                            let url = match[0];
                            if (!url.includes('/view')) {
                                url = url + '/view';
                            }
                            results.push({
                                year: year,
                                url: url
                            });
                        }
                    }
                });
            });
            
            return results;
        }''')
        
        return papers if papers else None
        
    except Exception as e:
        return None

async def main():
    print(f"\n{'='*80}")
    print(f"🎯 DIRECT SUBJECT URL SCRAPER - CSS 2016-2021")
    print(f"{'='*80}\n")
    print(f"Trying {len(SUBJECTS)} known CSS subject URLs...\n")
    
    all_papers = {}
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        for idx, subject in enumerate(SUBJECTS, 1):
            status = f"[{idx}/{len(SUBJECTS)}]"
            subject_display = subject.replace('-', ' ').title()
            
            print(f"{status} {subject_display:40}", end='', flush=True)
            
            papers = await scrape_subject(page, subject)
            
            if papers:
                print(f" ✅ {len(papers)} papers")
                all_papers[subject_display] = papers
            else:
                print(f" ⚠️  Not found/No papers")
        
        await browser.close()
    
    # Summary
    print(f"\n{'='*80}")
    print(f"📊 SCRAPING RESULTS")
    print(f"{'='*80}\n")
    
    total_papers = sum(len(papers) for papers in all_papers.values())
    print(f"✅ Subjects with Papers: {len(all_papers)}")
    print(f"✅ Total Papers Found: {total_papers}\n")
    
    if all_papers:
        print(f"{'─'*80}\n")
        for subject, papers in sorted(all_papers.items()):
            print(f"📚 {subject} ({len(papers)} papers)")
            years = sorted(set(p['year'] for p in papers))
            print(f"   Years: {', '.join(years)}")
            for paper in papers:
                print(f"   • {paper['year']}: {paper['url']}")
            print()
        
        # Save results
        print(f"{'='*80}")
        print(f"💾 Saving to 'discovered_papers.txt'...")
        
        with open('discovered_papers.txt', 'w', encoding='utf-8') as f:
            f.write(f"CSS PAST PAPERS 2016-2021\n")
            f.write(f"Total Subjects: {len(all_papers)}\n")
            f.write(f"Total Papers: {total_papers}\n")
            f.write(f"="*80 + "\n\n")
            
            for subject, papers in sorted(all_papers.items()):
                f.write(f"\n{subject}\n")
                f.write(f"-"*80 + "\n")
                for paper in papers:
                    f.write(f"{paper['year']}: {paper['url']}\n")
        
        print(f"✅ Results saved!\n")
    else:
        print("❌ No papers found\n")

if __name__ == "__main__":
    asyncio.run(main())
