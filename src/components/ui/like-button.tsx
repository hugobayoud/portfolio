'use client';

import { useLike } from '@/lib/hooks/use-like';

interface LikeButtonProps {
  slug: string;
  className?: string;
}

export function LikeButton({ slug, className = '' }: LikeButtonProps) {
  const { likeCount, hasLiked, isLoading, handleLike } = useLike(slug);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={handleLike}
        disabled={isLoading || hasLiked}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200
          ${hasLiked 
            ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300'
          }
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
          disabled:cursor-not-allowed disabled:hover:scale-100
        `}
        aria-label={hasLiked ? 'Article déjà liké' : 'Liker cet article'}
      >
        {/* Heart Icon */}
        <svg
          className={`w-5 h-5 transition-all duration-200 ${
            hasLiked ? 'fill-red-500 text-red-500' : 'fill-none text-current'
          }`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          />
        </svg>
        
        {/* Like Count */}
        <span className="font-medium tabular-nums">
          {likeCount}
        </span>
        
        {/* Loading Spinner */}
        {isLoading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
      </button>
      
      {/* Status Text */}
      {hasLiked && (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Merci ! 💝
        </span>
      )}
    </div>
  );
}