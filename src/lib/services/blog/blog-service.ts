import { ref, getDownloadURL, listAll } from 'firebase/storage';
import matter from 'gray-matter';
import { marked } from 'marked';
import { BlogPost, BlogPostPreview } from '@/lib/types/blog';
import { storage } from '@/lib/services/firebase/storage';

/**
 * Fetch a single blog post by slug from Firebase Storage
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const postRef = ref(storage, `posts/${slug}.md`);
    const downloadURL = await getDownloadURL(postRef);

    const response = await fetch(downloadURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }

    const markdownContent = await response.text();
    const { data, content } = matter(markdownContent);

    // Convert markdown to HTML
    const htmlContent = await marked(content);

    // Convert date to ISO format for publishedTime if not provided
    const publishedTime =
      data.publishedTime ||
      (data.date
        ? new Date(data.date).toISOString()
        : new Date().toISOString());

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      keywords: data.keywords || [],
      category: data.category || 'General',
      publishedTime,
      author: data.author || 'Hugo Bayoud',
      image: data.image,
      canonical: data.canonical || `/blog/${slug}`,
      published: data.published !== false,
      content,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error fetching blog post "${slug}":`, error);
    return null;
  }
}

/**
 * Fetch all blog posts from Firebase Storage
 */
export async function getAllBlogPosts(): Promise<BlogPostPreview[]> {
  try {
    const postsRef = ref(storage, 'posts/');
    const listResult = await listAll(postsRef);

    // Fetch all posts in parallel
    const postPromises = listResult.items.map(async (itemRef) => {
      try {
        const downloadURL = await getDownloadURL(itemRef);
        const response = await fetch(downloadURL);

        if (!response.ok) {
          console.warn(
            `Failed to fetch ${itemRef.name}: ${response.statusText}`
          );
          return null;
        }

        const markdownContent = await response.text();
        const { data } = matter(markdownContent);

        // Extract slug from filename (remove .md extension)
        const slug = itemRef.name.replace('.md', '');

        // Only include published posts
        // if (data.published === false) {
        //   return null;
        // }

        return {
          slug,
          title: data.title || 'Untitled',
          description: data.description || '',
          date: data.date || '',
          category: data.category || 'General',
        };
      } catch (error) {
        console.error(`Error processing ${itemRef.name}:`, error);
        return null;
      }
    });

    const results = await Promise.all(postPromises);

    // Filter out null results and sort by date
    const validPosts = results.filter(
      (post): post is BlogPostPreview => post !== null
    );

    return validPosts.sort((a, b) => {
      // Sort by date (most recent first)
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error('Error fetching all blog posts:', error);
    return [];
  }
}
