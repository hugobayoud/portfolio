import Image from 'next/image';

import type { ShortFeedItem } from '@/lib/types/short';

/**
 * Basic Tile — the idle rendering of a Short in the Feed.
 *
 * Shows the cover *contained* (rendered at its intrinsic ratio, so the whole
 * image is visible) with a blur-up placeholder and no layout shift — the
 * width/height come from the index — plus the title and date.
 *
 * Deliberately basic: no masonry, hover, or expand yet (issues 003/004).
 */
export const ShortTile = ({ short }: { short: ShortFeedItem }) => {
  const publishedAt = short.date.toDate();
  const formattedDate = publishedAt.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="flex flex-col gap-3">
      <Image
        src={short.coverUrl}
        alt={short.title}
        width={short.cover.width}
        height={short.cover.height}
        placeholder="blur"
        blurDataURL={short.cover.blurDataURL}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="h-auto w-full rounded-lg object-contain"
      />

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-[family-name:var(--font-tt-trailers-bold)] tracking-wide">
          {short.title}
        </h3>
        <time
          dateTime={publishedAt.toISOString()}
          className="text-sm opacity-60"
        >
          {formattedDate}
        </time>
      </div>
    </article>
  );
};
