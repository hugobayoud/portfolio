import type { Metadata } from 'next';

import './quiz.css';

export const metadata: Metadata = {
  title: 'Quiz La Réunion',
  description: null,
  openGraph: null,
};

export default function ReunionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="reunion-quiz min-h-dvh">{children}</div>;
}
