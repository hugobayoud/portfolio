'use client';

import { ReaderIcon } from '@radix-ui/react-icons';

import { LanguageToggle } from '@/components/ui/language-toggle';
import { QuietLink } from '@/components/ui/quiet-link';
import { useLanguage } from '@/lib/hooks/use-language';

export function SiteHeader() {
  const { messages } = useLanguage();

  return (
    <div className="print-hidden flex items-center justify-end gap-2 py-6 sm:py-8">
      <LanguageToggle />

      {/* `/blog` is 301'd onto the blog subdomain by the middleware, keeping
          the TLD and port — so this one href works in dev and in production. */}
      <QuietLink href="/blog" label={messages.nav.blog}>
        <ReaderIcon />
      </QuietLink>
    </div>
  );
}
