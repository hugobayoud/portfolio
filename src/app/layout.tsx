import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import './globals.css';
import { LanguageProvider } from '../components/providers/language-providers';

/**
 * Google Sans — regular for body copy, semi-bold for subtitles, italic for
 * `<em>` in article bodies. Registering all three as one family means a
 * `font-semibold` or `<em>` picks up a real face instead of a synthesised one.
 *
 * Every file is a Latin-subset WOFF2 (each ~40 KB, down from 0.5–2 MB), which
 * is most of the page's first-paint budget. See CONTEXT.md for the
 * `pyftsubset` command to regenerate one.
 */
const googleSans = localFont({
  src: [
    {
      path: '../../public/fonts/googlesans-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/googlesans-semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/googlesans-italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-google-sans',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

/** Lexend — titles only (bold). */
const lexend = localFont({
  src: '../../public/fonts/lexend-bold.woff2',
  weight: '700',
  style: 'normal',
  variable: '--font-lexend',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hugobayoud.com'),
  title: 'Hugo Bayoud — Développeur full-stack',
  description:
    "+6 ans d'expérience avec une approche très produit : UX, architecture, développement et lancement. React Native / Expo, NestJS & TypeScript.",
  openGraph: {
    type: 'profile',
    siteName: 'Hugo Bayoud',
    title: 'Hugo Bayoud — Développeur full-stack',
    description:
      "+6 ans d'expérience avec une approche très produit : UX, architecture, développement et lancement.",
  },
};

export const viewport: Viewport = {
  themeColor: '#f6f6f6',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${googleSans.variable} ${lexend.variable}`}>
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
