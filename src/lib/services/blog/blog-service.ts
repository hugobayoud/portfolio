import { query, where, getDocs, collection } from 'firebase/firestore';
import { marked } from 'marked';
import matter from 'gray-matter';
import { ref, getDownloadURL } from 'firebase/storage';

import { processMarkdownImages } from './image-service';
import { BlogPost, BlogPostPreview } from '@/lib/types/blog';
import { blogPostsStore } from '@/lib/stores/blog-posts-store';
import { storage, firestore } from '@/lib/services/firebase/firebase';

/**
 * Fetch a single blog post by slug from Firebase Storage
 */
export async function getBlogPost(slug: string): Promise<BlogPost> {
  try {
    console.log('Fetching blog post from store');

    const blogPost = blogPostsStore.getState().getBlogPost(slug);

    if (blogPost) {
      return blogPost;
    }

    console.log('Blog post not found in store, fetching from Firestore');

    const postRef = ref(storage, `public/posts/${slug}.md`);
    const downloadURL = await getDownloadURL(postRef);
    const response = await fetch(downloadURL);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const markdownContent = await response.text();
    const { data, content } = matter(markdownContent);

    // Process images in markdown content to replace local paths with Firebase URLs
    const processedContent = await processMarkdownImages(content, slug);

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

    // Store the blog post in the store
    blogPostsStore.getState().setBlogPost(newBlogPost);

    return newBlogPost;
  } catch (error) {
    throw new Error(`Error fetching blog post "${slug}": ${error}`);
  }
}

/**
 * Fetch all blog posts from Firestore database
 */
export async function getBlogPostPreviews(): Promise<BlogPostPreview[]> {
  try {
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

    // Sort by date (most recent first)
    const sortedPosts = posts.sort(
      (a, b) => b.date.toDate().getTime() - a.date.toDate().getTime()
    );

    // Store the blog post previews in the store
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
  console.log('Fetching blog post preview from store');

  const blogPostPreview = blogPostsStore.getState().getBlogPostPreview(slug);

  if (blogPostPreview) {
    return blogPostPreview;
  }

  console.log('Blog post preview not found in store, fetching from Firestore');

  // Fetch the blog post preview from Firestore
  const postsCollectionRef = collection(firestore, 'posts');
  const postsQueryRef = query(postsCollectionRef, where('slug', '==', slug));
  const querySnapshot = await getDocs(postsQueryRef);

  const preview = querySnapshot.docs[0].data();
  const postreview: BlogPostPreview = {
    slug,
    title: preview.title,
    description: preview.description,
    date: preview.date,
    category: preview.category,
    author: preview.author,
    published: preview.published,
    likes: preview.likes,
    devOnly: false,
  };

  if (preview) {
    return postreview;
  } else {
    throw new Error(`Blog post preview not found for slug: ${slug}`);
  }
}
