import type { Metadata } from 'next';

import { BlogContent } from '@/components/blog/blog-content';

export const metadata: Metadata = {
  title: 'Blog | Hugo Bayoud Développeur Full Stack Web & Mobile',
  description: 'Mon blog',
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BlogContent>{children}</BlogContent>;
}
