import type { ReactNode } from 'react';

/**
 * Quiet button — the site's only secondary control: a circle of the darker
 * grey (`#ECECEC`) holding a single icon, no label, no border. Used for the
 * blog entry point and the social links so none of them competes with the CV
 * content itself.
 *
 * The label is never painted; it is carried by `aria-label` and by the native
 * tooltip, so a quiet button always announces itself to assistive tech.
 *
 * It is a plain `<a>` rather than `next/link`: every quiet link leaves this
 * page for another origin (the blog subdomain, LinkedIn, GitHub…), so there is
 * nothing for the router to prefetch or take over.
 */
export function QuietLink({
  label,
  href,
  external = false,
  children,
}: {
  label: string;
  href: string;
  /** Cross-origin destinations open in a new tab. */
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-quiet text-ink-soft transition-[background-color,color,transform] duration-150 hover:bg-quiet-hover hover:text-navy active:scale-95 [&>svg]:h-[18px] [&>svg]:w-[18px]"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}
