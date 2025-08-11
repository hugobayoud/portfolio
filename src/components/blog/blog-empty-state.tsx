'use client';

import { useLanguage } from '@/lib/hooks/use-language';

export const BlogEmptyState = () => {
  const { messages } = useLanguage();

  return (
    <div className="col-span-2 text-center py-8">
      <p className="text-gray-600 dark:text-gray-400">
        {messages.blog.noPosts}
      </p>
    </div>
  );
};
