import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();

const sampleProducts = [
  // Men's Shoes
  {
    name: 'PUMA RS-X³ Puzzle',
    description: 'The RS-X³ Puzzle reinvents our chunky RS heritage with attitude and bold details. This version features a mixed-material upper in suede and leather, TPU cage elements, and a bold, eye-catching colorway.',
    price: 110,
    originalPrice: 140,
    discount: 21,
    category: 'Shoes',
    subCategory: 'Sneakers',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', alt: 'RS-X³ Puzzle' }
    ],
    colors: [
      { name: 'Multi', hex: '#FF0000', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'] }
    ],
    sizes: [
      { size: '7', stock: 10 },
      { size: '8', stock: 15 },
      { size: '9', stock: 20 },
      { size: '10', stock: 12 },
      { size: '11', stock: 8 }
    ],
    totalStock: 65,
    features: ['Mesh and synthetic upper', 'Cushioned midsole', 'Rubber outsole', 'Lace closure'],
    tags: ['sneakers', 'lifestyle', 'chunky', 'retro'],
    rating: { average: 4.5, count: 120 },
    isFeatured: true,
    isNewArrival: true,
  },
  {
    name: 'Speed Cat Classic',
    description: 'Inspired by racing heritage, the Speed Cat delivers sleek style with premium leather construction.',
    price: 95,
    originalPrice: 120,
    category: 'Shoes',
    subCategory: 'Sneakers',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800', alt: 'Speed Cat Classic' }
    ],
    colors: [
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800'] }
    ],
    sizes: [
      { size: '8', stock: 12 },
      { size: '9', stock: 18 },
      { size: '10', stock: 15 },
      { size: '11', stock: 10 }
    ],
    totalStock: 55,
    features: ['Premium leather', 'Racing-inspired design', 'Comfortable fit'],
    tags: ['sneakers', 'casual', 'racing'],
    rating: { average: 4.7, count: 89 },
    isFeatured: true,
  },
  {
    name: 'Suede Classic XXI',
    description: 'An icon since 1968, the Suede Classic returns with premium suede and timeless style.',
    price: 75,
    category: 'Shoes',
    subCategory: 'Sneakers',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800', alt: 'Suede Classic' }
    ],
    colors: [
      { name: 'Navy', hex: '#000080', images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800'] }
    ],
    sizes: [
      { size: '7', stock: 20 },
      { size: '8', stock: 25 },
      { size: '9', stock: 30 },
      { size: '10', stock: 20 }
    ],
    totalStock: 95,
    features: ['Premium suede upper', 'Classic low-top silhouette', 'Rubber outsole'],
    tags: ['sneakers', 'classic', 'iconic'],
    rating: { average: 4.8, count: 245 },
    isBestseller: true,
  },
  // Men's Apparel
  {
    name: 'Essential Logo Tee',
    description: 'Simple yet bold. This essential tee features the iconic PUMA Cat logo on the chest. Made from soft cotton, it\'s perfect for everyday wear.',
    price: 35,
    category: 'Apparel',
    subCategory: 'T-Shirts',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', alt: 'Essential Logo Tee' }
    ],
    colors: [
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'] },
      { name: 'White', hex: '#FFFFFF', images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'] }
    ],
    sizes: [
      { size: 'S', stock: 20 },
      { size: 'M', stock: 30 },
      { size: 'L', stock: 25 },
      { size: 'XL', stock: 15 }
    ],
    totalStock: 90,
    features: ['100% Cotton', 'Crew neck', 'Regular fit', 'PUMA Cat logo'],
    tags: ['tshirt', 'casual', 'logo', 'essential'],
    rating: { average: 4.8, count: 89 },
    isFeatured: true,
  },
  {
    name: 'Performance Training Hoodie',
    description: 'Stay warm during workouts with this technical hoodie featuring moisture-wicking fabric.',
    price: 65,
    originalPrice: 85,
    category: 'Apparel',
    subCategory: 'Hoodies',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800', alt: 'Training Hoodie' }
    ],
    colors: [
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800'] }
    ],
    sizes: [
      { size: 'M', stock: 15 },
      { size: 'L', stock: 20 },
      { size: 'XL', stock: 12 }
    ],
    totalStock: 47,
    features: ['Moisture-wicking', 'Adjustable hood', 'Zippered pockets'],
    tags: ['hoodie', 'training', 'performance'],
    rating: { average: 4.6, count: 67 },
    isNewArrival: true,
  },
  {
    name: 'Track Jacket Retro',
    description: 'Classic track jacket with retro styling and modern comfort.',
    price: 80,
    category: 'Apparel',
    subCategory: 'Jackets',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800', alt: 'Track Jacket' }
    ],
    colors: [
      { name: 'Red/Black', hex: '#FF0000', images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800'] }
    ],
    sizes: [
      { size: 'S', stock: 10 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 20 },
      { size: 'XL', stock: 10 }
    ],
    totalStock: 55,
    features: ['Full zip', 'Side pockets', 'Ribbed cuffs'],
    tags: ['jacket', 'retro', 'casual'],
    rating: { average: 4.7, count: 92 },
  },
  // Men's Accessories & Sports
  {
    name: 'Evercat Contender Backpack',
    description: 'Carry everything you need with the Evercat Contender Backpack. Features multiple compartments, padded straps, and durable construction.',
    price: 45,
    category: 'Accessories',
    subCategory: 'Bags',
    gender: 'Unisex',
    images: [
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', alt: 'Backpack' }
    ],
    colors: [
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'] }
    ],
    sizes: [
      { size: 'One Size', stock: 50 }
    ],
    totalStock: 50,
    features: ['Multiple compartments', 'Padded straps', 'Water-resistant', 'Laptop sleeve'],
    tags: ['backpack', 'school', 'travel', 'durable'],
    rating: { average: 4.6, count: 56 },
    isFeatured: true,
  },
  {
    name: 'FUTURE Z 1.3 FG/AG',
    description: 'Engineered for those who shape the game. The FUTURE Z features an adaptive FUZIONFIT+ compression band and Dynamic Motion System outsole.',
    price: 220,
    category: 'Sports',
    subCategory: 'Football',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800', alt: 'Football Boots' }
    ],
    colors: [
      { name: 'Red/Black', hex: '#FF0000', images: ['https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800'] }
    ],
    sizes: [
      { size: '7', stock: 5 },
      { size: '8', stock: 8 },
      { size: '9', stock: 10 },
      { size: '10', stock: 7 },
      { size: '11', stock: 5 }
    ],
    totalStock: 35,
    features: ['FUZIONFIT+ compression band', 'GripControl Pro coating', 'Dynamic Motion System', 'FG/AG outsole'],
    tags: ['football', 'soccer', 'boots', 'performance'],
    rating: { average: 4.9, count: 145 },
    isFeatured: true,
    isBestseller: true,
  },
  {
    name: 'Velocity Nitro Running Shoes',
    description: 'Lightweight running shoes with NITRO foam for superior cushioning and energy return.',
    price: 130,
    category: 'Shoes',
    subCategory: 'Running',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800', alt: 'Running Shoes' }
    ],
    colors: [
      { name: 'Blue/Yellow', hex: '#0000FF', images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800'] }
    ],
    sizes: [
      { size: '8', stock: 12 },
      { size: '9', stock: 15 },
      { size: '10', stock: 18 },
      { size: '11', stock: 10 }
    ],
    totalStock: 55,
    features: ['NITRO foam technology', 'Breathable mesh', 'Lightweight design'],
    tags: ['running', 'performance', 'lightweight'],
    rating: { average: 4.8, count: 178 },
    isNewArrival: true,
  },
];
    ],
    sizes: [
      { size: 'S', stock: 20 },
      { size: 'M', stock: 30 },
      { size: 'L', stock: 25 },
      { size: 'XL', stock: 15 }
    ],
    totalStock: 90,
    features: ['100% Cotton', 'Crew neck', 'Regular fit', 'PUMA Cat logo'],
    tags: ['tshirt', 'casual', 'logo', 'essential'],
    rating: { average: 4.8, count: 89 },
    isFeatured: true,
  },
  {
    name: 'Evercat Contender Backpack',
    description: 'Carry everything you need with the Evercat Contender Backpack. Features multiple compartments, padded straps, and durable construction.',
    price: 45,
    category: 'Accessories',
    subCategory: 'Bags',
    gender: 'Unisex',
    images: [
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', alt: 'Backpack' }
    ],
    colors: [
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'] }
    ],
    sizes: [
      { size: 'One Size', stock: 50 }
    ],
    totalStock: 50,
    features: ['Multiple compartments', 'Padded straps', 'Water-resistant', 'Laptop sleeve'],
    tags: ['backpack', 'school', 'travel', 'durable'],
    rating: { average: 4.6, count: 56 },
    isFeatured: true,
  },
  {
    name: 'FUTURE Z 1.3 FG/AG',
    description: 'Engineered for those who shape the game. The FUTURE Z features an adaptive FUZIONFIT+ compression band and Dynamic Motion System outsole.',
    price: 220,
    category: 'Sports',
    subCategory: 'Football',
    gender: 'Unisex',
    images: [
      { url: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800', alt: 'Football Boots' }
    ],
    colors: [
      { name: 'Red/Black', hex: '#FF0000', images: ['https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800'] }
    ],
    sizes: [
      { size: '7', stock: 5 },
      { size: '8', stock: 8 },
      { size: '9', stock: 10 },
      { size: '10', stock: 7 },
      { size: '11', stock: 5 }
    ],
    totalStock: 35,
    features: ['FUZIONFIT+ compression band', 'GripControl Pro coating', 'Dynamic Motion System', 'FG/AG outsole'],
    tags: ['football', 'soccer', 'boots', 'performance'],
    rating: { average: 4.9, count: 145 },
    isFeatured: true,
    isBestseller: true,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('✅ Added sample products');

    // Create admin user
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@puma.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('✅ Created admin user (email: admin@puma.com, password: admin123)');

    // Create test user
    const testUser = await User.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'test123',
    });
    console.log('✅ Created test user (email: test@example.com, password: test123)');

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
