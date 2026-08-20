import type { ReactNode } from 'react';

/**
 * The one affordance an experience gets: a small navy text link with a trailing
 * glyph. Every action under a summary — visiting the site, opening the
 * reference — wears it, so the row of them reads as a single control strip
 * rather than a link next to a button.
 */
export const CV_ACTION_CLASS =
  'inline-flex items-center gap-1 text-[13px] font-semibold text-navy transition-opacity hover:opacity-70';

export function CvActionLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={CV_ACTION_CLASS}
    >
      {children}
    </a>
  );
}
