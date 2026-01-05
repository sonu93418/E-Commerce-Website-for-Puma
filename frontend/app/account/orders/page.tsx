'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiPackage, FiTruck, FiCheck, FiX, FiClock, FiChevronRight } from 'react-icons/fi';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';

interface Order {
  _id: string;
  orderNumber: string;
  items: Array<{
    product: {
      _id: string;
      name: string;
      images: Array<{ url: string; alt: string }>;
    };
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: string;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      fetchOrders();
    }
  }, [user, router]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/orders/myorders');
      const ordersData = response.data.data?.orders || response.data.orders || [];
      
      // Format orders
      const formattedOrders = ordersData.map((order: any) => ({
        _id: order._id,
        orderNumber: order._id.toString().slice(-8).toUpperCase(),
        items: order.orderItems.map((item: any) => ({
          product: {
            _id: item.product._id,
            name: item.product.name || item.name,
            images: item.product.images || [{ url: item.image, alt: item.name }]
          },
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: order.totalPrice,
        status: order.orderStatus || 'pending',
        shippingAddress: order.shippingAddress,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt
      }));
      
      setOrders(formattedOrders);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <FiClock className="w-5 h-5" />;
      case 'processing':
        return <FiPackage className="w-5 h-5" />;
      case 'shipped':
        return <FiTruck className="w-5 h-5" />;
      case 'delivered':
        return <FiCheck className="w-5 h-5" />;
      case 'cancelled':
        return <FiX className="w-5 h-5" />;
      default:
        return <FiClock className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-puma-red"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/account"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white mb-4 inline-flex items-center gap-2"
          >
            ← Back to Account
          </Link>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
            My Orders
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and manage your orders
          </p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 text-center shadow-lg">
            <FiPackage className="w-20 h-20 mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No orders yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start shopping to see your orders here
            </p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Order #{order.orderNumber}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.product._id} className="flex items-center gap-4">
                        <img
                          src={item.product.images[0]?.url}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Quantity: {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="font-bold text-gray-900 dark:text-white">
                          ${(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  {order.shippingAddress && (
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Shipping Address
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {order.shippingAddress.street}<br />
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-6 flex gap-4">
                    <Link
                      href={`/account/orders/${order._id}`}
                      className="flex-1 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold text-center hover:scale-105 transition-transform flex items-center justify-center gap-2"
                    >
                      View Details
                      <FiChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
