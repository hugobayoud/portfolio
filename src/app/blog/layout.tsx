import type { Metadata } from 'next';

import { BlogHeader } from '@/components/blog/blog-header';

export const metadata: Metadata = {
  metadataBase: new URL('https://blog.hugobayoud.fr'),
  title: 'Hugo Bayoud',
  description: 'Mes shorts — petits billets au jour le jour.',
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <BlogHeader />
      {children}
    </div>
  );
}
