import { ref, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import matter from 'gray-matter';
import { marked } from 'marked';
import { BlogPost, BlogPostPreview } from '@/lib/types/blog';
import { storage, firestore } from '@/lib/services/firebase/storage';
import { blogPostsStore } from '@/lib/stores/blog-posts-store';

/**
 * Fetch a single blog post by slug from Firebase Storage
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
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

    // Convert markdown to HTML
    const htmlContent = await marked(content);

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
      content,
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
    if (blogPostPreviews.length > 0) return blogPostPreviews;

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
      const { slug, title, description, date, category, author, published } =
        doc.data();

      const preview: BlogPostPreview = {
        slug,
        title,
        description,
        date,
        category,
        author,
        published,
      };

      posts.push(preview);
    });

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
