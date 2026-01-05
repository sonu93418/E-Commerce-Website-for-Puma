# 🐆 PUMA E-Commerce Platform

> A premium, full-stack e-commerce solution designed for PUMA sportswear, footwear, and lifestyle products. Experience seamless shopping with modern UI/UX, secure authentication, and comprehensive order management.

![PUMA Logo](https://img.shields.io/badge/PUMA-Forever%20Faster-FF0000?style=for-the-badge&logo=puma&logoColor=white)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

---

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [License](#-license)
- [Developer](#-developer)

---

## ✨ Features

### 🛍️ Shopping Experience
- **Product Catalog** - Browse 63+ authentic PUMA products across multiple categories
- **Smart Search & Filters** - Find products by category, gender, price range, and ratings
- **Quick Add to Cart** - One-click add to cart functionality on product cards
- **Product Details** - Comprehensive product pages with multiple images, size selection, and color variants
- **Wishlist** - Save favorite items for later purchase

### 👤 User Management
- **Secure Authentication** - JWT-based authentication with password hashing
- **User Profiles** - Manage personal information and shipping addresses
- **Order History** - Track all orders with detailed status updates
- **Order Cancellation** - Cancel orders in pending/processing status

### 🛒 Shopping Cart & Checkout
- **Persistent Cart** - Cart data saved in local storage
- **Real-time Price Calculation** - Automatic tax (18% GST) and shipping calculations
- **Promo Codes** - Support for discount codes (e.g., PUMA20 for 20% off)
- **Secure Checkout** - Complete checkout flow with shipping and payment information

### 💰 Pricing & Currency
- **Indian Market** - All prices in INR (₹) optimized for Indian customers
- **Dynamic Pricing** - Original price, discounted price, and savings display
- **Free Shipping** - Free delivery on orders above ₹200,000

### 🎨 Design & UX
- **Responsive Design** - Fully responsive across mobile, tablet, and desktop
- **Dark Mode** - Elegant dark theme for comfortable browsing
- **Smooth Animations** - Framer Motion animations for delightful interactions
- **Modern UI** - Clean, intuitive interface following PUMA brand guidelines

### 🔧 Technical Features
- **Server-Side Rendering** - Next.js App Router for optimal performance
- **State Management** - Zustand for efficient global state
- **Type Safety** - Full TypeScript implementation
- **API Integration** - RESTful API with proper error handling
- **Database** - MongoDB with Mongoose ODM

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14.2 (React 18, App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast
- **Icons:** React Icons

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT & bcrypt
- **Payment:** Stripe Integration
- **Validation:** Express Validator
- **Security:** Helmet, CORS, Rate Limiting

### DevOps & Tools
- **Version Control:** Git & GitHub
- **Package Manager:** npm
- **Code Quality:** ESLint, Prettier
- **Deployment:** Vercel (Frontend), Render/Railway (Backend)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB installed and running
- Git for version control
- npm or yarn package manager

### Local Development Setup

**1. Clone the Repository**
```bash
git clone https://github.com/sonu93418/E-Commerce-Website-for-Puma.git
cd E-Commerce-Website-for-Puma
```

**2. Start MongoDB**
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

**3. Backend Setup**
```bash
cd backend
npm install

# Create .env file with required variables (see Environment Variables section)

# Seed the database with sample data
node seed.js

# Start the development server
npm run dev
```

Backend will run on: http://localhost:5000

**4. Frontend Setup** (Open new terminal)
```bash
cd frontend
npm install

# Create .env.local file with required variables

# Start the development server
npm run dev
```

Frontend will run on: http://localhost:3000

**5. Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

---

## 📁 Project Structure

```
E-Commerce-Website-for-Puma/
│
├── backend/
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Product.js           # Product schema
│   │   ├── Order.js             # Order schema
│   │   └── Cart.js              # Cart schema
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── products.js          # Product routes
│   │   ├── cart.js              # Cart routes
│   │   ├── orders.js            # Order routes
│   │   ├── user.js              # User profile routes
│   │   └── wishlist.js          # Wishlist routes
│   ├── seed.js                  # Database seeding script
│   ├── convertToINR.js          # Currency conversion utility
│   ├── enableAllProducts.js     # Stock management script
│   ├── server.js                # Express server entry point
│   └── package.json
│
└── frontend/
    ├── app/                     # Next.js App Router
    │   ├── layout.tsx           # Root layout
    │   ├── page.tsx             # Home page
    │   ├── login/
    │   │   └── page.tsx         # Login page
    │   ├── register/
    │   │   └── page.tsx         # Registration page
    │   ├── products/
    │   │   ├── page.tsx         # Products listing
    │   │   └── [id]/
    │   │       └── page.tsx     # Product detail page
    │   ├── cart/
    │   │   └── page.tsx         # Shopping cart
    │   ├── checkout/
    │   │   └── page.tsx         # Checkout page
    │   ├── men/
    │   │   └── page.tsx         # Men's section
    │   ├── women/
    │   │   └── page.tsx         # Women's section
    │   ├── kids/
    │   │   └── page.tsx         # Kids' section
    │   ├── sports/
    │   │   └── page.tsx         # Sports section
    │   ├── wishlist/
    │   │   └── page.tsx         # Wishlist page
    │   └── account/
    │       └── orders/
    │           ├── page.tsx     # Orders list
    │           └── [id]/
    │               └── page.tsx # Order details
    ├── components/              # React components
    │   ├── layout/
    │   │   ├── Navbar.tsx       # Navigation bar
    │   │   └── Footer.tsx       # Footer component
    │   ├── home/
    │   │   ├── Hero.tsx         # Hero section
    │   │   ├── FeaturedProducts.tsx
    │   │   ├── CategoryShowcase.tsx
    │   │   ├── BrandStory.tsx
    │   │   └── PromoPoster.tsx
    │   └── products/
    │       └── ProductCard.tsx  # Product card component
    ├── store/                   # Zustand state management
    │   ├── authStore.ts         # Authentication state
    │   ├── cartStore.ts         # Shopping cart state
    │   ├── themeStore.ts        # Theme state (dark/light)
    │   └── wishlistStore.ts     # Wishlist state
    ├── lib/                     # Utilities
    │   ├── api.ts               # Axios API configuration
    │   └── utils.ts             # Helper functions
    └── package.json
```

---

## 📚 API Documentation

### Authentication

#### Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Products

#### Get All Products
```http
GET /api/products?category=Shoes&gender=Men&minPrice=1000&maxPrice=10000
```

#### Get Single Product
```http
GET /api/products/:id
```

#### Get Featured Products
```http
GET /api/products/featured
```

### Cart Management

#### Get User Cart
```http
GET /api/cart
Authorization: Bearer <token>
```

#### Add to Cart
```http
POST /api/cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product_id",
  "quantity": 1,
  "size": "M",
  "color": "Black"
}
```

### Orders

#### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderItems": [...],
  "shippingAddress": {...},
  "paymentMethod": "card"
}
```

#### Get My Orders
```http
GET /api/orders/myorders
Authorization: Bearer <token>
```

#### Cancel Order
```http
PUT /api/orders/:id/cancel
Authorization: Bearer <token>
```

### Wishlist

#### Add to Wishlist
```http
POST /api/wishlist/:productId
Authorization: Bearer <token>
```

#### Remove from Wishlist
```http
DELETE /api/wishlist/:productId
Authorization: Bearer <token>
```

---

## 🧪 Test Credentials

After running `node seed.js`, use these test accounts:

| Email | Password | Role |
|-------|----------|------|
| admin@puma.com | admin123 | Admin |
| test@example.com | test123 | User |

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

## � Deployment

### Option 1: Vercel (Frontend) + Render (Backend) ⭐ RECOMMENDED

#### Deploy Backend to Render

1. **Create Account & Connect GitHub**
   - Go to [Render.com](https://render.com)
   - Sign up with GitHub
   - Authorize repository access

2. **Create New Web Service**
   - Click **New +** → **Web Service**
   - Select `sonu93418/E-Commerce-Website-for-Puma`

3. **Configure Settings**
   ```
   Name: puma-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   PORT=5000
   NODE_ENV=production
   ```

5. **Deploy** - Click "Create Web Service"
   - Note your backend URL: `https://puma-backend.onrender.com`

#### Deploy Frontend to Vercel

1. **Create Vercel Account**
   - Go to [Vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click **Add New** → **Project**
   - Select `E-Commerce-Website-for-Puma`

3. **Configure Project**
   ```
   Framework Preset: Next.js
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://puma-backend.onrender.com/api
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
   ```

5. **Deploy** - Click "Deploy"
   - Your app: `https://your-app.vercel.app`

### Option 2: Railway (Full Stack)

#### Deploy Backend
```bash
cd backend
railway init
railway up
railway variables set MONGO_URI=your_connection_string
railway variables set JWT_SECRET=your_secret
```

#### Deploy Frontend
```bash
cd frontend
railway init
railway up
railway variables set NEXT_PUBLIC_API_URL=your_backend_url
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
# Database
MONGO_URI=mongodb://127.0.0.1:27017/puma-ecommerce
# or MongoDB Atlas
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/puma-ecommerce

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Stripe Payment
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Server
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local)
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
# or for production
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api

# Stripe Payment
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_public_key
```

---

## 📸 Screenshots

### Home Page
*Modern hero section with featured products and category showcase*

### Product Listing
*Grid layout with filters, sorting, and quick add to cart*

### Product Details
*Comprehensive product page with image gallery, size/color selection*

### Shopping Cart
*Cart management with quantity controls and promo codes*

### Checkout
*Secure checkout with shipping address and payment information*

### Order Tracking
*Complete order history with status tracking and cancellation option*

---

## 🎨 Design System

### Color Palette
- **Primary Red:** `#FF0000` - PUMA brand color
- **Black:** `#000000` - Primary text and accents
- **White:** `#FFFFFF` - Background and contrast
- **Gray Scale:** Custom shades for dark/light modes
  - Gray 50: `#F9FAFB`
  - Gray 900: `#111827`

### Typography
- **Font Family:** System fonts with Tailwind CSS default stack
- **Headings:** Bold, Black weight (font-black)
- **Body:** Regular to Medium weight

### Spacing
- Consistent 4px base unit
- Tailwind CSS spacing scale (1-12, 16, 20, 24, etc.)

---

## 🔒 Security Features

- ✅ **Password Hashing** - bcrypt with salt rounds
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Protected Routes** - Middleware authentication
- ✅ **Environment Variables** - Sensitive data protection
- ✅ **CORS Configuration** - Controlled cross-origin requests
- ✅ **Input Validation** - Request data sanitization
- ✅ **Rate Limiting** - API abuse prevention
- ✅ **Helmet.js** - HTTP headers security

---

## 📱 Responsive Design

### Breakpoints
- **Mobile:** < 640px (sm)
- **Tablet:** 640px - 1024px (md, lg)
- **Desktop:** > 1024px (xl, 2xl)

### Mobile-First Approach
All components are designed mobile-first and scale up to larger screens.

---

## 🚦 Performance Optimization

- **Next.js App Router** - Automatic code splitting
- **Image Optimization** - Next.js Image component
- **Lazy Loading** - Dynamic imports for heavy components
- **State Persistence** - Zustand with local storage
- **API Caching** - Smart data fetching strategies
- **Compression** - Gzip/Brotli compression

---

## 🧪 Testing

### Manual Testing
1. Register a new user
2. Browse products in different categories
3. Add products to cart and wishlist
4. Complete checkout process
5. View order history
6. Test order cancellation

### Test Credentials
After running `node seed.js`:

**Admin Account:**
```
Email: admin@puma.com
Password: admin123
```

**Test User:**
```
Email: test@example.com
Password: test123
```

---

## 🐛 Known Issues & Future Enhancements

### Current Limitations
- Payment integration requires Stripe account setup
- Email notifications not implemented
- Product reviews feature partially implemented

### Planned Features
- [ ] Email confirmation for orders
- [ ] Product review and rating system
- [ ] Advanced product search with filters
- [ ] User profile image upload
- [ ] Order invoice generation (PDF)
- [ ] Multiple payment methods
- [ ] Real-time order tracking
- [ ] Admin dashboard for product management
- [ ] Analytics and reporting

---

## 🤝 Contributing

Contributions are welcome! This project serves as a portfolio piece and learning resource.

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Follow existing code style
- Use TypeScript for type safety
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is open source and available for educational and portfolio purposes.

**Note:** PUMA brand, logo, and trademarks belong to PUMA SE. This is an educational project and not affiliated with or endorsed by PUMA SE.

---

## 📧 Support & Contact

For questions, issues, or suggestions:
- 🐛 **Report Bugs:** [GitHub Issues](https://github.com/sonu93418/E-Commerce-Website-for-Puma/issues)
- 💡 **Feature Requests:** Open an issue with the "enhancement" label
- 📧 **Email:** Create an issue for general inquiries

---

## 🙏 Acknowledgments

- **PUMA** - Brand inspiration and design guidelines
- **Next.js Team** - Excellent React framework
- **MongoDB** - Flexible database solution
- **Vercel** - Seamless deployment platform
- **Open Source Community** - Various libraries and tools

---

## 👨‍💻 Developer

<div align="center">

### **Sonu Kumar Ray**

*Full Stack Developer | MERN Stack Specialist*

[![GitHub](https://img.shields.io/badge/GitHub-sonu93418-181717?style=for-the-badge&logo=github)](https://github.com/sonu93418)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/sonu-kumar-ray)

**Skills:** React.js | Next.js | Node.js | Express.js | MongoDB | TypeScript | Tailwind CSS

**Project Stats:**
- 📦 **Lines of Code:** 15,000+
- 🎨 **Components:** 50+
- 🔌 **API Endpoints:** 25+
- 📱 **Pages:** 15+

</div>

---

<div align="center">

### ⚡ Built with passion and dedication ⚡

**PUMA E-Commerce Platform** © 2026

*Forever Faster* 🐆

[![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Powered by MongoDB](https://img.shields.io/badge/Powered%20by-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com/)

</div>
