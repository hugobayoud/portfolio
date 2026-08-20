# Portfolio

Personal site for Hugo Bayoud. The canonical domain is `hugobayoud.com`: the apex serves the portfolio and the subdomain `blog.hugobayoud.com` serves a feed of daily short writings. The `.fr` domain is brand-protection only and redirects to `.com` at the edge.

## The CV page (hugobayoud.com)

The apex is a web rendering of the printed CV, not a "portfolio site": same rows, same order, same right-aligned gutter labels. There is **one theme** (light) — no dark mode, no `prefers-color-scheme` branch.

### Design tokens

Declared once in `src/app/globals.css` under `@theme`, and used through Tailwind utilities (`bg-muted`, `text-navy`, `bg-quiet`…).

| Token                            | Value                     | Used for                                        |
| -------------------------------- | ------------------------- | ----------------------------------------------- |
| `--color-muted`                  | `#F6F6F6`                 | page background                                 |
| `--color-quiet` / `-quiet-hover` | `#ECECEC` / `#E2E2E2`     | quiet buttons, the FR/EN track                  |
| `--color-navy`                   | `#172554`                 | every title, company name, chip label           |
| `--color-yellow`                 | `#F7C504`                 | logo monogram fallback                          |
| `--color-halo-start` / `-end`    | `#F7C400` → `#FFDA60`     | the disc behind the portrait (top → bottom)     |
| `--color-ink*`                   | black at 88/72/50/38 %    | body, secondary, muted, faint text              |
| `--color-rule`                   | black at 8 %              | the hairlines between rows                      |

White is used only for raised surfaces (the reference panel, the photo ring, the active half of the FR/EN toggle). Everything else is black at an opacity — never a grey hex.

### Type

- **Lexend Bold** (`font-title`) — titles only: the name, the gutter labels, company names.
- **Google Sans Regular** (`font-sans`) — body copy.
- **Google Sans Semi-Bold** (`font-semibold`) — subtitles: the headline under the name, roles, chip labels, action links.
- **Google Sans Italic** — `<em>` in article bodies.

All four are registered in the single `localFont` call in `src/app/layout.tsx`, and `font-synthesis-weight` is `none` — the browser must never invent a weight, because every weight the design uses exists as a real file.

Fonts are served as **Latin-subset WOFF2** (~40 KB each, down from 0.5–2 MB originals — that reduction is most of the page's first-paint budget). Keep the full originals *outside* the repo; to re-subset one:

```bash
pyftsubset <full-font>.ttf --output-file=public/fonts/<name>.woff2 \
  --flavor=woff2 --layout-features='*' --name-IDs='*' --no-hinting --desubroutinize \
  --unicodes="U+0000-00FF,U+0100-024F,U+0259,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1E00-1EFF,U+2000-206F,U+2070-209F,U+20A0-20BF,U+2100-2138,U+2190-21BB,U+2212,U+2215,U+2600-26FF,U+FEFF,U+FFFD"
```

### Content

All CV copy lives in `src/i18n/locales/{fr,en}.json` — there is no CMS and no hard-coded string in a component. `fr.json` is the canonical shape; `src/lib/types/i18n.ts` types it and `en.json` must mirror it key for key. Both locales are bundled with the page, so the FR/EN toggle is a re-render, never a navigation.

Skills are per experience (5–6 each, rendered as flat grey chips) — there is deliberately **no standalone "tools" section**. A reference is attached to the experience it is about: it opens from a text link sitting next to "visit website", into a native `<dialog>` — never a card competing with the timeline.

### Images

Every image is supplied by hand. Sizes below already cover a 3× phone screen; anything larger is wasted bytes.

| Image                     | Path                                | Export at    | Notes                                                          |
| ------------------------- | ----------------------------------- | ------------ | -------------------------------------------------------------- |
| Portrait                  | `public/hugo.png`                   | **512×512**  | PNG with a **transparent cut-out** — it sits on the yellow disc |
| Experience logo           | `public/projects/logos/<id>.webp`   | **256×256**  | square, artwork edge-to-edge (it is cropped to a 13 px radius)  |
| Reference avatar          | `public/references/thumbnails/*`    | **256×256**  | square, face centred (cropped to a circle)                      |
| Social preview            | `src/app/opengraph-image.png`       | **1200×630** | see below — Next picks the file up automatically, no code needed |

#### The social preview

`src/app/opengraph-image.png` is the card LinkedIn, WhatsApp, Slack, iMessage and X render when the site is shared. Next detects the filename and emits `og:image` **and** `twitter:image` (with `summary_large_image`), taking the alt text from `opengraph-image.alt.txt` next to it — there is no metadata code to keep in sync.

Constraints that shaped it: 1200×630, **no alpha** (some clients flatten transparency to black), under 300 KB, and type large enough to survive being shown ~500 px wide in a feed. It is the page's own vocabulary — portrait on the yellow disc, Lexend Bold name, Google Sans role, the three grey chips — rendered with the site's real font files, with the text converted to vector paths so no font has to be resolved at render time.

Platforms cache these hard; after deploying a new one, force a refresh through LinkedIn's Post Inspector.

An experience with no `logo` key (or a missing file) falls back to a yellow monogram — the layout is identical, so adding the real file changes nothing else. To wire a new one up: drop the file in `public/projects/logos/` **and** add `"logo": "/projects/logos/<id>.webp"` to both locale files.

## Language

### Blog (blog.hugobayoud.fr)

**Short**:
A single piece of daily writing — the content entity. Has a date, title, description, markdown body, one mandatory cover image, and optional inline images. This is the data.
_Avoid_: Article, Post, Entry.

**Tile**:
The UI rendering of a Short in the feed grid. Has one of three fixed aspect-ratio sizes (small / medium / large) and idle / hover / expanded visual states. A Short is displayed as a Tile — the Tile is how a Short looks in the feed; the Short is the data.
_Avoid_: Card, Cell, Block.

**Cover**:
The single mandatory image of a Short, shown *filling* its idle Tile's fixed box (cropped to the Tile's ratio, never letterboxed); shown at its natural aspect ratio in the expanded panel. Distinct from the Short's optional inline body images. Its intrinsic width/height and a blur placeholder are stored in the index for instant, no-layout-shift rendering.
_Avoid_: Thumbnail, hero, banner.

**Feed**:
The masonry stream of Tiles on `blog.hugobayoud.com`, newest Short first. Labelled "Mes shorts" in the UI. Expanding a Tile opens a full-width panel in place within the Feed.
_Avoid_: Grid, list, timeline, wall.

**Read marker**:
A per-Short "read/unread" flag toggled manually by a check-in-a-circle icon on each Tile. Stored only in the browser's `localStorage` (not in any database), so it is per-device, not cross-device.
_Avoid_: Seen, viewed, visited.
