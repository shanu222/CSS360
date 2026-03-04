# PDF Files Deployment Guide

## Overview
The CSS_Past_Papers folder contains 188+ PDF files (~500MB+). These files are **NOT tracked in git** to avoid:
- Large repository size
- Slow clones/deployments
- Build timeouts on hosting platforms

## Local Development
PDFs are stored in `CSS_Past_Papers/` and served via `/css-papers` static endpoint.

## Production Deployment Options

### Option 1: Render Persistent Disk (Recommended for Render)

The `render.yaml` configuration includes a persistent disk mount:
```yaml
disk:
  name: css-papers-storage
  mountPath: /opt/render/project/src/CSS_Past_Papers
  sizeGB: 1
```

**Steps:**
1. Deploy your app to Render (disk will be automatically created)
2. Access your Render shell: `Dashboard → Your Service → Shell`
3. Create folder structure:
   ```bash
   mkdir -p CSS_Past_Papers/CSS{2016..2026}/{Compulsory_Papers,Optional_Subjects}
   ```
4. Upload PDFs using one of these methods:

   **Method A: Using Render Shell + wget/curl**
   ```bash
   # From your scraper or cloud storage
   cd CSS_Past_Papers/CSS2024/Compulsory_Papers/Essay
   wget https://your-storage-url/paper.pdf
   ```

   **Method B: Using SCP (if SSH access available)**
   ```bash
   scp -r CSS_Past_Papers/* render-server:/opt/render/project/src/CSS_Past_Papers/
   ```

   **Method C: Automated Upload Script**
   Create a deployment script that uploads PDFs after deployment.

### Option 2: Cloud Storage (AWS S3, Cloudinary, etc.)

**Pros:**
- No deployment size limits
- CDN distribution
- Better performance
- Easier backups

**Implementation:**
1. Upload PDFs to S3/Cloudinary
2. Update `pastPaperController.js` to return cloud URLs instead of local paths:
   ```javascript
   const CLOUD_STORAGE_BASE = process.env.PDF_STORAGE_URL || '/css-papers';
   fileUrl: `${CLOUD_STORAGE_BASE}/CSS${year}/${categoryFolder}/${subjectFolder}/${file}`
   ```
3. Set environment variable in Render:
   ```
   PDF_STORAGE_URL=https://your-bucket.s3.amazonaws.com/css-papers
   ```

### Option 3: Keep PDFs in Repository (Not Recommended)

If you must keep PDFs in git:
1. Remove from `.gitignore`
2. Use Git LFS (Large File Storage):
   ```bash
   git lfs install
   git lfs track "*.pdf"
   git add .gitattributes
   ```
3. Push to repository
4. **Note:** Render free tier may timeout on large repos

## Running FPSC Scraper in Production

To keep papers up-to-date, schedule the scraper:

### Using Render Cron Job:
1. Create a new service in Render (type: Cron Job)
2. Schedule: Daily/Weekly
3. Command:
   ```bash
   cd /opt/render/project/src && python backend/scripts/fpsc_papers_scraper.py
   ```

### Using Node.js Scheduler:
Add to `server.js`:
```javascript
import { exec } from 'child_process';
import cron from 'node-cron';

// Run scraper weekly on Sunday at 2 AM
cron.schedule('0 2 * * 0', () => {
  exec('python backend/scripts/fpsc_papers_scraper.py', (error, stdout) => {
    if (error) console.error('Scraper failed:', error);
    else console.log('Scraper completed:', stdout);
  });
});
```

## Verifying Deployment

After deployment, test the endpoints:
```bash
# Check if papers are indexed
curl https://your-app.render.com/api/past-papers/index

# Check if static files are served
curl https://your-app.render.com/css-papers/CSS2024/Compulsory_Papers/Essay/ESSAY.pdf
```

## Troubleshooting

### Issue: Papers not showing in production
**Solution:** 
- Check disk is mounted: `df -h | grep css-papers`
- Verify folder structure exists
- Check file permissions: `ls -la CSS_Past_Papers/`

### Issue: 404 errors for PDF files
**Solution:**
- Verify static middleware is registered in `server.js`
- Check file paths match exactly (case-sensitive)
- Ensure disk is mounted at correct path

### Issue: Build timeout on Render
**Solution:**
- Confirm `CSS_Past_Papers/` is in `.gitignore`
- Remove from git: `git rm -r --cached CSS_Past_Papers/`
- Commit and push changes

## Current Status

- ✅ Backend auto-indexing implemented
- ✅ PDFs removed from git tracking
- ✅ Persistent disk configured in render.yaml
- ⏳ PDFs need to be uploaded after first deployment
- 📋 188 papers available locally for upload

## Upload Command (One-time Setup)

After first Render deployment, compress and upload:
```bash
# Locally, create archive
tar -czf css-papers.tar.gz CSS_Past_Papers/

# Upload to Render (method depends on your setup)
# Option 1: Via Render Shell
# Option 2: Via temporary cloud storage + wget in Render
# Option 3: Via deployment hook script
```
