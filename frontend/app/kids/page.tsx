'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiChevronRight, FiTruck, FiPackage, FiStar } from 'react-icons/fi';
import ProductCard from '@/components/products/ProductCard';
import api from '@/lib/api';
import toast, { Toaster } from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  subCategory: string;
  gender: string;
  images: { url: string; alt: string }[];
  colors: { name: string; hex: string; images: string[] }[];
  sizes: { size: string; stock: number }[];
  rating: { average: number; count: number };
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestseller?: boolean;
}

export default function KidsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');

  useEffect(() => {
    fetchKidsProducts();
  }, []);

  const fetchKidsProducts = async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching kids products...');
      // Use gender query parameter directly
      const response = await api.get('/products', {
        params: {
          gender: 'Kids',
          limit: 100
        }
      });
      console.log('📥 API Response:', response.data);
      
      // Data might come as array directly or in a data property
      const productsArray = Array.isArray(response.data) ? response.data : response.data.products || [];
      console.log('📦 Products array length:', productsArray.length);
      
      setProducts(productsArray);
      console.log(`✅ Loaded ${productsArray.length} kids products`);
      
      if (productsArray.length === 0) {
        console.warn('⚠️ No kids products found');
      }
    } catch (error: any) {
      console.error('❌ Error fetching kids products:', error);
      console.error('Error response:', error.response);
      
      if (!error.response) {
        toast.error('Unable to connect to server. Please check if backend is running.');
      } else {
        toast.error(`Error: ${error.response.status} - ${error.response.statusText}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Shoes', 'Apparel', 'Accessories', 'Sports'];

  const filteredProducts = products
    .filter((product) => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      return categoryMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating.average - a.rating.average;
        case 'newest':
          return a.isNewArrival ? -1 : 1;
        default:
          return a.isFeatured ? -1 : 1;
      }
    });

  const featuredCollections = [
    {
      title: 'Sneakers',
      description: 'Fun & comfortable styles',
      image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800',
      category: 'Shoes',
    },
    {
      title: 'Active Wear',
      description: 'Play all day gear',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
      category: 'Apparel',
    },
    {
      title: 'School Essentials',
      description: 'Bags & accessories',
      image: 'https://images.unsplash.com/photo-1577741314755-048d8525d31e?w=800',
      category: 'Accessories',
    },
    {
      title: 'Sports Gear',
      description: 'For young athletes',
      image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=800',
      category: 'Sports',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Banner */}
      <section className="relative bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1600"
            alt="Kids Collection"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <FiChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Kids</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
                KIDS'<br />COLLECTION
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-xl">
                Fun, colorful, and comfortable gear designed for active kids who love to play
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 flex items-center gap-2">
                  <FiPackage className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">New Arrivals</span>
                </div>
                <div className="bg-puma-red px-6 py-3 rounded-full flex items-center gap-2">
                  <FiTruck className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">Free Shipping</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover collections designed for awesome kids
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {featuredCollections.map((collection, index) => (
            <motion.button
              key={collection.title}
              onClick={() => setSelectedCategory(collection.category)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                <h3 className="text-3xl font-black text-white mb-2">
                  {collection.title}
                </h3>
                <p className="text-gray-200 font-medium">{collection.description}</p>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-3 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                <FiChevronRight className="w-6 h-6 text-white group-hover:text-black" />
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Category Filter Bar */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                {selectedCategory === 'All' ? 'All Kids Products' : `Kids ${selectedCategory}`}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Available
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
                      selectedCategory === category
                        ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg scale-105'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full border-none focus:ring-2 focus:ring-black dark:focus:ring-white font-semibold cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-12 pb-20">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-32">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-puma-red"></div>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-400 font-semibold">
              Loading awesome kids stuff...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-12"
          >
            <FiPackage className="w-20 h-20 mx-auto mb-6 text-puma-red" />
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
              No Products Found in {selectedCategory}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Try selecting a different category to see our awesome kids collection!
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold hover:scale-105 transition-transform"
            >
              View All Products
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-900 py-16 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPackage className="w-8 h-8 text-puma-red" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Comfort First
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Designed for active play and all-day comfort
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiStar className="w-8 h-8 text-puma-red" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Bold Colors
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Fun designs that kids absolutely love
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTruck className="w-8 h-8 text-puma-red" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Built to Last
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Durable quality for endless adventures
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
