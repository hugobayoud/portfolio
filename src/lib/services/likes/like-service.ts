import { firestore } from '@/lib/services/firebase/firebase';
import { doc, increment, setDoc } from 'firebase/firestore';

/**
 * Increment the like count for a blog post in the database
 * Only increments by 10 when user completes 10 clicks
 */
export async function incrementLikeCount(slug: string): Promise<void> {
  try {
    const blogPostRef = doc(firestore, 'posts', slug);

    await setDoc(blogPostRef, { likes: increment(10) }, { merge: true });
  } catch (error) {
    console.error(`Error incrementing like count for "${slug}":`, error);
    throw error;
  }
}

/**
 * Client-side utilities for tracking liked posts and click counts in localStorage
 */
export const clientLikeUtils = {
  /**
   * Get the current local click count for a specific post
   */
  getLocalClickCount(slug: string): number {
    if (typeof window === 'undefined') return 0;

    try {
      const clickCounts = JSON.parse(
        localStorage.getItem('post_click_counts') || '{}'
      );
      return clickCounts[slug] || 0;
    } catch {
      return 0;
    }
  },

  /**
   * Increment the local click count for a specific post
   * Returns the new click count
   */
  incrementLocalClickCount(slug: string): number {
    if (typeof window === 'undefined') return 0;

    try {
      const clickCounts = JSON.parse(
        localStorage.getItem('post_click_counts') || '{}'
      );
      const newCount = (clickCounts[slug] || 0) + 1;
      clickCounts[slug] = newCount;
      localStorage.setItem('post_click_counts', JSON.stringify(clickCounts));
      return newCount;
    } catch (error) {
      console.error('Error saving click count to localStorage:', error);
      return 0;
    }
  },

  /**
   * Check if user has completed 10 clicks (marked as liked) for a specific post
   */
  hasUserLiked(slug: string): boolean {
    return this.getLocalClickCount(slug) >= 10;
  },

  /**
   * Mark a post as fully liked (10 clicks completed) by the current user
   */
  markAsLiked(slug: string): void {
    if (typeof window === 'undefined') return;

    try {
      const likedPosts = JSON.parse(
        localStorage.getItem('liked_posts') || '[]'
      );
      if (!likedPosts.includes(slug)) {
        likedPosts.push(slug);
        localStorage.setItem('liked_posts', JSON.stringify(likedPosts));
      }
    } catch (error) {
      console.error('Error saving liked post to localStorage:', error);
    }
  },

  /**
   * Get all liked post slugs for the current user (posts with 10+ clicks)
   */
  getLikedPosts(): string[] {
    if (typeof window === 'undefined') return [];

    try {
      return JSON.parse(localStorage.getItem('liked_posts') || '[]');
    } catch {
      return [];
    }
  },

  /**
   * Reset the local click count for a specific post
   */
  resetLocalClickCount(slug: string): void {
    if (typeof window === 'undefined') return;

    try {
      const clickCounts = JSON.parse(
        localStorage.getItem('post_click_counts') || '{}'
      );
      delete clickCounts[slug];
      localStorage.setItem('post_click_counts', JSON.stringify(clickCounts));
    } catch (error) {
      console.error('Error resetting click count in localStorage:', error);
    }
  },
};
