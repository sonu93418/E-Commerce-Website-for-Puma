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

  // Mock data for development
  const mockProducts: Product[] = [
    {
      _id: '1',
      name: 'PUMA RS-X³ Puzzle',
      price: 110,
      originalPrice: 140,
      images: [{ url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', alt: 'RS-X³ Puzzle' }],
      category: 'Shoes',
      rating: { average: 4.5, count: 120 },
    },
    {
      _id: '2',
      name: 'Essential Logo Tee',
      price: 35,
      images: [{ url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', alt: 'Logo Tee' }],
      category: 'Apparel',
      rating: { average: 4.8, count: 89 },
    },
    {
      _id: '3',
      name: 'Evercat Contender Backpack',
      price: 45,
      images: [{ url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', alt: 'Backpack' }],
      category: 'Accessories',
      rating: { average: 4.6, count: 56 },
    },
    {
      _id: '4',
      name: 'FUTURE Z 1.3 FG/AG',
      price: 220,
      images: [{ url: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800', alt: 'Football Boots' }],
      category: 'Sports',
      rating: { average: 4.9, count: 145 },
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            Discover our hand-picked selection of premium sportswear
          </motion.p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
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
