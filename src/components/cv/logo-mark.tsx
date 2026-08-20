'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';

/**
 * An experience's square logo.
 *
 * Logos are dropped into `public/projects/logos/` by hand, so an entry may have
 * no `logo` yet (or point at a file that was removed). Either way it falls back
 * to a monogram in the brand yellow — the layout is identical, so adding the
 * real file changes nothing else.
 */
export function LogoMark({
  src,
  name,
}: {
  src: string | undefined;
  name: string;
}) {
  const [failed, setFailed] = useState(false);

  // `onError` alone is not enough: the browser starts (and can finish failing)
  // the request while parsing the server-rendered HTML, before React hydrates
  // and attaches the handler. Re-checking on mount catches that case.
  const checkOnMount = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (!src || failed) {
    return (
      <div
        aria-hidden
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-yellow font-title text-[19px] leading-none text-navy shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
        {name.trim().charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[13px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.10)] ring-1 ring-black/5">
      <Image
        src={src}
        alt=""
        fill
        sizes="44px"
        className="object-cover"
        ref={checkOnMount}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
