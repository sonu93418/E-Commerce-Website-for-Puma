'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/products/ProductCard';
import api from '@/lib/api';
import Link from 'next/link';
import { FiChevronRight, FiTruck, FiStar, FiPackage, FiTrendingUp, FiDollarSign } from 'react-icons/fi';

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
  rating: { average: number; count: number };
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestseller?: boolean;
}

export default function WomenPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');

  useEffect(() => {
    fetchProducts();
    // Hide footer on women's page
    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.display = 'none';
    }
    // Show footer when component unmounts
    return () => {
      const footer = document.querySelector('footer');
      if (footer) {
        footer.style.display = 'block';
      }
    };
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      // Filter for women's products and unisex items
      const womenProducts = response.data.filter(
        (product: Product) => 
          product.gender === 'Women' || 
          product.gender === 'Unisex' || 
          product.gender === 'women' || 
          product.gender === 'unisex'
      );
      setProducts(womenProducts);
      console.log(`Loaded ${womenProducts.length} women's products`, womenProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      console.log('Failed to fetch from API, check if backend is running on http://localhost:5000');
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
      title: 'Running',
      description: 'Performance shoes & gear',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
      category: 'Shoes',
    },
    {
      title: 'Training',
      description: 'Workout essentials',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
      category: 'Apparel',
    },
    {
      title: 'Lifestyle',
      description: 'Everyday style',
      image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800',
      category: 'Accessories',
    },
    {
      title: 'Yoga',
      description: 'Mind & body wellness',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
      category: 'Sports',
    },
  ];

  // Group products by category for better organization
  const productsByCategory = categories.reduce((acc, category) => {
    if (category === 'All') {
      acc[category] = filteredProducts;
    } else {
      acc[category] = products.filter(p => p.category === category);
    }
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Banner */}
      <section className="relative bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600"
            alt="Women's Collection"
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
              <span className="text-white font-medium">Women</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
                WOMEN'S<br />COLLECTION
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-xl">
                Embrace your power with premium sportswear designed for performance, comfort, and style
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
            Discover collections designed for powerful women
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
                {selectedCategory === 'All' ? 'All Products' : selectedCategory}
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
              Loading awesome products...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div>
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
                But check out these popular women's items from our collection!
              </p>
            </motion.div>

            {/* Sample Products Section */}
            <div className="space-y-16">
              {/* Featured Shoes */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                      <FiTrendingUp className="w-8 h-8 text-puma-red" />
                      Popular Women's Shoes
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Step into style and comfort
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCategory('Shoes')}
                    className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    View All Shoes
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {[
                    {
                      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=600&fit=crop',
                      name: 'PUMA Carina 2.0 Women',
                      price: '₹5,999',
                      category: 'Women\'s Sneakers',
                      rating: '4.8'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop',
                      name: 'PUMA Suede Classic Women',
                      price: '₹6,499',
                      category: 'Women\'s Lifestyle',
                      rating: '4.9'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop',
                      name: 'PUMA Velocity Nitro Women',
                      price: '₹9,499',
                      category: 'Women\'s Running',
                      rating: '4.7'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&h=600&fit=crop',
                      name: 'PUMA RS-X Women',
                      price: '₹10,999',
                      category: 'Women\'s Training',
                      rating: '4.6'
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                    >
                      <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 bg-puma-red text-white px-3 py-1 rounded-full text-sm font-bold">
                          New
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.category}</p>
                        <h4 className="text-xl font-black text-gray-900 dark:text-white mb-3">{item.name}</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-black text-puma-red">{item.price}</span>
                          <div className="flex items-center gap-1">
                            <FiStar className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            <span className="font-bold text-gray-900 dark:text-white">{item.rating}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Featured Apparel */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                      <FiPackage className="w-8 h-8 text-puma-red" />
                      Trending Women's Apparel
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Performance meets style
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCategory('Apparel')}
                    className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    View All Apparel
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {[
                    {
                      image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=600&fit=crop',
                      name: 'PUMA Training Tank Women',
                      price: '₹1,799',
                      category: 'Women\'s Tanks',
                      rating: '4.8'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=600&h=600&fit=crop',
                      name: 'PUMA Yoga Leggings Women',
                      price: '₹2,999',
                      category: 'Women\'s Bottoms',
                      rating: '4.9'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?w=600&h=600&fit=crop',
                      name: 'PUMA Sports Bra Women',
                      price: '₹2,499',
                      category: 'Women\'s Sports Bra',
                      rating: '4.7'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1578932750355-5eb30ece487a?w=600&h=600&fit=crop',
                      name: 'PUMA Training Jacket Women',
                      price: '₹4,999',
                      category: 'Women\'s Jackets',
                      rating: '4.6'
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                    >
                      <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-bold">
                          Hot
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.category}</p>
                        <h4 className="text-xl font-black text-gray-900 dark:text-white mb-3">{item.name}</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-black text-puma-red">{item.price}</span>
                          <div className="flex items-center gap-1">
                            <FiStar className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            <span className="font-bold text-gray-900 dark:text-white">{item.rating}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Featured Accessories */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                      <FiDollarSign className="w-8 h-8 text-puma-red" />
                      Must-Have Accessories
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Complete your active lifestyle
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCategory('Accessories')}
                    className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    View Accessories
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {[
                    {
                      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop',
                      name: 'PUMA Yoga Mat',
                      price: '₹2,499',
                      category: 'Fitness Gear',
                      rating: '4.7'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop',
                      name: 'PUMA Water Bottle',
                      price: '₹899',
                      category: 'Accessories',
                      rating: '4.6'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop',
                      name: 'PUMA Sports Bag Women',
                      price: '₹2,999',
                      category: 'Women\'s Bags',
                      rating: '4.8'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1577071835592-db06c0aad1c8?w=600&h=600&fit=crop',
                      name: 'PUMA Headband Set',
                      price: '₹599',
                      category: 'Hair Accessories',
                      rating: '4.5'
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                    >
                      <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 bg-puma-red text-white px-3 py-1 rounded-full text-sm font-bold">
                          Sale
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.category}</p>
                        <h4 className="text-xl font-black text-gray-900 dark:text-white mb-3">{item.name}</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-black text-puma-red">{item.price}</span>
                          <div className="flex items-center gap-1">
                            <FiStar className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            <span className="font-bold text-gray-900 dark:text-white">{item.rating}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-16 bg-gradient-to-r from-puma-red to-red-600 rounded-3xl p-12"
            >
              <h3 className="text-4xl font-black text-white mb-4">
                Ready to Shop?
              </h3>
              <p className="text-xl text-white/90 mb-8">
                Explore our complete women's collection and find your perfect fit
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="px-12 py-5 bg-white text-puma-red rounded-full font-black text-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center gap-3 mx-auto"
              >
                <FiPackage className="w-6 h-6" />
                View All Products
                <FiChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          </div>
        ) : selectedCategory === 'All' ? (
          // Show products grouped by category when "All" is selected
          <div className="space-y-16">
            {categories.filter(cat => cat !== 'All' && productsByCategory[cat]?.length > 0).map((category) => (
              <div key={category}>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                      {category}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {productsByCategory[category].length} items available
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    View All
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {productsByCategory[category].slice(0, 4).map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ y: -8 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Show all products in selected category
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Category Stats */}
      {selectedCategory !== 'All' && filteredProducts.length > 0 && (
        <section className="container mx-auto px-4 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center shadow-lg">
              <FiPackage className="w-8 h-8 mx-auto mb-2 text-puma-red" />
              <p className="text-2xl font-black text-gray-900 dark:text-white">{filteredProducts.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Products</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center shadow-lg">
              <FiTruck className="w-8 h-8 mx-auto mb-2 text-puma-red" />
              <p className="text-2xl font-black text-gray-900 dark:text-white">Free</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Shipping</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center shadow-lg">
              <FiStar className="w-8 h-8 mx-auto mb-2 text-puma-red" />
              <p className="text-2xl font-black text-gray-900 dark:text-white">Premium</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Quality</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center shadow-lg">
              <FiTrendingUp className="w-8 h-8 mx-auto mb-2 text-puma-red" />
              <p className="text-2xl font-black text-gray-900 dark:text-white">Trending</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Styles</p>
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
}
