import { MDXWrapper } from '@/components/blog/mdx-wrapper';
import { ArticleCard } from '@/components/blog/article-card';
import { getBlogPostPreviews } from '@/lib/services/blog/blog-service';
import { BlogEmptyState } from '@/components/blog/blog-empty-state';

// Server component that fetches data
export default async function BlogPage() {
  const articles = await getBlogPostPreviews();

  return (
    <MDXWrapper>
      <div className="items-center flex flex-col sm:grid sm:grid-cols-2 gap-4">
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            {...article}
            date={article.date.toDate().toLocaleDateString('fr-FR')}
          />
        ))}

        {articles.length === 0 && <BlogEmptyState />}
      </div>
    </MDXWrapper>
  );
}
