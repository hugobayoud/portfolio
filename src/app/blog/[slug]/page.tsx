import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Feed } from '@/components/blog/feed';
import { getPublishedShorts } from '@/lib/services/shorts/shorts-service';

/**
 * Shareable slug page for a single Short (`blog.hugobayoud.com/mon-slug`).
 *
 * It renders the *same* Feed as the root, but with this Short already expanded
 * on arrival — so a shared or directly-loaded link lands the reader straight on
 * the Short, then behaves exactly like the in-app feed from there. In-app
 * expansion never navigates here (the URL is updated with `history.pushState`,
 * see feed.tsx); this route exists only for direct/shared visits and crawlers,
 * each carrying its own OpenGraph/Twitter metadata.
 *
 * Generated *on-demand* via ISR (empty `generateStaticParams` + on-demand
 * fallback), not pre-built for every slug, so build time doesn't grow with the
 * archive (see docs/adr/0002-no-wait-blog-delivery.md). The underlying Shorts
 * read is cached and `shorts`-tagged, so the publish pipeline's revalidate ping
 * refreshes these pages alongside the feed; `revalidate` is the time fallback.
 */
export const revalidate = 3600;

// Empty at build time: slugs are rendered on first hit and then cached, rather
// than all pre-built. `dynamicParams` (true by default) allows the on-demand
// generation of any published slug not listed here.
export async function generateStaticParams() {
  return [];
}

interface ShortPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ShortPageProps): Promise<Metadata> {
  const { slug } = await params;
  const short = (await getPublishedShorts()).find((item) => item.slug === slug);

  if (!short) {
    return { title: 'Short introuvable | Hugo Bayoud' };
  }

  // Per-Short unfurl: title/description plus the cover as the OG image (its
  // resolved Storage URL is already absolute). The generic blog metadata on the
  // layout is overridden here; the root feed keeps it.
  const cover = {
    url: short.coverUrl,
    width: short.cover.width,
    height: short.cover.height,
    alt: short.title,
  };

  return {
    title: `${short.title} | Hugo Bayoud`,
    description: short.description,
    keywords: short.keywords,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      type: 'article',
      title: short.title,
      description: short.description,
      url: `/${slug}`,
      images: [cover],
      siteName: 'Hugo Bayoud',
      locale: 'fr_FR',
      publishedTime: short.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: short.title,
      description: short.description,
      images: [cover.url],
    },
  };
}

export default async function ShortPage({ params }: ShortPageProps) {
  const { slug } = await params;
  const shorts = await getPublishedShorts();

  // Only render for a real, published Short; unknown slugs 404 (and are not
  // cached as valid pages).
  if (!shorts.some((short) => short.slug === slug)) {
    notFound();
  }

  return <Feed shorts={shorts} initialExpandedSlug={slug} />;
}
