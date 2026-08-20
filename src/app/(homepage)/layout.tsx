import { SiteHeader } from '@/components/layout/site-header';

export default function HomepageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto w-full max-w-[62rem] px-5 pb-20 sm:px-8 lg:px-10">
      <SiteHeader />
      {children}
    </div>
  );
}
