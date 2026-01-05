'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

export default function WelcomeScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Check if welcome screen has been shown before
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    
    if (!hasSeenWelcome) {
      setShouldShow(true);
      setIsVisible(true);
      sessionStorage.setItem('hasSeenWelcome', 'true');
    }
  }, []);

  useEffect(() => {
    if (!shouldShow || !isVisible || hasAnimated.current) return;

    // GSAP animation for logo reveal
    if (logoRef.current) {
      hasAnimated.current = true;
      
      gsap.fromTo(
        logoRef.current,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          scale: 0.8,
          opacity: 0,
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1,
          opacity: 1,
          ease: 'expo.out',
          duration: 1.5,
          delay: 0.5,
        }
      );
    }

    // Hide welcome screen after animation completes
    // Text animation: 1.5s duration * 2 repeats + delays = ~5s
    // Logo animation: 0.5s delay + 1.5s duration = 2s
    // Exit animation: 0.8s
    // Total: ~5.8s for smooth transition
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5800);

    return () => clearTimeout(timer);
  }, [shouldShow, isVisible]);

  if (!shouldShow) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black overflow-hidden"
        >
          {/* Alternating Black and White Stripes */}
          <div className="absolute left-0 right-0 top-[15%] bottom-[15%]">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-full h-[16.666%] ${
                  i % 2 === 0 ? 'bg-black' : 'bg-white'
                } flex items-center overflow-hidden`}
                style={{ top: `${i * 16.666}%` }}
              >
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{
                    duration: 1.5,
                    repeat: 2,
                    ease: 'linear',
                    delay: i * 0.15,
                  }}
                  className="whitespace-nowrap flex"
                >
                  {[...Array(20)].map((_, j) => (
                    <span
                      key={j}
                      className={`text-6xl md:text-8xl lg:text-9xl font-black mx-12 ${
                        i % 2 === 0 ? 'text-white' : 'text-black'
                      }`}
                    >
                      PUMA
                    </span>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Center PUMA Logo with GSAP Animation */}
          <div ref={logoRef} className="relative z-10">
            {/* PUMA Logo */}
            <img
              src="https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png"
              alt="PUMA Logo"
              className="w-64 md:w-96 h-auto relative z-10 drop-shadow-2xl"
            />

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
