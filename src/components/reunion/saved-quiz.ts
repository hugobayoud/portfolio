import { wipePlay } from './saved-play';

/**
 * The cache holding the saved Quiz, served by `public/reunion-sw.js`. Shared
 * with the service worker — never rename it (ADR 0003: no invalidation).
 */
const CACHE_NAME = 'reunion-quiz';

/** Written last, once every file is saved: a partial cache never has it. */
const COMPLETE_KEY = '/__reunion-quiz-complete';

/** Files downloaded at once. */
const CONCURRENCY = 6;

/**
 * A download with no file saved for this long counts as failed — a stalled
 * connection on a phone often never errors on its own.
 */
const STALL_MS = 20_000;

/**
 * The scripts, stylesheets and fonts a page references. Matched in the page
 * itself rather than read from the live DOM, so the saved page and its assets
 * always come from the same deploy. Only files with an extension, so a bare
 * `/_next/static/chunks/` prefix in a script is never fetched.
 */
const PAGE_ASSET = /\/_next\/static\/[\w\-./%@~]+\.(?:js|css|woff2?)/g;

/** `url(…)` references in a stylesheet — its fonts. */
const CSS_URL = /url\(\s*['"]?([^'")]+)['"]?\s*\)/g;

/** Whether the whole Quiz is saved on the device (and nothing partial). */
export async function isQuizSaved() {
  const cache = await caches.open(CACHE_NAME);
  return (await cache.match(COMPLETE_KEY)) !== undefined;
}

/**
 * Registers the service worker that serves the saved Quiz offline. Harmless
 * when it already is.
 */
export const registerServiceWorker = () =>
  navigator.serviceWorker.register('/reunion-sw.js');

/**
 * Saves the whole Quiz from scratch: the page, every script, stylesheet and
 * font it needs, and every image in `images`. Reports `(saved, total)` after
 * each file once the total is known. Rejects on the first failed download
 * (and stops the others); the Quiz then counts as not saved.
 */
export async function saveQuiz(
  images: string[],
  onProgress: (saved: number, total: number) => void,
) {
  await caches.delete(CACHE_NAME);
  const cache = await caches.open(CACHE_NAME);
  const abort = new AbortController();
  let stall: ReturnType<typeof setTimeout> | undefined;
  const watchStall = () => {
    clearTimeout(stall);
    stall = setTimeout(() => abort.abort(new Error('Stalled')), STALL_MS);
  };
  watchStall();

  const download = async (url: string) => {
    const response = await fetch(url, {
      cache: 'no-cache',
      signal: abort.signal,
    });
    if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
    return response;
  };

  try {
    // The page and its stylesheets are read to find the other files.
    const page = await download('/');
    const pageAssets = unique((await page.clone().text()).match(PAGE_ASSET));
    const stylesheets = pageAssets.filter((url) => url.endsWith('.css'));
    const stylesheetResponses = await Promise.all(stylesheets.map(download));
    const fonts = (
      await Promise.all(
        stylesheetResponses.map(async (response, i) =>
          cssUrls(await response.clone().text(), stylesheets[i]),
        ),
      )
    ).flat();
    const others = unique([
      ...pageAssets.filter((url) => !url.endsWith('.css')),
      ...fonts,
      ...images,
    ]);

    const total = 1 + stylesheets.length + others.length;
    let saved = 0;
    const store = async (url: string, response: Response) => {
      await cache.put(url, response);
      if (abort.signal.aborted) return;
      watchStall();
      onProgress(++saved, total);
    };

    await store('/', page);
    for (const [i, url] of stylesheets.entries()) {
      await store(url, stylesheetResponses[i]);
    }
    let next = 0;
    await Promise.all(
      Array.from({ length: CONCURRENCY }, async () => {
        while (next < others.length && !abort.signal.aborted) {
          const url = others[next++];
          await store(url, await download(url));
        }
      }),
    );
    // Workers stop quietly once aborted: never mark a partial cache complete.
    abort.signal.throwIfAborted();

    await registerServiceWorker();
    await navigator.serviceWorker.ready;
    await cache.put(COMPLETE_KEY, new Response());
  } catch (error) {
    abort.abort();
    throw error;
  } finally {
    clearTimeout(stall);
  }
}

/**
 * The Re-download's wipe: the saved Quiz, the Answers and the Frontier. The
 * service worker stays — with an empty cache it just passes through.
 */
export async function wipeSavedQuiz() {
  wipePlay();
  await caches.delete(CACHE_NAME);
}

/** Same-origin files referenced by a stylesheet at `stylesheet`. */
function cssUrls(css: string, stylesheet: string) {
  const base = new URL(stylesheet, window.location.origin);
  return [...css.matchAll(CSS_URL)]
    .map(([, url]) => new URL(url, base))
    .filter((url) => url.origin === window.location.origin)
    .map((url) => url.pathname + url.search);
}

const unique = (urls: Iterable<string> | null) => [...new Set(urls)];
