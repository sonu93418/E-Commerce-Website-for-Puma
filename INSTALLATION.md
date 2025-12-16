# 🎯 Installation & Setup Instructions

Follow these simple steps to get the PUMA E-Commerce platform running on your machine.

## 📋 Prerequisites

Make sure you have the following installed:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **MongoDB** (Community Edition)
   - Download from: https://www.mongodb.com/try/download/community
   - Make sure MongoDB service is running

3. **Git** (optional, for cloning)
   - Download from: https://git-scm.com/

## 🚀 Installation Steps

### Step 1: Navigate to Project Directory

Open PowerShell or Command Prompt and navigate to the E-Commerce folder:

```powershell
cd c:\E-Commerce
```

### Step 2: Install Backend Dependencies

```powershell
cd backend
npm install
```

Wait for all packages to install. This may take a few minutes.

### Step 3: Seed the Database

Make sure MongoDB is running, then seed sample data:

```powershell
node seed.js
```

Expected output:
```
✅ Connected to MongoDB
🗑️  Cleared existing data
✅ Added sample products
✅ Created admin user
✅ Created test user
🎉 Database seeded successfully!
```

### Step 4: Install Frontend Dependencies

Open a NEW terminal/PowerShell window:

```powershell
cd c:\E-Commerce\frontend
npm install
```

## ▶️ Running the Application

You need to run BOTH backend and frontend servers.

### Terminal 1 - Backend Server

```powershell
cd c:\E-Commerce\backend
npm run dev
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB connected successfully
```

**Keep this terminal running!**

### Terminal 2 - Frontend Server

In a NEW terminal:

```powershell
cd c:\E-Commerce\frontend
npm run dev
```

You should see:
```
▲ Next.js 14.0.4
- Local: http://localhost:3000
✓ Ready in 2.5s
```

**Keep this terminal running too!**

## 🌐 Access the Application

Once both servers are running:

1. Open your web browser
2. Go to: **http://localhost:3000**
3. You should see the PUMA homepage with the hero section!

## 🔐 Test Login Credentials

Use these accounts to test the application:

### Admin Account
```
Email: admin@puma.com
Password: admin123
```

### Regular User Account
```
Email: test@example.com  
Password: test123
```

## 🎨 Features to Test

1. **Homepage**
   - View hero section with animations
   - Browse featured products
   - See category showcase

2. **Authentication**
   - Register a new account
   - Login with test credentials
   - View your profile

3. **Shopping**
   - Browse products
   - Add items to cart
   - Add items to wishlist
   - View product details

4. **Theme**
   - Toggle between light and dark mode
   - Notice the Puma branding colors

5. **User Dashboard**
   - View orders
   - Manage addresses
   - Update profile

## 🛑 Stopping the Servers

To stop the servers:
1. Go to each terminal window
2. Press `Ctrl + C`
3. Type `Y` when asked to terminate

## 🔄 Restarting

To start again later:

1. Make sure MongoDB service is running
2. Start backend: `cd c:\E-Commerce\backend && npm run dev`
3. Start frontend: `cd c:\E-Commerce\frontend && npm run dev`

## ⚙️ Optional: MongoDB Service

### Windows

To check if MongoDB is running:
```powershell
net start | findstr -i mongo
```

To start MongoDB service:
```powershell
net start MongoDB
```

To stop MongoDB service:
```powershell
net stop MongoDB
```

## 📝 Environment Variables

Both backend and frontend already have `.env` files configured for local development:

### Backend (.env)
- Port: 5000
- MongoDB: localhost:27017
- JWT Secret: Pre-configured

### Frontend (.env.local)
- API URL: http://localhost:5000/api
- Already configured

## 🐛 Troubleshooting

### Issue: Cannot connect to MongoDB
**Solution:**
```powershell
# Check if MongoDB is running
net start | findstr -i mongo

# If not running, start it
net start MongoDB
```

### Issue: Port 5000 already in use
**Solution:** Another app is using port 5000. Either:
1. Close the other app
2. Or change PORT in `backend/.env` to 5001

### Issue: Port 3000 already in use  
**Solution:** Run frontend on different port:
```powershell
npm run dev -- -p 3001
```

### Issue: "npm" not recognized
**Solution:** Node.js is not installed or not in PATH
1. Install Node.js from nodejs.org
2. Restart your terminal
3. Verify: `node --version`

### Issue: Modules not found
**Solution:** Dependencies not installed
```powershell
# In backend directory
npm install

# In frontend directory  
npm install
```

## 📚 Additional Resources

- **Main README:** See `README.md` for full documentation
- **Quick Start:** See `QUICKSTART.md` for rapid setup
- **API Documentation:** Check backend routes in README.md

## 🆘 Need Help?

If you encounter issues:
1. Check the error message carefully
2. Verify MongoDB is running
3. Ensure both servers are running
4. Check the terminal for error logs
5. Try clearing node_modules and reinstalling:
   ```powershell
   rm -r node_modules
   npm install
   ```

## ✅ Verification Checklist

Before considering setup complete, verify:

- [ ] MongoDB is running
- [ ] Backend server starts without errors (port 5000)
- [ ] Frontend server starts without errors (port 3000)
- [ ] Homepage loads at http://localhost:3000
- [ ] You can see products on the homepage
- [ ] You can toggle dark/light theme
- [ ] You can login with test credentials

## 🎉 Success!

If all checks pass, you're ready to explore the PUMA E-Commerce platform!

---

**Built with ❤️ | PUMA - Forever Faster 🐆⚡**
