import { MDXWrapper } from '@/components/blog/mdx-wrapper';
import { ArticleCard } from '@/components/blog/article-card';
import { getAllBlogPosts } from '@/lib/services/blog/blog-service';
import { BlogEmptyState } from '@/components/blog/blog-empty-state';

// Server component that fetches data
export default async function BlogPage() {
  const articles = await getAllBlogPosts();

  return (
    <MDXWrapper>
      <div className="items-center flex flex-col sm:grid sm:grid-cols-2 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}

        {articles.length === 0 && <BlogEmptyState />}
      </div>
    </MDXWrapper>
  );
}
