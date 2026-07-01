import { collection, getDocs, query, where } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

import { firestore, storage } from '@/lib/services/firebase/firebase';
import type { Short, ShortFeedItem } from '@/lib/types/short';

const SHORTS_COLLECTION = 'shorts';

/**
 * Read every published Short from the Firestore `shorts` index, newest first.
 *
 * This runs at build / ISR time — the feed is statically generated and served
 * from the CDN, never fetched in the browser (see
 * docs/adr/0002-no-wait-blog-delivery.md). Each Short's cover `path` is resolved
 * to a Storage download URL so tiles can render it directly with `next/image`.
 *
 * Failures are swallowed into an empty (or partial) result rather than thrown,
 * so a missing index or a single unresolvable cover degrades to an empty / thin
 * feed instead of breaking the static build.
 */
export async function getPublishedShorts(): Promise<ShortFeedItem[]> {
  try {
    const shortsRef = collection(firestore, SHORTS_COLLECTION);
    const publishedQuery = query(shortsRef, where('published', '==', true));
    const snapshot = await getDocs(publishedQuery);

    const items = await Promise.all(
      snapshot.docs.map(async (document): Promise<ShortFeedItem | null> => {
        const short = document.data() as Short;

        try {
          const coverUrl = await getDownloadURL(ref(storage, short.cover.path));
          return { ...short, coverUrl };
        } catch (error) {
          console.warn(
            `Skipping Short "${short.slug}": cover could not be resolved`,
            error
          );
          return null;
        }
      })
    );

    // Sort in memory (newest first) so the query needs no composite index.
    return items
      .filter((item): item is ShortFeedItem => item !== null)
      .sort((a, b) => b.date.toMillis() - a.date.toMillis());
  } catch (error) {
    console.error('Error fetching published Shorts from Firestore:', error);
    return [];
  }
}
