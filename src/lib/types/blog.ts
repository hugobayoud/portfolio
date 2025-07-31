export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
  category: string;
  publishedTime: string;
  content: string;
  htmlContent: string;
};

export type BlogPostPreview = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
};
