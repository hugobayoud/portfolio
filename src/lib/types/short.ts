import { Timestamp } from 'firebase/firestore';

/**
 * The single mandatory image of a Short, shown *contained* in its Tile.
 *
 * Its intrinsic dimensions and a blur placeholder live in the read index so the
 * cover renders instantly with no layout shift (see CONTEXT.md → "Cover").
 */
export type ShortCover = {
  /** Firebase Storage path to the `.webp` cover (resolved to a URL at read time). */
  path: string;
  /** Intrinsic width in px — pins the aspect ratio so there is no layout shift. */
  width: number;
  /** Intrinsic height in px. */
  height: number;
  /** Base64 data URL used as the blur-up placeholder while the cover loads. */
  blurDataURL: string;
};

/**
 * A single daily writing — the content entity (see CONTEXT.md → "Short").
 *
 * Mirrors a `shorts/{slug}` Firestore document, which is the read index the
 * static feed queries. This replaces the old `BlogPost`/`BlogPostPreview`
 * shapes; `category`, `author`, `devOnly`, and `likes` are intentionally gone.
 */
export type Short = {
  slug: string;
  title: string;
  description: string;
  date: Timestamp;
  published: boolean;
  keywords?: string[];
  cover: ShortCover;
  /** Firebase Storage path to the Short's markdown body (frontmatter-free). */
  bodyPath: string;
};

/**
 * A Short ready to render as a Tile in the Feed: the index data plus its cover
 * `path` already resolved to a download URL, and its body already rendered to
 * sanitized HTML, by the read service.
 *
 * `date` is serialized to an ISO 8601 string (rather than the Firestore
 * `Timestamp` instance `Short` carries) because this type is passed as props
 * from the Server Component feed page into the `'use client'` `ShortTile` —
 * and a `Timestamp` class instance can't cross that boundary.
 */
export type ShortFeedItem = Omit<Short, 'date'> & {
  /** Publish date as an ISO 8601 string — see type-level note above. */
  date: string;
  /** Resolved Storage download URL for {@link ShortCover.path}. */
  coverUrl: string;
  /**
   * Body rendered to sanitized HTML at build time and inlined into the static
   * feed page, hidden until the Tile is expanded (see
   * docs/adr/0002-no-wait-blog-delivery.md).
   */
  bodyHtml: string;
};
