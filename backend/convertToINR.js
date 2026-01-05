import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema);

async function convertToINR() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Update all products - multiply prices by 83 for USD to INR conversion
    const result = await Product.updateMany(
      {},
      [
        {
          $set: {
            price: { $multiply: ['$price', 83] },
            originalPrice: {
              $cond: {
                if: { $gt: ['$originalPrice', 0] },
                then: { $multiply: ['$originalPrice', 83] },
                else: '$originalPrice'
              }
            }
          }
        }
      ]
    );

    console.log(`✅ Updated ${result.modifiedCount} products to INR`);
    
    // Show sample products
    const samples = await Product.find().limit(3).select('name price originalPrice');
    console.log('\nSample products:');
    samples.forEach(p => console.log(`- ${p.name}: ₹${p.price.toFixed(2)}`));
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

convertToINR();
