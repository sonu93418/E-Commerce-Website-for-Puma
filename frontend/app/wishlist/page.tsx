'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiChevronRight, FiX } from 'react-icons/fi';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'react-hot-toast';
import ProductCard from '@/components/products/ProductCard';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  const handleMoveToCart = (product: any) => {
    // Add default size and color - in a real app, you'd show a modal to select these
    const cartItem = {
      _id: `${product._id}-M-Default`,
      product: product,
      quantity: 1,
      size: 'M',
      color: 'Default',
      price: product.price,
    };
    
    addToCart(cartItem);
    removeItem(product._id);
    toast.success('Moved to cart!');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-32 h-32 mx-auto mb-8 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center"
          >
            <FiHeart className="w-16 h-16 text-gray-400" />
          </motion.div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            Save your favorite items to your wishlist.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-puma-red text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors"
          >
            Browse Products
            <FiChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm mb-4">
            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-puma-red transition-colors">
              Home
            </Link>
            <FiChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 dark:text-white font-medium">Wishlist</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white">
                My Wishlist
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {items.length} {items.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            <FiHeart className="w-12 h-12 text-puma-red fill-puma-red" />
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {items.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-bold text-lg hover:scale-105 transition-transform text-center"
          >
            Continue Shopping
          </Link>
          <button
            onClick={() => {
              items.forEach((product) => handleMoveToCart(product));
              toast.success('All items moved to cart!');
            }}
            className="px-8 py-4 bg-puma-red text-white rounded-lg font-bold text-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            <FiShoppingCart className="w-6 h-6" />
            Add All to Cart
          </button>
        </div>

        {/* Recommendations */}
        <div className="mt-16">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* This would show recommended products based on wishlist items */}
            <div className="col-span-full text-center py-12 text-gray-500">
              Browse our collections to discover more amazing products
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
