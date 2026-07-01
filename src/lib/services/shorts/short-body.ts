import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

/**
 * Render a Short's plain-markdown body (bold, italic, headings, lists, links,
 * images — no MDX/React-in-markdown) to sanitized HTML, safe to inline into
 * the static feed page ahead of expand. Rendering to `loading="lazy"` `<img>`
 * tags happens downstream in `HtmlContent`, which owns per-tag presentation.
 */
export function renderShortBody(markdown: string): string {
  const html = marked.parse(markdown, { async: false });
  return DOMPurify.sanitize(html);
}
