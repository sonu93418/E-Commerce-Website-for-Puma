'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiShoppingBag, FiTrendingUp } from 'react-icons/fi';

export default function PromoPoster() {
  return (
    <section className="py-16 bg-gradient-to-br from-puma-red via-red-600 to-red-700 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Animated Background Elements */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -bottom-20 -left-20 w-96 h-96 bg-black opacity-10 rounded-full blur-3xl"
          />

          {/* Main Content */}
          <div className="relative z-10 text-center text-white">
            {/* PUMA Logo */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <img
                src="https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png"
                alt="PUMA Logo"
                className="h-16 w-auto mx-auto drop-shadow-2xl"
              />
            </motion.div>

            {/* Main Discount */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-6 md:mb-8"
            >
              <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-heading font-black mb-2 md:mb-4 drop-shadow-2xl">
                50% OFF
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                ON ALL PUMA PRODUCTS
              </p>
            </motion.div>
            

            {/* Product Categories Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto mb-6 md:mb-8 px-4"
            >
              {[
                { image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_300,h_300/global/374915/01/sv01/fnd/IND/fmt/png/Suede-Classic-XXI-Unisex-Sneakers', label: 'Shoes', category: 'Shoes' },
                { image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_300,h_300/global/586667/01/mod01/fnd/IND/fmt/png/Essentials-Logo-Men%E2%80%99s-Tee', label: 'T-Shirts', category: 'Apparel' },
                { image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_300,h_300/global/078834/01/fnd/IND/fmt/png/Evercat-Contender-Unisex-Backpack', label: 'Accessories', category: 'Accessories' },
                { image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_300,h_300/global/106559/01/sv01/fnd/IND/fmt/png/FUTURE-Z-1.3-FG/AG-Men%E2%80%99s-Football-Boots', label: 'Sports Gear', category: 'Sports' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/20 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 border-2 border-white/30 cursor-pointer"
                >
                  <img src={item.image} alt={item.label} className="w-full h-16 sm:h-20 md:h-24 object-contain mb-1 md:mb-2" />
                  <div className="font-semibold text-sm sm:text-base md:text-lg">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
           

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4"
            >
              <Link href="/products" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 sm:px-8 md:px-10 py-3 md:py-5 bg-white text-puma-red text-base sm:text-lg md:text-xl font-bold rounded-full shadow-2xl hover:shadow-white/50 transition-all flex items-center justify-center gap-2 md:gap-3"
                >
                  <FiShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
                  <span>Shop Now & Save</span>
                </motion.button>
              </Link>
              <Link href="/products?sort=newest" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 sm:px-8 md:px-10 py-3 md:py-5 bg-black/30 backdrop-blur-sm text-white text-base sm:text-lg md:text-xl font-bold rounded-full border-3 border-white hover:bg-black/50 transition-all flex items-center justify-center gap-2 md:gap-3"
                >
                  <FiTrendingUp className="w-5 h-5 md:w-6 md:h-6" />
                  <span>View All Deals</span>
                </motion.button>
              </Link>
            </motion.div>
            //  the proper formatting the error was causing 

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-sm"
            >
              <p className="bg-black/20 backdrop-blur-sm inline-block px-6 py-2 rounded-full">
                Free Shipping on Orders Over ₹200,000 | Easy Returns
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
