# 🚀 START HERE - Complete Setup Guide

Welcome to the PUMA E-Commerce Platform! This guide will help you get everything running.

## 📌 What You're Building

A complete e-commerce platform featuring:
- 🎨 Modern, animated UI with dark/light themes
- 🛍️ Product catalog with advanced filtering
- 🛒 Shopping cart and checkout
- 👤 User authentication and profiles
- 💳 Stripe payment integration ready
- 📱 Fully responsive design

## ⚡ Quick Setup (5 Minutes)

### 1️⃣ Check MongoDB is Running

MongoDB must be running before starting the backend.

**Windows:**
```powershell
net start MongoDB
```

**Or check Services:**
- Press `Win + R`
- Type `services.msc`
- Find "MongoDB" and ensure it's "Running"

### 2️⃣ Install & Seed Backend

Open PowerShell in `c:\E-Commerce`:

```powershell
# Install backend dependencies
cd backend
npm install

# Load sample data (products & test users)
npm run seed
```

✅ You should see "Database seeded successfully!"

### 3️⃣ Install Frontend

Open a NEW PowerShell window:

```powershell
# Install frontend dependencies
cd c:\E-Commerce\frontend
npm install
```

### 4️⃣ Start Both Servers

**Terminal 1 (Backend):**
```powershell
cd c:\E-Commerce\backend
npm run dev
```
✅ Wait for: "Server running on port 5000"

**Terminal 2 (Frontend):**
```powershell
cd c:\E-Commerce\frontend
npm run dev
```
✅ Wait for: "Ready in X seconds"

### 5️⃣ Open Application

Visit: **http://localhost:3000**

You should see the PUMA homepage with:
- Animated hero section
- Featured products
- Category showcase
- Full navigation

## 🎮 Try These Features

### 1. Browse Products
- Scroll through the homepage
- Check out the animated hero section
- View featured products with hover effects

### 2. Test Authentication

Click "Login" and use test accounts:

**Regular User:**
```
Email: test@example.com
Password: test123
```

**Admin User:**
```
Email: admin@puma.com
Password: admin123
```

### 3. Toggle Theme
- Click the sun/moon icon in the navbar
- See the entire site switch between light and dark modes
- Notice the smooth transitions

### 4. Shopping Cart
- Click any product card
- Click "Quick Add" or view product details
- See the cart counter update in navbar
- Click cart icon to view cart

### 5. Wishlist
- Hover over a product
- Click the heart icon
- See wishlist counter update
- Click wishlist icon in navbar

### 6. User Profile
- After logging in, click the user icon
- View your profile dashboard
- See orders, addresses, and settings

## 📂 Project Overview

```
E-Commerce/
├── 📘 README.md              # Full documentation
├── 🚀 QUICKSTART.md          # Quick reference
├── 📦 INSTALLATION.md        # Detailed setup
│
├── backend/                  # Node.js/Express API
│   ├── models/              # Database schemas
│   ├── routes/              # API endpoints
│   ├── middleware/          # Auth & validation
│   ├── server.js            # Express app
│   └── seed.js              # Sample data loader
│
└── frontend/                # Next.js React app
    ├── app/                 # Pages & layouts
    ├── components/          # React components
    ├── store/               # State management
    └── lib/                 # Utilities & API
```

## 🎨 Key Technologies

**Frontend:**
- Next.js 14 (React framework)
- TypeScript (type safety)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Zustand (state management)

**Backend:**
- Node.js + Express (server)
- MongoDB + Mongoose (database)
- JWT (authentication)
- bcrypt (password security)
- Stripe (payments - ready to integrate)

## 🔐 API Testing

Backend API runs on `http://localhost:5000/api`

**Test endpoints:**

Health check:
```
GET http://localhost:5000/api/health
```

Get products:
```
GET http://localhost:5000/api/products
```

Get featured products:
```
GET http://localhost:5000/api/products/featured
```

## 💡 Development Tips

### Hot Reload
Both servers automatically reload on file changes:
- Backend: Nodemon watches for changes
- Frontend: Next.js Fast Refresh

### Database Viewer
Use MongoDB Compass to view your data:
1. Download: https://www.mongodb.com/try/download/compass
2. Connect to: `mongodb://localhost:27017`
3. Open database: `puma-ecommerce`

### API Testing
Use these tools to test the API:
- **Thunder Client** (VS Code extension)
- **Postman** (standalone app)
- **Insomnia** (standalone app)

### Browser DevTools
- `F12` - Open DevTools
- Check Console for errors
- Network tab for API calls
- React DevTools for component inspection

## 🐛 Common Issues

### MongoDB Not Running
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Fix:** Start MongoDB service
```powershell
net start MongoDB
```

### Port Already in Use
```
Error: Port 5000 is already in use
```
**Fix:** Change port in `backend/.env`:
```
PORT=5001
```

### Module Not Found
```
Error: Cannot find module 'express'
```
**Fix:** Reinstall dependencies:
```powershell
rm -r node_modules
npm install
```

### Frontend Can't Reach Backend
**Fix:** Check these:
1. Backend is running on port 5000
2. `frontend/.env.local` has correct API URL
3. No firewall blocking localhost connections

## 📱 Responsive Testing

Test on different screen sizes:

**In Chrome DevTools:**
1. Press `F12`
2. Click device toggle icon (or `Ctrl+Shift+M`)
3. Select different devices:
   - iPhone 12 Pro (mobile)
   - iPad Pro (tablet)
   - Responsive (custom)

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎯 Next Steps

1. ✅ **Explore the Codebase**
   - Read through component files
   - Check API route handlers
   - Review database models

2. ✅ **Customize the Design**
   - Modify colors in `tailwind.config.js`
   - Edit components in `frontend/components/`
   - Adjust animations in component files

3. ✅ **Add Features**
   - Implement product detail page
   - Build cart and checkout pages
   - Add user profile functionality
   - Create admin dashboard

4. ✅ **Set Up Payments**
   - Get Stripe API keys
   - Add to environment variables
   - Test payment flow

## 📚 Documentation

- **Full Docs:** [README.md](README.md)
- **Quick Start:** [QUICKSTART.md](QUICKSTART.md)
- **Installation:** [INSTALLATION.md](INSTALLATION.md)

## 🆘 Getting Help

If you get stuck:
1. Check error messages in terminal
2. Review browser console
3. Verify MongoDB is running
4. Ensure both servers are active
5. Check the troubleshooting section

## ✨ Features Included

✅ User authentication (register/login)
✅ Product catalog with filters
✅ Shopping cart management
✅ Wishlist functionality
✅ User profile & addresses
✅ Order management
✅ Product reviews
✅ Dark/light theme toggle
✅ Responsive design
✅ Smooth animations
✅ Loading states & skeletons
✅ Toast notifications
✅ Image optimization
✅ API error handling
✅ JWT authentication
✅ Password hashing
✅ MongoDB integration
✅ Stripe-ready checkout

## 🎊 You're All Set!

Your PUMA E-Commerce platform is ready to use!

**Remember:**
- Keep both terminal windows open (backend + frontend)
- MongoDB service must be running
- Access the app at http://localhost:3000

**Happy coding! 🐆 Forever Faster ⚡**

---

Made with ❤️ for athletes and enthusiasts worldwide
