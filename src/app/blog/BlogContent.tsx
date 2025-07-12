'use client';

import { useTheme } from '../../../components/ThemeProvider';

export function BlogContent({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const textColor = theme === 'light' ? 'text-neutral-800' : 'text-neutral-200';

  return (
    <article
      className={`max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${textColor}`}
    >
      <div className="prose prose-lg max-w-none">{children}</div>
    </article>
  );
}
