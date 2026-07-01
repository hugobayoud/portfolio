import { Header } from '@/components/layout/header';

export default function HomepageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-5xl mx-auto p-8 sm:p-20 mb-16">
      <Header />
      {children}
    </div>
  );
}
