import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  getBlogPost,
  getBlogPostPreview,
} from '@/lib/services/blog/blog-service';
import { LikeButton } from '@/components/ui/like-button';
import HtmlContent from '@/components/blog/html-content';
import { TTTrailersBold } from '@/app/layout';

/**
 * Dynamic blog post page with complete metadata generation
 * Fetches blog posts from Firebase Storage and generates SEO-optimized metadata
 */

// Custom Date component to match the expected format in the markdown
function Date({ children }: { children: string }) {
  return (
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">
      {children}
    </p>
  );
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post not found | Hugo Bayoud',
      description: 'The requested blog post could not be found.',
    };
  }

  console.log(post.date);

  const { image } = post;

  return {
    metadataBase: new URL('https://hugobayoud.fr'),
    alternates: {
      canonical: post.canonical,
    },
    title: `${post.title} | Hugo Bayoud`,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    category: post.category,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: `${post.title} - ${post.author}`,
            },
          ]
        : undefined,
      siteName: 'Hugo Bayoud',
      locale: 'fr_FR',
      publishedTime: post.date.toDate().toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: image ? [image] : undefined,
    },
  };
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  const preview = await getBlogPostPreview(slug);

  if (!post) {
    notFound();
  }

  const date = post.date.toDate().toLocaleDateString('fr-FR');

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8 items-center">
        <h1
          className={`text-4xl sm:text-5xl text-center mb-4 ${TTTrailersBold.className}`}
        >
          {post.title}
        </h1>
        <div className="flex flex-col items-center gap-4 text-sm">
          <Date>{date}</Date>
          <span className="px-3 py-2 bg-gray-100 dark:bg-yellow-900/70 text-gray-700 dark:text-yellow-500 rounded-md">
            {post.category}
          </span>
        </div>
      </header>

      <HtmlContent html={post.htmlContent} />

      {/* Like Button */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <LikeButton slug={post.slug} initialLikeCount={preview.likes} />
      </div>
    </article>
  );
}

// Generate static params for known blog posts (optional - for better performance)
export async function generateStaticParams() {
  // This will be empty initially, but Next.js will generate pages on-demand
  return [];
}
