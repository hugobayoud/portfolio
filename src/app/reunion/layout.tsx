import type { Metadata } from 'next';

import './quiz.css';

/**
 * The share image, favicon and home-screen icon sit next to this file
 * (`opengraph-image.png`, `icon.png`, `apple-icon.png`) and replace the CV's
 * for the quiz subtree only. No description, on purpose.
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://reunion.hugobayoud.com'),
  title: 'Quiz La Réunion',
  description: null,
  openGraph: { title: 'Quiz La Réunion' },
  twitter: { card: 'summary_large_image', title: 'Quiz La Réunion' },
};

export default function ReunionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="reunion-quiz min-h-dvh">{children}</div>;
}
