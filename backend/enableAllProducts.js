import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema);

async function enableAllProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Update all products to ensure sizes have stock
    const products = await Product.find();
    let updatedCount = 0;

    for (const product of products) {
      let needsUpdate = false;
      
      // Check if any size has 0 stock
      if (product.sizes && Array.isArray(product.sizes)) {
        product.sizes = product.sizes.map(size => {
          if (size.stock === 0 || !size.stock) {
            needsUpdate = true;
            return { ...size, stock: 50 }; // Set minimum stock of 50
          }
          return size;
        });
      }

      // Ensure totalStock is updated
      if (product.sizes && Array.isArray(product.sizes)) {
        product.totalStock = product.sizes.reduce((sum, size) => sum + (size.stock || 0), 0);
        needsUpdate = true;
      }

      if (needsUpdate) {
        await product.save();
        updatedCount++;
        console.log(`✓ Updated ${product.name}`);
      }
    }

    console.log(`\n✅ Updated ${updatedCount} products`);
    console.log('All products now have stock available for purchase!');
    
    // Verify
    const productsWithNoStock = await Product.find({
      $or: [
        { totalStock: { $lte: 0 } },
        { 'sizes.stock': { $lte: 0 } }
      ]
    }).select('name totalStock sizes');
    
    if (productsWithNoStock.length === 0) {
      console.log('✓ All products verified - all sizes have stock');
    } else {
      console.log(`⚠ Still ${productsWithNoStock.length} products with stock issues`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

enableAllProducts();
