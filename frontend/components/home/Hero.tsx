'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FUNCTIONS_CONFIG_MANIFEST } from 'next/dist/shared/lib/constants';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'RUNNING SHOES',
      subtitle: 'Speed Meets Style',
      description: 'Engineered for performance, designed for champions',
      image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/376812/01/sv01/fnd/IND/fmt/png/Velocity-NITRO-2-Men%E2%80%99s-Running-Shoes',
      category: 'Shoes',
      gradient: 'from-blue-900 via-black to-purple-900',
    },
    {
      id: 2,
      title: 'FOOTBALL COLLECTION',
      subtitle: 'Dominate The Field',
      description: 'Professional gear for the modern athlete',
      image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/106559/01/sv01/fnd/IND/fmt/png/FUTURE-Z-1.3-FG/AG-Men%E2%80%99s-Football-Boots',
      category: 'Sports',
      gradient: 'from-green-900 via-black to-emerald-900',
    },
    {
      id: 3,
      title: 'LIFESTYLE APPAREL',
      subtitle: 'Street Meets Sport',
      description: 'Premium clothing for everyday excellence',
      image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/586667/01/mod01/fnd/IND/fmt/png/Essentials-Logo-Men%E2%80%99s-Tee',
      category: 'Apparel',
      gradient: 'from-red-900 via-black to-orange-900',
    },
    {
      id: 4,
      title: 'CLASSIC SNEAKERS',
      subtitle: 'Timeless Heritage',
      description: 'Iconic designs reimagined for today',
      image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/374915/01/sv01/fnd/IND/fmt/png/Suede-Classic-XXI-Unisex-Sneakers',
      category: 'Shoes',
      gradient: 'from-gray-900 via-black to-slate-900',
    },
    {
      id: 5,
      title: 'SPORTS ACCESSORIES',
      subtitle: 'Complete Your Game',
      description: 'Essential gear for peak performance',
      image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/078834/01/fnd/IND/fmt/png/Evercat-Contender-Unisex-Backpack',
      category: 'Accessories',
      gradient: 'from-indigo-900 via-black to-violet-900',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-screen overflow-hidden bg-black pt-16 md:pt-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1] }}
          className={`absolute inset-0 pt-16 md:pt-20 bg-gradient-to-br ${slides[currentSlide].gradient}`}
        >
          {/* Content Container */}
          <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 flex items-center">
            <div className="grid lg:grid-cols-2 gap-4 md:gap-8 items-center w-full max-h-full">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-white space-y-4 md:space-y-6 z-10"
              >
                {/* Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                  className="inline-block"
                >
                  <img
                    src="https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png"
                    alt="PUMA Logo"
                    className="h-12 md:h-16 w-auto"
                  />
                </motion.div>

                {/* Category */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xs md:text-sm text-gray-400 tracking-widest uppercase"
                >
                  {slides[currentSlide].subtitle}
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-black leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300"
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-2 md:pt-4"
                >
                  <Link href={`/products?category=${slides[currentSlide].category}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto px-6 py-3 md:px-10 md:py-4 bg-puma-red text-white text-sm sm:text-base md:text-lg font-bold rounded-full shadow-2xl hover:bg-red-600 transition-all"
                    >
                      Shop Now
                    </motion.button>
                  </Link>
                  <Link href="/products">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto px-6 py-3 md:px-10 md:py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white text-sm sm:text-base md:text-lg font-bold rounded-full hover:bg-white/20 transition-all"
                    >
                      View All
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Content - Product Image */}
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center"
              >
                <motion.img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="max-w-full max-h-full object-contain drop-shadow-2xl"
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? 'w-12 bg-puma-red' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
