'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/products/ProductCard';
import api from '@/lib/api';
import Link from 'next/link';
import { FiGrid, FiList, FiChevronRight, FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';

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

export default function MenPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({
    category: true,
    type: false,
    price: false,
    colors: false,
    sizes: false,
    brand: false,
    rating: false,
  });
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('All');

  useEffect(() => {
    fetchProducts();
    setIsMounted(true);
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      // Filter for men's products and unisex items
      const menProducts = response.data.filter(
        (product: Product) => 
          product.gender === 'Men' || 
          product.gender === 'Unisex' || 
          product.gender === 'men' || 
          product.gender === 'unisex'
      );
      setProducts(menProducts);
      console.log(`Loaded ${menProducts.length} men's products`);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Shoes', 'Apparel', 'Accessories', 'Sports', 'Equipment'];
  const subCategories = [
    'All',
    // Shoes
    'Sneakers', 'Running Shoes', 'Training Shoes', 'Basketball', 'Football Boots', 'Casual Shoes',
    // Apparel
    'T-Shirts', 'Hoodies', 'Jackets', 'Pants', 'Shorts', 'Tracksuits', 'Jerseys',
    // Accessories
    'Bags', 'Backpacks', 'Caps', 'Socks', 'Gloves', 'Watches', 'Belts',
    // Sports Equipment
    'Footballs', 'Gym Equipment', 'Yoga Mats', 'Water Bottles'
  ];
  const availableColors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Red', hex: '#FF0000' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Gray', hex: '#808080' },
    { name: 'Green', hex: '#008000' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Multi', hex: 'linear-gradient(45deg, #FF0000, #00FF00, #0000FF)' },
  ];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '7', '8', '9', '10', '11', '12'];
  const brands = ['PUMA', 'PUMA Golf', 'PUMA Running', 'PUMA Training', 'PUMA Basketball'];

  const filteredProducts = products
    .filter((product) => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const subCategoryMatch = selectedSubCategory === 'All' || product.subCategory === selectedSubCategory;
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      const colorMatch = selectedColors.length === 0 || product.colors.some(c => selectedColors.includes(c.name));
      const ratingMatch = selectedRating === 0 || product.rating.average >= selectedRating;
      const sizeMatch = selectedSizes.length === 0 || (product as any).sizes?.some((s: any) => selectedSizes.includes(s.size));
      const brandMatch = selectedBrand === 'All' || (product as any).brand === selectedBrand;
      return categoryMatch && subCategoryMatch && priceMatch && colorMatch && ratingMatch && sizeMatch && brandMatch;
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

  const toggleDropdown = (dropdown: 'category' | 'type' | 'price' | 'colors' | 'rating' | 'sizes' | 'brand') => {
    setOpenDropdowns(prev => ({ ...prev, [dropdown]: !prev[dropdown] }));
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors(prev =>
      prev.includes(colorName)
        ? prev.filter(c => c !== colorName)
        : [...prev, colorName]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSubCategory('All');
    setPriceRange([0, 500]);
    setSelectedColors([]);
    setSelectedRating(0);
    setSelectedSizes([]);
    setSelectedBrand('All');
  };

  const activeFiltersCount = 
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedSubCategory !== 'All' ? 1 : 0) +
    (priceRange[1] !== 500 ? 1 : 0) +
    selectedColors.length +
    (selectedRating > 0 ? 1 : 0) +
    selectedSizes.length +
    (selectedBrand !== 'All' ? 1 : 0);

  const featuredCollections = [
    {
      title: 'New Arrivals',
      description: 'Latest drops in men\'s sportswear',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
      link: '#new-arrivals',
    },
    {
      title: 'Sneakers',
      description: 'Step up your shoe game',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      link: '#sneakers',
    },
    {
      title: 'Training Gear',
      description: 'Performance-ready apparel',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
      link: '#training',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Banner */}
      <section className="relative bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=1600"
            alt="Men's Collection"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-2xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <FiChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Men</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
                MEN'S COLLECTION
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Discover premium sportswear and footwear designed for peak performance
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                  <span className="text-white font-semibold">New Arrivals</span>
                </div>
                <div className="bg-red-600 px-6 py-3 rounded-full">
                  <span className="text-white font-semibold">Free Shipping</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Collections Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
            Featured Collections
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Explore our curated selections for men
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {featuredCollections.map((collection, index) => (
            <motion.a
              key={collection.title}
              href={collection.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-black text-white mb-2">
                  {collection.title}
                </h3>
                <p className="text-gray-200 mb-4">{collection.description}</p>
                <div className="flex items-center gap-2 text-white font-semibold">
                  <span>Shop Now</span>
                  <FiChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Products Section - Now on Left */}
          <main className="flex-1 lg:order-1">
            {/* Toolbar */}
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {filteredProducts.length} Products
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedCategory !== 'All' ? selectedCategory : 'All categories'}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* View Toggle */}
                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${
                      viewMode === 'grid'
                        ? 'bg-white dark:bg-gray-700 shadow'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <FiGrid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${
                      viewMode === 'list'
                        ? 'bg-white dark:bg-gray-700 shadow'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <FiList className="w-5 h-5" />
                  </button>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg border-none focus:ring-2 focus:ring-black dark:focus:ring-white font-medium"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 bg-black dark:bg-white text-white dark:text-black rounded-lg"
                >
                  <FiFilter className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Products Grid/List */}
            {loading ? (
              <div className="flex flex-col justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-lg">
                <p className="text-2xl font-bold text-gray-400 dark:text-gray-600 mb-2">
                  No products found
                </p>
                <p className="text-gray-500 dark:text-gray-500 mb-6">
                  Try adjusting your filters
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedSubCategory('All');
                    setPriceRange([0, 500]);
                  }}
                  className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'flex flex-col gap-4'
                }
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </main>
          {/* Filters Sidebar - Now on Right */}
          <AnimatePresence>
            {isMounted && (showFilters || window.innerWidth >= 1024) && (
              <motion.aside
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                className="lg:w-80 lg:order-2 fixed lg:sticky top-0 right-0 h-screen lg:h-auto bg-white dark:bg-gray-900 z-30 lg:z-auto overflow-y-auto p-6 shadow-xl lg:shadow-none lg:top-24 lg:rounded-lg lg:border lg:border-gray-200 dark:lg:border-gray-800"
              >
                <div className="space-y-6">
                  {/* Close button for mobile */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-black text-gray-900 dark:text-white">Filters</h2>
                      {activeFiltersCount > 0 && (
                        <span className="inline-block mt-1 px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                          {activeFiltersCount} Active
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                    >
                      <FiX className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Clear All Filters Button */}
                  {activeFiltersCount > 0 && (
                    <motion.button
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={clearAllFilters}
                      className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <FiX className="w-5 h-5" />
                      Clear All Filters
                    </motion.button>
                  )}

                  {/* Category Filter - Dropdown */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleDropdown('category')}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                        <span className="w-1 h-4 bg-red-600 rounded"></span>
                        Category
                      </h3>
                      {openDropdowns.category ? (
                        <FiChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <FiChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                    <AnimatePresence>
                      {openDropdowns.category && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-4 pb-4"
                        >
                          <div className="space-y-2">
                            {categories.map((category) => (
                              <button
                                key={category}
                                onClick={() => {
                                  setSelectedCategory(category);
                                  if (isMounted && window.innerWidth < 1024) setShowFilters(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${
                                  selectedCategory === category
                                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                                    : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                {category}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Sub-Category Filter - Dropdown */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleDropdown('type')}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                        <span className="w-1 h-4 bg-red-600 rounded"></span>
                        Type
                      </h3>
                      {openDropdowns.type ? (
                        <FiChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <FiChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                    <AnimatePresence>
                      {openDropdowns.type && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-4 pb-4"
                        >
                          <div className="space-y-2">
                            {subCategories.map((subCategory) => (
                              <button
                                key={subCategory}
                                onClick={() => {
                                  setSelectedSubCategory(subCategory);
                                  if (isMounted && window.innerWidth < 1024) setShowFilters(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${
                                  selectedSubCategory === subCategory
                                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                                    : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                {subCategory}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Price Range - Dropdown */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleDropdown('price')}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                        <span className="w-1 h-4 bg-red-600 rounded"></span>
                        Price Range
                      </h3>
                      {openDropdowns.price ? (
                        <FiChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <FiChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                    <AnimatePresence>
                      {openDropdowns.price && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-4 pb-4"
                        >
                          <div className="space-y-4">
                            <input
                              type="range"
                              min="0"
                              max="500"
                              value={priceRange[1]}
                              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                              className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                            />
                            <div className="flex justify-between text-sm font-semibold">
                              <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded">
                                ${priceRange[0]}
                              </span>
                              <span className="px-3 py-1 bg-red-600 text-white rounded">
                                ${priceRange[1]}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Colors Filter - Dropdown */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleDropdown('colors')}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                        <span className="w-1 h-4 bg-red-600 rounded"></span>
                        Colors
                        {selectedColors.length > 0 && (
                          <span className="ml-1 px-2 py-0.5 bg-red-600 text-white text-xs rounded-full">
                            {selectedColors.length}
                          </span>
                        )}
                      </h3>
                      {openDropdowns.colors ? (
                        <FiChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <FiChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                    <AnimatePresence>
                      {openDropdowns.colors && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-4 pb-4"
                        >
                          <div className="grid grid-cols-3 gap-3">
                            {availableColors.map((color) => (
                              <button
                                key={color.name}
                                onClick={() => toggleColor(color.name)}
                                className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                                  selectedColors.includes(color.name)
                                    ? 'border-black dark:border-white bg-gray-100 dark:bg-gray-700'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                }`}
                              >
                                <div
                                  className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600"
                                  style={{ 
                                    background: color.hex,
                                    boxShadow: selectedColors.includes(color.name) ? '0 0 0 2px currentColor' : 'none'
                                  }}
                                />
                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                  {color.name}
                                </span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Rating Filter - Dropdown */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleDropdown('rating')}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                        <span className="w-1 h-4 bg-red-600 rounded"></span>
                        Rating
                        {selectedRating > 0 && (
                          <span className="ml-1 px-2 py-0.5 bg-red-600 text-white text-xs rounded-full">
                            {selectedRating}+
                          </span>
                        )}
                      </h3>
                      {openDropdowns.rating ? (
                        <FiChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <FiChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                    <AnimatePresence>
                      {openDropdowns.rating && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-4 pb-4"
                        >
                          <div className="space-y-2">
                            {[4, 3, 2, 1].map((rating) => (
                              <button
                                key={rating}
                                onClick={() => setSelectedRating(rating === selectedRating ? 0 : rating)}
                                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all text-sm font-medium flex items-center gap-2 ${
                                  selectedRating === rating
                                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                                    : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <span
                                      key={i}
                                      className={i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}
                                    >
                                      ★
                                    </span>
                                  ))}
                                </div>
                                <span>& Up</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Sizes Filter - Dropdown */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleDropdown('sizes')}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                        <span className="w-1 h-4 bg-red-600 rounded"></span>
                        Sizes
                        {selectedSizes.length > 0 && (
                          <span className="ml-1 px-2 py-0.5 bg-red-600 text-white text-xs rounded-full">
                            {selectedSizes.length}
                          </span>
                        )}
                      </h3>
                      {openDropdowns.sizes ? (
                        <FiChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <FiChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                    <AnimatePresence>
                      {openDropdowns.sizes && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-4 pb-4"
                        >
                          <div className="grid grid-cols-4 gap-2">
                            {sizes.map((size) => (
                              <button
                                key={size}
                                onClick={() => toggleSize(size)}
                                className={`py-2 px-3 rounded-lg border-2 transition-all text-sm font-semibold ${
                                  selectedSizes.includes(size)
                                    ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black'
                                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Brand Filter - Dropdown */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleDropdown('brand')}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                        <span className="w-1 h-4 bg-red-600 rounded"></span>
                        Brand
                        {selectedBrand !== 'All' && (
                          <span className="ml-1 px-2 py-0.5 bg-red-600 text-white text-xs rounded-full">
                            1
                          </span>
                        )}
                      </h3>
                      {openDropdowns.brand ? (
                        <FiChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <FiChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                    <AnimatePresence>
                      {openDropdowns.brand && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-4 pb-4"
                        >
                          <div className="space-y-2">
                            {['All', ...brands].map((brand) => (
                              <button
                                key={brand}
                                onClick={() => {
                                  setSelectedBrand(brand);
                                  if (isMounted && window.innerWidth < 1024) setShowFilters(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${
                                  selectedBrand === brand
                                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                                    : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                {brand}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Clear Filters - Bottom Button */}
                  <button
                    onClick={clearAllFilters}
                    className="w-full py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white"
                  >
                    Reset All Filters
                  </button>

                  {/* Active Filters Badge */}
                  <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-sm font-bold text-red-900 dark:text-red-100 text-center">
                      {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Found
                    </p>
                  </div>

                  {/* Quick Filter Summary */}
                  {activeFiltersCount > 0 && (
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                      <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">
                        Active Filters
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCategory !== 'All' && (
                          <span className="px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full">
                            {selectedCategory}
                          </span>
                        )}
                        {selectedSubCategory !== 'All' && (
                          <span className="px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full">
                            {selectedSubCategory}
                          </span>
                        )}
                        {selectedColors.map(color => (
                          <span key={color} className="px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full">
                            {color}
                          </span>
                        ))}
                        {selectedSizes.map(size => (
                          <span key={size} className="px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full">
                            Size {size}
                          </span>
                        ))}
                        {selectedBrand !== 'All' && (
                          <span className="px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full">
                            {selectedBrand}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
