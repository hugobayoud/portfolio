/**
 * Service worker of the Réunion quiz (see src/app/reunion/CONTEXT.md).
 *
 * Registered only by the quiz page, on `reunion.<domain>` — a service worker
 * only ever controls its own origin, so it never sees a request of the CV or
 * the blog. Served from `public/`: its path has a dot, so the middleware
 * leaves it alone on every host.
 *
 * It serves, cache-first and forever, whatever the Preparing screen saved in
 * the `reunion-quiz` cache (src/components/reunion/saved-quiz.ts); anything
 * else goes to the network. There is no update or invalidation logic — see
 * docs/adr/0003-reunion-quiz-offline-precache-no-invalidation.md — so the
 * cache name must never change.
 */

const CACHE_NAME = 'reunion-quiz';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  event.respondWith(
    caches
      .match(request, {
        cacheName: CACHE_NAME,
        // The page was saved by a plain fetch, not a navigation: its `Vary`
        // headers must not stop a reload from finding it, with or without a
        // query string.
        ignoreVary: true,
        ignoreSearch: request.mode === 'navigate',
      })
      .then((saved) => saved ?? fetch(request)),
  );
});
