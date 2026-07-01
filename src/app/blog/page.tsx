import { ShortTile } from '@/components/blog/short-tile';
import { getPublishedShorts } from '@/lib/services/shorts/shorts-service';

// The feed is statically generated (SSG) and served from the CDN — the Shorts
// are read from Firestore at build / ISR time, never in the browser.
// See docs/adr/0002-no-wait-blog-delivery.md.
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
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
