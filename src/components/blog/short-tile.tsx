'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useRef } from 'react';

import { HtmlContent } from '@/components/blog/html-content';
import { getTileHeight, TILE_WIDTH } from '@/components/blog/tile-pattern';
import type { ShortFeedItem } from '@/lib/types/short';

/** Reading column width for the expanded panel's cover and body text. */
const EXPANDED_CONTENT_WIDTH = 500;

/**
 * Tile — a Short's rendering in the Feed.
 *
 * Expansion is *controlled*: only one Short is open at a time, and which one is
 * owned by the parent Feed (which mirrors it to the URL, see feed.tsx). The Tile
 * reports clicks via `onToggle` and renders from the `isExpanded` prop.
 *
 * Idle: a fixed-size box (see tile-pattern.ts) with the cover filling it
 * (cropped, never letterboxed), a title overlay top and a date overlay
 * bottom, both on gradient scrims; desktop pointer hover swaps the date for
 * the description, touch devices skip that peek and tapping expands
 * directly. Expanding spans the full Feed width (`col-span-full`, applied by
 * the Feed's grid) and centers a fixed-width reading column — cover, title,
 * date, then the body, already inlined into the page HTML (see
 * docs/adr/0002-no-wait-blog-delivery.md), so expanding costs zero network
 * for the text, only its inline images, lazy loaded and prefetched on hover.
 */
export const ShortTile = ({
  short,
  index,
  isExpanded,
  onToggle,
}: {
  short: ShortFeedItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const hasPrefetchedRef = useRef(false);

  const tileHeight = getTileHeight(index);

  const publishedAt = new Date(short.date);
  const formattedDate = publishedAt.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const toggleExpanded = onToggle;

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
    <article
      className={`mb-6 self-start ${isExpanded ? 'col-span-full' : ''}`}
      style={isExpanded ? undefined : { gridRow: `span ${tileHeight}` }}
      onPointerEnter={prefetchBodyImages}
    >
      {isExpanded && (
        <div
          className="mx-auto mb-2 flex w-full justify-end"
          style={{ maxWidth: EXPANDED_CONTENT_WIDTH }}
        >
          <button
            type="button"
            onClick={toggleExpanded}
            aria-label="Réduire"
            className="rounded-full p-1.5 opacity-60 transition-opacity hover:opacity-100"
          >
            <Cross2Icon className="h-5 w-5" />
          </button>
        </div>
      )}

      {isExpanded ? (
        <button
          type="button"
          onClick={toggleExpanded}
          aria-expanded={isExpanded}
          className="mx-auto flex w-full flex-col gap-3 text-left"
          style={{ maxWidth: EXPANDED_CONTENT_WIDTH }}
        >
          <Image
            src={short.coverUrl}
            alt={short.title}
            width={short.cover.width}
            height={short.cover.height}
            placeholder="blur"
            blurDataURL={short.cover.blurDataURL}
            sizes={`${EXPANDED_CONTENT_WIDTH}px`}
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
      ) : (
        <button
          type="button"
          onClick={toggleExpanded}
          aria-expanded={isExpanded}
          className="short-tile-cover relative block w-full overflow-hidden rounded-lg bg-black/5 text-left dark:bg-white/5"
          style={{ height: tileHeight }}
        >
          <Image
            src={short.coverUrl}
            alt={short.title}
            fill
            placeholder="blur"
            blurDataURL={short.cover.blurDataURL}
            sizes={`${TILE_WIDTH}px`}
            className="object-cover"
          />

          <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/90 to-transparent px-3 pb-8 pt-2 text-white">
            <p className="text-sm font-medium">{short.title}</p>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-3 pb-2 pt-8 text-white">
            <p className="short-tile-caption-idle text-xs opacity-80">
              {formattedDate}
            </p>
            <p className="short-tile-caption-hover hidden text-xs opacity-90 line-clamp-4">
              {short.description}
            </p>
          </div>
        </button>
      )}

      {/* Always rendered — the body HTML is inlined into the static page and
          merely clipped to zero height until expand, so opening a Tile never
          performs a network request for its text. */}
      <div
        className={`mx-auto grid w-full transition-[grid-template-rows] duration-300 ease-in-out ${
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
        style={{ maxWidth: EXPANDED_CONTENT_WIDTH }}
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
