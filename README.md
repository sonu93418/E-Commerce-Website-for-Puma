# 🐆 PUMA E-Commerce Platform

A modern, high-performance e-commerce web application for PUMA sportswear, footwear, and lifestyle products. Built with React, Next.js, Node.js, and MongoDB.

![PUMA Logo](https://img.shields.io/badge/PUMA-Forever%20Faster-FF0000?style=for-the-badge&logo=puma&logoColor=white)

## ✨ Features

### 🎨 Design & UI
- **Dark/Light Theme Toggle** - Seamless theme switching with Puma brand colors
- **Glassmorphism Cards** - Modern, premium UI with backdrop blur effects
- **Fully Responsive** - Optimized for mobile, tablet, and desktop
- **Smooth Animations** - Framer Motion & GSAP animations throughout

### 🧩 Core Functionality
- **Hero Section** - Immersive full-screen banner with animated elements
- **Product Catalog** - Advanced filtering by category, price, color, and size
- **Product Details** - 360° view capability, zoom-on-hover, size guide, reviews
- **Shopping Cart** - Real-time updates with smooth animations
- **Secure Checkout** - Multi-step checkout with Stripe payment integration
- **User Dashboard** - Order history, wishlist, address management
- **Authentication** - JWT-based secure authentication system

### ⚡ Technical Features
- **Fast Loading** - Optimized images with Next.js Image component
- **SEO Optimized** - Server-side rendering with Next.js
- **PWA Support** - Progressive Web App capabilities
- **Accessible** - ARIA labels and keyboard navigation
- **Real-time Updates** - Live stock status and cart synchronization

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 14 (React 18)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion + GSAP
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Icons:** React Icons
- **Forms:** React Hook Form
- **Notifications:** React Hot Toast

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Payment Processing:** Stripe
- **File Upload:** Multer + Cloudinary
- **Email:** Nodemailer

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

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB installed and running
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update the values:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/puma-ecommerce
   JWT_SECRET=your_secret_key
   STRIPE_SECRET_KEY=your_stripe_key
   ```

4. **Seed the database:**
   ```bash
   npm run seed
   ```
   This creates sample products and test users:
   - Admin: `admin@puma.com` / `admin123`
   - User: `test@example.com` / `test123`

5. **Start the server:**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Application runs on `http://localhost:3000`

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
