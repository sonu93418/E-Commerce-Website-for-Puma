# 🚀 Quick Start Guide - PUMA E-Commerce

Get your PUMA e-commerce platform up and running in minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 18+ installed (`node --version`)
- ✅ MongoDB installed and running
- ✅ A code editor (VS Code recommended)

## Step 1: Install Backend Dependencies

Open PowerShell/Terminal in the project directory:

```powershell
cd backend
npm install
```

## Step 2: Setup Environment Variables

Create `.env` file in the backend directory (copy from `.env.example`):

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/puma-ecommerce
JWT_SECRET=puma_ecommerce_secret_key_2025
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Step 3: Seed Sample Data

Load sample products and test users:

```powershell
node seed.js
```

You should see:
```
✅ Connected to MongoDB
🗑️  Cleared existing data
✅ Added sample products
✅ Created admin user (email: admin@puma.com, password: admin123)
✅ Created test user (email: test@example.com, password: test123)
🎉 Database seeded successfully!
```

## Step 4: Start Backend Server

```powershell
npm run dev
```

You should see:
```
🚀 Server running on port 5000
🌍 Environment: development
✅ MongoDB connected successfully
```

Leave this terminal running!

## Step 5: Install Frontend Dependencies

Open a NEW PowerShell/Terminal window:

```powershell
cd frontend
npm install
```

## Step 6: Setup Frontend Environment

The `.env.local` file is already created with:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Step 7: Start Frontend Development Server

```powershell
npm run dev
```

You should see:
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
✓ Ready in 2.5s
```

## Step 8: Access the Application

Open your browser and visit:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api/health

## Test Accounts

### Admin Account
- **Email:** admin@puma.com
- **Password:** admin123
- **Role:** Administrator with full access

### Test User Account
- **Email:** test@example.com
- **Password:** test123
- **Role:** Regular customer

## What You Can Do Now

1. **Browse Products** - View the featured products on the homepage
2. **Register/Login** - Create a new account or use test credentials
3. **Add to Cart** - Click products and add them to your cart
4. **Toggle Theme** - Switch between light and dark modes
5. **View Profile** - Access your user dashboard (after login)
6. **Place Orders** - Complete the checkout process

## Common Issues & Solutions

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running:
```powershell
# On Windows
net start MongoDB

# Or start MongoDB service from Services
```

### Port Already in Use
```
Error: Port 5000 is already in use
```
**Solution:** Change the PORT in backend/.env or stop the process using that port

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution:** Run `npm install` again in the backend or frontend directory

### Frontend Can't Connect to Backend
**Solution:** 
1. Make sure backend is running on port 5000
2. Check NEXT_PUBLIC_API_URL in frontend/.env.local
3. Verify CORS settings in backend/server.js

## Next Steps

Explore the codebase:
- 📁 `backend/routes/` - API endpoints
- 📁 `backend/models/` - Database schemas
- 📁 `frontend/components/` - React components
- 📁 `frontend/app/` - Next.js pages
- 📁 `frontend/store/` - State management

## Development Tips

1. **Hot Reload:** Both frontend and backend support hot reloading
2. **API Testing:** Use Postman or Thunder Client for API testing
3. **Database Viewer:** Use MongoDB Compass to view your database
4. **Debugging:** Check browser console and terminal for errors

## Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Review API endpoints in the README
- Check the code comments for implementation details

---

**Happy Coding! 🐆 Forever Faster ⚡**
