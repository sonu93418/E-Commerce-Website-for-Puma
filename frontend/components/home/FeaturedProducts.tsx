'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductCard from '@/components/products/ProductCard';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: Array<{ url: string; alt: string }>;
  category: string;
  rating: {
    average: number;
    count: number;
  };
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get('/products/featured');
      setProducts(response.data.data.products);
    } catch (error: any) {
      console.error('Error fetching featured products:', error);
      // Use mock data for development
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for development - All Puma products with 50% OFF - Real PUMA Brand Images
  const mockProducts: Product[] = [
    {
      _id: '1',
      name: 'PUMA RS-X³ Puzzle',
      price: 70,
      originalPrice: 140,
      images: [{ url: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/371570/01/sv01/fnd/IND/fmt/png/RS-X-Puzzle-Unisex-Sneakers', alt: 'RS-X³ Puzzle' }],
      category: 'Shoes',
      rating: { average: 4.5, count: 120 },
    },
    {
      _id: '2',
      name: 'PUMA Essential Logo Tee',
      price: 25,
      originalPrice: 50,
      images: [{ url: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/586667/01/mod01/fnd/IND/fmt/png/Essentials-Logo-Men%E2%80%99s-Tee', alt: 'Logo Tee' }],
      category: 'Apparel',
      rating: { average: 4.8, count: 89 },
    },
    {
      _id: '3',
      name: 'PUMA Evercat Contender Backpack',
      price: 30,
      originalPrice: 60,
      images: [{ url: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/078834/01/fnd/IND/fmt/png/Evercat-Contender-Unisex-Backpack', alt: 'Backpack' }],
      category: 'Accessories',
      rating: { average: 4.6, count: 56 },
    },
    {
      _id: '4',
      name: 'PUMA FUTURE Z 1.3 FG/AG',
      price: 110,
      originalPrice: 220,
      images: [{ url: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/106559/01/sv01/fnd/IND/fmt/png/FUTURE-Z-1.3-FG/AG-Men%E2%80%99s-Football-Boots', alt: 'Football Boots' }],
      category: 'Sports',
      rating: { average: 4.9, count: 145 },
    },
    {
      _id: '5',
      name: 'PUMA Suede Classic XXI',
      price: 40,
      originalPrice: 80,
      images: [{ url: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/374915/01/sv01/fnd/IND/fmt/png/Suede-Classic-XXI-Unisex-Sneakers', alt: 'Suede Classic' }],
      category: 'Shoes',
      rating: { average: 4.7, count: 98 },
    },
    {
      _id: '6',
      name: 'PUMA Training Jacket',
      price: 45,
      originalPrice: 90,
      images: [{ url: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/519454/01/mod01/fnd/IND/fmt/png/PUMA-x-SEASONS-Training-Men%E2%80%99s-Jacket', alt: 'Training Jacket' }],
      category: 'Apparel',
      rating: { average: 4.6, count: 76 },
    },
    {
      _id: '7',
      name: 'PUMA Velocity Nitro 2',
      price: 65,
      originalPrice: 130,
      images: [{ url: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/376812/01/sv01/fnd/IND/fmt/png/Velocity-NITRO-2-Men%E2%80%99s-Running-Shoes', alt: 'Velocity Nitro' }],
      category: 'Shoes',
      rating: { average: 4.9, count: 134 },
    },
    {
      _id: '8',
      name: 'PUMA Performance Cap',
      price: 15,
      originalPrice: 30,
      images: [{ url: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/022416/01/fnd/IND/fmt/png/Performance-Running-Unisex-Cap', alt: 'Cap' }],
      category: 'Accessories',
      rating: { average: 4.5, count: 67 },
    },
    {
      _id: '9',
      name: 'PUMA Deviate Nitro Elite',
      price: 125,
      originalPrice: 250,
      images: [{ url: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/195239/01/sv01/fnd/IND/fmt/png/Deviate-NITRO%E2%84%A2-Elite-Racer-Men%E2%80%99s-Running-Shoes', alt: 'Deviate Nitro' }],
      category: 'Shoes',
      rating: { average: 4.9, count: 187 },
    },
    {
      _id: '10',
      name: 'PUMA Teamwear Jersey',
      price: 37.50,
      originalPrice: 75,
      images: [{ url: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/704923/01/mod01/fnd/IND/fmt/png/teamRISE-Men%E2%80%99s-Football-Jersey', alt: 'Jersey' }],
      category: 'Apparel',
      rating: { average: 4.7, count: 92 },
    },
    {
      _id: '11',
      name: 'PUMA Gym Duffel Bag',
      price: 35,
      originalPrice: 70,
      images: [{ url: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/078297/01/fnd/IND/fmt/png/Fundamentals-Sports-Bag-S', alt: 'Duffel Bag' }],
      category: 'Accessories',
      rating: { average: 4.6, count: 81 },
    },
    {
      _id: '12',
      name: 'PUMA Training Shorts',
      price: 27.50,
      originalPrice: 55,
      images: [{ url: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/520302/01/mod01/fnd/IND/fmt/png/Performance-Woven-Men%E2%80%99s-Training-Shorts', alt: 'Training Shorts' }],
      category: 'Apparel',
      rating: { average: 4.5, count: 73 },
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4"
          >
            Featured <span className="text-gradient">Products</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="inline-block px-6 py-2 bg-puma-red text-white rounded-full font-bold text-xl">
              50% OFF - LIMITED TIME!
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Discover our hand-picked selection of premium PUMA sportswear
            </p>
          </motion.div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className="skeleton-shimmer h-96 rounded-xl" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {products.map((product) => (
              <motion.div key={product._id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-puma-black dark:bg-white text-white dark:text-black text-lg font-semibold rounded-lg hover:shadow-xl transition-all"
            >
              View All Products
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
