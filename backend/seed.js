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
    price: 9299,
    originalPrice: 11999,
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
    price: 7999,
    originalPrice: 9999,
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
    price: 6299,
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
    price: 1299,
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
    price: 4995,
    originalPrice: 6993,
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
    price: 6993,
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
    price: 3493,
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
    price: 17982,
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
    price: 10989,
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
  {
    name: 'Clyde All-Pro Basketball Shoes',
    description: 'Signature basketball shoes designed for elite performance on the court.',
    price: 11988,
    originalPrice: 12987,
    category: 'Shoes',
    subCategory: 'Basketball',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800', alt: 'Basketball Shoes' }
    ],
    colors: [
      { name: 'Black/Red', hex: '#000000', images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800'] }
    ],
    sizes: [
      { size: '8', stock: 10 },
      { size: '9', stock: 15 },
      { size: '10', stock: 12 },
      { size: '11', stock: 8 },
      { size: '12', stock: 5 }
    ],
    totalStock: 50,
    features: ['ProFoam+ cushioning', 'High-top design', 'Enhanced ankle support', 'Durable rubber outsole'],
    tags: ['basketball', 'sports', 'high-top', 'performance'],
    rating: { average: 4.7, count: 134 },
    isFeatured: true,
  },
  {
    name: 'Training Shorts Essential',
    description: 'Lightweight training shorts with moisture-wicking fabric for maximum comfort during workouts.',
    price: 2392,
    category: 'Apparel',
    subCategory: 'Shorts',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800', alt: 'Training Shorts' }
    ],
    colors: [
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800'] },
      { name: 'Gray', hex: '#808080', images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800'] }
    ],
    sizes: [
      { size: 'S', stock: 15 },
      { size: 'M', stock: 25 },
      { size: 'L', stock: 20 },
      { size: 'XL', stock: 10 }
    ],
    totalStock: 70,
    features: ['Moisture-wicking', 'Elastic waistband', 'Side pockets', 'Breathable fabric'],
    tags: ['shorts', 'training', 'gym', 'workout'],
    rating: { average: 4.5, count: 78 },
  },
  {
    name: 'Essentials+ Fleece Pants',
    description: 'Comfortable fleece pants perfect for lounging or casual wear.',
    price: 4491,
    originalPrice: 5994,
    category: 'Apparel',
    subCategory: 'Pants',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800', alt: 'Fleece Pants' }
    ],
    colors: [
      { name: 'Gray', hex: '#808080', images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800'] },
      { name: 'Navy', hex: '#000080', images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800'] }
    ],
    sizes: [
      { size: 'S', stock: 12 },
      { size: 'M', stock: 20 },
      { size: 'L', stock: 18 },
      { size: 'XL', stock: 10 }
    ],
    totalStock: 60,
    features: ['Soft fleece', 'Elastic waistband with drawcord', 'Side pockets', 'Tapered fit'],
    tags: ['pants', 'fleece', 'casual', 'comfort'],
    rating: { average: 4.6, count: 92 },
    isNewArrival: true,
  },
  {
    name: 'Graphic Performance Tee',
    description: 'Bold graphic tee with dryCELL technology to keep you dry and comfortable.',
    price: 2392,
    category: 'Apparel',
    subCategory: 'T-Shirts',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800', alt: 'Graphic Tee' }
    ],
    colors: [
      { name: 'White', hex: '#FFFFFF', images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'] },
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'] },
      { name: 'Red', hex: '#FF0000', images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'] }
    ],
    sizes: [
      { size: 'S', stock: 18 },
      { size: 'M', stock: 28 },
      { size: 'L', stock: 22 },
      { size: 'XL', stock: 12 }
    ],
    totalStock: 80,
    features: ['dryCELL technology', 'Regular fit', 'Graphic print', 'Crew neck'],
    tags: ['tshirt', 'graphic', 'performance', 'casual'],
    rating: { average: 4.4, count: 65 },
  },
  {
    name: 'Training Cap Classic',
    description: 'Adjustable training cap with embroidered PUMA logo.',
    price: 1794,
    category: 'Accessories',
    subCategory: 'Caps',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800', alt: 'Training Cap' }
    ],
    colors: [
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800'] },
      { name: 'Navy', hex: '#000080', images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800'] }
    ],
    sizes: [
      { size: 'One Size', stock: 100 }
    ],
    totalStock: 100,
    features: ['Adjustable strap', 'Embroidered logo', 'Curved brim', 'Breathable fabric'],
    tags: ['cap', 'hat', 'accessories', 'casual'],
    rating: { average: 4.5, count: 156 },
  },
  {
    name: 'Sport Socks 3-Pack',
    description: 'Performance socks designed for all-day comfort with arch support and moisture-wicking properties.',
    price: 1495,
    category: 'Accessories',
    subCategory: 'Socks',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800', alt: 'Sport Socks' }
    ],
    colors: [
      { name: 'White', hex: '#FFFFFF', images: ['https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800'] },
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800'] }
    ],
    sizes: [
      { size: 'M (6-9)', stock: 50 },
      { size: 'L (9-12)', stock: 60 }
    ],
    totalStock: 110,
    features: ['3-pack', 'Moisture-wicking', 'Arch support', 'Cushioned sole'],
    tags: ['socks', 'accessories', 'sports', '3-pack'],
    rating: { average: 4.7, count: 203 },
    isBestseller: true,
  },
  {
    name: 'Gym Duffle Bag',
    description: 'Spacious duffle bag perfect for gym sessions with multiple compartments and water-resistant material.',
    price: 4990,
    originalPrice: 5994,
    category: 'Accessories',
    subCategory: 'Bags',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800', alt: 'Gym Duffle' }
    ],
    colors: [
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800'] }
    ],
    sizes: [
      { size: 'One Size', stock: 35 }
    ],
    totalStock: 35,
    features: ['Water-resistant', 'Multiple compartments', 'Adjustable shoulder strap', 'Shoe compartment'],
    tags: ['bag', 'duffle', 'gym', 'sports'],
    rating: { average: 4.6, count: 87 },
    isNewArrival: true,
  },
  {
    name: 'One8 Cricket Bat English Willow',
    description: 'Premium cricket bat endorsed by Virat Kohli, made from the finest English willow.',
    price: 14985,
    category: 'Sports',
    subCategory: 'Cricket',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800', alt: 'Cricket Bat' }
    ],
    colors: [
      { name: 'Natural', hex: '#D2B48C', images: ['https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800'] }
    ],
    sizes: [
      { size: 'Short Handle', stock: 8 },
      { size: 'Long Handle', stock: 12 }
    ],
    totalStock: 20,
    features: ['English willow', 'One8 branding', 'Professional grade', 'Premium handle grip'],
    tags: ['cricket', 'bat', 'sports', 'one8'],
    rating: { average: 4.9, count: 45 },
    isFeatured: true,
  },
  {
    name: 'Football Training Ball',
    description: 'Official size 5 training football with superior durability and flight characteristics.',
    price: 2990,
    category: 'Sports',
    subCategory: 'Football',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800', alt: 'Football' }
    ],
    colors: [
      { name: 'White/Black', hex: '#FFFFFF', images: ['https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800'] }
    ],
    sizes: [
      { size: 'Size 5', stock: 40 }
    ],
    totalStock: 40,
    features: ['FIFA Quality', 'Machine-stitched', 'Size 5', 'All-weather performance'],
    tags: ['football', 'soccer', 'ball', 'sports'],
    rating: { average: 4.5, count: 112 },
  },
  {
    name: 'Deviate Nitro Elite Running Shoes',
    description: 'Elite racing shoes with carbon fiber plate for maximum energy return.',
    price: 16983,
    originalPrice: 18981,
    category: 'Shoes',
    subCategory: 'Running',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', alt: 'Elite Running Shoes' }
    ],
    colors: [
      { name: 'Black/Yellow', hex: '#000000', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'] }
    ],
    sizes: [
      { size: '8', stock: 6 },
      { size: '9', stock: 8 },
      { size: '10', stock: 10 },
      { size: '11', stock: 5 }
    ],
    totalStock: 29,
    features: ['Carbon fiber plate', 'NITRO Elite foam', 'Ultra-lightweight', 'Competition ready'],
    tags: ['running', 'racing', 'elite', 'performance'],
    rating: { average: 4.9, count: 234 },
    isFeatured: true,
    isNewArrival: true,
  },
  {
    name: 'Ultra Pro FG Football Boots',
    description: 'Lightweight football boots designed for speed with GripControl coating.',
    price: 11988,
    category: 'Shoes',
    subCategory: 'Football',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800', alt: 'Football Boots' }
    ],
    colors: [
      { name: 'Blue/Red', hex: '#0000FF', images: ['https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800'] }
    ],
    sizes: [
      { size: '8', stock: 10 },
      { size: '9', stock: 12 },
      { size: '10', stock: 15 },
      { size: '11', stock: 8 }
    ],
    totalStock: 45,
    features: ['Ultra-lightweight', 'GripControl coating', 'Firm ground outsole', 'Speed-focused design'],
    tags: ['football', 'soccer', 'boots', 'speed'],
    rating: { average: 4.7, count: 189 },
  },
  {
    name: 'Training Joggers Tech',
    description: 'Technical joggers with dryCELL moisture-wicking technology for intense workouts.',
    price: 4990,
    originalPrice: 5994,
    category: 'Apparel',
    subCategory: 'Pants',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800', alt: 'Training Joggers' }
    ],
    colors: [
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800'] },
      { name: 'Gray', hex: '#808080', images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800'] }
    ],
    sizes: [
      { size: 'S', stock: 15 },
      { size: 'M', stock: 25 },
      { size: 'L', stock: 20 },
      { size: 'XL', stock: 10 }
    ],
    totalStock: 70,
    features: ['dryCELL technology', 'Zippered pockets', 'Elastic waistband', 'Tapered fit'],
    tags: ['pants', 'training', 'joggers', 'workout'],
    rating: { average: 4.6, count: 145 },
    isNewArrival: true,
  },
  {
    name: 'Essential Training Tank',
    description: 'Breathable tank top perfect for high-intensity training sessions.',
    price: 2093,
    category: 'Apparel',
    subCategory: 'T-Shirts',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800', alt: 'Training Tank' }
    ],
    colors: [
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'] },
      { name: 'White', hex: '#FFFFFF', images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'] },
      { name: 'Gray', hex: '#808080', images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'] }
    ],
    sizes: [
      { size: 'S', stock: 20 },
      { size: 'M', stock: 30 },
      { size: 'L', stock: 25 },
      { size: 'XL', stock: 15 }
    ],
    totalStock: 90,
    features: ['Breathable mesh', 'Moisture-wicking', 'Slim fit', 'Lightweight'],
    tags: ['tank', 'training', 'sleeveless', 'gym'],
    rating: { average: 4.5, count: 98 },
  },
  {
    name: 'Windbreaker Jacket',
    description: 'Lightweight windbreaker with water-resistant finish for outdoor training.',
    price: 6993,
    originalPrice: 8991,
    category: 'Apparel',
    subCategory: 'Jackets',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800', alt: 'Windbreaker' }
    ],
    colors: [
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800'] },
      { name: 'Navy', hex: '#000080', images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800'] }
    ],
    sizes: [
      { size: 'M', stock: 15 },
      { size: 'L', stock: 20 },
      { size: 'XL', stock: 12 }
    ],
    totalStock: 47,
    features: ['Water-resistant', 'Packable hood', 'Zippered pockets', 'Lightweight'],
    tags: ['jacket', 'windbreaker', 'outdoor', 'running'],
    rating: { average: 4.7, count: 156 },
    isFeatured: true,
  },
  {
    name: 'Compression Long Sleeve Shirt',
    description: 'Compression fit shirt designed to enhance performance and reduce muscle fatigue.',
    price: 3493,
    category: 'Apparel',
    subCategory: 'T-Shirts',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', alt: 'Compression Shirt' }
    ],
    colors: [
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'] }
    ],
    sizes: [
      { size: 'S', stock: 12 },
      { size: 'M', stock: 18 },
      { size: 'L', stock: 15 },
      { size: 'XL', stock: 10 }
    ],
    totalStock: 55,
    features: ['Compression fit', 'Moisture-wicking', 'Flatlock seams', 'Long sleeve'],
    tags: ['compression', 'training', 'performance', 'base-layer'],
    rating: { average: 4.6, count: 123 },
  },
  {
    name: 'Running Belt Waist Pack',
    description: 'Lightweight running belt with multiple pockets for essentials.',
    price: 2392,
    category: 'Accessories',
    subCategory: 'Bags',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', alt: 'Running Belt' }
    ],
    colors: [
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'] }
    ],
    sizes: [
      { size: 'One Size', stock: 75 }
    ],
    totalStock: 75,
    features: ['Adjustable strap', 'Multiple pockets', 'Water-resistant', 'Reflective details'],
    tags: ['belt', 'running', 'waist-pack', 'accessories'],
    rating: { average: 4.5, count: 267 },
  },
  {
    name: 'Training Gloves Pro',
    description: 'Professional training gloves with enhanced grip and wrist support.',
    price: 2990,
    category: 'Accessories',
    subCategory: 'Gloves',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800', alt: 'Training Gloves' }
    ],
    colors: [
      { name: 'Black/Red', hex: '#000000', images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800'] }
    ],
    sizes: [
      { size: 'S', stock: 15 },
      { size: 'M', stock: 25 },
      { size: 'L', stock: 20 },
      { size: 'XL', stock: 10 }
    ],
    totalStock: 70,
    features: ['Enhanced grip', 'Wrist support', 'Breathable mesh', 'Padded palm'],
    tags: ['gloves', 'training', 'gym', 'fitness'],
    rating: { average: 4.7, count: 198 },
  },
  {
    name: 'Water Bottle Sport 750ml',
    description: 'BPA-free sport water bottle with ergonomic design and leak-proof cap.',
    price: 1196,
    category: 'Accessories',
    subCategory: 'Bottles',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800', alt: 'Water Bottle' }
    ],
    colors: [
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800'] },
      { name: 'Blue', hex: '#0000FF', images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800'] }
    ],
    sizes: [
      { size: '750ml', stock: 100 }
    ],
    totalStock: 100,
    features: ['BPA-free', 'Leak-proof', '750ml capacity', 'Easy-grip design'],
    tags: ['bottle', 'water', 'hydration', 'sports'],
    rating: { average: 4.6, count: 412 },
    isBestseller: true,
  },
  {
    name: 'Basketball',
    description: 'Official size basketball with superior grip and durability.',
    price: 3493,
    category: 'Sports',
    subCategory: 'Basketball',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800', alt: 'Basketball' }
    ],
    colors: [
      { name: 'Orange/Black', hex: '#FF6347', images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800'] }
    ],
    sizes: [
      { size: 'Size 7', stock: 50 }
    ],
    totalStock: 50,
    features: ['Official size 7', 'Deep channel design', 'Composite leather', 'Indoor/Outdoor'],
    tags: ['basketball', 'ball', 'sports', 'indoor'],
    rating: { average: 4.7, count: 145 },
  },
  {
    name: 'Yoga Mat Performance',
    description: 'Premium yoga mat with excellent grip and cushioning for all workout types.',
    price: 3992,
    category: 'Sports',
    subCategory: 'Fitness',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800', alt: 'Yoga Mat' }
    ],
    colors: [
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800'] },
      { name: 'Blue', hex: '#0000FF', images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800'] }
    ],
    sizes: [
      { size: 'Standard', stock: 40 }
    ],
    totalStock: 40,
    features: ['Non-slip surface', '6mm thickness', 'Easy to clean', 'Carrying strap included'],
    tags: ['yoga', 'mat', 'fitness', 'workout'],
    rating: { average: 4.8, count: 289 },
    isFeatured: true,
  },
  // New Puma Sports Items
  {
    name: 'PUMA King Platinum FG Football Boots',
    description: 'Premium leather football boots with K-BETTER technology for ultimate touch and comfort. Designed for playmakers who control the game.',
    price: 15984,
    originalPrice: 17982,
    category: 'Sports',
    subCategory: 'Football',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800', alt: 'PUMA King Platinum' }
    ],
    colors: [
      { name: 'Black/Gold', hex: '#000000', images: ['https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800'] },
      { name: 'White/Red', hex: '#FFFFFF', images: ['https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800'] }
    ],
    sizes: [
      { size: '7', stock: 8 },
      { size: '8', stock: 12 },
      { size: '9', stock: 15 },
      { size: '10', stock: 10 },
      { size: '11', stock: 5 }
    ],
    totalStock: 50,
    features: ['K-BETTER technology', 'Premium K-leather', 'RAPIDSPRINT outsole', 'Enhanced ball control'],
    tags: ['football', 'soccer', 'boots', 'premium', 'king'],
    rating: { average: 4.9, count: 267 },
    isFeatured: true,
    isBestseller: true,
  },
  {
    name: 'Ignite Pwradapt Golf Shoes',
    description: 'Revolutionary golf shoes with Pwradapt technology for superior stability and comfort on the course.',
    price: 14985,
    category: 'Sports',
    subCategory: 'Golf',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800', alt: 'Golf Shoes' }
    ],
    colors: [
      { name: 'White/Gray', hex: '#FFFFFF', images: ['https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800'] },
      { name: 'Black/Silver', hex: '#000000', images: ['https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800'] }
    ],
    sizes: [
      { size: '8', stock: 10 },
      { size: '9', stock: 15 },
      { size: '10', stock: 12 },
      { size: '11', stock: 8 }
    ],
    totalStock: 45,
    features: ['Pwradapt technology', 'IGNITE foam cushioning', 'Waterproof', 'Spikeless design'],
    tags: ['golf', 'shoes', 'sports', 'performance'],
    rating: { average: 4.8, count: 134 },
    isNewArrival: true,
  },
  {
    name: 'Active Gaming Footwear',
    description: 'The world\'s first gaming footwear designed in collaboration with esports professionals for ultimate comfort during long gaming sessions.',
    price: 8991,
    category: 'Shoes',
    subCategory: 'Sneakers',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', alt: 'Gaming Footwear' }
    ],
    colors: [
      { name: 'Black/Blue', hex: '#000000', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'] }
    ],
    sizes: [
      { size: '7', stock: 12 },
      { size: '8', stock: 18 },
      { size: '9', stock: 20 },
      { size: '10', stock: 15 },
      { size: '11', stock: 10 }
    ],
    totalStock: 75,
    features: ['Comfort collar', 'Medial grip socks', 'Lightweight construction', 'Gaming optimized'],
    tags: ['gaming', 'sneakers', 'esports', 'innovative'],
    rating: { average: 4.6, count: 89 },
    isFeatured: true,
    isNewArrival: true,
  },
  {
    name: 'One8 Cricket Shoes Spike',
    description: 'High-performance cricket shoes designed with Virat Kohli for exceptional grip and support on the pitch.',
    price: 9990,
    category: 'Sports',
    subCategory: 'Cricket',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800', alt: 'Cricket Shoes' }
    ],
    colors: [
      { name: 'White/Blue', hex: '#FFFFFF', images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800'] }
    ],
    sizes: [
      { size: '7', stock: 10 },
      { size: '8', stock: 15 },
      { size: '9', stock: 18 },
      { size: '10', stock: 12 },
      { size: '11', stock: 8 }
    ],
    totalStock: 63,
    features: ['Spike outsole', 'Ankle support', 'Breathable upper', 'One8 branding'],
    tags: ['cricket', 'shoes', 'sports', 'one8', 'spike'],
    rating: { average: 4.7, count: 156 },
    isBestseller: true,
  },
  {
    name: 'Tennis Training Ball - 3 Pack',
    description: 'ITF approved tennis balls with superior durability and consistent bounce for all court surfaces.',
    price: 995,
    category: 'Sports',
    subCategory: 'Tennis',
    gender: 'Unisex',
    images: [
      { url: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800', alt: 'Tennis Balls' }
    ],
    colors: [
      { name: 'Yellow', hex: '#FFFF00', images: ['https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800'] }
    ],
    sizes: [
      { size: '3-Pack', stock: 100 }
    ],
    totalStock: 100,
    features: ['ITF approved', '3-ball pack', 'All court surface', 'Professional quality'],
    tags: ['tennis', 'balls', 'sports', 'training'],
    rating: { average: 4.6, count: 234 },
  },
  {
    name: 'Badminton Racket Pro Series',
    description: 'Lightweight badminton racket with carbon fiber construction for power and precision.',
    price: 6993,
    originalPrice: 7992,
    category: 'Sports',
    subCategory: 'Badminton',
    gender: 'Unisex',
    images: [
      { url: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800', alt: 'Badminton Racket' }
    ],
    colors: [
      { name: 'Red/Black', hex: '#FF0000', images: ['https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800'] },
      { name: 'Blue/Silver', hex: '#0000FF', images: ['https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800'] }
    ],
    sizes: [
      { size: 'Standard', stock: 35 }
    ],
    totalStock: 35,
    features: ['Carbon fiber frame', 'Isometric head shape', 'Lightweight 85g', 'Professional grade'],
    tags: ['badminton', 'racket', 'sports', 'indoor'],
    rating: { average: 4.7, count: 98 },
    isNewArrival: true,
  },
  {
    name: 'Netfit Training Shoes',
    description: 'Revolutionary training shoes with NETFIT lacing system for customizable fit and support.',
    price: 7992,
    originalPrice: 9990,
    category: 'Shoes',
    subCategory: 'Training',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', alt: 'Training Shoes' }
    ],
    colors: [
      { name: 'Black/Yellow', hex: '#000000', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'] },
      { name: 'Gray/Orange', hex: '#808080', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'] }
    ],
    sizes: [
      { size: '7', stock: 12 },
      { size: '8', stock: 18 },
      { size: '9', stock: 22 },
      { size: '10', stock: 15 },
      { size: '11', stock: 8 }
    ],
    totalStock: 75,
    features: ['NETFIT lacing system', 'Multi-directional support', 'Cushioned midsole', 'Durable rubber outsole'],
    tags: ['training', 'gym', 'netfit', 'crossfit'],
    rating: { average: 4.7, count: 187 },
    isFeatured: true,
  },
  {
    name: 'Running Jacket Lightweight',
    description: 'Ultra-lightweight running jacket with reflective details and water-repellent finish.',
    price: 5994,
    originalPrice: 7992,
    category: 'Apparel',
    subCategory: 'Jackets',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800', alt: 'Running Jacket' }
    ],
    colors: [
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800'] },
      { name: 'Navy/Yellow', hex: '#000080', images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800'] }
    ],
    sizes: [
      { size: 'S', stock: 12 },
      { size: 'M', stock: 20 },
      { size: 'L', stock: 18 },
      { size: 'XL', stock: 10 }
    ],
    totalStock: 60,
    features: ['Water-repellent', 'Reflective details', 'Packable design', 'Breathable mesh'],
    tags: ['running', 'jacket', 'lightweight', 'outdoor'],
    rating: { average: 4.6, count: 145 },
    isNewArrival: true,
  },
  {
    name: 'Hybrid Training Shorts',
    description: 'Versatile training shorts suitable for running, gym, or casual wear with quick-dry fabric.',
    price: 2990,
    category: 'Apparel',
    subCategory: 'Shorts',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800', alt: 'Training Shorts' }
    ],
    colors: [
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800'] },
      { name: 'Navy', hex: '#000080', images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800'] },
      { name: 'Gray', hex: '#808080', images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800'] }
    ],
    sizes: [
      { size: 'S', stock: 20 },
      { size: 'M', stock: 30 },
      { size: 'L', stock: 25 },
      { size: 'XL', stock: 15 }
    ],
    totalStock: 90,
    features: ['Quick-dry fabric', 'Zippered pocket', 'Elastic waistband', '7-inch inseam'],
    tags: ['shorts', 'training', 'versatile', 'hybrid'],
    rating: { average: 4.5, count: 178 },
  },
  {
    name: 'Cricket Batting Gloves Pro',
    description: 'Professional-grade batting gloves with superior protection and grip for enhanced performance.',
    price: 4491,
    category: 'Sports',
    subCategory: 'Cricket',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800', alt: 'Cricket Gloves' }
    ],
    colors: [
      { name: 'White/Blue', hex: '#FFFFFF', images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800'] }
    ],
    sizes: [
      { size: 'Small', stock: 10 },
      { size: 'Medium', stock: 20 },
      { size: 'Large', stock: 15 }
    ],
    totalStock: 45,
    features: ['Multi-layer protection', 'Premium leather palm', 'Ventilated mesh', 'Adjustable wrist strap'],
    tags: ['cricket', 'gloves', 'batting', 'sports'],
    rating: { average: 4.8, count: 112 },
  },
  {
    name: 'Golf Performance Polo',
    description: 'Moisture-wicking polo shirt designed for golf with UV protection and stretch fabric.',
    price: 4491,
    originalPrice: 5994,
    category: 'Apparel',
    subCategory: 'Polo Shirts',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800', alt: 'Golf Polo' }
    ],
    colors: [
      { name: 'Navy', hex: '#000080', images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'] },
      { name: 'White', hex: '#FFFFFF', images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'] },
      { name: 'Gray', hex: '#808080', images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'] }
    ],
    sizes: [
      { size: 'S', stock: 15 },
      { size: 'M', stock: 25 },
      { size: 'L', stock: 20 },
      { size: 'XL', stock: 10 }
    ],
    totalStock: 70,
    features: ['Moisture-wicking', 'UV protection UPF 40+', '4-way stretch', 'dryCELL technology'],
    tags: ['golf', 'polo', 'performance', 'sports'],
    rating: { average: 4.7, count: 156 },
  },
  {
    name: 'Gymduffle Pro Holdall',
    description: 'Premium gym holdall with multiple compartments including ventilated shoe pocket and water bottle holder.',
    price: 5994,
    originalPrice: 6993,
    category: 'Accessories',
    subCategory: 'Bags',
    gender: 'Unisex',
    images: [
      { url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800', alt: 'Gym Holdall' }
    ],
    colors: [
      { name: 'Black/Red', hex: '#000000', images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800'] },
      { name: 'Gray/Blue', hex: '#808080', images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800'] }
    ],
    sizes: [
      { size: 'Medium (45L)', stock: 20 },
      { size: 'Large (65L)', stock: 15 }
    ],
    totalStock: 35,
    features: ['Ventilated shoe compartment', 'Water bottle holder', 'Padded shoulder strap', 'Durable ripstop fabric'],
    tags: ['gym', 'bag', 'holdall', 'sports'],
    rating: { average: 4.8, count: 267 },
    isFeatured: true,
  },
  {
    name: 'Tennis Racket Club Series',
    description: 'Perfect racket for intermediate players with excellent power and control balance.',
    price: 7992,
    category: 'Sports',
    subCategory: 'Tennis',
    gender: 'Unisex',
    images: [
      { url: 'https://images.unsplash.com/photo-1617083279887-34e08d7cf013?w=800', alt: 'Tennis Racket' }
    ],
    colors: [
      { name: 'Black/Green', hex: '#000000', images: ['https://images.unsplash.com/photo-1617083279887-34e08d7cf013?w=800'] }
    ],
    sizes: [
      { size: 'Grip 2', stock: 8 },
      { size: 'Grip 3', stock: 15 },
      { size: 'Grip 4', stock: 12 }
    ],
    totalStock: 35,
    features: ['100 sq in head size', 'Pre-strung', 'Graphite composite', 'Power and control balance'],
    tags: ['tennis', 'racket', 'sports', 'intermediate'],
    rating: { average: 4.6, count: 89 },
  },
  {
    name: 'Resistance Bands Set',
    description: 'Complete resistance training set with 5 bands of varying resistance levels and accessories.',
    price: 2691,
    category: 'Sports',
    subCategory: 'Fitness',
    gender: 'Unisex',
    images: [
      { url: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800', alt: 'Resistance Bands' }
    ],
    colors: [
      { name: 'Multi', hex: '#FF0000', images: ['https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800'] }
    ],
    sizes: [
      { size: 'One Size', stock: 60 }
    ],
    totalStock: 60,
    features: ['5 resistance levels', 'Door anchor included', 'Handles and ankle straps', 'Carrying bag'],
    tags: ['fitness', 'resistance', 'training', 'home-gym'],
    rating: { average: 4.7, count: 345 },
    isBestseller: true,
  },
  {
    name: 'Jump Rope Speed Pro',
    description: 'Professional speed jump rope with ball bearings for smooth rotation and adjustable length.',
    price: 1495,
    category: 'Sports',
    subCategory: 'Fitness',
    gender: 'Unisex',
    images: [
      { url: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800', alt: 'Jump Rope' }
    ],
    colors: [
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800'] },
      { name: 'Red', hex: '#FF0000', images: ['https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800'] }
    ],
    sizes: [
      { size: 'Adjustable', stock: 80 }
    ],
    totalStock: 80,
    features: ['Ball bearing system', 'Adjustable length', 'Anti-slip handles', 'Speed cable'],
    tags: ['jump-rope', 'fitness', 'cardio', 'training'],
    rating: { average: 4.6, count: 289 },
  },
  {
    name: 'Shin Guards Pro',
    description: 'Professional football shin guards with anatomical design and reinforced protection.',
    price: 2392,
    category: 'Sports',
    subCategory: 'Football',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800', alt: 'Shin Guards' }
    ],
    colors: [
      { name: 'Black/White', hex: '#000000', images: ['https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800'] }
    ],
    sizes: [
      { size: 'Small', stock: 15 },
      { size: 'Medium', stock: 25 },
      { size: 'Large', stock: 20 }
    ],
    totalStock: 60,
    features: ['Anatomical design', 'Reinforced protection', 'Compression sleeve', 'Lightweight'],
    tags: ['football', 'soccer', 'shin-guards', 'protection'],
    rating: { average: 4.5, count: 198 },
  },
  {
    name: 'Goalkeeper Gloves Grip Pro',
    description: 'Professional goalkeeper gloves with superior grip and finger protection technology.',
    price: 3992,
    category: 'Sports',
    subCategory: 'Football',
    gender: 'Men',
    images: [
      { url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800', alt: 'Goalkeeper Gloves' }
    ],
    colors: [
      { name: 'Yellow/Black', hex: '#FFFF00', images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800'] },
      { name: 'Orange/Blue', hex: '#FFA500', images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800'] }
    ],
    sizes: [
      { size: '7', stock: 10 },
      { size: '8', stock: 15 },
      { size: '9', stock: 18 },
      { size: '10', stock: 12 }
    ],
    totalStock: 55,
    features: ['4mm latex foam', 'Finger protection', 'Wrist support', 'All-weather grip'],
    tags: ['football', 'goalkeeper', 'gloves', 'soccer'],
    rating: { average: 4.8, count: 167 },
    isFeatured: true,
  },
  {
    name: 'Running Armband Phone Holder',
    description: 'Secure phone armband for running with water-resistant design and touch-screen compatible.',
    price: 1196,
    category: 'Accessories',
    subCategory: 'Phone Holders',
    gender: 'Unisex',
    images: [
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', alt: 'Phone Armband' }
    ],
    colors: [
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'] }
    ],
    sizes: [
      { size: 'Universal', stock: 100 }
    ],
    totalStock: 100,
    features: ['Water-resistant', 'Touch-screen compatible', 'Adjustable strap', 'Key holder'],
    tags: ['running', 'armband', 'phone', 'accessories'],
    rating: { average: 4.5, count: 412 },
  },
  {
    name: 'Cooling Towel Sport',
    description: 'Instant cooling towel perfect for workouts, running, and outdoor activities.',
    price: 995,
    category: 'Accessories',
    subCategory: 'Towels',
    gender: 'Unisex',
    images: [
      { url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800', alt: 'Cooling Towel' }
    ],
    colors: [
      { name: 'Blue', hex: '#0000FF', images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800'] },
      { name: 'Gray', hex: '#808080', images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800'] },
      { name: 'Pink', hex: '#FFC0CB', images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800'] }
    ],
    sizes: [
      { size: '30x90cm', stock: 120 }
    ],
    totalStock: 120,
    features: ['Instant cooling', 'Ultra-absorbent', 'Quick-dry', 'Reusable'],
    tags: ['towel', 'cooling', 'sports', 'workout'],
    rating: { average: 4.6, count: 567 },
  },
  // Kids Section - Shoes
  {
    name: 'Kids Suede Classic',
    description: 'Iconic PUMA Suede Classic scaled down for kids. Premium suede with comfortable fit for all-day play.',
    price: 3493,
    originalPrice: 4491,
    category: 'Shoes',
    subCategory: 'Sneakers',
    gender: 'Kids',
    images: [
      { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', alt: 'Kids Suede Classic' }
    ],
    colors: [
      { name: 'Blue', hex: '#0000FF', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'] },
      { name: 'Pink', hex: '#FFC0CB', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'] },
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'] }
    ],
    sizes: [
      { size: '10K', stock: 20 },
      { size: '11K', stock: 25 },
      { size: '12K', stock: 30 },
      { size: '13K', stock: 25 },
      { size: '1Y', stock: 20 },
      { size: '2Y', stock: 15 }
    ],
    totalStock: 135,
    features: ['Premium suede upper', 'Comfortable footbed', 'Durable rubber outsole', 'Easy velcro closure'],
    tags: ['kids', 'sneakers', 'classic', 'casual'],
    rating: { average: 4.8, count: 312 },
    isFeatured: true,
    isBestseller: true,
  },
  {
    name: 'Kids RS-X Fun',
    description: 'Bold and colorful RS-X design for kids who love to stand out. Chunky sole for comfort and style.',
    price: 4491,
    originalPrice: 5994,
    category: 'Shoes',
    subCategory: 'Sneakers',
    gender: 'Kids',
    images: [
      { url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800', alt: 'Kids RS-X Fun' }
    ],
    colors: [
      { name: 'Multi-Color', hex: '#FF0000', images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800'] },
      { name: 'Blue/Yellow', hex: '#0000FF', images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800'] }
    ],
    sizes: [
      { size: '11K', stock: 15 },
      { size: '12K', stock: 20 },
      { size: '13K', stock: 20 },
      { size: '1Y', stock: 15 },
      { size: '2Y', stock: 10 }
    ],
    totalStock: 80,
    features: ['Chunky RS design', 'Colorful details', 'Padded collar', 'Hook-and-loop closure'],
    tags: ['kids', 'sneakers', 'colorful', 'rs-x'],
    rating: { average: 4.7, count: 198 },
    isNewArrival: true,
    isFeatured: true,
  },
  {
    name: 'Kids Future Football Boots',
    description: 'Junior football boots designed for young players to develop their skills with confidence.',
    price: 4990,
    category: 'Sports',
    subCategory: 'Football',
    gender: 'Kids',
    images: [
      { url: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800', alt: 'Kids Football Boots' }
    ],
    colors: [
      { name: 'Blue/Orange', hex: '#0000FF', images: ['https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800'] },
      { name: 'Black/Yellow', hex: '#000000', images: ['https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800'] }
    ],
    sizes: [
      { size: '10K', stock: 12 },
      { size: '11K', stock: 15 },
      { size: '12K', stock: 18 },
      { size: '13K', stock: 15 },
      { size: '1Y', stock: 12 },
      { size: '2Y', stock: 8 }
    ],
    totalStock: 80,
    features: ['Grippy outsole', 'Durable synthetic upper', 'Comfortable fit', 'Youth-specific design'],
    tags: ['kids', 'football', 'soccer', 'sports'],
    rating: { average: 4.6, count: 145 },
    isBestseller: true,
  },
  {
    name: 'Kids Running Shoes Velocity',
    description: 'Lightweight running shoes for active kids with cushioned support and breathable mesh.',
    price: 3992,
    originalPrice: 4995,
    category: 'Shoes',
    subCategory: 'Running',
    gender: 'Kids',
    images: [
      { url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800', alt: 'Kids Running Shoes' }
    ],
    colors: [
      { name: 'Pink/Purple', hex: '#FFC0CB', images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800'] },
      { name: 'Blue/Green', hex: '#0000FF', images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800'] }
    ],
    sizes: [
      { size: '10K', stock: 15 },
      { size: '11K', stock: 20 },
      { size: '12K', stock: 22 },
      { size: '13K', stock: 18 },
      { size: '1Y', stock: 15 },
      { size: '2Y', stock: 10 }
    ],
    totalStock: 100,
    features: ['Lightweight design', 'Breathable mesh', 'Cushioned midsole', 'Easy on/off'],
    tags: ['kids', 'running', 'sports', 'active'],
    rating: { average: 4.7, count: 234 },
    isNewArrival: true,
  },
  // Kids Apparel
  {
    name: 'Kids Essential Logo T-Shirt',
    description: 'Comfortable cotton t-shirt with PUMA Cat logo. Perfect for everyday wear and play.',
    price: 1495,
    category: 'Apparel',
    subCategory: 'T-Shirts',
    gender: 'Kids',
    images: [
      { url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800', alt: 'Kids Logo Tee' }
    ],
    colors: [
      { name: 'Red', hex: '#FF0000', images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'] },
      { name: 'Blue', hex: '#0000FF', images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'] },
      { name: 'Pink', hex: '#FFC0CB', images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'] },
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'] }
    ],
    sizes: [
      { size: '4-5Y', stock: 30 },
      { size: '6-7Y', stock: 35 },
      { size: '8-9Y', stock: 35 },
      { size: '10-11Y', stock: 30 },
      { size: '12-13Y', stock: 25 }
    ],
    totalStock: 155,
    features: ['100% Cotton', 'PUMA Cat logo', 'Crew neck', 'Regular fit'],
    tags: ['kids', 'tshirt', 'casual', 'logo'],
    rating: { average: 4.8, count: 456 },
    isBestseller: true,
  },
  {
    name: 'Kids Training Shorts Active',
    description: 'Lightweight sports shorts with moisture-wicking fabric for active kids.',
    price: 1794,
    category: 'Apparel',
    subCategory: 'Shorts',
    gender: 'Kids',
    images: [
      { url: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800', alt: 'Kids Shorts' }
    ],
    colors: [
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800'] },
      { name: 'Navy', hex: '#000080', images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800'] },
      { name: 'Red', hex: '#FF0000', images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800'] }
    ],
    sizes: [
      { size: '4-5Y', stock: 25 },
      { size: '6-7Y', stock: 30 },
      { size: '8-9Y', stock: 30 },
      { size: '10-11Y', stock: 25 },
      { size: '12-13Y', stock: 20 }
    ],
    totalStock: 130,
    features: ['Moisture-wicking', 'Elastic waistband', 'Side pockets', 'Breathable'],
    tags: ['kids', 'shorts', 'sports', 'active'],
    rating: { average: 4.6, count: 289 },
  },
  {
    name: 'Kids Zip Hoodie Essential',
    description: 'Cozy fleece hoodie with full zip and iconic PUMA branding. Perfect for layering.',
    price: 3493,
    originalPrice: 3992,
    category: 'Apparel',
    subCategory: 'Hoodies',
    gender: 'Kids',
    images: [
      { url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800', alt: 'Kids Hoodie' }
    ],
    colors: [
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800'] },
      { name: 'Gray', hex: '#808080', images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800'] },
      { name: 'Navy', hex: '#000080', images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800'] }
    ],
    sizes: [
      { size: '4-5Y', stock: 20 },
      { size: '6-7Y', stock: 25 },
      { size: '8-9Y', stock: 25 },
      { size: '10-11Y', stock: 20 },
      { size: '12-13Y', stock: 15 }
    ],
    totalStock: 105,
    features: ['Soft fleece', 'Full zip', 'Hood with drawcord', 'Kangaroo pocket'],
    tags: ['kids', 'hoodie', 'casual', 'comfort'],
    rating: { average: 4.7, count: 345 },
    isFeatured: true,
  },
  {
    name: 'Kids Track Jacket Retro',
    description: 'Classic track jacket with retro PUMA styling and comfortable fit for young athletes.',
    price: 3493,
    originalPrice: 4990,
    category: 'Apparel',
    subCategory: 'Jackets',
    gender: 'Kids',
    images: [
      { url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800', alt: 'Kids Track Jacket' }
    ],
    colors: [
      { name: 'Black/White', hex: '#000000', images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800'] },
      { name: 'Navy/Red', hex: '#000080', images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800'] }
    ],
    sizes: [
      { size: '4-5Y', stock: 15 },
      { size: '6-7Y', stock: 20 },
      { size: '8-9Y', stock: 20 },
      { size: '10-11Y', stock: 15 },
      { size: '12-13Y', stock: 10 }
    ],
    totalStock: 80,
    features: ['Full zip', 'Side pockets', 'Ribbed cuffs', 'Retro design'],
    tags: ['kids', 'jacket', 'retro', 'sporty'],
    rating: { average: 4.8, count: 178 },
    isNewArrival: true,
  },
  {
    name: 'Kids Joggers Fleece',
    description: 'Comfortable fleece joggers perfect for casual wear and light activities.',
    price: 2990,
    category: 'Apparel',
    subCategory: 'Pants',
    gender: 'Kids',
    images: [
      { url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800', alt: 'Kids Joggers' }
    ],
    colors: [
      { name: 'Gray', hex: '#808080', images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800'] },
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800'] },
      { name: 'Navy', hex: '#000080', images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800'] }
    ],
    sizes: [
      { size: '4-5Y', stock: 20 },
      { size: '6-7Y', stock: 25 },
      { size: '8-9Y', stock: 25 },
      { size: '10-11Y', stock: 20 },
      { size: '12-13Y', stock: 15 }
    ],
    totalStock: 105,
    features: ['Soft fleece', 'Elastic waistband', 'Side pockets', 'Tapered fit'],
    tags: ['kids', 'pants', 'joggers', 'comfort'],
    rating: { average: 4.7, count: 267 },
  },
  // Kids Accessories
  {
    name: 'Kids Backpack Phase',
    description: 'Durable backpack perfect for school with multiple compartments and padded straps.',
    price: 2392,
    category: 'Accessories',
    subCategory: 'Bags',
    gender: 'Kids',
    images: [
      { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', alt: 'Kids Backpack' }
    ],
    colors: [
      { name: 'Blue', hex: '#0000FF', images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'] },
      { name: 'Pink', hex: '#FFC0CB', images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'] },
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'] }
    ],
    sizes: [
      { size: 'One Size', stock: 100 }
    ],
    totalStock: 100,
    features: ['Multiple compartments', 'Padded shoulder straps', 'Water-resistant', 'Laptop sleeve'],
    tags: ['kids', 'backpack', 'school', 'bags'],
    rating: { average: 4.8, count: 423 },
    isBestseller: true,
  },
  {
    name: 'Kids Cap Essential',
    description: 'Adjustable baseball cap with PUMA branding, perfect for sunny days.',
    price: 1196,
    category: 'Accessories',
    subCategory: 'Caps',
    gender: 'Kids',
    images: [
      { url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800', alt: 'Kids Cap' }
    ],
    colors: [
      { name: 'Red', hex: '#FF0000', images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800'] },
      { name: 'Blue', hex: '#0000FF', images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800'] },
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800'] }
    ],
    sizes: [
      { size: 'Youth', stock: 150 }
    ],
    totalStock: 150,
    features: ['Adjustable strap', 'Embroidered logo', 'Curved brim', 'UV protection'],
    tags: ['kids', 'cap', 'accessories', 'hat'],
    rating: { average: 4.6, count: 312 },
  },
  {
    name: 'Kids Sport Socks 3-Pack',
    description: 'Comfortable sport socks with arch support and PUMA branding. Pack of 3 pairs.',
    price: 995,
    category: 'Accessories',
    subCategory: 'Socks',
    gender: 'Kids',
    images: [
      { url: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800', alt: 'Kids Socks' }
    ],
    colors: [
      { name: 'White', hex: '#FFFFFF', images: ['https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800'] },
      { name: 'Black', hex: '#000000', images: ['https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800'] },
      { name: 'Multi', hex: '#FF0000', images: ['https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800'] }
    ],
    sizes: [
      { size: 'Small (9-12)', stock: 80 },
      { size: 'Medium (13-3)', stock: 90 },
      { size: 'Large (4-6)', stock: 70 }
    ],
    totalStock: 240,
    features: ['3-pack', 'Arch support', 'Moisture-wicking', 'Cushioned sole'],
    tags: ['kids', 'socks', 'accessories', '3-pack'],
    rating: { average: 4.7, count: 512 },
    isBestseller: true,
  },
  {
    name: 'Kids Mini Football',
    description: 'Size 3 training football perfect for young players learning the game.',
    price: 1794,
    category: 'Sports',
    subCategory: 'Football',
    gender: 'Kids',
    images: [
      { url: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800', alt: 'Kids Football' }
    ],
    colors: [
      { name: 'Red/White', hex: '#FF0000', images: ['https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800'] },
      { name: 'Blue/Yellow', hex: '#0000FF', images: ['https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800'] }
    ],
    sizes: [
      { size: 'Size 3', stock: 80 }
    ],
    totalStock: 80,
    features: ['Size 3', 'Durable construction', 'Machine-stitched', 'Youth design'],
    tags: ['kids', 'football', 'soccer', 'sports'],
    rating: { average: 4.7, count: 198 },
  },
  {
    name: 'Kids Basketball Mini',
    description: 'Youth-sized basketball perfect for developing skills and having fun.',
    price: 1794,
    category: 'Sports',
    subCategory: 'Basketball',
    gender: 'Kids',
    images: [
      { url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800', alt: 'Kids Basketball' }
    ],
    colors: [
      { name: 'Orange/Black', hex: '#FF6347', images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800'] }
    ],
    sizes: [
      { size: 'Size 5', stock: 60 }
    ],
    totalStock: 60,
    features: ['Youth size 5', 'Rubber cover', 'Good grip', 'Indoor/Outdoor'],
    tags: ['kids', 'basketball', 'sports', 'ball'],
    rating: { average: 4.6, count: 145 },
  },
  {
    name: 'Kids Water Bottle Sport',
    description: 'BPA-free water bottle with fun design and easy-to-use spout for active kids.',
    price: 995,
    category: 'Accessories',
    subCategory: 'Bottles',
    gender: 'Kids',
    images: [
      { url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800', alt: 'Kids Water Bottle' }
    ],
    colors: [
      { name: 'Blue', hex: '#0000FF', images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800'] },
      { name: 'Pink', hex: '#FFC0CB', images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800'] },
      { name: 'Green', hex: '#00FF00', images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800'] }
    ],
    sizes: [
      { size: '500ml', stock: 120 }
    ],
    totalStock: 120,
    features: ['BPA-free', 'Leak-proof', '500ml capacity', 'Easy-grip design'],
    tags: ['kids', 'bottle', 'hydration', 'sports'],
    rating: { average: 4.8, count: 389 },
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
