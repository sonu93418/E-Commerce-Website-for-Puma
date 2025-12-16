# 🗂️ Project File Structure - Complete Reference

## 📊 Visual Overview

```
C:\E-Commerce\
│
├── 📚 DOCUMENTATION FILES
│   ├── 📄 README.md                    ⭐ Full project documentation
│   ├── 🚀 START-HERE.md                ⭐ Quick start guide (READ FIRST!)
│   ├── ⚡ QUICKSTART.md                Quick reference
│   ├── 📦 INSTALLATION.md              Detailed setup instructions
│   ├── 📊 PROJECT-SUMMARY.md           Complete feature overview
│   └── 🗂️ FILE-STRUCTURE.md            This file
│
├── 🔧 BACKEND/ (Node.js + Express + MongoDB)
│   │
│   ├── 📁 models/                      Database Schemas
│   │   ├── User.js                     👤 User model (auth, profile, addresses)
│   │   ├── Product.js                  🛍️ Product model (details, variants, reviews)
│   │   ├── Order.js                    📦 Order model (items, shipping, payment)
│   │   └── Cart.js                     🛒 Shopping cart model
│   │
│   ├── 📁 routes/                      API Endpoints
│   │   ├── auth.js                     🔐 Auth (register, login, me)
│   │   ├── products.js                 📦 Products (CRUD, filters, reviews)
│   │   ├── cart.js                     🛒 Cart (add, update, remove)
│   │   ├── orders.js                   💰 Orders (create, track, payment)
│   │   ├── user.js                     👤 User (profile, addresses)
│   │   └── wishlist.js                 ❤️ Wishlist (add, remove, view)
│   │
│   ├── 📁 middleware/                  Request Handlers
│   │   └── auth.js                     🔒 JWT protection & role checking
│   │
│   ├── 📄 server.js                    ⚙️ Express app configuration
│   ├── 🌱 seed.js                      Sample data loader
│   ├── 📦 package.json                 Dependencies & scripts
│   ├── 🔧 .env                         Environment variables
│   ├── 📋 .env.example                 Environment template
│   └── 🚫 .gitignore                   Git ignore rules
│
└── 🎨 FRONTEND/ (Next.js + React + TypeScript)
    │
    ├── 📁 app/                         Next.js App Router
    │   ├── layout.tsx                  🏗️ Root layout (Navbar, Footer, Toaster)
    │   ├── page.tsx                    🏠 Homepage
    │   ├── globals.css                 🎨 Global styles & animations
    │   │
    │   ├── 📁 login/                   Login Page
    │   │   └── page.tsx                🔐 Login form & logic
    │   │
    │   └── 📁 register/                Registration Page
    │       └── page.tsx                📝 Signup form & logic
    │
    ├── 📁 components/                  React Components
    │   │
    │   ├── 📁 layout/                  Layout Components
    │   │   ├── Navbar.tsx              🧭 Navigation bar (responsive, animated)
    │   │   └── Footer.tsx              🦶 Footer with links & newsletter
    │   │
    │   ├── 📁 home/                    Homepage Components
    │   │   ├── Hero.tsx                🎬 Animated hero section
    │   │   ├── FeaturedProducts.tsx    ⭐ Featured products grid
    │   │   ├── CategoryShowcase.tsx    📂 Category cards
    │   │   └── BrandStory.tsx          📖 Brand information
    │   │
    │   └── 📁 products/                Product Components
    │       └── ProductCard.tsx         🎴 Product card with actions
    │
    ├── 📁 store/                       State Management (Zustand)
    │   ├── authStore.ts                👤 User authentication state
    │   ├── cartStore.ts                🛒 Shopping cart state
    │   ├── themeStore.ts               🌓 Dark/light theme state
    │   └── wishlistStore.ts            ❤️ Wishlist state
    │
    ├── 📁 lib/                         Utilities & Config
    │   ├── api.ts                      🔌 Axios configuration
    │   └── utils.ts                    🛠️ Helper functions
    │
    ├── 📄 tsconfig.json                TypeScript configuration
    ├── 📄 next.config.js               Next.js configuration
    ├── 📄 tailwind.config.js           Tailwind CSS configuration
    ├── 📄 postcss.config.js            PostCSS configuration
    ├── 📦 package.json                 Dependencies & scripts
    ├── 🔧 .env.local                   Environment variables
    └── 🚫 .gitignore                   Git ignore rules
```

## 📋 File Categories

### 📚 Documentation (6 files)
Essential reading materials for setup and understanding

### 🔧 Backend (15 files)
- 4 Database Models
- 6 API Route Files
- 1 Middleware
- 1 Server Configuration
- 1 Seeder Script
- 2 Configuration Files

### 🎨 Frontend (20+ files)
- 3 App Pages
- 2 Layout Components
- 4 Home Components
- 1 Product Component
- 4 Store Files
- 2 Utility Files
- 6 Configuration Files

## 🎯 Key Files Explained

### Backend Core Files

**server.js** - The heart of the backend
- Express app setup
- MongoDB connection
- Route mounting
- Error handling
- CORS configuration

**seed.js** - Database initializer
- Clears existing data
- Creates sample products
- Creates test users
- Populates database

**models/User.js** - User data structure
- Authentication fields
- Profile information
- Address management
- Password hashing
- Wishlist references

**models/Product.js** - Product data structure
- Product details
- Images and variants
- Stock management
- Reviews and ratings
- Search indexing

**routes/auth.js** - Authentication logic
- User registration
- User login
- Token generation
- Current user retrieval

**middleware/auth.js** - Security layer
- JWT verification
- User authentication
- Admin authorization
- Token validation

### Frontend Core Files

