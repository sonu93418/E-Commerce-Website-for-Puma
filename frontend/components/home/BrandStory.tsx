'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-black text-white">
      {/* Animated Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black" />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-puma-red opacity-5 rounded-full blur-3xl"
        />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              The <span className="text-gradient">PUMA</span> Story
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-puma-red to-transparent mx-auto" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8 text-lg text-gray-300 leading-relaxed"
          >
            <p className="text-xl md:text-2xl text-white font-semibold text-center mb-8">
              "Forever Faster"
            </p>
            
            <p>
              PUMA is one of the world's leading sports brands, designing, developing, selling and marketing footwear, apparel and accessories. For over 70 years, PUMA has relentlessly pushed sport and culture forward by creating fast products for the world's fastest athletes.
            </p>

            <p>
              PUMA offers performance and sport-inspired lifestyle products in categories such as Football, Running and Training, Basketball, Golf, and Motorsports. It collaborates with renowned designers and brands to bring sport influences into street culture and fashion.
            </p>

            <p>
              The PUMA Group owns the brands PUMA, Cobra Golf and stichd. The company distributes its products in more than 120 countries, employs about 16,000 people worldwide, and is headquartered in Herzogenaurach/Germany.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          >
            {[
              { value: '70+', label: 'Years of Excellence' },
              { value: '120+', label: 'Countries Worldwide' },
              { value: '16K+', label: 'Team Members' },
              { value: '#1', label: 'In Innovation' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
