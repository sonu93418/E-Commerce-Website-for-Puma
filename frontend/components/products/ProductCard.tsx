'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, calculateDiscount } from '@/lib/utils';
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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  const inWishlist = isInWishlist(product._id);
  const discount = product.originalPrice 
    ? calculateDiscount(product.originalPrice, product.price) 
    : 0;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product._id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // For quick add, use default size and color
    const cartItem = {
      _id: `${product._id}-default`,
      product: product,
      quantity: 1,
      size: 'M',
      color: 'Black',
      price: product.price,
    };
    addToCart(cartItem);
    toast.success('Added to cart');
  };

  return (
    <Link href={`/products/${product._id}`}>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-white dark:bg-gray-700">
          <img
            src={product.images[0]?.url || '/placeholder.jpg'}
            alt={product.images[0]?.alt || product.name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 p-4"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {discount > 0 && (
              <div className="bg-puma-red text-white px-3 py-1 rounded-full text-sm font-semibold">
                -{discount}%
              </div>
            )}
            {(product as any).isNewArrival && (
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                NEW
              </div>
            )}
            {(product as any).isBestseller && (
              <div className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                BESTSELLER
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlist}
            className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-colors ${
              inWishlist
                ? 'bg-puma-red text-white'
                : 'bg-white/80 text-gray-800 hover:bg-puma-red hover:text-white'
            }`}
          >
            <FiHeart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
          </motion.button>

          {/* Quick Add Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleQuickAdd}
            className="absolute bottom-4 left-4 right-4 py-3 bg-puma-black text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-puma-red transition-colors"
          >
            <FiShoppingCart className="w-5 h-5" />
            Quick Add
          </motion.button>
        </div>

        {/* Product Info */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Category & Stock */}
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold">
              {product.category}
            </div>
            {(product as any).totalStock && (product as any).totalStock < 10 && (
              <div className="text-xs text-red-600 font-semibold">
                Only {(product as any).totalStock} left
              </div>
            )}
          </div>

          {/* Name */}
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-puma-red transition-colors min-h-[3rem]">
            {product.name}
          </h3>

          {/* Colors Available */}
          {(product as any).colors && (product as any).colors.length > 0 && (
            <div className="flex items-center gap-1 mb-2">
              {(product as any).colors.slice(0, 4).map((color: any, index: number) => (
                <div
                  key={index}
                  className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {(product as any).colors.length > 4 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                  +{(product as any).colors.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-base ${
                    i < Math.round(product.rating.average)
                      ? 'text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ({product.rating.count})
            </span>
          </div>

          {/* Price - Push to bottom */}
          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            {/* Features Tags */}
            {(product as any).tags && (product as any).tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {(product as any).tags.slice(0, 2).map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
