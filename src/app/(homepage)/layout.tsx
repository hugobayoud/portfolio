import { SiteHeader } from '@/components/layout/site-header';
import { LanguageProvider } from '@/components/providers/language-providers';

export default function HomepageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <div className="mx-auto w-full max-w-[62rem] px-5 pb-20 sm:px-8 lg:px-10">
        <SiteHeader />
        {children}
      </div>
    </LanguageProvider>
  );
}
