'use client';

import { useState } from 'react';
import { useTheme } from '../../../components/ThemeProvider';
import HeartButton from '../../../components/HeartButton';

export function BlogContent({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const textColor = theme === 'light' ? 'text-neutral-800' : 'text-neutral-200';
  const [heartClicks, setHeartClicks] = useState(0);

  const handleHeartClick = () => {
    setHeartClicks((prev) => prev + 1);
  };

  return (
    <div className="relative">
      {/* Main article content */}
      <article
        className={`max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${textColor}`}
      >
        <div className="prose prose-lg max-w-none">{children}</div>

        {/* Heart button for mobile - at bottom of article */}
        <div className="lg:hidden flex flex-col items-center justify-center mt-12 mb-8">
          <HeartButton onClick={handleHeartClick} />
          <div className="text-2xl text-amber-500 font-bold flex items-center justify-center">
            #{heartClicks}
          </div>
        </div>
      </article>

      {/* Heart button for desktop/tablet - sticky on the right */}
      <div className="hidden lg:block">
        <div
          className="fixed top-1/2 -translate-y-1/2 z-10"
          style={{
            left: 'calc(50% + 20rem + 2rem)', // Position to the right of max-w-2xl content (32rem/2 + 2rem margin)
          }}
        >
          <HeartButton onClick={handleHeartClick} />
          <div className="text-2xl text-amber-500 font-bold flex items-center justify-center">
            #{heartClicks}
          </div>
        </div>
      </div>
    </div>
  );
}
