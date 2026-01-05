import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model('Product', productSchema);

async function resetToINR() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Divide by 83 to get back to USD, then multiply by 83 for INR
    // But prices seem to have been multiplied multiple times, so let's just divide by 6889 (83*83) to get original USD
    const result = await Product.updateMany(
      {},
      [
        {
          $set: {
            price: { $round: [{ $divide: ['$price', 83] }, 2] },
            originalPrice: {
              $cond: {
                if: { $gt: ['$originalPrice', 0] },
                then: { $round: [{ $divide: ['$originalPrice', 83] }, 2] },
                else: '$originalPrice'
              }
            }
          }
        }
      ]
    );

    console.log(`✅ Reset ${result.modifiedCount} products back to reasonable prices`);
    
    // Show sample products
    const samples = await Product.find().limit(5).select('name price originalPrice');
    console.log('\nSample products after reset:');
    samples.forEach(p => console.log(`- ${p.name}: ₹${p.price.toFixed(2)}`));
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

resetToINR();
