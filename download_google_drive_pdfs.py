#!/usr/bin/env python3
"""
Download CSS Past Papers from Google Drive links
"""

import os
import re
import requests
from pathlib import Path

BASE_FOLDER = "CSS_Past_Papers"

# Google Drive links found for years 2016-2021
DRIVE_LINKS = {
    'Gender_Studies': {
        2016: 'https://drive.google.com/file/d/1GkCOkwJRBWCMb7QmfrWDl5twJiZcwg1g/view',
        2017: 'https://drive.google.com/file/d/1a10lYCs9eNfMTw_ObgUyk1E7gMKNgpcX/view',
        2018: 'https://drive.google.com/file/d/1n-aF4i2GO5oBpsj9F4uUivgthtUCp__y/view',
        2019: 'https://drive.google.com/file/d/1ll7rycgc42HbRd5NnF-RE7xVm7_w3qRp/view',
        2020: 'https://drive.google.com/file/d/1SmI9MHiRqdRLJK2iMvXqXrMwOmNYK3GT/view',
        2021: 'https://drive.google.com/file/d/1Ffm_nha7pfwAArTewvY3K3GxSSOS748m/view',
    },
    'Environmental_Science': {
        2016: 'https://drive.google.com/file/d/1xWzmWUm9G9ECawaXE4EXtyk99ZCKLBqg/view',
        2017: 'https://drive.google.com/file/d/1SMCgbEfZx5LS9UWhp57Hx75_p0z8-7un/view',
        2018: 'https://drive.google.com/file/d/13ULqYojCYLhgE0m81ySojI8PutziBACq/view',
        2019: 'https://drive.google.com/file/d/1yTpH9TfW-u3CeAEoSzOUiBqchwpz3qaX/view',
        2020: 'https://drive.google.com/file/d/1vumfDOwxiIMuAWzZh3NA17_duU5p8n2_/view',
        2021: 'https://drive.google.com/file/d/1Bzj0NLECpiWuuWLjGdJl38OCQCP4MJ7a/view',
    },
    'Criminology': {
        2016: 'https://drive.google.com/file/d/1jzw6hghfs72jGOei6pbr8AtKmZFblSqR/view',
        2017: 'https://drive.google.com/file/d/1gYb_oL-8AxmW1lPObs1gH3PeGafca-uL/view',
        2018: 'https://drive.google.com/file/d/1lQuK46fRb3XYu0gbemN2M_LB_XIssDLi/view',
        2019: 'https://drive.google.com/file/d/1LAA8ixHNz6iHFCioEgEkR0frjPT39UCD/view',
        2020: 'https://drive.google.com/file/d/1sFucYOwkpKtg4isn0_eEDCQhxyOco4NO/view',
        2021: 'https://drive.google.com/file/d/1D6AR81f__Gl7noEAvcdzJDaiFVklaEC_/view',
    }
}

def get_file_id_from_url(url):
    """Extract Google Drive file ID from URL"""
    match = re.search(r'/d/([a-zA-Z0-9_-]+)', url)
    return match.group(1) if match else None

def download_from_google_drive(file_id, destination):
    """Download file from Google Drive"""
    
    def get_confirm_token(response):
        for key, value in response.cookies.items():
            if key.startswith('download_warning'):
                return value
        return None

    def save_response_content(response, destination):
        CHUNK_SIZE = 32768
        with open(destination, "wb") as f:
            for chunk in response.iter_content(CHUNK_SIZE):
                if chunk:
                    f.write(chunk)

    URL = "https://docs.google.com/uc?export=download"
    session = requests.Session()

    response = session.get(URL, params={'id': file_id}, stream=True)
    token = get_confirm_token(response)

    if token:
        params = {'id': file_id, 'confirm': token}
        response = session.get(URL, params=params, stream=True)

    save_response_content(response, destination)

def ensure_folder(year, subject):
    """Create folder structure"""
    folder = f"{BASE_FOLDER}/CSS{year}/Optional_Subjects/{subject}"
    Path(folder).mkdir(parents=True, exist_ok=True)
    return folder

def main():
    print(f"\n{'='*70}")
    print(f"📥 DOWNLOADING CSS PAST PAPERS FROM GOOGLE DRIVE")
    print(f"{'='*70}\n")
    
    total = sum(len(years) for years in DRIVE_LINKS.values())
    current = 0
    downloaded = 0
    skipped = 0
    failed = 0
    
    for subject, years in DRIVE_LINKS.items():
        print(f"\n📚 Subject: {subject}")
        print(f"{'─'*70}")
        
        for year, url in years.items():
            current += 1
            file_id = get_file_id_from_url(url)
            
            if not file_id:
                print(f"  [{current}/{total}] {year} - ❌ Invalid URL")
                failed += 1
                continue
            
            folder = ensure_folder(year, subject)
            filename = f"CSS_{subject}_{year}.pdf"
            filepath = os.path.join(folder, filename)
            
            print(f"  [{current}/{total}] {year} - {filename}")
            
            if os.path.exists(filepath):
                print(f"            ✓ Already exists")
                skipped += 1
                continue
            
            try:
                print(f"            ⬇️  Downloading...", end='')
                download_from_google_drive(file_id, filepath)
                
                # Check if file was downloaded successfully
                if os.path.exists(filepath):
                    file_size = os.path.getsize(filepath)
                    if file_size > 1000:  # At least 1KB
                        print(f" ✅ Success ({file_size // 1024} KB)")
                        downloaded += 1
                    else:
                        print(f" ❌ Failed (file too small)")
                        os.remove(filepath)
                        failed += 1
                else:
                    print(f" ❌ Failed")
                    failed += 1
            except Exception as e:
                print(f" ❌ Error: {str(e)[:40]}")
                failed += 1
    
    print(f"\n{'='*70}")
    print(f"📊 DOWNLOAD SUMMARY:")
    print(f"{'='*70}")
    print(f"  ✅ Successfully Downloaded: {downloaded}")
    print(f"  ↷  Already Existed: {skipped}")
    print(f"  ❌ Failed: {failed}")
    print(f"  📁 Total Processed: {current}")
    print(f"{'='*70}\n")
    
    if downloaded > 0:
        print(f"✨ Papers saved to: {BASE_FOLDER}/CSS[Year]/Optional_Subjects/")

if __name__ == "__main__":
    main()
