# Blog on `blog.hugobayoud.fr` is served by the same Next app via host-based middleware

The blog lives on the subdomain `blog.hugobayoud.fr`, but rather than a separate Vercel project or repo, it is served by the **same** Next.js app: `blog.hugobayoud.fr` is added as a domain on the existing Vercel project, and `middleware.ts` inspects the `Host` header to rewrite subdomain requests into the blog route group (portfolio requests are served normally). We chose this over a separate project/repo to reuse the shared Tailwind theme, fonts, dark mode, and Firebase config for free, at the accepted cost that a blog change redeploys the whole site (publishing new *Shorts* still needs no deploy — that's data, not code).

## Consequences

- The old `hugobayoud.fr/blog/*` path is removed and 301-redirected to `https://blog.hugobayoud.fr/*`.
- Blog and portfolio share one deployment lifecycle.
