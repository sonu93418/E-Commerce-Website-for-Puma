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
      color: 'bg-blue-500',
    },
    {
      title: 'Profile',
      description: 'Edit your personal information',
      icon: FiUser,
      href: '/account/profile',
      color: 'bg-purple-500',
    },
    {
      title: 'Wishlist',
      description: 'View your saved items',
      icon: FiHeart,
      href: '/wishlist',
      color: 'bg-red-500',
    },
    {
      title: 'Addresses',
      description: 'Manage shipping addresses',
      icon: FiMapPin,
      href: '/account/addresses',
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
                My Account
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back, <span className="font-semibold">{user?.name}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-colors"
            >
              <FiLogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Account Sections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {accountSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={section.href}
                className="block bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
              >
                <div className={`${section.color} w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <section.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {section.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {section.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Recent Orders Preview */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              Recent Orders
            </h2>
            <Link
              href="/account/orders"
              className="text-puma-red font-semibold hover:underline"
            >
              View All
            </Link>
          </div>
          
          <div className="text-center py-12">
            <FiPackage className="w-20 h-20 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your recent orders will appear here
            </p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
