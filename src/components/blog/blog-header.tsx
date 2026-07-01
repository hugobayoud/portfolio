import { ChevronLeftIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

import { ThemeToggle } from '@/components/ui/theme-toggle';

// The portfolio lives on the apex domain; from the blog subdomain the back-link
// is an absolute cross-origin URL.
const PORTFOLIO_URL = 'https://hugobayoud.com';

/**
 * Minimal, bespoke header for the blog subdomain. Deliberately does NOT reuse
 * the portfolio's navigation — just an identity wordmark, a link back to the
 * portfolio, and the shared theme toggle.
 */
export const BlogHeader = () => {
  return (
    <header className="flex items-center justify-between gap-4 py-4">
      <a
        href={PORTFOLIO_URL}
        className="inline-flex items-center gap-1 text-sm opacity-70 transition-opacity hover:opacity-100"
      >
        <ChevronLeftIcon />
        hugobayoud.com
      </a>

      <div className="flex flex-col items-center gap-2">
        <Image
          src="/hugo.png"
          alt="Hugo Bayoud"
          width={56}
          height={56}
          priority
          className="rounded-full object-cover"
        />
        <span className="text-lg font-[family-name:var(--font-tt-trailers-bold)] tracking-wide">
          Hugo Bayoud
        </span>
      </div>

      <ThemeToggle />
    </header>
  );
};
