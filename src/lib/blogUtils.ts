import { storage } from './firebase';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
  category: string;
  publishedTime: string;
  content: string;
  htmlContent: string;
}

export interface BlogPostPreview {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

/**
 * @TODO : Mettre toutes ces functions dans des fichiers séparés et plutot dans le dossier "utils/blog" avec des noms de fihchiers plus explicites: ex. "getBlogPost"
 */

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

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || '',
      keywords: data.keywords || [],
      category: data.category || 'General',
      publishedTime: data.publishedTime || '',
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

    const posts: BlogPostPreview[] = [];

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
