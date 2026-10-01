import { type NextRequest, NextResponse } from 'next/server';

/**
 * Host-based routing for the subdomains.
 *
 * The canonical domain is `hugobayoud.com`; the `.fr` domain redirects to it at
 * Vercel's edge (before this middleware runs). Each subdomain is served by this
 * same app: requests to `<sub>.hugobayoud.com` (and `<sub>.localhost` in dev)
 * are rewritten into the internal `/<sub>` route subtree, so visitors see
 * `blog.hugobayoud.com/mon-slug` while the app renders `/blog/mon-slug`. The
 * apex `hugobayoud.com` keeps serving the portfolio untouched.
 *
 * - `blog` — the Shorts feed.
 * - `reunion` — the Réunion quiz (see src/app/reunion/CONTEXT.md).
 *
 * `<sub>.hugobayoud.fr` is also matched as a belt-and-suspenders fallback: if
 * its edge redirect is ever missing, the subdomain still serves its own content
 * rather than the portfolio.
 *
 * On the apex, `/<sub>/*` paths are 301-redirected onto the subdomain — for the
 * blog, which used to live there, so bookmarked/shared links keep working.
 *
 * See docs/adr/0001-blog-subdomain-same-app-middleware.md
 */

const SUBDOMAINS = ['blog', 'reunion'];

const ROOT_HOSTS = ['hugobayoud.com', 'hugobayoud.fr', 'localhost'];

/** The subdomain a host is serving, if any (`blog.localhost:3000` → `blog`). */
function subdomainOf(host: string): string | undefined {
  const hostname = host.split(':')[0]; // strip port
  return SUBDOMAINS.find((sub) =>
    ROOT_HOSTS.some((root) => hostname === `${sub}.${root}`),
  );
}

/** The subdomain an apex path belongs to (`/blog/x` → `blog`). */
function subdomainPathOf(pathname: string): string | undefined {
  return SUBDOMAINS.find(
    (sub) => pathname === `/${sub}` || pathname.startsWith(`/${sub}/`),
  );
}

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') ?? '';
  const url = req.nextUrl.clone();

  const sub = subdomainOf(host);
  if (sub) {
    // Rewrite subdomain requests into the internal `/<sub>` subtree; avoid
    // double-prefixing if the internal path already targets it.
    if (subdomainPathOf(url.pathname) !== sub) {
      url.pathname =
        url.pathname === '/' ? `/${sub}` : `/${sub}${url.pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // Apex host: 301 `/<sub>/*` onto the subdomain, dropping the `/<sub>` prefix
  // and preserving the TLD and port
  // (hugobayoud.com/blog/x → blog.hugobayoud.com/x, .fr → blog.….fr).
  const pathSub = subdomainPathOf(url.pathname);
  if (pathSub) {
    const [hostname, port] = host.split(':');
    const protocol = hostname.endsWith('localhost') ? 'http' : 'https';
    const authority = `${pathSub}.${hostname}${port ? `:${port}` : ''}`;
    const rest = url.pathname.slice(`/${pathSub}`.length) || '/';
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
