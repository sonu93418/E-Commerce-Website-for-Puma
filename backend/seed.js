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
  {
    name: 'Clyde All-Pro Basketball Shoes',
    description: 'Signature basketball shoes designed for elite performance on the court.',
    price: 140,
    originalPrice: 160,
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
    price: 30,
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
    price: 55,
    originalPrice: 70,
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
    price: 28,
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
    price: 22,
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
    price: 18,
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
    price: 60,
    originalPrice: 75,
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
    price: 180,
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
    price: 35,
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
    price: 200,
    originalPrice: 230,
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
    price: 150,
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
    price: 60,
    originalPrice: 75,
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
    price: 25,
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
    price: 90,
    originalPrice: 110,
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
    price: 45,
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
    price: 28,
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
    price: 35,
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
    price: 15,
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
    price: 40,
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
    price: 50,
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
