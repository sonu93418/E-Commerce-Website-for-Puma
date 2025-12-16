'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function CategoryShowcase() {
  const categories = [
    {
      id: 1,
      name: 'Shoes',
      description: 'Performance footwear for every sport',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      href: '/products?category=Shoes',
    },
    {
      id: 2,
      name: 'Apparel',
      description: 'Premium sportswear and lifestyle clothing',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
      href: '/products?category=Apparel',
    },
    {
      id: 3,
      name: 'Accessories',
      description: 'Complete your athletic look',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
      href: '/products?category=Accessories',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4"
          >
            Shop by <span className="text-gradient">Category</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            Find the perfect gear for your athletic lifestyle
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={category.href}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group relative h-[500px] rounded-2xl overflow-hidden cursor-pointer"
                >
                  {/* Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <motion.h3
                      className="text-3xl font-heading font-bold text-white mb-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {category.name}
                    </motion.h3>
                    <p className="text-gray-300 mb-4">{category.description}</p>
                    <div className="flex items-center text-puma-red font-semibold group-hover:gap-3 transition-all">
                      <span>Shop Now</span>
                      <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-puma-red transition-all duration-300 rounded-2xl" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
