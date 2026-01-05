'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCheck, FiPackage, FiMapPin, FiCalendar, FiCreditCard } from 'react-icons/fi';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';

interface OrderItem {
  product: {
    _id: string;
    name: string;
    images: Array<{ url: string; alt: string }>;
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  paymentMethod: string;
  createdAt: string;
}

export default function OrderConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [params.id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/orders/${params.id}`);
      const orderData = response.data.data?.order || response.data.order;

      const formattedOrder = {
        _id: orderData._id,
        orderNumber: orderData._id.toString().slice(-8).toUpperCase(),
        items: orderData.orderItems.map((item: any) => ({
          product: {
            _id: item.product._id,
            name: item.product.name || item.name,
            images: item.product.images || [{ url: item.image, alt: item.name }],
          },
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: orderData.totalPrice,
        status: orderData.orderStatus || 'pending',
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod || 'card',
        createdAt: orderData.createdAt,
      };

      setOrder(formattedOrder);
    } catch (error: any) {
      console.error('Error fetching order:', error);
      toast.error('Failed to load order details');
      router.push('/account/orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center">
            <FiCheck className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            Thank you for your purchase
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Order Number: <span className="font-bold text-gray-900 dark:text-white">#{order.orderNumber}</span>
          </p>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Order Info Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Shipping Address */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FiMapPin className="w-5 h-5" />
                Shipping Address
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p className="font-semibold text-gray-900 dark:text-white">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.phone}</p>
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FiPackage className="w-5 h-5" />
                Order Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <FiCalendar className="w-4 h-4" />
                  <span>
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <FiCreditCard className="w-4 h-4" />
                  <span className="capitalize">{order.paymentMethod}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                  <span className="text-gray-600 dark:text-gray-400">Total Amount:</span>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ₹{order.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              Order Items ({order.items.length})
            </h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.product._id} className="flex gap-4 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                  <img
                    src={item.product.images[0]?.url}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                  />
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Quantity: {item.quantity} × ₹{item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      ₹{(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/account/orders"
              className="flex-1 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold text-center hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              View All Orders
            </Link>
            <Link
              href="/products"
              className="flex-1 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-semibold text-center hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Confirmation Message */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
              What happens next?
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-2">
              <li>✓ We've received your order and will start processing it shortly</li>
              <li>✓ You'll receive an email confirmation at your registered email</li>
              <li>✓ Track your order anytime from your account dashboard</li>
              <li>✓ Estimated delivery: 3-5 business days</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
