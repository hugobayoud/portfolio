import { ShortTile } from '@/components/blog/short-tile';
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
        <ul className="flex flex-col gap-8">
          {shorts.map((short) => (
            <li key={short.slug}>
              <ShortTile short={short} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
