import { ShortTile } from '@/components/blog/short-tile';
import { TILE_WIDTH } from '@/components/blog/tile-pattern';
import { getPublishedShorts } from '@/lib/services/shorts/shorts-service';

// The feed is statically generated (SSG) and served from the CDN — the Shorts
// are read from Firestore at build / ISR time, never in the browser.
// See docs/adr/0002-no-wait-blog-delivery.md.
//
// `revalidate` is a time-based fallback: publishing normally refreshes the
// feed within seconds via the `publish-short` script's ping to
// `POST /api/revalidate` (which invalidates the `shorts`-tagged cache below),
// but this guarantees the feed still catches up if that ping is ever skipped.
export const revalidate = 3600;

export default async function BlogFeedPage() {
  const shorts = await getPublishedShorts();

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
            <ShortTile key={short.slug} short={short} index={index} />
          ))}
        </div>
      )}
    </main>
  );
}
