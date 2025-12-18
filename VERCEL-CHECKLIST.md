# ✅ Vercel Deployment Checklist

Follow this checklist to deploy your PUMA E-Commerce app to production.

---

## 🔲 Pre-Deployment Checklist

### MongoDB Atlas Setup
- [ ] Created MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)
- [ ] Created free cluster
- [ ] Created database user with password
- [ ] Added IP address `0.0.0.0/0` to Network Access (allows all IPs)
- [ ] Copied connection string: `mongodb+srv://username:password@cluster.mongodb.net/puma`

### Stripe Setup (Optional for payments)
- [ ] Created Stripe account (https://stripe.com)
- [ ] Got test keys from dashboard
- [ ] Copied Publishable Key: `pk_test_...`

---

## 🔲 Backend Deployment (Render)

- [ ] Went to https://render.com
- [ ] Signed in with GitHub
- [ ] Clicked **New +** → **Web Service**
- [ ] Connected repository: `sonu93418/E-Commerce-Website-for-Puma`
- [ ] Set **Root Directory** to `backend`
- [ ] Set **Build Command** to `npm install`
- [ ] Set **Start Command** to `npm start`
- [ ] Added environment variables:
  - [ ] `MONGODB_URI` = (your MongoDB connection string)
  - [ ] `JWT_SECRET` = (random 32-character string)
  - [ ] `PORT` = 5000
  - [ ] `NODE_ENV` = production
  - [ ] `FRONTEND_URL` = (will update after Vercel deploy)
- [ ] Clicked **Create Web Service**
- [ ] Waited for deployment (5-10 min)
- [ ] Copied backend URL: `https://_____.onrender.com`
- [ ] Tested: `https://_____.onrender.com/api/health` returns JSON

---

## 🔲 Frontend Deployment (Vercel)

- [ ] Went to https://vercel.com
- [ ] Signed in with GitHub
- [ ] Clicked **New Project**
- [ ] Imported repository: `sonu93418/E-Commerce-Website-for-Puma`
- [ ] ⚠️ **IMPORTANT:** Set **Root Directory** to `frontend`
- [ ] Framework detected as **Next.js**
- [ ] Added environment variables:
  - [ ] `NEXT_PUBLIC_API_URL` = `https://your-backend.onrender.com/api`
  - [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_test_...`
- [ ] Clicked **Deploy**
- [ ] Waited for build (3-5 min)
- [ ] Copied Vercel URL: `https://_____.vercel.app`

---

## 🔲 Final Configuration

### Update Backend CORS
- [ ] Went back to Render dashboard
- [ ] Opened backend service
- [ ] Clicked **Environment** tab
- [ ] Updated `FRONTEND_URL` to Vercel URL: `https://_____.vercel.app`
- [ ] Saved (triggers auto-redeploy)

---

## 🔲 Testing

- [ ] Visited `https://_____.vercel.app`
- [ ] Homepage loaded successfully
- [ ] Opened DevTools (F12) → Console tab
- [ ] No errors showing
- [ ] Products are displaying
- [ ] Can navigate to /login page
- [ ] Can navigate to /register page
- [ ] Opened DevTools → Network tab
- [ ] Refreshed page
- [ ] See API calls to `https://_____.onrender.com/api/...`
- [ ] API calls return 200 status codes

---

## 🎉 Deployment Complete!

Your URLs:
- **Frontend:** https://_____.vercel.app
- **Backend API:** https://_____.onrender.com/api

---

## 🔧 If Something Doesn't Work

| Problem | Solution |
|---------|----------|
| Products don't load | Check `NEXT_PUBLIC_API_URL` in Vercel env vars |
| CORS error in console | Update `FRONTEND_URL` in Render backend |
| 404 page not found | Verify **Root Directory** is set to `frontend` |
| Build failed | Check build logs in Vercel dashboard |
| Backend error | Check logs in Render dashboard |

---

## 📝 Notes

**Free Tier Limitations:**
- **Render:** Backend sleeps after 15 min of inactivity (first request takes 30-60s to wake up)
- **Vercel:** 100 GB bandwidth/month
- **MongoDB Atlas:** 512 MB storage

**To Upgrade:**
- Add custom domain in Vercel (free)
- Upgrade Render for always-on backend ($7/mo)
- Use production Stripe keys when ready for real payments

---

**Need more help?** See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) for detailed instructions.
