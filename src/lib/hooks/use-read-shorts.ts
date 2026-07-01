import { useCallback, useEffect, useState } from 'react';

/** localStorage key holding the JSON array of read Short slugs. */
const STORAGE_KEY = 'blog:read';

/**
 * Read markers for Shorts — the per-device set of slugs the visitor has marked
 * read. Persisted only to `localStorage` (never a database), so it is
 * per-browser and resolves *after* hydration: SSR and the first client render
 * both start empty, then the stored set is applied in an effect a tick later.
 * The feed therefore paints instantly from static HTML and read styling appears
 * without a hydration mismatch or layout shift (see CONTEXT.md → "Read marker").
 */
export function useReadShorts() {
  const [readSlugs, setReadSlugs] = useState<Set<string>>(() => new Set());

  // Hydrate from localStorage once, after mount. Starting empty on the server
  // and first client render is deliberate — it keeps the two in sync so there
  // is no hydration mismatch; the real set is layered on here.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setReadSlugs(
          new Set(parsed.filter((s): s is string => typeof s === 'string')),
        );
      }
    } catch {
      // Absent or corrupt storage — keep the empty (all-unread) set.
    }
  }, []);

  const toggleRead = useCallback((slug: string) => {
    setReadSlugs((current) => {
      const next = new Set(current);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // Storage unavailable (private mode / quota) — keep in-memory state.
      }
      return next;
    });
  }, []);

  const isRead = useCallback(
    (slug: string) => readSlugs.has(slug),
    [readSlugs],
  );

  return { isRead, toggleRead };
}
