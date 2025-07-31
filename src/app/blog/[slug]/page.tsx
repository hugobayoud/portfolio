import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getBlogPost } from '@/lib/services/blog/blog-service';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

/**
 * @TODO Avant de supprimer "/blog/chapitre-1-je-me-relance" il faut que je generate les metadatas dynamiquement pour chaque post.
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
      title: 'Post not found',
    };
  }

  return {
    title: `${post.title} | Hugo Bayoud Blog`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedTime,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <Date>{post.date}</Date>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md">
            {post.category}
          </span>
        </div>
        {post.description && (
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            {post.description}
          </p>
        )}
      </header>

      <div
        className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
        dangerouslySetInnerHTML={{ __html: post.htmlContent }}
      />
    </article>
  );
}

// Generate static params for known blog posts (optional - for better performance)
export async function generateStaticParams() {
  // This will be empty initially, but Next.js will generate pages on-demand
  return [];
}
