# Vercel Deployment Guide for Puma E-Commerce Frontend

## 🚀 Quick Deployment Steps

### 1. Prerequisites
- GitHub repository with your code pushed
- Vercel account (sign up at https://vercel.com)
- Backend API deployed and accessible

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add New" → "Project"
   - Select your GitHub repository: `E-Commerce-Website-for-Puma`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend` ⚠️ **IMPORTANT**
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

4. **Environment Variables**
   Click "Environment Variables" and add:
   ```
   NEXT_PUBLIC_API_URL=https://e-commerce-website-for-puma.onrender.com/api
   ```
   ⚠️ **Use exactly this URL** - Your backend is deployed on Render

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at `https://your-project.vercel.app`

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from frontend directory**
   ```bash
   cd frontend
   vercel
   ```

4. **Follow prompts**
   - Set up and deploy: Yes
   - Scope: Select your account
   - Link to existing project: No
   - Project name: puma-ecommerce (or your choice)
   - Directory: `./` (since you're already in frontend)
   - Override settings: No

5. **Set Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_API_URL
   ```
   Enter your backend API URL when prompted

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### 3. Post-Deployment Configuration

#### Custom Domain (Optional)
1. Go to your project settings on Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

#### Environment Variables
- Go to Project Settings → Environment Variables
- Add any additional variables needed:
  - `NEXT_PUBLIC_API_URL` (required)
  - Any other environment variables your app needs

### 4. Important Notes

⚠️ **Root Directory Setting**
- Make sure to set the root directory to `frontend` in Vercel settings
- This is crucial since your Next.js app is in the frontend folder

⚠️ **Backend API**
- Ensure your backend is deployed and accessible
- Update `NEXT_PUBLIC_API_URL` with your backend URL
- Backend should have CORS configured to allow your Vercel domain

⚠️ **Environment Variables**
- All client-side env vars must start with `NEXT_PUBLIC_`
- Don't commit `.env.local` to git
- Set env vars in Vercel dashboard for each environment

### 5. Verify Deployment

After deployment, test these pages:
- ✅ Homepage: `https://your-app.vercel.app`
- ✅ Products: `https://your-app.vercel.app/products`
- ✅ Men's category: `https://your-app.vercel.app/men`
- ✅ Women's category: `https://your-app.vercel.app/women`
- ✅ Kids' category: `https://your-app.vercel.app/kids`
- ✅ Sports: `https://your-app.vercel.app/sports`
- ✅ Cart: `https://your-app.vercel.app/cart`
- ✅ Login: `https://your-app.vercel.app/login`

### 6. Continuous Deployment

Once set up, Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

### 7. Troubleshooting

#### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

#### 404 Errors
- Next.js App Router handles routing automatically
- Ensure pages are in the correct `app` directory structure

#### API Connection Issues
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check backend CORS settings
- Ensure backend is accessible from Vercel

#### Images Not Loading
- Check image domains in `next.config.js`
- Verify image URLs are accessible

### 8. Project Structure Verification

Your project should have:
```
frontend/
├── app/                  # Next.js 14 App Router
├── components/           # React components
├── lib/                  # Utilities and API
├── store/                # Zustand stores
├── public/               # Static assets
├── next.config.js        # Next.js config
├── package.json          # Dependencies
├── vercel.json           # Vercel config
└── .env.example          # Environment variables template
```

## 🎉 Success!

Your Puma E-Commerce frontend should now be live on Vercel!

**Next Steps:**
1. Test all functionality
2. Add custom domain (optional)
3. Set up analytics (Vercel Analytics)
4. Monitor performance in Vercel dashboard

## 📞 Support

If you encounter issues:
- Check Vercel documentation: https://vercel.com/docs
- Check build logs in Vercel dashboard
- Verify environment variables are set correctly
- Ensure backend API is accessible

## 🔧 Configuration Files

All configuration files are ready:
- ✅ `vercel.json` - Vercel configuration
- ✅ `.vercelignore` - Files to ignore during deployment
- ✅ `.env.example` - Environment variables template
- ✅ `next.config.js` - Next.js configuration
- ✅ `package.json` - Build scripts and dependencies
