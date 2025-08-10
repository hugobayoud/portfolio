import { useState, useEffect } from 'react';
import { generateSparkles, Sparkle } from '@/components/ui/sparkles';
import {
  clientLikeUtils,
  incrementLikeCount,
} from '@/lib/services/likes/like-service';

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
  initialLikeCount: number;
  maxLikes?: number;
  buttonSize?: number;
}

interface UseLikeActionReturn {
  clickCount: number;
  totalLikeCount: number;
  colorIndex: number;
  sparkles: Sparkle[];
  currentColor: ColorPair;
  fillPercentage: number;
  isTouchDevice: boolean;
  animationTrigger: number;
  performLikeAction: () => void;
  handleSparklesComplete: () => void;
  handleClick: () => void;
  markAsTouchDevice: () => void;
}

export function useLikeAction(
  options: UseLikeActionOptions
): UseLikeActionReturn {
  const { slug, initialLikeCount, maxLikes = 10, buttonSize = 64 } = options;

  const [clickCount, setClickCount] = useState<number>(0);
  const [totalLikeCount, setTotalLikeCount] =
    useState<number>(initialLikeCount);
  const [colorIndex, setColorIndex] = useState<number>(0);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [animationTrigger, setAnimationTrigger] = useState<number>(0);

  const currentColor = COLOR_PALETTE[colorIndex];
  const fillPercentage = (clickCount / maxLikes) * 100;

  // Initialize click count from localStorage on mount
  useEffect(() => {
    const localClickCount = clientLikeUtils.getLocalClickCount(slug);
    setClickCount(localClickCount);
    setTotalLikeCount(initialLikeCount + localClickCount);
  }, [slug, initialLikeCount]);

  const performLikeAction = async (): Promise<void> => {
    // Trigger MAX text animation by incrementing the trigger
    setAnimationTrigger((prev) => prev + 1);

    // Don't allow more clicks if already at maximum
    if (clickCount >= maxLikes) {
      return;
    }

    // Increment local click count
    const newClickCount = clientLikeUtils.incrementLocalClickCount(slug);
    setClickCount(newClickCount);

    // Update total like count display
    setTotalLikeCount(initialLikeCount + newClickCount);

    // Cycle to next color in palette
    const nextIndex = (colorIndex + 1) % COLOR_PALETTE.length;
    setColorIndex(nextIndex);

    // Generate sparkles with golden color for consistent visual appeal
    const newSparkles = generateSparkles('#f59e0b', buttonSize);
    setSparkles(newSparkles);

    // If user completes 10 clicks, mark as liked and update database
    if (newClickCount === maxLikes) {
      try {
        clientLikeUtils.markAsLiked(slug);
        await incrementLikeCount(slug);
        console.log(`Successfully updated database for blog post: ${slug}`);
      } catch (error) {
        console.error(
          `Failed to update database for blog post: ${slug}`,
          error
        );
        // Optionally, you could revert the local state here
      }
    }

    console.log(
      `Liked blog post: ${slug}, local clicks: ${newClickCount}, total likes: ${
        initialLikeCount + newClickCount
      }`
    );
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
    totalLikeCount,
    colorIndex,
    sparkles,
    currentColor,
    fillPercentage,
    isTouchDevice,
    animationTrigger,
    performLikeAction,
    handleSparklesComplete,
    handleClick,
    markAsTouchDevice,
  };
}
