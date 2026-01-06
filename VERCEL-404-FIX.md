# Vercel 404 Fix - Quick Guide

## Problem
Getting **404: NOT_FOUND** error on Vercel deployment.

## Root Cause
Vercel is looking for the Next.js app in the root directory, but it's actually in the `frontend/` folder.

## Solution

### Option 1: Update Vercel Project Settings (Recommended)
1. Go to https://vercel.com/sonukumarray1009-2487s-projects/puma-storex-app/settings
2. Click **General** tab
3. Scroll to **Root Directory**
4. Change from `.` to `frontend`
5. Click **Save**
6. Go to **Deployments** tab
7. Click **Redeploy** on latest deployment

### Option 2: Redeploy with Correct Settings
1. Delete current Vercel project
2. Create new project
3. Import: `sonu93418/E-Commerce-Website-for-Puma`
4. **IMPORTANT:** Set Root Directory to `frontend` before deploying
5. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://e-commerce-website-for-puma.onrender.com/api
   ```
6. Click **Deploy**

## Verify
After deployment, you should see:
- ✅ Homepage loads with PUMA branding
- ✅ Products display correctly
- ✅ No 404 errors

## Additional Notes
- The `vercel.json` files have been created for proper configuration
- Make sure to commit and push these changes:
  ```bash
  git add .
  git commit -m "Add Vercel configuration files"
  git push origin main
  ```

## Support
If issues persist, check:
- Vercel build logs for errors
- Ensure `frontend/` directory exists in your repo
- Verify Next.js build completes successfully
