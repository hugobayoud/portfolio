import type { Metadata } from 'next';
import '@radix-ui/themes/styles.css';
import { Analytics } from '@vercel/analytics/next';
import { Open_Sans } from 'next/font/google';
import localFont from 'next/font/local';

import './globals.css';
import { LanguageProvider } from '../components/providers/language-providers';
import { ThemeProvider } from '../components/providers/theme-provider';

export const OpenSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

export const TTTrailersBold = localFont({
  src: '../../public/fonts/tt-trailers-bold.ttf',
  variable: '--font-tt-trailers-bold',
  display: 'swap',
});

export const PoppinsRegular = localFont({
  src: '../../public/fonts/Poppins-Regular.ttf',
  variable: '--font-poppins-regular',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BayouDev | Hugo Bayoud Développeur Full Stack Web & Mobile',
  description: 'Développeur Full Stack Web & Mobile Typescript',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${OpenSans.variable} ${TTTrailersBold.variable} ${PoppinsRegular.variable} antialiased`}
      >
        <LanguageProvider>
          <ThemeProvider>
            {children}
            <Analytics />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
