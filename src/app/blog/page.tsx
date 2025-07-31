import MDXWrapper from '../../../components/MDXWrapper';
import { getAllBlogPosts } from '@/lib/blogUtils';
import ArticleCard from '../../../components/ArticleCard';
import BlogEmptyState from '../../../components/BlogEmptyState';

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
