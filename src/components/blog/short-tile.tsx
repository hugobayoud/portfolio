'use client';

import { CheckCircledIcon, Cross2Icon } from '@radix-ui/react-icons';
import { Tooltip } from '@radix-ui/themes';
import Image from 'next/image';
import { type ReactNode, useCallback, useRef } from 'react';

import { HtmlContent } from '@/components/blog/html-content';
import { getTileHeight, TILE_WIDTH } from '@/components/blog/tile-pattern';
import type { ShortFeedItem } from '@/lib/types/short';

/** Reading column width for the expanded panel's cover and body text. */
const EXPANDED_CONTENT_WIDTH = 500;

type GhostTone = 'panel' | 'onImage';

/** Colour variants for the ghost button: `panel` inherits the theme foreground
 *  over a plain background; `onImage` forces white so it stays legible on top
 *  of the cover's dark scrim. Both add only a faint background on hover. */
const GHOST_TONE: Record<GhostTone, string> = {
  panel: 'hover:bg-[var(--gray-a3)]',
  onImage: 'text-white hover:bg-white/15',
};

/**
 * A shadcn-style *ghost* icon button: transparent and dimmed at rest, full
 * opacity plus a faint background on hover, always paired with a tooltip. Every
 * control on a Tile — the collapse ✕ and the read-marker ◯✓ — is one of these,
 * so the top of the expanded panel, its end, and the collapsed cover all share
 * a single affordance (only the `tone` differs).
 */
function GhostIconButton({
  onClick,
  tooltip,
  ariaPressed,
  tone = 'panel',
  className = '',
  children,
}: {
  onClick: () => void;
  tooltip: string;
  ariaPressed?: boolean;
  tone?: GhostTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tooltip content={tooltip}>
      <button
        type="button"
        onClick={onClick}
        aria-label={tooltip}
        aria-pressed={ariaPressed}
        className={`inline-flex h-8 w-8 items-center justify-center rounded-md opacity-60 transition-[opacity,background-color] hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current ${GHOST_TONE[tone]} ${className}`}
      >
        {children}
      </button>
    </Tooltip>
  );
}

/**
 * The read + collapse controls, rendered as an identical right-aligned cluster
 * at both the top and the end of an expanded panel. Same icons, same size, same
 * ghost styling; the ✕ collapses and the ◯✓ toggles the read marker (its lu /
 * non-lu state shown only in its tooltip).
 */
function PanelControls({
  isRead,
  onToggleRead,
  onCollapse,
  className = '',
}: {
  isRead: boolean;
  onToggleRead: () => void;
  onCollapse: () => void;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto flex w-full items-center justify-end gap-1 ${className}`}
      style={{ maxWidth: EXPANDED_CONTENT_WIDTH }}
    >
      <GhostIconButton
        onClick={onToggleRead}
        ariaPressed={isRead}
        tooltip={isRead ? 'Marquer comme non lu' : 'Marquer comme lu'}
      >
        <CheckCircledIcon className="h-5 w-5" />
      </GhostIconButton>
      <GhostIconButton onClick={onCollapse} tooltip="Réduire">
        <Cross2Icon className="h-5 w-5" />
      </GhostIconButton>
    </div>
  );
}

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
 *
 * Every Tile carries a read marker — a ghost circle-check button whose state
 * lives in its tooltip (lu / non lu), not its icon. Clicking it toggles the
 * Short's per-device read flag via `onToggleRead`, receding the cover (dimmed).
 * On the collapsed cover the marker is a *sibling* of the expand button, so
 * toggling read never expands; on the expanded panel it joins the collapse ✕ in
 * the control clusters at the top and the end.
 */
export const ShortTile = ({
  short,
  index,
  isExpanded,
  onToggle,
  isRead,
  onToggleRead,
  registerTile,
}: {
  short: ShortFeedItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  isRead: boolean;
  onToggleRead: () => void;
  /** Registers this Tile's <article> with the Feed so it can drive the FLIP
   *  glide on expand/collapse (see feed.tsx). */
  registerTile: (slug: string, el: HTMLElement | null) => void;
}) => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const hasPrefetchedRef = useRef(false);

  // Bound to this Tile's slug and stable across renders, so the Feed's registry
  // isn't churned on every re-render (a fresh closure would fire ref(null) then
  // ref(el) each time).
  const setTileRef = useCallback(
    (el: HTMLElement | null) => registerTile(short.slug, el),
    [registerTile, short.slug],
  );

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
      ref={setTileRef}
      className={`mb-6 self-start ${isExpanded ? 'col-span-full' : ''}`}
      style={isExpanded ? undefined : { gridRow: `span ${tileHeight}` }}
      onPointerEnter={prefetchBodyImages}
    >
      {isExpanded && (
        <PanelControls
          className="mb-2"
          isRead={isRead}
          onToggleRead={onToggleRead}
          onCollapse={toggleExpanded}
        />
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
        <div className="relative" style={{ height: tileHeight }}>
          <button
            type="button"
            onClick={toggleExpanded}
            aria-expanded={isExpanded}
            className={`short-tile-cover relative block h-full w-full overflow-hidden rounded-lg bg-black/5 text-left transition-[opacity,filter] duration-300 dark:bg-white/5 ${
              isRead ? 'opacity-60 saturate-50' : ''
            }`}
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
              <p className="pr-8 text-sm font-medium">{short.title}</p>
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

          {/* Read marker — a sibling of (not nested inside) the expand button,
              so a click here toggles read state and never expands, while a
              click anywhere else on the cover still expands. Manual only; the
              receded/dimmed cover above is driven by the same `isRead`. */}
          <GhostIconButton
            onClick={onToggleRead}
            ariaPressed={isRead}
            tone="onImage"
            tooltip={isRead ? 'Marquer comme non lu' : 'Marquer comme lu'}
            className="absolute right-2 top-2 z-10"
          >
            <CheckCircledIcon className="h-5 w-5" />
          </GhostIconButton>
        </div>
      )}

      {/* Always rendered — the body HTML is inlined into the static page and
          merely clipped to zero height until expand, so opening a Tile never
          performs a network request for its text. */}
      <div
        className={`mx-auto grid w-full transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
        style={{ maxWidth: EXPANDED_CONTENT_WIDTH }}
      >
        <div className="overflow-hidden">
          <div ref={bodyRef} className="pt-4">
            <HtmlContent html={short.bodyHtml} />
            <PanelControls
              className="mt-4"
              isRead={isRead}
              onToggleRead={onToggleRead}
              onCollapse={toggleExpanded}
            />
          </div>
        </div>
      </div>
    </article>
  );
};
