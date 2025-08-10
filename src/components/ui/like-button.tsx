'use client';

import React, { useMemo } from 'react';

import { Sparkles } from './sparkles';
import { HeartIcon } from '../icons/heart-icon';
import { useTheme } from '@/lib/hooks/use-theme';
import { useLikeAction } from '@/lib/hooks/like-button/use-like-action';
import { usePressAnimation } from '@/lib/hooks/like-button/use-press-animation';

interface LikeButtonProps {
  slug: string;
  initialLikeCount: number;
  className?: string;
}

export const LikeButton = ({
  slug,
  initialLikeCount,
  className = '',
}: LikeButtonProps) => {
  const { theme } = useTheme();

  const {
    sparkles,
    totalLikeCount,
    currentColor,
    fillPercentage,
    performLikeAction,
    handleSparklesComplete,
    handleClick,
    markAsTouchDevice,
    animationTrigger,
  } = useLikeAction({ slug, initialLikeCount });

  const {
    isPressed,
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
    handleTouchEnd,
  } = usePressAnimation({
    onTouchEnd: performLikeAction,
    onTouchDevice: markAsTouchDevice,
  });

  console.log('currentColor', currentColor);

  // Button configuration
  const BUTTON_SIZE = 56;
  const shadowBottomOffset = BUTTON_SIZE / 12;
  const shadowRightOffset = BUTTON_SIZE / 15;
  const containerPadding = BUTTON_SIZE / 5;

  // Theme-based colors
  const backgroundColor = theme === 'dark' ? '#0a1a33' : '#e6f0ff';

  return (
    <div className="flex items-center">
      {/* Heart button container */}
      <div
        className="relative"
        style={{
          width: `${BUTTON_SIZE + containerPadding * 3}px`,
          height: `${BUTTON_SIZE + containerPadding * 3}px`,
        }}
      >
        {/* Sparkle effects container */}
        <Sparkles
          sparkles={sparkles}
          onAnimationComplete={handleSparklesComplete}
        />

        {/* Main button element */}
        <button
          onClick={handleClick}
          className={`relative inline-block cursor-pointer select-none transition-transform duration-200 ease-out ${className}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            width: `${BUTTON_SIZE}px`,
            height: `${BUTTON_SIZE + shadowBottomOffset}px`,
            position: 'absolute',
            top: `${containerPadding}px`,
            left: `${containerPadding}px`,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
          aria-label="Interactive heart button"
        >
          {/* Shadow heart - creates 3D depth effect */}
          <div
            className="absolute transition-opacity duration-150 ease-out"
            style={{
              top: `${shadowBottomOffset}px`,
              left: `${shadowRightOffset}px`,
              opacity: isPressed ? 0 : 1, // Hide shadow when pressed
            }}
          >
            <HeartIcon size={BUTTON_SIZE} color={currentColor.secondary} />
          </div>

          {/* Main heart - the interactive element */}
          <div
            className="absolute transition-all duration-150 ease-out"
            style={{
              top: isPressed ? `${shadowBottomOffset}px` : '0px',
              left: isPressed ? `${shadowRightOffset}px` : '0px',
              transform: isPressed ? 'scale(0.98)' : 'scale(1)',
            }}
          >
            <HeartIcon
              size={BUTTON_SIZE}
              color={backgroundColor}
              fillColor={currentColor.primary}
              fillPercentage={fillPercentage}
              stroke={{ color: currentColor.primary, width: 3 }}
            />
          </div>
        </button>
      </div>

      {/* Like count display */}
      <div className="relative">
        <span
          className="text-lg font-semibold"
          style={{ color: currentColor.primary }}
        >
          {totalLikeCount}
        </span>

        {/* MAX text animation - always present */}
        <span
          key={animationTrigger} // This forces React to remount and restart animation
          className="absolute text-xs font-bold text-gray-400 pointer-events-none"
          style={{
            top: '-8px',
            right: '-20px',
            animation: 'fadeOutMax 1s ease-out forwards',
          }}
        >
          {fillPercentage >= 100 ? 'MAX' : '+1'}
        </span>
      </div>
    </div>
  );
};
