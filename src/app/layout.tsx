import type { Metadata } from 'next';
import '@radix-ui/themes/styles.css';
import { Analytics } from '@vercel/analytics/next';
import localFont from 'next/font/local';

import './globals.css';
import { LanguageProvider } from '../components/providers/language-providers';
import { ThemeProvider } from '../components/providers/theme-provider';

// Google Sans — the single body/text face. The italic file is registered as
// this family's italic style so `<em>` / `<i>` in article bodies render with
// true italic glyphs rather than a synthesised slant.
export const GoogleSans = localFont({
  src: [
    {
      path: '../../public/fonts/googlesans-regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/googlesans-italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-google-sans',
  display: 'swap',
});

// Lexend — titles only (bold).
export const Lexend = localFont({
  src: '../../public/fonts/lexend-bold.ttf',
  weight: '700',
  variable: '--font-lexend',
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
      <body className={`${GoogleSans.variable} ${Lexend.variable} antialiased`}>
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
