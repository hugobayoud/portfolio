import React, { useEffect } from 'react';
import '../../styles/heart-button.css';

export interface Sparkle {
  id: number;
  x: number;
  y: number;
  color: string;
  delay: number;
}

interface SparklesProps {
  sparkles: Sparkle[];
  onAnimationComplete: () => void;
}

/**
 * Sparkles Component
 *
 * Renders animated sparkle effects that appear around interactive elements.
 * Handles automatic cleanup after animation completion.
 *
 * @param sparkles - Array of sparkle configurations
 * @param onAnimationComplete - Callback fired when animation ends
 */
export const Sparkles = ({ sparkles, onAnimationComplete }: SparklesProps) => {
  // Auto-cleanup sparkles after animation duration
  useEffect(() => {
    if (sparkles.length > 0) {
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, 800); // Animation duration (600ms) + buffer (200ms)

      return () => clearTimeout(timer);
    }
  }, [sparkles, onAnimationComplete]);

  return (
    <>
      {/* Render each sparkle with staggered animation */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none heart-sparkle bg-amber-300 z-10"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            transform: 'translate(-50%, -50%)',
            animationDelay: `${sparkle.delay}ms`,
          }}
        >
          {/* Individual sparkle dot */}
          <div
            className="sparkle-dot"
            style={{
              backgroundColor: sparkle.color,
              boxShadow: `0 0 6px ${sparkle.color}`,
            }}
          />
        </div>
      ))}
    </>
  );
};

/**
 * Utility function to generate sparkle configurations
 *
 * Creates an array of sparkle objects positioned randomly around a center point.
 * Each sparkle has randomized position, timing, and appearance properties.
 *
 * @param color - Color for the sparkles
 * @param buttonSize - Size of the button to calculate positioning
 * @param count - Number of sparkles to generate (default: 6)
 * @returns Array of sparkle configurations
 */
export const generateSparkles = (
  color: string,
  buttonSize: number,
  count: number = 6
): Sparkle[] => {
  const sparkles: Sparkle[] = [];
  const baseRadius = buttonSize * 0.5; // Base distance from center

  for (let i = 0; i < count; i++) {
    // Calculate random angle with high variation
    const baseAngle = (360 / count) * i;
    const angleVariation = Math.random() * 80 - 40; // ±40 degrees variation
    const angle = baseAngle + angleVariation;

    // Calculate random distance from center
    const distanceVariation = Math.random() * 40 - 20; // ±20px variation
    const distance = baseRadius + distanceVariation;

    const radian = (angle * Math.PI) / 180;

    sparkles.push({
      id: Date.now() + i + Math.random() * 1000, // Unique ID
      x: buttonSize / 1.2 + Math.cos(radian) * distance,
      y: buttonSize / 1.2 + Math.sin(radian) * distance,
      color,
      delay: i * 40 + Math.random() * 30, // Staggered delays (0-70ms)
    });
  }

  return sparkles;
};
