'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiChevronRight, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import ProductCard from '@/components/products/ProductCard';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';

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

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>(searchParams?.get('gender') || 'All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Build query params
      const params = new URLSearchParams();
      if (searchParams?.get('gender')) params.append('gender', searchParams.get('gender')!);
      if (searchParams?.get('category')) params.append('category', searchParams.get('category')!);
      if (searchParams?.get('discount') === 'true') {
        // We'll filter discounted products on the frontend
      }
      
      const response = await api.get(`/products?${params.toString()}`);
      let fetchedProducts = response.data;

      // Filter discounted products if needed
      if (searchParams?.get('discount') === 'true') {
        fetchedProducts = fetchedProducts.filter((p: Product) => p.discount && p.discount > 0);
      }

      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Shoes', 'Apparel', 'Accessories', 'Sports'];
  const genders = ['All', 'Men', 'Women', 'Kids', 'Unisex'];
  const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under ₹2,000', min: 0, max: 2000 },
    { label: '₹2,000 - ₹5,000', min: 2000, max: 5000 },
    { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { label: 'Above ₹10,000', min: 10000, max: Infinity },
  ];

  const filteredProducts = products
    .filter((product) => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const genderMatch = selectedGender === 'All' || product.gender === selectedGender;
      
      const priceRange = priceRanges.find(r => r.label === selectedPriceRange);
      const priceMatch = !priceRange || priceRange.label === 'All' || 
        (product.price >= priceRange.min && product.price < priceRange.max);
      
      return categoryMatch && genderMatch && priceMatch;
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
          return (a.isNewArrival ? -1 : 1) - (b.isNewArrival ? -1 : 1);
        default:
          return (a.isFeatured ? -1 : 1) - (b.isFeatured ? -1 : 1);
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-puma-red transition-colors">
            Home
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 dark:text-white font-medium">Products</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4">
            All Products
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover our complete collection of premium PUMA products
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg font-semibold"
              >
                <FiFilter className="w-5 h-5" />
                Filters
              </button>
              
              <div className="hidden lg:flex items-center gap-4">
                <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                  {filteredProducts.length} Products
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
              {/* View Mode */}
              <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white dark:bg-gray-700' : ''
                  }`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white dark:bg-gray-700' : ''
                  }`}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg font-semibold cursor-pointer border-none outline-none"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Filters */}
          <div className={`${showFilters ? 'block' : 'hidden lg:block'} mt-6 pt-6 border-t dark:border-gray-700`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        selectedCategory === category
                          ? 'bg-puma-red text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                  Gender
                </label>
                <div className="flex flex-wrap gap-2">
                  {genders.map((gender) => (
                    <button
                      key={gender}
                      onClick={() => setSelectedGender(gender)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        selectedGender === gender
                          ? 'bg-puma-red text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                  Price Range
                </label>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => setSelectedPriceRange(range.label)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                        selectedPriceRange === range.label
                          ? 'bg-puma-red text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-puma-red"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Try adjusting your filters
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedGender('All');
                setSelectedPriceRange('All');
              }}
              className="px-6 py-3 bg-puma-red text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8' 
            : 'space-y-6'
          }>
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
