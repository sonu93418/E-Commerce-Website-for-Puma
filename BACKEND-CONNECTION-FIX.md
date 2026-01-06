# 🔧 Backend-Frontend Connection Troubleshooting

## Your Configuration

**Backend URL (Render):** `https://e-commerce-website-for-puma.onrender.com`  
**API Base URL:** `https://e-commerce-website-for-puma.onrender.com/api`

## Step 1: Verify Backend is Running

### Test Backend Health
Open these URLs in your browser:

1. **Root endpoint:**
   ```
   https://e-commerce-website-for-puma.onrender.com
   ```
   Should return: `{"status":"OK","message":"Puma E-Commerce API is running","version":"1.0.0",...}`

2. **Health check:**
   ```
   https://e-commerce-website-for-puma.onrender.com/api/health
   ```
   Should return: `{"status":"OK","message":"Puma E-Commerce API is running"}`

3. **Products endpoint:**
   ```
   https://e-commerce-website-for-puma.onrender.com/api/products
   ```
   Should return products JSON

⚠️ **If any of these fail, your backend needs to be redeployed or restarted**

## Step 2: Update Render Environment Variables

Your backend on Render MUST have this environment variable:

1. Go to Render Dashboard: https://dashboard.render.com
2. Select your backend service
3. Go to "Environment" tab
4. Add/Update this variable:

```
FRONTEND_URL=https://your-vercel-app.vercel.app
```

Replace `your-vercel-app` with your actual Vercel deployment URL.

**Important:** After adding/updating, click "Save Changes" - Render will automatically redeploy.

## Step 3: Verify Vercel Environment Variables

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Ensure you have:

```
NEXT_PUBLIC_API_URL=https://e-commerce-website-for-puma.onrender.com/api
```

⚠️ **Critical:** The variable name MUST be `NEXT_PUBLIC_API_URL` (not just `API_URL`)

After updating, redeploy your Vercel app.

## Step 4: Check Browser Console

1. Open your Vercel deployment in browser
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Look for:

### Good Signs ✅
```
🔗 API URL: https://e-commerce-website-for-puma.onrender.com/api
```

### Bad Signs ❌
```
❌ API Error: Network error
🌐 Network error - check if backend is accessible
📡 No response from server - backend might be down
```

## Step 5: Test CORS

### Using curl (from terminal):
```bash
curl -H "Origin: https://your-vercel-app.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     --verbose \
     https://e-commerce-website-for-puma.onrender.com/api/products
```

Should see:
```
Access-Control-Allow-Origin: https://your-vercel-app.vercel.app
```

### Using Browser:
In your Vercel app console, run:
```javascript
fetch('https://e-commerce-website-for-puma.onrender.com/api/products')
  .then(r => r.json())
  .then(d => console.log('✅ Success:', d))
  .catch(e => console.error('❌ Error:', e))
```

## Common Issues & Solutions

### Issue 1: "Network Error" or "Failed to fetch"

**Possible causes:**
- Backend is down or sleeping (Render free tier sleeps after 15 min inactivity)
- Wrong API URL in Vercel environment variables
- CORS issue

**Solutions:**
1. Visit backend URL directly to wake it up
2. Check Render logs for errors
3. Verify environment variables

### Issue 2: CORS Error in Console

**Error looks like:**
```
Access to fetch at 'https://...' from origin 'https://...' has been blocked by CORS policy
```

**Solution:**
1. Add your Vercel URL to backend `FRONTEND_URL` environment variable on Render
2. Redeploy backend after updating
3. Updated code already accepts all `.vercel.app` domains

### Issue 3: "Request Timeout"

**Possible causes:**
- Backend is slow to respond (cold start on Render)
- Large database query

**Solutions:**
- Wait and retry (first request after sleep takes 30-60 seconds)
- Increase timeout in code (already set to 30 seconds)

### Issue 4: Wrong API URL

**Check if using localhost instead of Render URL:**

In browser console on Vercel app:
```javascript
console.log(process.env.NEXT_PUBLIC_API_URL)
```

Should show: `https://e-commerce-website-for-puma.onrender.com/api`

If it shows `undefined` or `http://localhost:5000/api`:
- Environment variable not set in Vercel
- Rebuild required after adding variable

### Issue 5: 404 Not Found

**Error:** `GET https://e-commerce-website-for-puma.onrender.com/api/products 404`

**Possible causes:**
- Backend routes not properly configured
- MongoDB not connected

**Solution:**
1. Check Render logs
2. Verify database connection
3. Check backend route files exist

## Step 6: Manual API Test

### Test from your local machine:

1. **Create test file** `test-api.html`:
```html
<!DOCTYPE html>
<html>
<body>
  <h1>API Test</h1>
  <button onclick="testAPI()">Test Backend Connection</button>
  <pre id="result"></pre>

  <script>
    async function testAPI() {
      const result = document.getElementById('result');
      result.textContent = 'Testing...';
      
      try {
        const response = await fetch('https://e-commerce-website-for-puma.onrender.com/api/products');
        const data = await response.json();
        result.textContent = JSON.stringify(data, null, 2);
        console.log('✅ Success:', data);
      } catch (error) {
        result.textContent = `❌ Error: ${error.message}`;
        console.error('❌ Error:', error);
      }
    }
  </script>
</body>
</html>
```

2. Open in browser and click button
3. Check results

## Step 7: Deploy Changes

### If you made changes to backend:
```bash
cd backend
git add .
git commit -m "Fix CORS configuration"
git push origin main
```
Render will auto-deploy.

### If you made changes to frontend:
```bash
cd frontend
git add .
git commit -m "Fix API connection"
git push origin main
```
Vercel will auto-deploy.

## Checklist ✓

Before asking for help, verify:

- [ ] Backend URL is accessible in browser
- [ ] `/api/products` endpoint returns data
- [ ] Vercel has `NEXT_PUBLIC_API_URL` environment variable set
- [ ] Render has `FRONTEND_URL` environment variable set
- [ ] Browser console shows correct API URL
- [ ] No CORS errors in console
- [ ] Latest code is pushed to GitHub
- [ ] Both Render and Vercel have auto-deployed

## Quick Fix Commands

### Wake up sleeping backend (Render free tier):
```bash
curl https://e-commerce-website-for-puma.onrender.com/api/health
```

### Force Vercel redeploy:
Go to Vercel Dashboard → Deployments → Click "..." → Redeploy

### View Render logs:
Go to Render Dashboard → Your Service → Logs tab

## Still Not Working?

1. **Check Render Logs:**
   - Go to Render Dashboard
   - Click your service
   - View "Logs" tab
   - Look for errors

2. **Check Vercel Logs:**
   - Go to Vercel Dashboard
   - Click your deployment
   - View "Functions" or "Runtime Logs"

3. **Check Browser Network Tab:**
   - Open DevTools (F12)
   - Go to "Network" tab
   - Try to load page
   - Click failed requests to see details

## Environment Variables Reference

### Render (Backend):
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=https://your-vercel-app.vercel.app
PORT=5000
NODE_ENV=production
```

### Vercel (Frontend):
```env
NEXT_PUBLIC_API_URL=https://e-commerce-website-for-puma.onrender.com/api
```

## Success Indicators

You'll know everything works when:
- ✅ Homepage loads with products
- ✅ Category pages show products
- ✅ No errors in browser console
- ✅ Cart and wishlist work
- ✅ Login/register work
- ✅ Orders can be placed
