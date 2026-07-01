'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { ShortTile } from '@/components/blog/short-tile';
import { TILE_WIDTH } from '@/components/blog/tile-pattern';
import { useReadShorts } from '@/lib/hooks/use-read-shorts';
import type { ShortFeedItem } from '@/lib/types/short';

/**
 * FLIP glide timing. Kept in lockstep with the expanded panel's own
 * `grid-template-rows` reveal (short-tile.tsx) — same duration and easing — so
 * the panel growing open and the surrounding Tiles gliding into their new
 * positions read as one continuous motion (see
 * docs/adr/0002-no-wait-blog-delivery.md, polish issue 009).
 */
const FLIP_DURATION_MS = 300;
const FLIP_EASING = 'ease-in-out';

/** `useLayoutEffect` on the client, `useEffect` on the server — avoids React's
 *  SSR warning while still measuring layout before paint in the browser (this
 *  client component is server-rendered for hydration). */
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  // FLIP glide state. `tileEls` maps each Short's slug to its outer <article>
  // (registered via a stable ref callback), so on expand/collapse we can measure
  // every Tile's position First (pre-commit) and Last (post-commit) and animate
  // the delta. `firstRects` carries the pre-commit snapshot into the layout
  // effect; it is null on the very first render, which is how the effect knows
  // NOT to measure on initial paint. `togglingSlug` is the one Tile whose
  // content swaps (idle box ⇄ full panel) — it animates via its own reveal, not
  // a translate, so we exclude it from the glide. `flipAnims` holds the running
  // Web Animations so rapid re-toggles can cancel them.
  const tileEls = useRef(new Map<string, HTMLElement>());
  const firstRects = useRef<Map<string, DOMRect> | null>(null);
  const togglingSlug = useRef<string | null>(null);
  const flipAnims = useRef<Animation[]>([]);

  const registerTile = useCallback((slug: string, el: HTMLElement | null) => {
    if (el) tileEls.current.set(slug, el);
    else tileEls.current.delete(slug);
  }, []);

  const cancelFlip = () => {
    for (const anim of flipAnims.current) anim.cancel();
    flipAnims.current = [];
  };

  const snapshotRects = () => {
    const rects = new Map<string, DOMRect>();
    for (const [slug, el] of tileEls.current) {
      rects.set(slug, el.getBoundingClientRect());
    }
    return rects;
  };

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

  // FLIP "Invert + Play": runs after the DOM has committed the new expanded
  // state but before the browser paints, so `getBoundingClientRect` here reads
  // each Tile's *final* position. We invert every moved Tile back to its
  // pre-commit spot with a transform, then animate that transform to zero so it
  // glides into place. `firstRects` is only set by `toggle` (never on mount or
  // for a reduced-motion visitor), so initial paint measures nothing.
  useIsomorphicLayoutEffect(() => {
    const first = firstRects.current;
    if (!first) return;
    firstRects.current = null;
    const toggling = togglingSlug.current;
    togglingSlug.current = null;

    const anims: Animation[] = [];
    for (const [slug, el] of tileEls.current) {
      // The Tile being opened/closed swaps its whole content and grows/shrinks
      // via its own panel reveal — translating it would look like a jump, so it
      // sits out the glide.
      if (slug === toggling) continue;
      const before = first.get(slug);
      if (!before) continue;
      const after = el.getBoundingClientRect();
      const dx = before.left - after.left;
      const dy = before.top - after.top;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) continue;
      anims.push(
        el.animate(
          [
            { transform: `translate(${dx}px, ${dy}px)` },
            { transform: 'translate(0px, 0px)' },
          ],
          { duration: FLIP_DURATION_MS, easing: FLIP_EASING },
        ),
      );
    }
    flipAnims.current = anims;
  }, [expandedSlug]);

  const toggle = (slug: string) => {
    const next = expandedSlug === slug ? null : slug;
    const root = feedRootRef.current;
    const url = next ? (root === '/' ? `/${next}` : `${root}/${next}`) : root;

    // FLIP "First": snapshot every Tile's current position before React reflows
    // the grid. Skipped entirely under prefers-reduced-motion, which leaves
    // `firstRects` null so the layout effect performs no glide (the panel still
    // opens, just without motion). Any in-flight glide is snapped to rest first
    // so the snapshot reads true resting positions, not mid-animation ones.
    if (!prefersReducedMotion()) {
      cancelFlip();
      firstRects.current = snapshotRects();
      togglingSlug.current = slug;
    }

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
              registerTile={registerTile}
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
