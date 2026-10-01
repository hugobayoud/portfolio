# Context Map

## Contexts

- [Portfolio](./CONTEXT.md) — the CV on `hugobayoud.com` and the Shorts feed on `blog.hugobayoud.com`
- [Réunion quiz](./src/app/reunion/CONTEXT.md) — a self-paced quiz about Réunion Island on `reunion.hugobayoud.com`

## Relationships

- **Portfolio ↔ Réunion quiz**: no shared domain language. The quiz is served by the same Next app via host-based middleware (see `docs/adr/0001-blog-subdomain-same-app-middleware.md`) and reuses the app's fonts and Tailwind setup, nothing else.
