# Réunion quiz: full offline precache on first visit, with no cache invalidation

The Réunion quiz is played on the island, sometimes far from any network, so on a Player's first visit a blocking Preparing screen saves **the whole Quiz** — page, scripts and every photo (~20 Questions × 3 photos, ~12 MB) — through a service worker scoped to `reunion.hugobayoud.com`. From then on it plays, reloads and replays with no connection at all. Answers and the Frontier live in `localStorage`.

We deliberately ship **no update or invalidation mechanism**: the Quiz is frozen before its URL is shared and never changes afterwards, so the cache is filled once and served forever. The only way to refetch is the hidden Re-download (Secret tap, or "Réessayer" after a failed download), which wipes everything and starts over.

## Considered options

- **No offline support** — a reload with no network shows the browser's error page, and localStorage never gets a chance to restore anything.
- **Prefetch the next Question's photos only** — survives a network drop mid-game, but not a reload while offline.

## Consequences

- If the Quiz ever has to change after launch, this decision must be revisited first: Players who already have it would keep the old version indefinitely.
- A deploy of the portfolio or blog (same app, see ADR 0001) must not break a cached quiz — the service worker serves its own cached copy and never mixes it with newer assets.
