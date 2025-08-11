import { ref, getDownloadURL } from 'firebase/storage';
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { BlogPost, BlogPostPreview } from '@/lib/types/blog';
import { blogPostsStore } from '@/lib/stores/blog-posts-store';
import { storage, firestore } from '@/lib/services/firebase/firebase';
import { processMarkdownImages } from './image-service';

/**
 * Fetch a single blog post by slug from Firebase Storage
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const localBlogPost = await _findBlogPostLocally(slug);
    if (localBlogPost) return localBlogPost;

    const blogPost = blogPostsStore.getState().getBlogPost(slug);
    if (blogPost) return blogPost;

    console.log('Fetching blog post from Firestore');

    const postRef = ref(storage, `public/posts/${slug}.md`);
    const downloadURL = await getDownloadURL(postRef);
    const response = await fetch(downloadURL);

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }

    const markdownContent = await response.text();
    const { data, content } = matter(markdownContent);

    // Process images in markdown content to replace local paths with Firebase URLs
    const processedContent = await processMarkdownImages(content, slug);

    /**
     * @todo trouver un moyen de changer la styles de chaque elements d'un markdown en le passant en HTML
     */

    // Convert processed markdown to HTML
    const htmlContent = await marked(processedContent);

    // Get the blog post preview
    const preview = await getBlogPostPreview(slug);

    const newBlogPost: BlogPost = {
      slug,
      title: preview.title,
      description: preview.description,
      date: preview.date,
      keywords: data.keywords || [],
      category: preview.category,
      author: preview.author,
      image: data.image,
      canonical: `/blog/${slug}`,
      published: preview.published,
      content: processedContent,
      htmlContent,
    };

    blogPostsStore.getState().setBlogPost(newBlogPost);

    return newBlogPost;
  } catch (error) {
    console.error(`Error fetching blog post "${slug}":`, error);
    return null;
  }
}

/**
 * Fetch all blog posts from Firestore database
 */
export async function getAllBlogPosts(): Promise<BlogPostPreview[]> {
  try {
    const blogPostPreviews = blogPostsStore.getState().getBlogPostPreviews();
    console.log('blogPostPreviews', blogPostPreviews);
    if (blogPostPreviews.length > 0) {
      // Make sure dev preview is injected in dev mode even if cache exists
      const devPreview = await _findBlogPostPreviewLocally();

      if (devPreview) {
        blogPostPreviews.unshift(devPreview);
      }

      return blogPostPreviews;
    }

    console.log('Fetching blog posts from Firestore');

    const postsCollectionRef = collection(firestore, 'posts');

    // Fetch only accessible eras
    const postsQueryRef = query(
      postsCollectionRef,
      where('published', '==', true)
    );

    const querySnapshot = await getDocs(postsQueryRef);

    const posts: BlogPostPreview[] = [];

    querySnapshot.forEach((doc) => {
      const {
        slug,
        title,
        description,
        date,
        category,
        author,
        published,
        likes,
      } = doc.data();

      const preview: BlogPostPreview = {
        slug,
        title,
        description,
        date,
        category,
        author,
        published,
        likes,
        devOnly: false,
      };

      posts.push(preview);
    });

    // Inject development preview if available (dev mode only)
    // Make sure dev preview is injected in dev mode even if cache exists
    const devPreview = await _findBlogPostPreviewLocally();

    if (devPreview) {
      posts.unshift(devPreview);
    }

    // Sort by date (most recent first)
    const sortedPosts = posts.sort(
      (a, b) => b.date.toDate().getTime() - a.date.toDate().getTime()
    );

    blogPostsStore.getState().setBlogPostPreviews(sortedPosts);

    return sortedPosts;
  } catch (error) {
    console.error('Error fetching all blog posts from Firestore:', error);
    return [];
  }
}

/**
 * Fetch a single blog post preview by slug from Firebase Storage
 * @param slug - The slug of the blog post to fetch
 * @returns The blog post preview
 * @throws An error if the blog post preview is not found
 */
export async function getBlogPostPreview(
  slug: string
): Promise<BlogPostPreview> {
  const blogPostPreview = blogPostsStore.getState().getBlogPostPreview(slug);
  if (blogPostPreview) {
    return blogPostPreview;
  } else {
    const postreviews = await getAllBlogPosts();
    const postreview = postreviews.find((post) => post.slug === slug);
    if (postreview) {
      return postreview;
    } else {
      throw new Error(`Blog post preview not found for slug: ${slug}`);
    }
  }
}

async function _findBlogPostLocally(slug: string): Promise<BlogPost | null> {
  // In dev mode, try to read the post from local development folder first
  if (process.env.NODE_ENV !== 'production') {
    try {
      // In development, if this slug corresponds to a dev-only post,
      // always refetch the markdown from disk on every call (bypass cache).
      const devPreview = await _findBlogPostPreviewLocally();
      if (devPreview && devPreview.slug === slug && devPreview.devOnly) {
        const devMarkdownPath = path.join(
          process.cwd(),
          'articles',
          'development',
          `${slug}.md`
        );
        const markdownContent = await fs.readFile(devMarkdownPath, 'utf-8');
        const { data, content } = matter(markdownContent);

        // Process images in markdown content for development
        const processedContent = await processMarkdownImages(content, slug);

        const htmlContent = await marked(processedContent);

        console.log('htmlContent', htmlContent);

        // Get preview (will include dev preview in dev mode)
        const preview = await getBlogPostPreview(slug);

        const newBlogPost: BlogPost = {
          slug,
          title: preview.title,
          description: preview.description,
          date: Timestamp.fromDate(new Date()),
          keywords: Array.isArray(data.keywords) ? data.keywords : [],
          category: preview.category,
          author: preview.author,
          image: data.image,
          canonical: `/blog/${slug}`,
          published: preview.published,
          content: processedContent,
          htmlContent,
        };

        blogPostsStore.getState().setBlogPost(newBlogPost);

        return newBlogPost;
      }
    } catch (devErr) {
      // Fall through to Firebase if local file is not found
      console.error('Error reading dev preview:', devErr);
    }
  }

  return null;
}

async function _findBlogPostPreviewLocally(): Promise<BlogPostPreview | null> {
  if (process.env.NODE_ENV !== 'production') {
    try {
      const devPreviewPath = path.join(
        process.cwd(),
        'articles',
        'development',
        'blog-post-preview.json'
      );
      const file = await fs.readFile(devPreviewPath, 'utf-8');
      const data = JSON.parse(file);
      const devPreview: BlogPostPreview = {
        slug: data.slug,
        title: data.title,
        description: data.description,
        date: Timestamp.fromDate(new Date(data.date)),
        category: data.category,
        author: data.author,
        published: Boolean(data.published),
        likes: Number(data.likes ?? 0),
        devOnly: true,
      };

      return devPreview;
    } catch (error: unknown) {
      console.error('Error reading dev preview:', error);
      // ignore if dev preview not present
    }
  }

  return null;
}
