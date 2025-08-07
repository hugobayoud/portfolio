import { create } from 'zustand';
import { BlogPost, BlogPostPreview } from '../types/blog';

interface BlogPostsState {
  blogPosts: BlogPost[];
  blogPostPreviews: BlogPostPreview[];

  getBlogPost: (slug: string) => BlogPost | null;
  setBlogPost: (blogPost: BlogPost) => void;

  getBlogPostPreviews: () => BlogPostPreview[];
  getBlogPostPreview: (slug: string) => BlogPostPreview | null;
  setBlogPostPreviews: (blogPostPreviews: BlogPostPreview[]) => void;
}

export const blogPostsStore = create<BlogPostsState>()((set, get) => ({
  blogPosts: [],
  blogPostPreviews: [],

  getBlogPost: (slug: string) => {
    const data = get().blogPosts.find((post) => post.slug === slug);
    return !data ? null : data;
  },

  setBlogPost: (blogPost: BlogPost) => {
    // Ensure unicity
    const blogPosts = get().blogPosts;
    const index = blogPosts.findIndex((post) => post.slug === blogPost.slug);
    if (index === -1) {
      blogPosts.push(blogPost);
    } else {
      blogPosts[index] = blogPost;
    }

    set((state) => ({ ...state, blogPosts }));
  },

  getBlogPostPreviews: () => {
    const data = get().blogPostPreviews;
    return !data ? [] : data;
  },

  getBlogPostPreview: (slug: string) => {
    const data = get().blogPostPreviews.find(
      (preview) => preview.slug === slug
    );
    return !data ? null : data;
  },

  setBlogPostPreviews: (blogPostPreviews: BlogPostPreview[]) => {
    set((state) => ({ ...state, blogPostPreviews }));
  },
}));
