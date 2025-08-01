import { ref, get, runTransaction } from 'firebase/database';
import { database } from '@/lib/services/firebase/storage';

/**
 * Get the current like count for a blog post
 */
export async function getLikeCount(slug: string): Promise<number> {
  try {
    const likeRef = ref(database, `likes/${slug}`);
    const snapshot = await get(likeRef);
    return snapshot.val() || 0;
  } catch (error) {
    console.error(`Error getting like count for "${slug}":`, error);
    return 0;
  }
}

/**
 * Increment the like count for a blog post
 * Uses Firebase transaction to handle concurrent updates safely
 */
export async function incrementLikeCount(slug: string): Promise<number> {
  try {
    const likeRef = ref(database, `likes/${slug}`);
    
    const result = await runTransaction(likeRef, (currentValue) => {
      return (currentValue || 0) + 1;
    });

    return result.snapshot.val() || 1;
  } catch (error) {
    console.error(`Error incrementing like count for "${slug}":`, error);
    throw error;
  }
}

/**
 * Client-side utilities for tracking liked posts in localStorage
 */
export const clientLikeUtils = {
  /**
   * Check if user has already liked a specific post
   */
  hasUserLiked(slug: string): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '[]');
      return likedPosts.includes(slug);
    } catch {
      return false;
    }
  },

  /**
   * Mark a post as liked by the current user
   */
  markAsLiked(slug: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '[]');
      if (!likedPosts.includes(slug)) {
        likedPosts.push(slug);
        localStorage.setItem('liked_posts', JSON.stringify(likedPosts));
      }
    } catch (error) {
      console.error('Error saving liked post to localStorage:', error);
    }
  },

  /**
   * Get all liked post slugs for the current user
   */
  getLikedPosts(): string[] {
    if (typeof window === 'undefined') return [];
    
    try {
      return JSON.parse(localStorage.getItem('liked_posts') || '[]');
    } catch {
      return [];
    }
  }
};