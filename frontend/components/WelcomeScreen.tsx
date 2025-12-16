'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function WelcomeScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user has seen the welcome screen before
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    
    if (hasSeenWelcome) {
      setIsVisible(false);
    } else {
      // Hide welcome screen after 4 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('hasSeenWelcome', 'true');
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-puma-red overflow-hidden"
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-32 h-32 border border-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="relative text-center z-10">
            {/* PUMA Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 15,
                duration: 1.5,
              }}
              className="mb-8"
            >
              {/* Puma Cat Icon */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="inline-block"
              >
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 100 100"
                  className="drop-shadow-2xl"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                    d="M 20 50 Q 30 20, 50 30 Q 70 20, 80 50 Q 85 70, 70 80 Q 50 90, 30 80 Q 15 70, 20 50 M 40 45 Q 45 40, 50 45 Q 55 40, 60 45"
                    fill="none"
                    stroke="#FF0000"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="40" cy="45" r="4" fill="#FF0000" />
                  <circle cx="60" cy="45" r="4" fill="#FF0000" />
                </svg>
              </motion.div>
            </motion.div>

            {/* PUMA Text with Glorious Animation */}
            <div className="relative">
              {/* Background Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 blur-3xl bg-puma-red rounded-full"
              />

              {/* Main PUMA Text */}
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="relative text-[120px] md:text-[180px] font-black tracking-wider"
                style={{
                  fontFamily: "'Montserrat', 'Arial Black', sans-serif",
                  fontWeight: 900,
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.3)',
                  textShadow: '0 0 40px rgba(255, 0, 0, 0.8), 0 0 80px rgba(255, 0, 0, 0.4)',
                }}
              >
                {/* Gradient Text */}
                <span
                  className="bg-clip-text text-transparent bg-gradient-to-r from-white via-red-100 to-puma-red"
                  style={{
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  PUMA
                </span>

                {/* Animated Light Rays */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute inset-0 opacity-30"
                >
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-2 h-full bg-gradient-to-t from-transparent via-puma-red to-transparent"
                      style={{
                        transform: `rotate(${i * 45}deg) translateX(-50%)`,
                        transformOrigin: 'center',
                      }}
                    />
                  ))}
                </motion.div>
              </motion.h1>

              {/* Particles Effect */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    animate={{
                      x: [0, (Math.random() - 0.5) * 400],
                      y: [0, (Math.random() - 0.5) * 400],
                      opacity: [1, 0],
                      scale: [1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: 1 + Math.random(),
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-8 text-2xl md:text-4xl font-bold text-white tracking-[0.3em]"
              style={{
                textShadow: '0 0 20px rgba(255, 0, 0, 0.6)',
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              FOREVER FASTER
            </motion.p>

            {/* Speed Lines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: '200%', opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.5,
                    delay: 2 + i * 0.1,
                    ease: 'easeInOut',
                  }}
                  className="absolute h-[2px] bg-gradient-to-r from-transparent via-white to-transparent"
                  style={{
                    top: `${30 + i * 10}%`,
                    width: '100%',
                  }}
                />
              ))}
            </div>

            {/* Loading Indicator */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 3.5, ease: 'easeInOut' }}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-puma-red via-white to-puma-red"
            />
          </div>

          {/* Corner Accents */}
          {[
            { top: 0, left: 0, rotate: 0 },
            { top: 0, right: 0, rotate: 90 },
            { bottom: 0, right: 0, rotate: 180 },
            { bottom: 0, left: 0, rotate: 270 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
              className="absolute w-32 h-32"
              style={{
                ...pos,
                rotate: `${pos.rotate}deg`,
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M 0 20 L 20 0 L 20 20 L 0 20 M 0 40 L 40 0 L 40 40 L 0 40"
                  fill="rgba(255, 0, 0, 0.3)"
                />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
