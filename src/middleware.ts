import { NextRequest, NextResponse } from 'next/server';

/**
 * Host-based routing for the blog subdomain.
 *
 * The canonical domain is `hugobayoud.com`; the `.fr` domain redirects to it at
 * Vercel's edge (before this middleware runs). The blog is served on
 * `blog.hugobayoud.com` (and `blog.localhost` in dev): requests to a blog host
 * are rewritten into the internal `/blog` route subtree, so visitors see
 * `blog.hugobayoud.com/mon-slug` while the app renders `/blog/mon-slug`. The
 * apex `hugobayoud.com` keeps serving the portfolio untouched.
 *
 * `blog.hugobayoud.fr` is also matched as a belt-and-suspenders fallback: if its
 * edge redirect is ever missing, the blog host still serves the blog rather than
 * the portfolio.
 *
 * See docs/adr/0001-blog-subdomain-same-app-middleware.md
 */

const BLOG_HOSTS = new Set([
  'blog.hugobayoud.com',
  'blog.hugobayoud.fr',
  'blog.localhost',
]);

function isBlogHost(host: string): boolean {
  const hostname = host.split(':')[0]; // strip port
  return BLOG_HOSTS.has(hostname);
}

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') ?? '';

  if (!isBlogHost(host)) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();

  // Avoid double-prefixing if the internal path already targets /blog.
  if (!url.pathname.startsWith('/blog')) {
    url.pathname =
      url.pathname === '/' ? '/blog' : `/blog${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  // Run on everything except Next internals, the API, well-known files, and
  // any path that looks like a static file (contains a dot).
  matcher: ['/((?!_next/|api/|\\.well-known/|.*\\..*).*)'],
};
