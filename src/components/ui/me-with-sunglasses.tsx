'use client';

import { Avatar } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

import { useTheme } from '@/lib/hooks/use-theme';

/**
 * Light gradient: light blue to dark blue
 * Dark gradient: dark blue to dark purple
 */
const lightGradient =
  'bg-gradient-to-t from-light-blue to-dark-blue shadow-[0_0_15px_rgba(0,7,131,0.6)]';
const darkGradient =
  'bg-gradient-to-t from-light-yellow to-dark-yellow shadow-[0_0_15px_rgba(247,196,0,0.6)]';

export const MeWithSunglasses = () => {
  const { theme } = useTheme();
  const [showSunglasses, setShowSunglasses] = useState(false);

  // Effect to animate sunglasses when theme changes
  useEffect(() => {
    if (theme === 'light') {
      // Small delay before showing sunglasses for better animation effect
      const timer = setTimeout(() => {
        setShowSunglasses(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setShowSunglasses(false);
    }
  }, [theme]);

  return (
    <div className="relative">
      {/* Animated background */}
      <div
        className={`absolute rounded-full transition-colors duration-1000 ease-in-out ${
          theme === 'light' ? lightGradient : darkGradient
        }`}
        style={{ width: '100%', height: '100%', zIndex: -1 }}
      />

      <Avatar src="/hugo.png" size="9" fallback="HB" radius="full" />

      {/* Sunglasses overlay */}
      {theme === 'light' && (
        <div
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
          style={{
            opacity: showSunglasses ? 1 : 0,
            transform: `translateY(${showSunglasses ? '0' : '-10px'})`,
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          <Avatar
            src="/sunglasses.png"
            size="9"
            fallback="HB"
            radius="full"
            style={{
              position: 'absolute',
              zIndex: 10,
            }}
          />
        </div>
      )}
    </div>
  );
};
