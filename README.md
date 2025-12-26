# 🐆 PUMA E-Commerce Platform

A modern, full-stack e-commerce web application for PUMA sportswear, footwear, and lifestyle products. Built with Next.js, TypeScript, Node.js, Express, and MongoDB.

![PUMA Logo](https://img.shields.io/badge/PUMA-Forever%20Faster-FF0000?style=for-the-badge&logo=puma&logoColor=white)

## 🚀 Quick Start

### Local Development

**1. Start MongoDB**
```bash
net start MongoDB
```

**2. Backend Setup**
```bash
cd backend
npm install
node seed.js      # Load sample data
npm run dev
```

**3. Frontend Setup** (new terminal)
```bash
cd frontend
npm install
npm run dev
```

Visit: http://localhost:3000

---

## 🌐 Deploy to Production

### **Option 1: Vercel (Frontend) + Render (Backend)** ⭐ RECOMMENDED

#### Step 1: Deploy Backend to Render
1. Go to https://render.com and sign in with GitHub
2. Click **New +** → **Web Service**
3. Connect repo: `sonu93418/E-Commerce-Website-for-Puma`
4. Settings:
   - **Name:** `puma-backend`
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/puma
   JWT_SECRET=your_random_secret_key_here
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://your-app.vercel.app
   ```
6. Deploy and copy backend URL (e.g., `https://puma-backend.onrender.com`)

#### Step 2: Deploy Frontend to Vercel
1. Go to https://vercel.com and sign in with GitHub
2. Click **New Project** → Import your repository
3. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Next.js
4. Add Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://puma-backend.onrender.com/api
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```
5. Deploy!

**📖 Detailed guides:** See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)

---

## ✨ Features

### 🎨 Design & UI
- Dark/Light theme toggle with Puma brand colors
- Glassmorphism cards & modern UI effects
- Fully responsive design
- Smooth animations (Framer Motion + GSAP)

### 🛍️ E-Commerce Functionality
- Product catalog with advanced filtering
- Shopping cart with real-time updates
- User authentication (JWT)
- Secure checkout with Stripe integration
- Order tracking & history
- Wishlist management
- Product reviews

### ⚡ Technical Features
- Next.js 14 with App Router
- Server-side rendering (SSR)
- Optimized images & fast loading
- TypeScript for type safety
- RESTful API with Express.js
- MongoDB database

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 14 (React 18)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion + GSAP
- **State Management:** Zustand
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Payments:** Stripe

## 📁 Project Structure

```
E-Commerce/
├── backend/
│   ├── models/           # Mongoose schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Cart.js
│   ├── routes/           # API routes
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   ├── user.js
│   │   └── wishlist.js
│   ├── middleware/       # Custom middleware
│   │   └── auth.js
│   ├── server.js         # Express server
│   ├── seed.js          # Database seeder
│   └── package.json
│
└── frontend/
    ├── app/              # Next.js app directory
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── login/
    │   └── register/
    ├── components/       # React components
    │   ├── layout/
    │   │   ├── Navbar.tsx
    │   │   └── Footer.tsx
    │   ├── home/
    │   │   ├── Hero.tsx
    │   │   ├── FeaturedProducts.tsx
    │   │   ├── CategoryShowcase.tsx
    │   │   └── BrandStory.tsx
    │   └── products/
    │       └── ProductCard.tsx
    ├── store/            # Zustand stores
    │   ├── authStore.ts
    │   ├── cartStore.ts
    │   ├── themeStore.ts
    │   └── wishlistStore.ts
    ├── lib/              # Utilities
    │   ├── api.ts
    │   └── utils.ts
    └── package.json
```

## 🧪 Test Credentials

After running `node seed.js`, use these accounts:

| Email | Password | Role |
|-------|----------|------|
| admin@puma.com | admin123 | Admin |
| test@example.com | test123 | User |

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products/:id/reviews` - Add product review

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove item from cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders/create-payment-intent` - Create Stripe payment

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `POST /api/user/addresses` - Add address
- `PUT /api/user/addresses/:id` - Update address

### Wishlist
- `GET /api/wishlist` - Get wishlist
- `POST /api/wishlist/:productId` - Add to wishlist
- `DELETE /api/wishlist/:productId` - Remove from wishlist

## 🎨 Color Scheme

- **Primary Red:** #FF0000
- **Black:** #000000
- **White:** #FFFFFF
- **Gray Scale:** Custom shades for dark/light modes

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected API routes
- Environment variable configuration
- CORS enabled
- Input validation

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

## 🧪 Testing Credentials

After running the seed script:

**Admin Account:**
- Email: `admin@puma.com`
- Password: `admin123`

**Test User:**
- Email: `test@example.com`
- Password: `test123`

## 🚀 Deployment

### Backend
1. Set up MongoDB Atlas or your preferred database
2. Deploy to Heroku, Railway, or DigitalOcean
3. Set environment variables in hosting platform
4. Update CORS settings for production domain

### Frontend
1. Update API URL in `.env.local`
2. Build the application: `npm run build`
3. Deploy to Vercel, Netlify, or your preferred platform

## 📄 License

This project is created for educational and demonstration purposes.

## 🤝 Contributing

This is a demo project. Feel free to fork and customize for your needs.

## 📧 Contact

For questions or support, create an issue in the repository.

---

**Made with ❤️ and ⚡ by the PUMA Development Team**

*Forever Faster* 🐆
# E-Commerce-Website-for-Puma
