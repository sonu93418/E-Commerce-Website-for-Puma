# 🚀 Complete Deployment Guide - Vercel + Render

**Repository:** sonu93418/E-Commerce-Website-for-Puma

---

## ⚡ Quick Deploy (3 Steps - 30 minutes total)

### Step 1️⃣: Deploy Backend to Render (15 min)

**A. Get MongoDB Database**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster → Create database user
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/puma`

**B. Deploy to Render**
1. Go to https://render.com → Sign in with GitHub
2. Click **New +** → **Web Service**
3. Connect: `sonu93418/E-Commerce-Website-for-Puma`
4. Configure:
   - **Name:** `puma-backend`
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add **Environment Variables**:
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/puma
   JWT_SECRET=your_random_32_character_secret_key
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://your-app.vercel.app
   ```
6. **Deploy** → Copy backend URL (e.g., `https://puma-backend.onrender.com`)

**Test:** Visit `https://puma-backend.onrender.com/api/health`

---

### Step 2️⃣: Deploy Frontend to Vercel (10 min)

1. Go to https://vercel.com → Sign in with GitHub
2. **New Project** → Import repository
3. **IMPORTANT Configuration:**
   - **Root Directory:** `frontend` ⚠️ **CRITICAL!**
   - **Framework Preset:** Next.js (auto-detected)
   - Leave build settings as default
4. Add **Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://puma-backend.onrender.com/api
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
   ```
5. **Deploy** → Wait 3-5 minutes
6. Your app is live! 🎉

**Note:** The `vercel.json` file in root is minimal and only handles URL rewrites. Vercel will auto-detect Next.js from the `frontend` folder.

---

### Step 3️⃣: Update Backend CORS (2 min)

1. Go back to Render dashboard
2. Your service → **Environment** tab
3. Update `FRONTEND_URL` to your Vercel URL: `https://your-app.vercel.app`
4. Save (auto-redeploys)

---

## ✅ Verification

Test your deployment:
- [ ] Homepage loads: `https://your-app.vercel.app`
- [ ] Products display
- [ ] Login/Register works
- [ ] No CORS errors in console (F12)

---

## ⚠️ Common Issues

| Error | Fix |
|-------|-----|
| "Failed to fetch products" | Check `NEXT_PUBLIC_API_URL` in Vercel env vars |
| CORS error | Update `FRONTEND_URL` in Render backend env vars |
| 404 on deployed site | Set **Root Directory** to `frontend` in Vercel |
| Build failed | Commit `package-lock.json` files |

---

## 📊 Architecture

```
Frontend (Vercel)          Backend (Render)         Database (MongoDB Atlas)
https://app.vercel.app --> https://api.onrender.com --> mongodb+srv://...
     Next.js                   Express.js                  Collections
```

---

## 🎯 Next Steps

- Add custom domain in Vercel
- Switch to production Stripe keys
- Set up email service (Nodemailer)
- Enable MongoDB backups
- Add monitoring/analytics
