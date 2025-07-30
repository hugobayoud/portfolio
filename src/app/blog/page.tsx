import MDXWrapper from '../../../components/MDXWrapper';
import { getAllBlogPosts } from '@/lib/blogUtils';
import ArticleCard from '../../../components/ArticleCard';
import { useLanguage } from '@/i18n/LanguageProvider';

export default async function BlogPage() {
  const articles = await getAllBlogPosts();
  const { messages } = useLanguage();

  return (
    <MDXWrapper>
      <div className="items-center flex flex-col sm:grid sm:grid-cols-2 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}

        {articles.length === 0 && (
          <div className="col-span-2 text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              {messages.blog.noPosts}
            </p>
          </div>
        )}
      </div>
    </MDXWrapper>
  );
}
