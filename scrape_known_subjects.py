#!/usr/bin/env python3
"""
Scrape CSS papers using exact subject names from CSS2022 folder
"""

import asyncio
from playwright.async_api import async_playwright

BASE_URL = "https://cssprep.com.pk/css-past-papers-descriptive/"

# Exact subject names from CSS2022 folder
COMPULSORY_SUBJECTS = [
    'General_Science_and_Ability',
    'Islamic_Studies',
    'Pakistan_Affairs',
    'Current_Affairs',
    'English_(Precis_and_Composition)',
    'Essay',
]

OPTIONAL_SUBJECTS = [
    'Accountancy_and_Auditing',
    'Agriculture_and_Forestry',
    'Anthropology',
    'Applied_Mathematics',
    'Arabic',
    'Balochi',
    'Botany',
    'British_History',
    'Business_Administration',
    'Chemistry',
    'Computer_Science',
    'Constitutional_Law',
    'Criminology',
    'Economics',
    'English_Literature',
    'Environmental_Science',
    'European_History',
    'Gender_Studies',
    'Geography',
    'Geology',
    'Governance_and_Public_Policies',
    'History_of_Pakistan_and_India',
    'History_of_USA',
    'International_Law',
    'International_Relations',
    'Islamic_History_and_Culture',
    'Journalism_and_Mass_Communication',
    'Law',
    'Mercantile_Law',
    'Muslim_Law_and_Jurisprudence',
    'Pashto',
    'Persian',
    'Philosophy',
    'Physics',
    'Political_Science',
    'Psychology',
    'Public_Administration',
    'Punjabi',
    'Pure_Mathematics',
    'Sindhi',
    'Sociology',
    'Statistics',
    'Town_Planning_and_Urban_Management',
    'Urdu_Literature',
    'Zoology',
]

def subject_to_url(subject_name):
    """Convert subject name to URL format"""
    # Try multiple URL formats
    formats = [
        subject_name.lower().replace('_', '-').replace('(', '').replace(')', '').replace('--', '-'),
        subject_name.lower().replace('_', '-'),
        subject_name.replace('_', '-'),
        subject_name.lower().replace('_and_', '-').replace('_', '-'),
    ]
    return list(set(formats))  # Remove duplicates

async def scrape_subject(page, subject_name, url_variants):
    """Try multiple URL variants for a subject"""
    
    for url_suffix in url_variants:
        url = f"{BASE_URL}{url_suffix}/"
        
        try:
            response = await page.goto(url, wait_until='domcontentloaded', timeout=15000)
            
            # Check if page exists
            if response and response.status == 200:
                await asyncio.sleep(1)
                
                # Look for papers from 2016-2021
                papers = await page.evaluate(r'''() => {
                    const years = ['2016', '2017', '2018', '2019', '2020', '2021'];
                    const results = [];
                    
                    document.querySelectorAll('a, button, [onclick], [data-url]').forEach(el => {
                        const text = el.textContent.trim();
                        const href = el.href || el.getAttribute('data-url') || el.getAttribute('onclick') || '';
                        
                        years.forEach(year => {
                            if (text.includes(year) && href.includes('drive.google.com')) {
                                const match = href.match(/https:\/\/drive\.google\.com\/file\/d\/[^'"\\/\s]+/);
                                if (match) {
                                    let url = match[0];
                                    if (!url.includes('/view')) url += '/view';
                                    results.push({year: year, url: url});
                                }
                            }
                        });
                    });
                    
                    return results;
                }''')
                
                if papers and len(papers) > 0:
                    return {'url': url, 'papers': papers}
        
        except Exception:
            continue
    
    return None

async def main():
    print(f"\n{'='*80}")
    print(f"🎯 SCRAPING CSS 2016-2021 PAPERS - KNOWN SUBJECTS")
    print(f"{'='*80}\n")
    
    all_subjects = COMPULSORY_SUBJECTS + OPTIONAL_SUBJECTS
    print(f"Total subjects to check: {len(all_subjects)}\n")
    
    found_papers = {}
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        for idx, subject in enumerate(all_subjects, 1):
            status = f"[{idx}/{len(all_subjects)}]"
            subject_display = subject.replace('_', ' ')
            
            print(f"{status} {subject_display:45}", end='', flush=True)
            
            url_variants = subject_to_url(subject)
            result = await scrape_subject(page, subject, url_variants)
            
            if result:
                papers = result['papers']
                print(f" ✅ {len(papers)} papers")
                found_papers[subject_display] = {
                    'url': result['url'],
                    'papers': papers
                }
            else:
                print(f" ⚠️")
        
        await browser.close()
    
    # Summary
    print(f"\n{'='*80}")
    print(f"📊 RESULTS SUMMARY")
    print(f"{'='*80}\n")
    
    total_papers = sum(len(data['papers']) for data in found_papers.values())
    print(f"✅ Subjects Found: {len(found_papers)}")
    print(f"✅ Total Papers: {total_papers}\n")
    
    if found_papers:
        print(f"{'─'*80}\n")
        
        # Group by subject type
        compulsory_found = {k: v for k, v in found_papers.items() if any(comp.replace('_', ' ') in k for comp in COMPULSORY_SUBJECTS)}
        optional_found = {k: v for k, v in found_papers.items() if k not in compulsory_found}
        
        if compulsory_found:
            print(f"📕 COMPULSORY PAPERS ({len(compulsory_found)} subjects)")
            print(f"{'─'*80}")
            for subject, data in sorted(compulsory_found.items()):
                years = sorted(set(p['year'] for p in data['papers']))
                print(f"  • {subject}: {', '.join(years)}")
            print()
        
        if optional_found:
            print(f"📗 OPTIONAL SUBJECTS ({len(optional_found)} subjects)")
            print(f"{'─'*80}")
            for subject, data in sorted(optional_found.items()):
                years = sorted(set(p['year'] for p in data['papers']))
                print(f"  • {subject}: {', '.join(years)}")
        
        # Save detailed results
        print(f"\n{'='*80}")
        print(f"💾 Saving detailed results...")
        
        with open('all_discovered_papers.txt', 'w', encoding='utf-8') as f:
            f.write(f"CSS PAST PAPERS 2016-2021 - ALL DISCOVERED\n")
            f.write(f"="*80 + "\n\n")
            f.write(f"Total Subjects: {len(found_papers)}\n")
            f.write(f"Total Papers: {total_papers}\n\n")
            
            for subject, data in sorted(found_papers.items()):
                f.write(f"\n{subject}\n")
                f.write(f"URL: {data['url']}\n")
                f.write(f"-"*80 + "\n")
                for paper in sorted(data['papers'], key=lambda x: x['year']):
                    f.write(f"{paper['year']}: {paper['url']}\n")
        
        print(f"✅ Saved to 'all_discovered_papers.txt'\n")
        
        return found_papers
    else:
        print("❌ No papers found\n")
        return {}

if __name__ == "__main__":
    result = asyncio.run(main())
