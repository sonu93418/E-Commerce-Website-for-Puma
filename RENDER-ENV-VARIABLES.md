# 🎯 Environment Variables for Render (Backend)

Copy and paste these into your Render dashboard:

## Go to Render Dashboard
1. Visit: https://dashboard.render.com
2. Select your service: `e-commerce-website-for-puma`
3. Click "Environment" in the left sidebar
4. **Delete the wrong variables** (NEXT_PUBLIC_API_URL, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
5. Add these variables below

---

## Required Environment Variables for Render

### 1. MONGODB_URI
```
mongodb+srv://sonukumarray:qezKdDlhiWcErrv1@cluster0.66o2trx.mongodb.net/puma-ecommerce?retryWrites=true&w=majority
```

### 2. JWT_SECRET
```
puma_ecommerce_secret_key_2025_change_in_production
```

### 3. JWT_EXPIRE
```
7d
```

### 4. NODE_ENV
```
production
```

### 5. PORT
```
5000
```

### 6. FRONTEND_URL (Add after deploying to Vercel)
```
https://your-vercel-app-url.vercel.app
```
**Note:** You'll get this URL after deploying to Vercel. Come back and update this variable.

---

## Quick Copy Format

If you prefer, copy this format for easy pasting:

```
Key: MONGODB_URI
Value: mongodb+srv://sonukumarray:qezKdDlhiWcErrv1@cluster0.66o2trx.mongodb.net/puma-ecommerce?retryWrites=true&w=majority

Key: JWT_SECRET
Value: puma_ecommerce_secret_key_2025_change_in_production

Key: JWT_EXPIRE
Value: 7d

Key: NODE_ENV
Value: production

Key: PORT
Value: 5000

Key: FRONTEND_URL
Value: (Add your Vercel URL here after deploying)
```

---

## After Adding Variables

1. Click **"Save Changes"** in Render
2. Render will automatically redeploy your backend (takes 2-3 minutes)
3. Wait for deployment to complete
4. Your backend will now use MongoDB Atlas instead of localhost

---

## Test Backend After Deployment

Visit: https://e-commerce-website-for-puma.onrender.com/api/products

Should return products from your MongoDB Atlas database!

---

## Next: Deploy Frontend to Vercel

After Render finishes deploying:
1. Deploy frontend to Vercel (see DEPLOY-NOW.md)
2. Get your Vercel URL
3. Come back to Render and update `FRONTEND_URL`
