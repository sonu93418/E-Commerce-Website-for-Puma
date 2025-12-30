'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/products/ProductCard';
import api from '@/lib/api';
import Link from 'next/link';
import { FiChevronRight, FiTruck, FiStar, FiPackage, FiTrendingUp, FiAward, FiTarget, FiZap, FiActivity, FiDisc } from 'react-icons/fi';
import { IoFootballOutline, IoBasketballOutline } from 'react-icons/io5';
import { GiSoccerBall, GiBasketballBall, GiRunningShoe, GiWeightLiftingUp, GiRaceCar } from 'react-icons/gi';

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
  tags?: string[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestseller?: boolean;
}

export default function SportsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');

  useEffect(() => {
    fetchProducts();
    // Hide footer on sports page
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
      // Filter for sports products
      const sportsProducts = response.data.filter(
        (product: Product) => 
          product.category === 'Sports' || 
          product.subCategory?.toLowerCase().includes('sport') ||
          product.tags?.some((tag: string) => ['sports', 'football', 'basketball', 'running', 'training', 'gym'].includes(tag.toLowerCase()))
      );
      setProducts(sportsProducts);
      console.log(`Loaded ${sportsProducts.length} sports products`, sportsProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Football', 'Basketball', 'Running', 'Training', 'Motorsport'];

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory === 'All') return true;
      return product.subCategory === selectedCategory || 
             product.tags?.includes(selectedCategory.toLowerCase());
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
      title: 'Football',
      description: 'Dominate the pitch',
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800',
      category: 'Football',
      icon: GiSoccerBall
    },
    {
      title: 'Basketball',
      description: 'Elevate your game',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
      category: 'Basketball',
      icon: GiBasketballBall
    },
    {
      title: 'Running',
      description: 'Run faster, run longer',
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800',
      category: 'Running',
      icon: GiRunningShoe
    },
    {
      title: 'Training',
      description: 'Push your limits',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
      category: 'Training',
      icon: GiWeightLiftingUp
    },
    {
      title: 'Motorsport',
      description: 'Speed & style',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800',
      category: 'Motorsport',
      icon: GiRaceCar
    },
  ];

  // Group products by category
  const productsByCategory = categories.reduce((acc, category) => {
    if (category === 'All') {
      acc[category] = filteredProducts;
    } else {
      acc[category] = products.filter(p => 
        p.subCategory === category || p.tags?.includes(category.toLowerCase())
      );
    }
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-black via-red-900 to-black overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600"
            alt="Sports Collection"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <FiChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Sports</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <FiAward className="w-16 h-16 text-puma-red" />
                <h1 className="text-6xl md:text-8xl font-black text-white leading-tight">
                  SPORTS<br />PERFORMANCE
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
                Engineered for champions. Premium sports gear designed to maximize your performance across every discipline.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 flex items-center gap-2">
                  <FiTarget className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">Pro Performance</span>
                </div>
                <div className="bg-puma-red px-6 py-3 rounded-full flex items-center gap-2">
                  <FiZap className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">Latest Technology</span>
                </div>
                <div className="bg-yellow-500 px-6 py-3 rounded-full flex items-center gap-2">
                  <FiAward className="w-5 h-5 text-black" />
                  <span className="text-black font-semibold">Championship Grade</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Sports Categories */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Shop by Sport
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Find the perfect gear for your passion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {featuredCollections.map((collection, index) => (
            <motion.button
              key={collection.title}
              onClick={() => setSelectedCategory(collection.category)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <collection.icon className="w-16 h-16 text-white mb-4" />
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
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border-2 border-puma-red/20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                {selectedCategory === 'All' ? 'All Sports Gear' : selectedCategory}
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
                        ? 'bg-puma-red text-white shadow-lg scale-105'
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
                className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full border-none focus:ring-2 focus:ring-puma-red font-semibold cursor-pointer"
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
              Loading championship gear...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12 bg-gradient-to-br from-red-50 to-gray-50 dark:from-red-950/20 dark:to-gray-800 rounded-3xl p-12 border-2 border-puma-red/30"
            >
              <FiAward className="w-20 h-20 mx-auto mb-6 text-puma-red" />
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
                Explore Premium Sports Gear
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Discover top-performance equipment from PUMA's sports collection!
              </p>
            </motion.div>

            {/* Sample Sports Products Section */}
            <div className="space-y-16">
              {/* Football Gear */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                      <GiSoccerBall className="w-10 h-10 text-puma-red" />
                      PUMA Football Collection
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Professional football boots and gear
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCategory('Football')}
                    className="px-6 py-3 bg-puma-red text-white rounded-full font-semibold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg"
                  >
                    View All
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {[
                    {
                      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=600&fit=crop',
                      name: 'PUMA Future Ultimate FG/AG',
                      price: '₹18,999',
                      originalPrice: '₹22,999',
                      discount: '17% OFF',
                      category: 'Football Boots',
                      rating: '4.9'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&h=600&fit=crop',
                      name: 'PUMA Ultra Match FG/AG',
                      price: '₹8,999',
                      originalPrice: '₹11,999',
                      discount: '25% OFF',
                      category: 'Football Boots',
                      rating: '4.7'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e31ad0f?w=600&h=600&fit=crop',
                      name: 'PUMA King Platinum FG',
                      price: '₹15,999',
                      category: 'Football Boots',
                      rating: '4.8'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&h=600&fit=crop',
                      name: 'PUMA Football Training Ball',
                      price: '₹2,499',
                      originalPrice: '₹3,499',
                      discount: '29% OFF',
                      category: 'Equipment',
                      rating: '4.6'
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-puma-red"
                    >
                      <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 bg-puma-red text-white px-3 py-1 rounded-full text-sm font-bold">
                          PRO
                        </div>
                        {item.discount && (
                          <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                            {item.discount}
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.category}</p>
                        <h4 className="text-xl font-black text-gray-900 dark:text-white mb-3">{item.name}</h4>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-2xl font-black text-puma-red">{item.price}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-400 line-through">{item.originalPrice}</span>
                            )}
                          </div>
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

              {/* Basketball Gear */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                      <GiBasketballBall className="w-10 h-10 text-puma-red" />
                      PUMA Basketball Collection
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Court-ready performance gear
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCategory('Basketball')}
                    className="px-6 py-3 bg-puma-red text-white rounded-full font-semibold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg"
                  >
                    View All
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {[
                    {
                      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=600&fit=crop',
                      name: 'PUMA MB.03 LaMelo Ball',
                      price: '₹13,999',
                      originalPrice: '₹16,999',
                      discount: '18% OFF',
                      category: 'Basketball Shoes',
                      rating: '4.9'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=600&h=600&fit=crop',
                      name: 'PUMA Clyde All-Pro',
                      price: '₹12,499',
                      category: 'Basketball Shoes',
                      rating: '4.8'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?w=600&h=600&fit=crop',
                      name: 'PUMA Basketball Jersey',
                      price: '₹2,999',
                      originalPrice: '₹3,999',
                      discount: '25% OFF',
                      category: 'Apparel',
                      rating: '4.7'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&h=600&fit=crop',
                      name: 'PUMA Basketball',
                      price: '₹2,799',
                      category: 'Equipment',
                      rating: '4.8'
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-puma-red"
                    >
                      <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          PRO
                        </div>
                        {item.discount && (
                          <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                            {item.discount}
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.category}</p>
                        <h4 className="text-xl font-black text-gray-900 dark:text-white mb-3">{item.name}</h4>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-2xl font-black text-puma-red">{item.price}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-400 line-through">{item.originalPrice}</span>
                            )}
                          </div>
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

              {/* Running Gear */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                      <GiRunningShoe className="w-10 h-10 text-puma-red" />
                      PUMA Running Collection
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Speed and endurance technology
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCategory('Running')}
                    className="px-6 py-3 bg-puma-red text-white rounded-full font-semibold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg"
                  >
                    View All
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {[
                    {
                      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
                      name: 'PUMA Deviate Nitro 2',
                      price: '₹14,999',
                      originalPrice: '₹17,999',
                      discount: '17% OFF',
                      category: 'Running Shoes',
                      rating: '4.9'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&h=600&fit=crop',
                      name: 'PUMA Velocity Nitro 3',
                      price: '₹10,999',
                      category: 'Running Shoes',
                      rating: '4.8'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=600&fit=crop',
                      name: 'PUMA Running Shorts',
                      price: '₹1,999',
                      originalPrice: '₹2,799',
                      discount: '29% OFF',
                      category: 'Apparel',
                      rating: '4.7'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=600&fit=crop',
                      name: 'PUMA Running Tank',
                      price: '₹1,499',
                      category: 'Apparel',
                      rating: '4.6'
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-puma-red"
                    >
                      <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          SPEED
                        </div>
                        {item.discount && (
                          <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                            {item.discount}
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.category}</p>
                        <h4 className="text-xl font-black text-gray-900 dark:text-white mb-3">{item.name}</h4>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-2xl font-black text-puma-red">{item.price}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-400 line-through">{item.originalPrice}</span>
                            )}
                          </div>
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

              {/* Training Gear */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                      <GiWeightLiftingUp className="w-10 h-10 text-puma-red" />
                      PUMA Training Collection
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Maximum performance gear
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCategory('Training')}
                    className="px-6 py-3 bg-puma-red text-white rounded-full font-semibold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg"
                  >
                    View All
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {[
                    {
                      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=600&fit=crop',
                      name: 'PUMA Training Shoes',
                      price: '₹7,999',
                      originalPrice: '₹9,999',
                      discount: '20% OFF',
                      category: 'Training Shoes',
                      rating: '4.8'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=600&fit=crop',
                      name: 'PUMA Gym Bag',
                      price: '₹2,999',
                      category: 'Accessories',
                      rating: '4.7'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=600&h=600&fit=crop',
                      name: 'PUMA Training Gloves',
                      price: '₹1,299',
                      originalPrice: '₹1,799',
                      discount: '28% OFF',
                      category: 'Accessories',
                      rating: '4.6'
                    },
                    {
                      image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600&h=600&fit=crop',
                      name: 'PUMA Resistance Bands',
                      price: '₹1,499',
                      category: 'Equipment',
                      rating: '4.8'
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-puma-red"
                    >
                      <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          FIT
                        </div>
                        {item.discount && (
                          <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                            {item.discount}
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.category}</p>
                        <h4 className="text-xl font-black text-gray-900 dark:text-white mb-3">{item.name}</h4>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-2xl font-black text-puma-red">{item.price}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-400 line-through">{item.originalPrice}</span>
                            )}
                          </div>
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
              className="text-center mt-16 bg-gradient-to-r from-puma-red via-red-600 to-black rounded-3xl p-12"
            >
              <FiAward className="w-16 h-16 mx-auto mb-6 text-white" />
              <h3 className="text-4xl font-black text-white mb-4">
                Unleash Your Champion
              </h3>
              <p className="text-xl text-white/90 mb-8">
                Explore our complete sports collection and dominate every game
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="px-12 py-5 bg-white text-puma-red rounded-full font-black text-xl hover:bg-yellow-400 hover:text-black transition-all shadow-2xl transform hover:scale-105 flex items-center gap-3 mx-auto"
              >
                <FiTarget className="w-6 h-6" />
                View All Sports Gear
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
                    className="px-6 py-3 bg-puma-red text-white rounded-full font-semibold hover:scale-105 transition-transform flex items-center gap-2"
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

      {/* Sports Stats */}
      {selectedCategory !== 'All' && filteredProducts.length > 0 && (
        <section className="container mx-auto px-4 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="bg-gradient-to-br from-puma-red to-red-700 rounded-xl p-6 text-center shadow-lg">
              <FiAward className="w-8 h-8 mx-auto mb-2 text-white" />
              <p className="text-2xl font-black text-white">{filteredProducts.length}</p>
              <p className="text-sm text-white/80">Products</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl p-6 text-center shadow-lg">
              <FiTarget className="w-8 h-8 mx-auto mb-2 text-black" />
              <p className="text-2xl font-black text-black">PRO</p>
              <p className="text-sm text-black/80">Performance</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 text-center shadow-lg">
              <FiZap className="w-8 h-8 mx-auto mb-2 text-white" />
              <p className="text-2xl font-black text-white">Fast</p>
              <p className="text-sm text-white/80">Delivery</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-center shadow-lg">
              <FiStar className="w-8 h-8 mx-auto mb-2 text-white" />
              <p className="text-2xl font-black text-white">4.8+</p>
              <p className="text-sm text-white/80">Rated</p>
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
}
