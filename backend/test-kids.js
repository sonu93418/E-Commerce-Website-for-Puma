import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    
    // Get all products
    const allProducts = await Product.find({});
    console.log(`📦 Total products: ${allProducts.length}`);
    
    // Get kids products
    const kidsProducts = await Product.find({ gender: 'Kids' });
    console.log(`👶 Kids products: ${kidsProducts.length}`);
    
    if (kidsProducts.length > 0) {
      console.log('\n📋 Kids Products:');
      kidsProducts.forEach(p => {
        console.log(`  - ${p.name} (${p.category}) - $${p.price}`);
      });
    } else {
      console.log('⚠️  NO KIDS PRODUCTS FOUND!');
    }
    
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
