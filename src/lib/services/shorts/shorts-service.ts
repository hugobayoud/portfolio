import { collection, getDocs, query, where } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { unstable_cache } from 'next/cache';
import { firestore, storage } from '@/lib/services/firebase/firebase';
import { renderShortBody } from '@/lib/services/shorts/short-body';
import type { Short, ShortFeedItem } from '@/lib/types/short';

const SHORTS_COLLECTION = 'shorts';

/** Cache tag for the Shorts feed data — invalidated by `POST /api/revalidate`. */
export const SHORTS_CACHE_TAG = 'shorts';

/**
 * Read every published Short from the Firestore `shorts` index, newest first.
 *
 * This runs at build / ISR time — the feed is statically generated and served
 * from the CDN, never fetched in the browser (see
 * docs/adr/0002-no-wait-blog-delivery.md). Each Short's cover `path` is resolved
 * to a Storage download URL so tiles can render it directly with `next/image`,
 * and its markdown body is fetched from Storage and rendered to sanitized HTML
 * so it can be inlined into the static page ahead of expand.
 *
 * Failures are swallowed into an empty (or partial) result rather than thrown,
 * so a missing index or a single unresolvable cover/body degrades to an empty /
 * thin feed instead of breaking the static build.
 *
 * Wrapped in `unstable_cache` (rather than relying on `fetch` caching, since
 * this reads Firestore directly) and tagged `SHORTS_CACHE_TAG` so the publish
 * pipeline's revalidate ping can invalidate it on demand; the `revalidate`
 * window is a time-based fallback in case a ping is missed.
 */
export const getPublishedShorts = unstable_cache(
  fetchPublishedShorts,
  ['published-shorts'],
  { tags: [SHORTS_CACHE_TAG], revalidate: 3600 },
);

async function fetchPublishedShorts(): Promise<ShortFeedItem[]> {
  try {
    const shortsRef = collection(firestore, SHORTS_COLLECTION);
    const publishedQuery = query(shortsRef, where('published', '==', true));
    const snapshot = await getDocs(publishedQuery);

    const items = await Promise.all(
      snapshot.docs.map(async (document): Promise<ShortFeedItem | null> => {
        const short = document.data() as Short;

        try {
          const [coverUrl, bodyHtml] = await Promise.all([
            getDownloadURL(ref(storage, short.cover.path)),
            fetchShortBodyHtml(short),
          ]);
          // `date` is serialized to an ISO string here — see the type-level
          // note on `ShortFeedItem` — before this crosses into the client.
          return {
            ...short,
            date: short.date.toDate().toISOString(),
            coverUrl,
            bodyHtml,
          };
        } catch (error) {
          console.warn(
            `Skipping Short "${short.slug}": cover or body could not be resolved`,
            error,
          );
          return null;
        }
      }),
    );

    // Sort in memory (newest first) so the query needs no composite index.
    return items
      .filter((item): item is ShortFeedItem => item !== null)
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  } catch (error) {
    console.error('Error fetching published Shorts from Firestore:', error);
    return [];
  }
}

/** Fetch a Short's markdown body from Storage and render it to sanitized HTML. */
async function fetchShortBodyHtml(short: Short): Promise<string> {
  const bodyUrl = await getDownloadURL(ref(storage, short.bodyPath));
  const response = await fetch(bodyUrl);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch body for Short "${short.slug}": ${response.statusText}`,
    );
  }

  const markdown = await response.text();
  return renderShortBody(markdown);
}
