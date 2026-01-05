'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMinus, FiPlus, FiShoppingBag, FiChevronRight, FiTrash2 } from 'react-icons/fi';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'react-hot-toast';

export default function CartPage() {
  const router = useRouter();
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'PUMA20') {
      setDiscount(0.2);
      toast.success('20% discount applied!');
    } else if (promoCode) {
      toast.error('Invalid promo code');
    }
  };

  const subtotal = totalPrice;
  const shipping = subtotal > 200000 ? 0 : 1000;
  const discountAmount = subtotal * discount;
  const total = subtotal + shipping - discountAmount;

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    toast.success('Proceeding to checkout...');
    // Navigate to checkout page (to be created)
    router.push('/checkout');
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
            <FiShoppingBag className="w-16 h-16 text-gray-400" />
          </motion.div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            Looks like you haven't added any items yet.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-puma-red text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors"
          >
            Start Shopping
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
            <span className="text-gray-900 dark:text-white font-medium">Shopping Cart</span>
          </nav>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white">
            Shopping Cart
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <Link
                      href={`/products/${item.product._id}`}
                      className="flex-shrink-0 w-full sm:w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden group"
                    >
                      <img
                        src={item.product.images[0]?.url || '/placeholder.jpg'}
                        alt={item.product.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <Link
                            href={`/products/${item.product._id}`}
                            className="text-lg font-bold text-gray-900 dark:text-white hover:text-puma-red transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <div className="flex gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <span>Size: <span className="font-semibold">{item.size}</span></span>
                            <span>Color: <span className="font-semibold">{item.color}</span></span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            removeItem(item._id);
                            toast.success('Removed from cart');
                          }}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                            className="w-10 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-puma-red font-bold transition-colors"
                          >
                            <FiMinus className="w-4 h-4 mx-auto" />
                          </button>
                          <span className="text-xl font-bold w-12 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item._id, Math.min(10, item.quantity + 1))}
                            className="w-10 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-puma-red font-bold transition-colors"
                          >
                            <FiPlus className="w-4 h-4 mx-auto" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-2xl font-black text-puma-red">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            ₹{item.price.toLocaleString()} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              onClick={() => {
                clearCart();
                toast.success('Cart cleared');
              }}
              className="w-full text-center py-3 text-red-500 hover:text-red-700 font-semibold transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg sticky top-8">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                    <span className="font-semibold">-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t dark:border-gray-700 pt-4 flex justify-between text-xl font-black">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-puma-red">₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:border-puma-red outline-none"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-bold hover:scale-105 transition-transform"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Try: PUMA20 for 20% off
                </p>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-puma-red text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors mb-4"
              >
                Proceed to Checkout
              </button>

              <Link
                href="/products"
                className="block text-center text-gray-600 dark:text-gray-400 hover:text-puma-red transition-colors font-semibold"
              >
                Continue Shopping
              </Link>

              {/* Free Shipping Banner */}
              {shipping > 0 && (
                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">
                    Add ₹{(200000 - subtotal).toLocaleString()} more to get FREE shipping!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
