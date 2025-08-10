import { useState } from 'react';
import { generateSparkles, Sparkle } from '@/components/ui/sparkles';

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

interface UseLikeActionOptions {
  slug: string;
  maxLikes?: number;
  buttonSize?: number;
}

interface UseLikeActionReturn {
  clickCount: number;
  colorIndex: number;
  sparkles: Sparkle[];
  currentColor: ColorPair;
  fillPercentage: number;
  isTouchDevice: boolean;
  performLikeAction: () => void;
  handleSparklesComplete: () => void;
  handleClick: () => void;
  markAsTouchDevice: () => void;
}

export function useLikeAction(
  options: UseLikeActionOptions
): UseLikeActionReturn {
  const { slug, maxLikes = 10, buttonSize = 64 } = options;

  const [clickCount, setClickCount] = useState<number>(0);
  const [colorIndex, setColorIndex] = useState<number>(0);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  const currentColor = COLOR_PALETTE[colorIndex];
  const fillPercentage = (clickCount / maxLikes) * 100;

  const performLikeAction = (): void => {
    // Increment click count up to maximum
    const newClickCount = Math.min(clickCount + 1, maxLikes);
    setClickCount(newClickCount);

    // Cycle to next color in palette
    const nextIndex = (colorIndex + 1) % COLOR_PALETTE.length;
    setColorIndex(nextIndex);

    // Generate sparkles with golden color for consistent visual appeal
    const newSparkles = generateSparkles('#f59e0b', buttonSize);
    setSparkles(newSparkles);

    // TODO: Add like to blog post using slug
    console.log(`Liked blog post: ${slug}, total likes: ${newClickCount}`);
  };

  const handleClick = (): void => {
    // On touch devices, prevent click event (touch events handle everything)
    if (isTouchDevice) {
      return;
    }

    performLikeAction();
  };

  const handleSparklesComplete = (): void => {
    setSparkles([]);
  };

  // Expose method to mark as touch device (called by press animation hook)
  const markAsTouchDevice = (): void => {
    setIsTouchDevice(true);
  };

  return {
    clickCount,
    colorIndex,
    sparkles,
    currentColor,
    fillPercentage,
    isTouchDevice,
    performLikeAction,
    handleSparklesComplete,
    handleClick,
    markAsTouchDevice,
  };
}
