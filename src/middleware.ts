import { type NextRequest, NextResponse } from 'next/server';

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
 * The blog used to live on the apex under `/blog/*`; those old paths are now
 * 301-redirected onto the blog subdomain so bookmarked/shared links keep working.
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
  const url = req.nextUrl.clone();

  if (isBlogHost(host)) {
    // Rewrite subdomain requests into the internal `/blog` subtree; avoid
    // double-prefixing if the internal path already targets /blog.
    if (!url.pathname.startsWith('/blog')) {
      url.pathname = url.pathname === '/' ? '/blog' : `/blog${url.pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // Apex host: the old `/blog/*` paths moved onto the blog subdomain. 301 them
  // there, dropping the `/blog` prefix and preserving the TLD and port
  // (hugobayoud.com/blog/x → blog.hugobayoud.com/x, .fr → blog.….fr).
  if (url.pathname === '/blog' || url.pathname.startsWith('/blog/')) {
    const [hostname, port] = host.split(':');
    const protocol = hostname.endsWith('localhost') ? 'http' : 'https';
    const authority = `blog.${hostname}${port ? `:${port}` : ''}`;
    const rest = url.pathname.slice('/blog'.length) || '/';
    return NextResponse.redirect(
      new URL(`${protocol}://${authority}${rest}${url.search}`),
      301,
    );
  }

  return NextResponse.next();
}

export const config = {
  // Run on everything except Next internals, the API, well-known files, and
  // any path that looks like a static file (contains a dot).
  matcher: ['/((?!_next/|api/|\\.well-known/|.*\\..*).*)'],
};
