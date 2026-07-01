'use client';

import { useEffect, useRef, useState } from 'react';

import { ShortTile } from '@/components/blog/short-tile';
import { TILE_WIDTH } from '@/components/blog/tile-pattern';
import { useReadShorts } from '@/lib/hooks/use-read-shorts';
import type { ShortFeedItem } from '@/lib/types/short';

/**
 * Feed — the masonry stream of Tiles, and the single owner of *which* Short is
 * expanded (only one at a time).
 *
 * Expansion is mirrored to the address bar so a Short is shareable without ever
 * leaving the page: opening a Tile `pushState`s `/mon-slug`, collapsing restores
 * the feed root, and browser Back/Forward re-derive the open Short from the URL
 * (`popstate`). This is pure client state layered over the already-rendered feed
 * — no Next route change and no data fetch (see
 * docs/adr/0002-no-wait-blog-delivery.md). Direct/shared visits to `/mon-slug`
 * hit the on-demand `/[slug]` route, which renders this same Feed with
 * `initialExpandedSlug` set so the Short arrives already open.
 */
export const Feed = ({
  shorts,
  initialExpandedSlug = null,
}: {
  shorts: ShortFeedItem[];
  initialExpandedSlug?: string | null;
}) => {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(
    initialExpandedSlug,
  );

  // Per-device read markers, layered on after hydration (see the hook).
  const { isRead, toggleRead } = useReadShorts();

  // The feed's own path — `/` on the blog subdomain, `/blog` when the internal
  // route is hit directly (e.g. localhost). Captured once on mount by stripping
  // the initial `/slug` (slug page) or reading the bare path (feed page), so
  // slug URLs can be built later without re-parsing an already-mutated bar.
  const feedRootRef = useRef<string>('/');

  // biome-ignore lint/correctness/useExhaustiveDependencies: initialExpandedSlug is the server-rendered value, fixed for a page instance — this URL wiring must run exactly once.
  useEffect(() => {
    const { pathname } = window.location;
    feedRootRef.current = initialExpandedSlug
      ? pathname.slice(0, pathname.length - initialExpandedSlug.length - 1) ||
        '/'
      : pathname;

    // The URL is the source of truth for the open Short: on Back/Forward,
    // re-derive it from the address bar rather than tracking custom history
    // state. `pushState` (below) never fires `popstate`, so this only runs for
    // genuine browser navigation.
    const onPopState = () => {
      setExpandedSlug(slugFromPathname(feedRootRef.current));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const toggle = (slug: string) => {
    const next = expandedSlug === slug ? null : slug;
    const root = feedRootRef.current;
    const url = next ? (root === '/' ? `/${next}` : `${root}/${next}`) : root;
    setExpandedSlug(next);
    // Update the address bar without a route change or fetch — pushState
    // integrates with the Next router so `usePathname` stays consistent. This
    // runs in the click handler, never inside the state updater, so the router
    // update it triggers can't fire during Feed's render.
    window.history.pushState(null, '', url);
  };

  return (
    <main className="mt-6">
      <h2 className="text-xl font-[family-name:var(--font-tt-trailers-bold)] tracking-wide mb-6">
        Mes shorts
      </h2>

      {shorts.length === 0 ? (
        <p className="opacity-60 text-sm py-16 text-center">
          Rien ici pour l’instant. Reviens bientôt.
        </p>
      ) : (
        // Disorganised masonry via CSS grid: every Tile's height is a
        // build-time constant (see tile-pattern.ts), so a fine-grained
        // `grid-auto-rows` lets each column pack independently with zero
        // layout-measuring JS. Row gap is each Tile's own margin (so a
        // spanning Tile's reserved tracks include its trailing whitespace);
        // column gap is the grid's own `gap-x-6`.
        <div
          role="feed"
          aria-label="Mes shorts"
          className="grid gap-x-6"
          style={{
            gridTemplateColumns: `repeat(auto-fill, ${TILE_WIDTH}px)`,
            gridAutoRows: 'minmax(1px, auto)',
          }}
        >
          {shorts.map((short, index) => (
            <ShortTile
              key={short.slug}
              short={short}
              index={index}
              isExpanded={short.slug === expandedSlug}
              onToggle={() => toggle(short.slug)}
              isRead={isRead(short.slug)}
              onToggleRead={() => toggleRead(short.slug)}
            />
          ))}
        </div>
      )}
    </main>
  );
};

/** Which Short the current address bar denotes: `null` at the feed root, else
 *  the single path segment beneath it. */
function slugFromPathname(feedRoot: string): string | null {
  const { pathname } = window.location;
  if (pathname === feedRoot) return null;
  const rest =
    feedRoot === '/' ? pathname.slice(1) : pathname.slice(feedRoot.length + 1);
  return rest || null;
}
