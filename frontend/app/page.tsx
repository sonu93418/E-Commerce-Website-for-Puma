'use client';

import { useEffect } from 'react';
import Hero from '@/components/home/Hero';
import PromoPoster from '@/components/home/PromoPoster';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import { useThemeStore } from '@/store/themeStore';

export default function Home() {
  const { setTheme, isDark } = useThemeStore();

  useEffect(() => {
    // Initialize theme
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="overflow-hidden">
      <Hero />
      <PromoPoster />
      <FeaturedProducts />
      <CategoryShowcase />
    </div>
  );
}
