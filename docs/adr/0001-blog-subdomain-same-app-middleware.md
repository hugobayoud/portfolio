# Blog on `blog.hugobayoud.com` is served by the same Next app via host-based middleware

The blog lives on the subdomain `blog.hugobayoud.com`, but rather than a separate Vercel project or repo, it is served by the **same** Next.js app: `blog.hugobayoud.com` is added as a domain on the existing Vercel project, and `middleware.ts` inspects the `Host` header to rewrite subdomain requests into the blog route group (portfolio requests are served normally). We chose this over a separate project/repo to reuse the shared Tailwind theme, fonts, dark mode, and Firebase config for free, at the accepted cost that a blog change redeploys the whole site (publishing new *Shorts* still needs no deploy — that's data, not code).

## Canonical domain

`hugobayoud.com` is the canonical domain. The `.fr` domain is kept for brand protection and redirects to `.com` at Vercel's edge (`hugobayoud.fr` → `hugobayoud.com`, `blog.hugobayoud.fr` → `blog.hugobayoud.com`, `www` → apex), so `.fr` never renders content. The middleware still matches `blog.hugobayoud.fr` as a fallback in case that edge redirect is ever missing.

## Consequences

- The old `hugobayoud.com/blog/*` path is removed and 301-redirected to `https://blog.hugobayoud.com/*`.
- Blog and portfolio share one deployment lifecycle.
