# 🚀 Quick Vercel Deployment Reference

## Your Configuration

**Backend URL (Render):** 
```
https://e-commerce-website-for-puma.onrender.com/api
```

**Repository:** 
```
sonu93418/E-Commerce-Website-for-Puma
```

## Deploy in 5 Steps:

### 1. Go to Vercel
Visit: https://vercel.com and sign in with GitHub

### 2. Import Project
- Click "Add New" → "Project"
- Select: `E-Commerce-Website-for-Puma`
- Click "Import"

### 3. ⚠️ CRITICAL: Set Root Directory
- Click "Edit" next to "Root Directory"
- Set to: `frontend`
- This is **REQUIRED** since your Next.js app is in the frontend folder

### 4. Add Environment Variable
In the "Environment Variables" section, add:

**Variable Name:**
```
NEXT_PUBLIC_API_URL
```

**Value:** (Copy this exactly)
```
https://e-commerce-website-for-puma.onrender.com/api
```

### 5. Deploy
- Click "Deploy"
- Wait 2-3 minutes
- Done! 🎉

## Verify Settings

Before clicking Deploy, verify:
- ✅ Root Directory: `frontend`
- ✅ Framework: Next.js
- ✅ Build Command: `npm run build`
- ✅ Environment Variable Added: `NEXT_PUBLIC_API_URL`

## After Deployment

Test your live site:
- Homepage
- Products page
- Login/Register
- Cart functionality
- All category pages (Men, Women, Kids, Sports)

## Local Testing (Optional)

Want to test with production backend locally?

Your `.env.local` is already configured with the Render backend URL.

Run:
```bash
cd frontend
npm run dev
```

## Need Help?

See detailed guide: [VERCEL-DEPLOYMENT-GUIDE.md](VERCEL-DEPLOYMENT-GUIDE.md)

---

**Ready to deploy!** Just follow the 5 steps above. 🚀
