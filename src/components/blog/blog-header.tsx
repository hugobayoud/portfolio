import { ChevronLeftIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

// The portfolio lives on the apex domain; from the blog subdomain the back-link
// is an absolute cross-origin URL.
const PORTFOLIO_URL = 'https://hugobayoud.com';

/**
 * Minimal, bespoke header for the blog subdomain. Deliberately does NOT reuse
 * the portfolio's navigation — just an identity wordmark and a link back to the
 * portfolio. The three-column grid keeps the wordmark optically centred even
 * though only the first column carries content.
 */
export const BlogHeader = () => {
  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-4">
      <a
        href={PORTFOLIO_URL}
        className="inline-flex items-center gap-1 justify-self-start text-sm opacity-70 transition-opacity hover:opacity-100"
      >
        <ChevronLeftIcon />
        hugobayoud.com
      </a>

      <div className="flex flex-col items-center gap-2">
        {/* Same portrait treatment as the CV: cut-out on the yellow disc,
            ringed in white. */}
        <div className="h-16 w-16 rounded-full bg-white p-[4px] shadow-[0_2px_10px_rgba(0,0,0,0.07)]">
          <div className="relative h-full w-full overflow-hidden rounded-full bg-linear-to-b from-halo-start to-halo-end">
            <Image
              src="/hugo.png"
              alt="Hugo Bayoud"
              fill
              sizes="64px"
              priority
              className="object-cover object-top"
            />
          </div>
        </div>

        <span className="font-title text-lg text-navy">Hugo Bayoud</span>
      </div>

      <div aria-hidden />
    </header>
  );
};
