import { Feed } from '@/components/blog/feed';
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

  // Root feed: nothing pre-expanded, and no per-Short metadata — the generic
  // blog metadata from the layout applies. Shareable per-Short metadata lives
  // on the `/[slug]` route instead.
  return <Feed shorts={shorts} />;
}
