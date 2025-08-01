'use client';

import { useState, useEffect } from 'react';
import { getLikeCount, incrementLikeCount, clientLikeUtils } from '@/lib/services/likes/like-service';

interface UseLikeReturn {
  likeCount: number;
  hasLiked: boolean;
  isLoading: boolean;
  handleLike: () => Promise<void>;
}

/**
 * Custom hook for managing blog post likes
 * Handles both server-side like count and client-side like tracking
 */
export function useLike(slug: string): UseLikeReturn {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load initial data
  useEffect(() => {
    const loadLikeData = async () => {
      try {
        // Get like count from Firebase
        const count = await getLikeCount(slug);
        setLikeCount(count);

        // Check if user has already liked this post
        const userHasLiked = clientLikeUtils.hasUserLiked(slug);
        setHasLiked(userHasLiked);
      } catch (error) {
        console.error('Error loading like data:', error);
      }
    };

    loadLikeData();
  }, [slug]);

  const handleLike = async () => {
    // Prevent multiple clicks and don't allow re-liking
    if (isLoading || hasLiked) return;

    setIsLoading(true);

    try {
      // Increment like count in Firebase
      const newCount = await incrementLikeCount(slug);
      
      // Update local state
      setLikeCount(newCount);
      setHasLiked(true);
      
      // Mark as liked in localStorage
      clientLikeUtils.markAsLiked(slug);
    } catch (error) {
      console.error('Error liking post:', error);
      // Could show a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  return {
    likeCount,
    hasLiked,
    isLoading,
    handleLike,
  };
}