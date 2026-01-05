'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiChevronRight, FiCreditCard, FiMapPin, FiPackage, FiCheck } from 'react-icons/fi';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (items.length === 0) {
      router.push('/cart');
      return;
    }

    // Pre-fill with user data if available
    if (user) {
      setShippingInfo(prev => ({
        ...prev,
        fullName: user.name || `${user.firstName} ${user.lastName}`,
      }));
    }
  }, [isAuthenticated, items, router, user]);

  const subtotal = totalPrice;
  const shipping = subtotal > 200000 ? 0 : 1000;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validateShipping = () => {
    if (!shippingInfo.fullName || !shippingInfo.street || !shippingInfo.city || 
        !shippingInfo.state || !shippingInfo.postalCode || !shippingInfo.country || !shippingInfo.phone) {
      toast.error('Please fill in all shipping details');
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateShipping()) {
      return;
    }

    setLoading(true);

    try {
      const orderItems = items.map(item => ({
        product: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.price,
        image: item.product.images[0]?.url || '',
      }));

      const response = await api.post('/orders', {
        orderItems,
        shippingAddress: shippingInfo,
        paymentMethod,
        itemsPrice: subtotal,
        taxPrice: tax,
        shippingPrice: shipping,
        totalPrice: total,
      });

      const orderId = response.data.data?.order?._id;

      clearCart();
      toast.success('Order placed successfully!');
      
      // Redirect to order confirmation
      router.push(`/order-confirmation/${orderId}`);
    } catch (error: any) {
      console.error('Error placing order:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            Home
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <Link href="/cart" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            Cart
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 dark:text-white font-medium">Checkout</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Checkout
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete your order
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[
              { step: 1, label: 'Shipping', icon: FiMapPin },
              { step: 2, label: 'Payment', icon: FiCreditCard },
              { step: 3, label: 'Review', icon: FiPackage },
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      currentStep >= item.step
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                        : 'bg-gray-200 dark:bg-gray-800 text-gray-400'
                    }`}
                  >
                    {currentStep > item.step ? (
                      <FiCheck className="w-6 h-6" />
                    ) : (
                      <item.icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm font-medium mt-2 text-gray-600 dark:text-gray-400">
                    {item.label}
                  </span>
                </div>
                {index < 2 && (
                  <div
                    className={`w-16 sm:w-24 h-1 mx-2 ${
                      currentStep > item.step
                        ? 'bg-gray-900 dark:bg-white'
                        : 'bg-gray-200 dark:bg-gray-800'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-100 dark:border-gray-800"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FiMapPin className="w-5 h-5" />
                Shipping Information
              </h2>

              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white focus:outline-none transition-colors"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={shippingInfo.street}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white focus:outline-none transition-colors"
                    placeholder="123 Main St"
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white focus:outline-none transition-colors"
                      placeholder="New York"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white focus:outline-none transition-colors"
                      placeholder="NY"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white focus:outline-none transition-colors"
                      placeholder="110001"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white focus:outline-none transition-colors"
                    placeholder="India"
                  />
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-100 dark:border-gray-800"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FiCreditCard className="w-5 h-5" />
                Payment Method
              </h2>

              <div className="space-y-3">
                {[
                  { value: 'card', label: 'Credit / Debit Card' },
                  { value: 'cod', label: 'Cash on Delivery' },
                  { value: 'upi', label: 'UPI Payment' },
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === method.value
                        ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-gray-900"
                    />
                    <span className="ml-3 text-gray-900 dark:text-white font-medium">
                      {method.label}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-100 dark:border-gray-800 sticky top-24"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item._id} className="flex gap-3">
                    <img
                      src={item.product.images[0]?.url}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 py-4 border-t border-b border-gray-200 dark:border-gray-800">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white dark:border-gray-900"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FiCheck className="w-5 h-5" />
                    Place Order
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                By placing this order, you agree to our Terms & Conditions
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
