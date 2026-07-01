# No-wait blog delivery: static feed with all Short bodies inlined, on-demand ISR, Firestore index

The blog's guiding rule is that a visitor must never wait for data. To achieve this the feed is **statically generated and served from the Vercel CDN**, and **every Short's rendered HTML body is inlined into that static page** (hidden until expand) so that clicking a Tile expands it with zero network — only inline body *images* load lazily (prefetched on hover). New Shorts are published without a git deploy: the feed uses **on-demand ISR**, so the publish step pings a secret-guarded `/api/revalidate` endpoint that calls `revalidateTag('shorts')` and regenerates the static feed from data within seconds (a `revalidate` time fallback covers a forgotten ping).

## Data pipeline

- **Frontmatter is the single source of truth.** One authored `.md` per Short (frontmatter + body). The `publish-short` script parses it, runs the cover through `sharp` (width/height + blur placeholder), uploads `.md` + `.webp` images to Firebase Storage, **upserts** the `shorts/{slug}` Firestore doc, and pings revalidation. No hand-editing of the database (unlike the previous blog).
- **Firestore `shorts` collection is the read index** the build/ISR queries (`published==true`, sorted by date). Storage holds bodies and images. Reused over an `index.json` blob because the infra is already wired.
- **Slug pages (`/mon-slug`) are generated on-demand via ISR**, not all pre-built, so build time doesn't blow up as the archive grows. In-app clicks never fetch them — the URL is updated with `history.pushState` (no route change); these pages exist only for direct/shared visits and crawlers, each with per-Short OpenGraph metadata.

## Considered and rejected

- **Per-request cached SSR** — simpler, but cold requests can still pay a Firestore read; worse TTFB than pure CDN static.
- **Client-side fetch (browser Firebase SDK)** — guarantees a visible wait on first paint; directly violates the rule.
- **Lazy-fetch each body on click** — smaller initial HTML, but every first click pays a round-trip.

## Consequences / exit ramp

- The static feed HTML grows with the archive (all bodies inlined). Acceptable for years at ~1 Short/day; at roughly **>500 Shorts or >~1 MB gzipped HTML**, switch to inlining the newest N and lazy-fetching older ones (paginated feed).
