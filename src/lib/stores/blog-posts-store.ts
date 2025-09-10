import { create } from 'zustand';
import { BlogPost, BlogPostPreview } from '../types/blog';

interface BlogPostFetch {
  post: BlogPost;
  lastFetch: number;
}

interface BlogPreviewFetch {
  preview: BlogPostPreview;
  lastFetch: number;
}

interface BlogPostsState {
  posts: BlogPostFetch[];
  previews: BlogPreviewFetch[];

  getBlogPost: (slug: string) => BlogPost | null;
  setBlogPost: (blogPost: BlogPost) => void;

  getBlogPostPreviews: () => BlogPostPreview[];
  getBlogPostPreview: (slug: string) => BlogPostPreview | null;
  setBlogPostPreviews: (blogPostPreviews: BlogPostPreview[]) => void;
}

export const blogPostsStore = create<BlogPostsState>()((set, get) => ({
  posts: [],
  previews: [],

  getBlogPost: (slug: string) => {
    const allPosts = get().posts;

    const post = allPosts.find((post) => post.post.slug === slug);

    if (post) {
      // 24h ago
      const twentyFourHoursAgo = new Date().getTime() - 24 * 60 * 60 * 1000;
      if (post.lastFetch < twentyFourHoursAgo) {
        return null;
      }

      return post.post;
    }

    return null;
  },

  setBlogPost: (blogPost: BlogPost) => {
    const allPosts = get().posts.filter(
      (post) => post.post.slug !== blogPost.slug
    );

    const now = new Date().getTime();
    const newPost: BlogPostFetch = { post: blogPost, lastFetch: now };

    allPosts.push(newPost);

    set((state) => ({ ...state, posts: allPosts }));
  },

  getBlogPostPreviews: () => {
    const allPreviews = get().previews;
    return allPreviews.map((preview) => preview.preview);
  },

  getBlogPostPreview: (slug: string) => {
    const data = get().previews.find(
      (preview) => preview.preview.slug === slug
    );

    // 1h ago
    const oneHourAgo = new Date().getTime() - 1 * 60 * 60 * 1000;
    if (data) {
      if (data.lastFetch < oneHourAgo) {
        return null;
      }

      return data.preview;
    }

    return null;
  },

  setBlogPostPreviews: (blogPostPreviews: BlogPostPreview[]) => {
    const now = new Date().getTime();
    const allPreviews = blogPostPreviews.map((preview) => ({
      preview,
      lastFetch: now,
    }));

    set((state) => ({ ...state, previews: allPreviews }));
  },
}));
