'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { HtmlContent } from '@/components/blog/html-content';
import type { ShortFeedItem } from '@/lib/types/short';

/**
 * Basic Tile — the idle rendering of a Short in the Feed.
 *
 * Shows the cover *contained* (rendered at its intrinsic ratio, so the whole
 * image is visible) with a blur-up placeholder and no layout shift — the
 * width/height come from the index — plus the title and date. Clicking the
 * Tile expands it in place into a full-width panel showing its body, already
 * inlined into the page HTML (see docs/adr/0002-no-wait-blog-delivery.md), so
 * expanding costs zero network for the text — only its inline images, lazy
 * loaded and prefetched on hover.
 *
 * Deliberately single-column and un-hovered here — masonry sizing and hover
 * states land in 004.
 */
export const ShortTile = ({ short }: { short: ShortFeedItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const hasPrefetchedRef = useRef(false);

  const publishedAt = new Date(short.date);
  const formattedDate = publishedAt.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const toggleExpanded = () => setIsExpanded((expanded) => !expanded);

  const prefetchBodyImages = () => {
    if (hasPrefetchedRef.current) return;
    hasPrefetchedRef.current = true;

    const images = bodyRef.current?.querySelectorAll('img') ?? [];
    images.forEach((img) => {
      const src = img.getAttribute('src');
      if (!src) return;
      new window.Image().src = src;
    });
  };

  return (
    <article className="flex flex-col gap-3" onPointerEnter={prefetchBodyImages}>
      <button
        type="button"
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
        className="flex flex-col gap-3 text-left"
      >
        <Image
          src={short.coverUrl}
          alt={short.title}
          width={short.cover.width}
          height={short.cover.height}
          placeholder="blur"
          blurDataURL={short.cover.blurDataURL}
          sizes="(min-width: 1024px) 960px, 100vw"
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
      </button>

      {/* Always rendered — the body HTML is inlined into the static page and
          merely clipped to zero height until expand, so opening a Tile never
          performs a network request for its text. */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div ref={bodyRef} className="pt-4">
            <HtmlContent html={short.bodyHtml} />
            <button
              type="button"
              onClick={toggleExpanded}
              aria-label="Réduire"
              className="mt-4 flex items-center gap-1 text-sm opacity-60 hover:opacity-100"
            >
              <Cross2Icon /> Réduire
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
