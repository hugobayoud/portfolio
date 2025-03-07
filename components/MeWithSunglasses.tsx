'use client';

import { useEffect, useState } from 'react';
import { Avatar } from '@radix-ui/themes';

import { useTheme } from './ThemeProvider';

export function MeWithSunglasses() {
  const { theme } = useTheme();
  const [showSunglasses, setShowSunglasses] = useState(false);

  // Effect to animate sunglasses when theme changes to light
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
}
