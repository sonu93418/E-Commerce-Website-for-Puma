'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiUser, FiShoppingBag, FiHeart, FiMapPin, FiLogOut, FiPackage } from 'react-icons/fi';
import { useAuthStore } from '@/store/authStore';

export default function AccountPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-puma-red"></div>
      </div>
    );
  }

  const accountSections = [
    {
      title: 'My Orders',
      description: 'Track, return, or buy again',
      icon: FiShoppingBag,
      href: '/account/orders',
    },
    {
      title: 'Profile',
      description: 'Edit your personal information',
      icon: FiUser,
      href: '/account/profile',
    },
    {
      title: 'Wishlist',
      description: 'View your saved items',
      icon: FiHeart,
      href: '/wishlist',
    },
    {
      title: 'Addresses',
      description: 'Manage shipping addresses',
      icon: FiMapPin,
      href: '/account/addresses',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                My Account
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Welcome back, <span className="font-semibold">{user?.name || `${user?.firstName} ${user?.lastName}`}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-900 dark:bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors border border-gray-900 dark:border-gray-700"
            >
              <FiLogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
          <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800" />
        </div>

        {/* Account Sections Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {accountSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={section.href}
                className="block bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-100 dark:border-gray-800 hover:border-gray-900 dark:hover:border-gray-600 transition-all duration-300 group h-full"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-900 dark:group-hover:bg-white transition-colors duration-300">
                    <section.icon className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-gray-900 transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                  {section.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {section.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 sm:p-8 border-2 border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
            <Link
              href="/account/orders"
              className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              View All Orders
              <FiShoppingBag className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="text-center py-12 sm:py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <FiPackage className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No orders yet
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Your order history will appear here. Start exploring our collection.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
