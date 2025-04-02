import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Hugo Bayoud Développeur Full Stack Web & Mobile',
  description: 'Mon blog',
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
