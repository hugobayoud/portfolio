import { NextRequest, NextResponse } from 'next/server';

/**
 * Host-based routing for the blog subdomain.
 *
 * `blog.hugobayoud.fr` (and `blog.localhost` in dev) is served by this same
 * Next app: requests to the blog host are rewritten into the internal `/blog`
 * route subtree, so visitors see `blog.hugobayoud.fr/mon-slug` while the app
 * renders `/blog/mon-slug`. The apex `hugobayoud.fr` keeps serving the
 * portfolio untouched.
 *
 * See docs/adr/0001-blog-subdomain-same-app-middleware.md
 */

function isBlogHost(host: string): boolean {
  const hostname = host.split(':')[0]; // strip port
  return hostname === 'blog.hugobayoud.fr' || hostname === 'blog.localhost';
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