**app/layout.tsx** - Root layout
- HTML structure
- Font configuration
- Navbar placement
- Footer placement
- Toast notifications

**app/page.tsx** - Homepage
- Hero section
- Featured products
- Category showcase
- Brand story
- Theme initialization

**components/layout/Navbar.tsx** - Navigation
- Logo and branding
- Navigation links
- Search functionality
- Theme toggle
- Cart/Wishlist indicators
- User menu
- Mobile responsive menu

**components/home/Hero.tsx** - Hero section
- Animated background
- Parallax effects
- Call-to-action buttons
- Stats display
- Scroll indicator

**store/authStore.ts** - Auth state
- User information
- Authentication status
- Login/logout functions
- Token management
- Persistent storage

**store/cartStore.ts** - Cart state
- Cart items
- Add/remove/update items
- Price calculations
- Persistent storage

**lib/api.ts** - API client
- Axios instance
- Request interceptors
- Response interceptors
- Token injection
- Error handling

**globals.css** - Global styles
- Tailwind directives
- Custom animations
- Glassmorphism effects
- Scrollbar styling
- Utility classes

**tailwind.config.js** - Tailwind setup
- Custom colors (PUMA branding)
- Custom fonts
- Animation keyframes
- Custom shadows
- Plugin configuration

## 📦 Dependencies Overview

### Backend Dependencies (12 packages)
```json
{
  "express": "Web framework",
  "mongoose": "MongoDB ODM",
  "bcryptjs": "Password hashing",
  "jsonwebtoken": "JWT authentication",
  "dotenv": "Environment variables",
  "cors": "Cross-origin requests",
  "express-validator": "Input validation",
  "multer": "File uploads",
  "cloudinary": "Image hosting",
  "stripe": "Payment processing",
  "nodemailer": "Email sending",
  "nodemon": "Development auto-restart"
}
```

### Frontend Dependencies (15+ packages)
```json
{
  "next": "React framework",
  "react": "UI library",
  "typescript": "Type safety",
  "tailwindcss": "Utility CSS",
  "framer-motion": "Animations",
  "gsap": "Advanced animations",
  "zustand": "State management",
  "axios": "HTTP client",
  "react-icons": "Icon library",
  "react-hot-toast": "Notifications",
  "@stripe/stripe-js": "Stripe integration",
  "react-hook-form": "Form handling",
  "swiper": "Carousel/slider",
  "sharp": "Image optimization"
}
```

## 🔍 File Relationships

### Authentication Flow
```
Frontend (Login Page)
    ↓
lib/api.ts (POST request)
    ↓
Backend routes/auth.js (Login endpoint)
    ↓
models/User.js (Find user & verify)
    ↓
middleware/auth.js (Generate JWT)
    ↓
store/authStore.ts (Save token & user)
```

### Product Display Flow
```
Frontend (Homepage)
    ↓
components/home/FeaturedProducts.tsx
    ↓
lib/api.ts (GET request)
    ↓
Backend routes/products.js
    ↓
models/Product.js (Query database)
    ↓
components/products/ProductCard.tsx (Display)
```

### Cart Flow
```
User clicks "Add to Cart"
    ↓
components/products/ProductCard.tsx
    ↓
store/cartStore.ts (Update local state)
    ↓
lib/api.ts (POST to backend)
    ↓
Backend routes/cart.js
    ↓
models/Cart.js (Save to database)
```

## 🎨 Styling Architecture

### Style Layers
1. **tailwind.config.js** - Design tokens
2. **globals.css** - Base styles & utilities
3. **Component files** - Tailwind classes
4. **Inline animations** - Framer Motion

### Color System
```
Primary: #FF0000 (PUMA Red)
Black: #000000
White: #FFFFFF
Grays: 50-900 scale
```

## 🔐 Security Setup

### Password Flow
```
User enters password
    ↓
models/User.js (pre-save hook)
    ↓
bcrypt.hash() (10 rounds)
    ↓
Hashed password stored in DB
```

### Protected Routes
```
Client sends request with token
    ↓
middleware/auth.js (Intercepts)
    ↓
Verifies JWT signature
    ↓
Attaches user to request
    ↓
Route handler executes
```

## 📊 Data Flow

### Product Data
```
MongoDB
  ↓
Mongoose Model (Product.js)
  ↓
Express Route (products.js)
  ↓
API Response (JSON)
  ↓
Axios Request (api.ts)
  ↓
React Component
  ↓
UI Display
```

### User Data
```
Registration Form
  ↓
API Request
  ↓
User Model (validation)
  ↓
Password Hashing
  ↓
MongoDB Save
  ↓
JWT Generation
  ↓
Zustand Store
  ↓
LocalStorage Persist
```

## 📝 Configuration Files

### Environment Variables
- **Backend .env** - Server, DB, API keys
- **Frontend .env.local** - API URL, public keys

### Build Configurations
- **package.json** - Scripts & dependencies
- **tsconfig.json** - TypeScript compiler options
- **next.config.js** - Next.js settings
- **tailwind.config.js** - Tailwind customization
- **postcss.config.js** - CSS processing

## 🎯 Entry Points

### Development
- **Backend:** `npm run dev` → `nodemon server.js`
- **Frontend:** `npm run dev` → Next.js dev server

### Production
- **Backend:** `npm start` → `node server.js`
- **Frontend:** `npm run build` → `next build`

## 📈 Growth Path

To extend this structure:
1. Add more pages in `app/`
2. Create new components in `components/`
3. Add API routes in `backend/routes/`
4. Define models in `backend/models/`
5. Expand stores in `store/`

---

**This structure provides a solid foundation for a scalable e-commerce platform! 🚀**

*Navigate to [START-HERE.md](START-HERE.md) to begin!*
