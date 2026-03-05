#!/usr/bin/env python3
"""
Book PDF Search and Download Script
Searches for accountancy books from legal open sources
"""

import os
import requests
import json
from pathlib import Path
from urllib.parse import quote
import time

# Books to search for
BOOKS = {
    "Paper I": [
        {"title": "Intermediate Accounting", "authors": "Kieso Weygandt Warfield"},
        {"title": "Fundamentals of Accounting Principles", "authors": "Wild Larson Chiappetta"},
        {"title": "Accounting for Decision Making", "authors": "Meigs William Haka"},
        {"title": "IFRSs IASs", "authors": "ICAP IFAC"},
        {"title": "Principles and Practice of Book Keeping and Accounts", "authors": "Vickery"},
        {"title": "Financial Accounting", "authors": "Hanif Mukherjee"},
        {"title": "Principles of Accounting and Advanced Accounting", "authors": "Sohail Afzal"},
        {"title": "Principles of Accounting and Advanced Accounting", "authors": "Ghani Ejaz"},
        {"title": "Cost Accounting Planning and Control", "authors": "Usry Hammer Matz"},
        {"title": "Managerial Accounting", "authors": "Brewer Garrison Noreen"},
        {"title": "Cost Accounting", "authors": "Jain Narang"},
        {"title": "Cost Accounting", "authors": "Nisar-ud-Din"},
    ],
    "Paper II": [
        {"title": "Auditing Principles and Techniques", "authors": "S.K. Basu"},
        {"title": "Auditing", "authors": "L.R. Dicksee"},
        {"title": "Practical Auditing", "authors": "Spicer Pegler"},
        {"title": "Companies Ordinance 1984", "authors": "SECP"},
        {"title": "Auditing", "authors": "S.K. Millichamp"},
        {"title": "Handbook of International Quality Control Auditing Review and Other Assurance", "authors": "ICAP IFAC"},
        {"title": "Auditing", "authors": "M. Irshad"},
        {"title": "Advanced Auditing", "authors": "Khawaja Amjad Saeed"},
        {"title": "Income Tax Ordinance 2001", "authors": "FBR"},
        {"title": "Introduction to Taxation Synopsis of Taxes in Pakistan", "authors": "Mirza Munawar Hussain"},
        {"title": "Law in Practice Income and Sales Tax", "authors": "Abdul Razzaq"},
        {"title": "Business Taxation", "authors": "Ijaz Ali Waince"},
    ]
}

# Create uploads directory
UPLOADS_DIR = Path("uploads/books/accountancy-auditing")
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

# Search URLs for legal sources
SEARCH_SOURCES = {
    "Google Scholar": "https://scholar.google.com/scholar?q=",
    "ResearchGate": "https://www.researchgate.net/search?q=",
    "Academia.edu": "https://www.academia.edu/search?q=",
    "OpenStax": "https://openstax.org/",
    "Project Gutenberg": "https://www.gutenberg.org/ebooks/search/?query=",
}

def generate_search_results():
    """Generate a searchable index of books with links to legal sources"""
    results = []
    
    for paper, books in BOOKS.items():
        for book in books:
            result = {
                "paper": paper,
                "title": book["title"],
                "authors": book["authors"],
                "search_links": {},
                "status": "Not downloaded - manual search required"
            }
            
            # Generate search links for each source
            search_query = f"{book['title']} {book['authors']}"
            safe_query = quote(search_query)
            
            for source, base_url in SEARCH_SOURCES.items():
                result["search_links"][source] = base_url + safe_query
            
            results.append(result)
    
    return results

