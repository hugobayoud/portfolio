# Portfolio

Personal site for Hugo Bayoud. The canonical domain is `hugobayoud.com`: the apex serves the portfolio and the subdomain `blog.hugobayoud.com` serves a feed of daily short writings. The `.fr` domain is brand-protection only and redirects to `.com` at the edge.

## Language

### Blog (blog.hugobayoud.fr)

**Short**:
A single piece of daily writing — the content entity. Has a date, title, description, markdown body, one mandatory cover image, and optional inline images. This is the data.
_Avoid_: Article, Post, Entry.

**Tile**:
The UI rendering of a Short in the feed grid. Has one of three fixed aspect-ratio sizes (small / medium / large) and idle / hover / expanded visual states. A Short is displayed as a Tile — the Tile is how a Short looks in the feed; the Short is the data.
_Avoid_: Card, Cell, Block.

**Cover**:
The single mandatory image of a Short, shown *contained* (whole image visible, letterboxed) in its idle Tile. Distinct from the Short's optional inline body images. Its intrinsic width/height and a blur placeholder are stored in the index for instant, no-layout-shift rendering.
_Avoid_: Thumbnail, hero, banner.

**Feed**:
The masonry stream of Tiles on `blog.hugobayoud.com`, newest Short first. Labelled "Mes shorts" in the UI. Expanding a Tile opens a full-width panel in place within the Feed.
_Avoid_: Grid, list, timeline, wall.

**Read marker**:
A per-Short "read/unread" flag toggled manually by a check-in-a-circle icon on each Tile. Stored only in the browser's `localStorage` (not in any database), so it is per-device, not cross-device.
_Avoid_: Seen, viewed, visited.
