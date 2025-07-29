/**
 * HeartButton - Interactive Heart Component
 *
 * A refactored, modular implementation of an interactive heart button with:
 * - Separate CSS file for reusable animations (HeartButton.css)
 * - Dedicated Sparkles component for effect management (Sparkles.tsx)
 * - Comprehensive TypeScript documentation
 * - Improved developer experience and maintainability
 *
 * Architecture:
 * - HeartButton.tsx: Main component logic and UI
 * - Sparkles.tsx: Sparkle effects and utility functions
 * - HeartButton.css: Reusable CSS animations and styles
 */

import React, { useState } from 'react';
import Heart from './icons/Heart';
import Sparkles, { generateSparkles, type Sparkle } from './Sparkles';
import './HeartButton.css';

interface HeartButtonProps {
  onClick: () => void;
  className?: string;
}

interface ColorPair {
  primary: string;
  secondary: string;
}

const COLOR_PALETTE: ColorPair[] = [
  { primary: '#3b82f6', secondary: '#1e3a8a' }, // Blue
  { primary: '#ef4444', secondary: '#991b1b' }, // Red
  { primary: '#10b981', secondary: '#065f46' }, // Green
  { primary: '#f59e0b', secondary: '#92400e' }, // Amber
  { primary: '#8b5cf6', secondary: '#5b21b6' }, // Purple
  { primary: '#ec4899', secondary: '#be185d' }, // Pink
  { primary: '#06b6d4', secondary: '#0e7490' }, // Cyan
  { primary: '#84cc16', secondary: '#365314' }, // Lime
];

const HeartButton = ({ onClick, className = '' }: HeartButtonProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [colorIndex, setColorIndex] = useState<number>(0);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const BUTTON_SIZE = 64;
  const shadowBottomOffset = BUTTON_SIZE / 12;
  const shadowRightOffset = BUTTON_SIZE / 15;
  const containerPadding = 30; // Space for sparkles around button

  const currentColor = COLOR_PALETTE[colorIndex];

  const handleMouseDown = (): void => {
    setIsPressed(true);
  };

  const handleMouseUp = (): void => {
    setIsPressed(false);

    // Cycle to next color in palette
    const nextIndex = (colorIndex + 1) % COLOR_PALETTE.length;
    setColorIndex(nextIndex);

    // Generate sparkles with golden color for consistent visual appeal
    const newSparkles = generateSparkles('#f59e0b', BUTTON_SIZE);
    setSparkles(newSparkles);

    onClick();
  };

  const handleMouseLeave = (): void => {
    setIsPressed(false);
  };

  const handleSparklesComplete = (): void => {
    // Clear sparkles after animation completes
    setSparkles([]);
  };

  return (
    <div
      className="relative"
      style={{
        width: `${BUTTON_SIZE + containerPadding * 2}px`,
        height: `${BUTTON_SIZE + containerPadding * 2}px`,
      }}
    >
      {/* Sparkle effects container */}
      <Sparkles
        sparkles={sparkles}
        onAnimationComplete={handleSparklesComplete}
        containerSize={BUTTON_SIZE}
      />

      {/* Main button element */}
      <button
        className={`relative inline-block cursor-pointer select-none ${className}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          width: `${BUTTON_SIZE}px`,
          height: `${BUTTON_SIZE + shadowBottomOffset}px`,
          position: 'absolute',
          top: `${containerPadding}px`,
          left: `${containerPadding}px`,
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
          <Heart size={BUTTON_SIZE} color={currentColor.secondary} />
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
          <Heart size={BUTTON_SIZE} color={currentColor.primary} />
        </div>
      </button>
    </div>
  );
};

export default HeartButton;