def save_search_index(results):
    """Save search results index as JSON"""
    index_file = UPLOADS_DIR / "search_index.json"
    
    with open(index_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Search index saved to {index_file}")
    print("\nTo download books:")
    print("1. Open the search_index.json file")
    print("2. Click the links to search legal sources (Google Scholar, ResearchGate, Academia.edu)")
    print("3. Download PDFs where available")
    print("4. Save PDFs to the uploads/books/accountancy-auditing folder")
    print("5. Update the pdfUrl in mockData.ts with the file paths")

def generate_download_guide():
    """Create a markdown guide for manual PDF downloads"""
    guide_file = UPLOADS_DIR / "DOWNLOAD_GUIDE.md"
    
    guide_content = """# Accountancy & Auditing Books - PDF Download Guide

## Legal Sources for Academic PDFs

### Free/Open Access Sources:
1. **Google Scholar** (scholar.google.com) - Many papers have free PDF links
2. **ResearchGate** (researchgate.net) - Authors often share their work
3. **Academia.edu** - Academics share published papers
4. **OpenStax** - Free, peer-reviewed textbooks
5. **Project Gutenberg** - Public domain academic texts
6. **Internet Archive** (archive.org) - Vast collection of books
7. **LibGen** - For books in public domain or with open access

### Institutional Access:
- Check if your institution has library access
- Many universities provide remote access to academic databases

### Publisher Direct:
- Some publishers offer free/discounted access to students
- Check publisher websites directly

## Books to Download

### Paper I - Recommended Books:
1. Intermediate Accounting - Kieso, Weygandt & Warfield
2. Fundamentals of Accounting Principles - Wild, Larson & Chiappetta
3. Accounting for Decision Making - Meigs, William & Haka
4. IFRSs / IASs - ICAP / IFAC
5. Principles and Practice of Book Keeping and Accounts - B.G. Vickery
6. Financial Accounting - M. Hanif & A. Mukherjee
7. Principles of Accounting and Advanced Accounting - Sohail Afzal
8. Principles of Accounting and Advanced Accounting - M.A. Ghani & Ejaz
9. Cost Accounting – Planning and Control - Usry, Hammer & Matz
10. Managerial Accounting - Peter C. Brewer, Ray H. Garrison & Eric W. Noreen
11. Cost Accounting - Jain & Narang
12. Cost Accounting - Nisar-ud-Din

### Paper II - Books:
1. Auditing: Principles and Techniques - S.K. Basu
2. Auditing - L.R. Dicksee
3. Practical Auditing - Spicer & Pegler
4. Companies Ordinance 1984 - SECP
5. Auditing - S.K. Millichamp
6. Handbook of International Quality Control, Auditing, Review and Other Assurance - ICAP / IFAC
7. Auditing - M. Irshad
8. Advanced Auditing - Prof. Dr. Khawaja Amjad Saeed
9. Income Tax Ordinance 2001 - FBR
10. Introduction to Taxation / Synopsis of Taxes in Pakistan - Mirza Munawar Hussain
11. Law in Practice – Income and Sales Tax - Abdul Razzaq
12. Business Taxation - Ijaz Ali Waince

## Download Instructions:

1. Use search_index.json to find direct links to each book
2. Download PDFs via legal sources
3. Save PDF files with naming convention: `{paper}_{book_number}_{title}.pdf`
   - Example: `Paper_I_01_Intermediate_Accounting.pdf`
4. Place all files in this directory
5. Update mockData.ts with pdfUrl paths (e.g., `/uploads/books/accountancy-auditing/Paper_I_01_Intermediate_Accounting.pdf`)

## Important Notes:

- **Copyright Compliance**: Only download books you have legal right to access
- **Open Access First**: Prioritize books available through open-access channels
- **Author Permissions**: Some authors share work on ResearchGate/Academia.edu
- **Institutional Access**: Use your institution's library if available
- **PDF Naming**: Keep names consistent for easy referencing in the database

## Updating mockData.ts:

After downloading PDFs, update the pdfUrl field in src/app/data/mockData.ts:

```javascript
{
  "id": "accountancy-auditing-rec-p1-1",
  "name": "Intermediate Accounting",
  "author": "Kieso, Weygandt & Warfield",
  "pdfUrl": "/uploads/books/accountancy-auditing/Paper_I_01_Intermediate_Accounting.pdf",
  "downloadUrl": "/uploads/books/accountancy-auditing/Paper_I_01_Intermediate_Accounting.pdf"
}
```

---

**Last Updated**: March 5, 2026
"""
    
    with open(guide_file, 'w', encoding='utf-8') as f:
        f.write(guide_content)
    
    print(f"✓ Download guide saved to {guide_file}")

def main():
    print("=" * 60)
    print("Book PDF Search Index Generator")
    print("=" * 60)
    
    # Generate search results
    results = generate_search_results()
    
    # Save index
    save_search_index(results)
    
    # Generate guide
    generate_download_guide()
    
    print("\n" + "=" * 60)
    print("Summary:")
    print(f"Total books to search: {len(results)}")
    print(f"Output directory: {UPLOADS_DIR}")
    print("\nNext steps:")
    print("1. Review search_index.json for book search links")
    print("2. Follow DOWNLOAD_GUIDE.md for legal download instructions")
    print("3. Place downloaded PDFs in the uploads/books/accountancy-auditing folder")
    print("4. Update mockData.ts with pdfUrl paths")
    print("=" * 60)

if __name__ == "__main__":
    main()
