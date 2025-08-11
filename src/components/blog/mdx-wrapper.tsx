'use client';

import { ReactNode } from 'react';

import { useLanguage } from '@/lib/hooks/use-language';

interface MDXWrapperProps {
  children: ReactNode;
}

export const MDXWrapper = ({ children }: MDXWrapperProps) => {
  const { messages } = useLanguage();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center text-2xl font-bold">
        {messages.blog.header.title}
      </h1>
      <div className="text-center text-lg mb-10">
        {messages.blog.header.subtitle}
      </div>
      {children}
    </div>
  );
};
