import { Timestamp } from 'firebase/firestore';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: Timestamp;
  keywords: string[];
  category: string;
  author: string;
  image?: string;
  canonical: string;
  published: boolean;
  content: string;
  htmlContent: string;
};

export type BlogPostPreview = {
  slug: string;
  title: string;
  description: string;
  date: Timestamp;
  category: string;
  author: string;
  published: boolean;
};
