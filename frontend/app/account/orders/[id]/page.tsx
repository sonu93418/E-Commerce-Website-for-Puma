'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiPackage, FiTruck, FiCheck, FiClock, FiMapPin, FiDollarSign, FiCalendar } from 'react-icons/fi';
import { useAuthStore } from '@/store/authStore';
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
  };
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuthStore();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (!user) {
        router.push('/login');
      } else {
        fetchOrderDetails();
      }
    }
  }, [user, router, params.id, mounted]);

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
            images: item.product.images || [{ url: item.image, alt: item.name }]
          },
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: orderData.totalPrice,
        status: orderData.orderStatus || 'pending',
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod || 'Card',
        createdAt: orderData.createdAt,
        updatedAt: orderData.updatedAt
      };
      
      setOrder(formattedOrder);
    } catch (error: any) {
      console.error('Error fetching order details:', error);
      toast.error('Failed to load order details');
      router.push('/account/orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusSteps = () => {
    const steps = [
      { name: 'Order Placed', icon: FiCheck, status: 'pending' },
      { name: 'Processing', icon: FiPackage, status: 'processing' },
      { name: 'Shipped', icon: FiTruck, status: 'shipped' },
      { name: 'Delivered', icon: FiCheck, status: 'delivered' }
    ];

    const currentStatusIndex = steps.findIndex(step => step.status === order?.status.toLowerCase());
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentStatusIndex,
      active: index === currentStatusIndex
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (!order || !user) {
    return null;
  }

  const statusSteps = getStatusSteps();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/account/orders"
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 inline-flex items-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Orders
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Order #{order.orderNumber}
            </h1>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Timeline */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Status</h2>
              
              <div className="relative">
                {statusSteps.map((step, index) => (
                  <motion.div
                    key={step.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex items-center mb-8 last:mb-0"
                  >
                    {/* Connector Line */}
                    {index < statusSteps.length - 1 && (
                      <div className={`absolute left-6 top-12 w-0.5 h-full ${
                        step.completed ? 'bg-gray-900 dark:bg-white' : 'bg-gray-200 dark:bg-gray-800'
                      }`} />
                    )}
                    
                    {/* Icon */}
                    <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      step.completed
                        ? 'bg-gray-900 dark:bg-white'
                        : step.active
                        ? 'bg-gray-300 dark:bg-gray-700 animate-pulse'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <step.icon className={`w-6 h-6 ${
                        step.completed ? 'text-white dark:text-gray-900' : 'text-gray-400 dark:text-gray-500'
                      }`} />
                    </div>
                    
                    {/* Text */}
                    <div className="ml-4 flex-1">
                      <h3 className={`text-base font-semibold ${
                        step.completed || step.active
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-400 dark:text-gray-600'
                      }`}>
                        {step.name}
                      </h3>
                      {step.active && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          In progress
                        </p>
                      )}
                      {step.completed && !step.active && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Completed
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.product._id} className="flex items-start gap-4 pb-4 last:pb-0 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <img
                      src={item.product.images[0]?.url}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                        {item.product.name}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>Qty: {item.quantity}</span>
                        <span>×</span>
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <p className="text-base font-bold text-gray-900 dark:text-white">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">Free</span>
                </div>
                <div className="h-px bg-gray-100 dark:bg-gray-800 my-3" />
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FiMapPin className="w-5 h-5" />
                Shipping Address
              </h2>
              <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed space-y-1">
                <p className="font-semibold text-gray-900 dark:text-white">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                <p>{order.shippingAddress.zipCode}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FiDollarSign className="w-5 h-5" />
                Payment Method
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {order.paymentMethod}
              </p>
            </div>

            {/* Need Help */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                Need Help?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Contact our customer support for any questions about your order.
              </p>
              <button className="w-full py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
