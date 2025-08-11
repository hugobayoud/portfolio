import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/services/firebase/firebase';

/**
 * Generate a Firebase Storage path for an image based on its filename
 * @param slug - The blog post slug
 * @param imageName - The image filename
 * @returns string - The Firebase Storage path
 */
export function getImageStoragePath(slug: string, imageName: string): string {
  return `public/images/posts/${slug}/${imageName}`;
}

/**
 * Get download URL for a specific image
 * @param slug - The blog post slug
 * @param imageName - The image filename
 * @returns Promise<string> - The download URL
 */
export async function getBlogImageUrl(
  slug: string,
  imageName: string
): Promise<string> {
  try {
    const imageRef = ref(storage, getImageStoragePath(slug, imageName));
    return await getDownloadURL(imageRef);
  } catch (error) {
    console.error(`Error getting image URL for ${imageName}:`, error);
    throw new Error(`Image not found: ${imageName}`);
  }
}

/**
 * Process markdown content and replace image references with Firebase Storage URLs
 * @param content - The markdown content
 * @param slug - The blog post slug
 * @returns Promise<string> - The processed markdown content with Firebase URLs
 */
export async function processMarkdownImages(
  content: string,
  slug: string
): Promise<string> {
  // Regex to match markdown images: ![alt](./image.jpg) or ![alt](image.jpg)
  const imageRegex = /!\[([^\]]*)\]\(\.?\/?([^)]+)\)/g;

  let processedContent = content;
  const matches = [...content.matchAll(imageRegex)];

  for (const match of matches) {
    const fullMatch = match[0];
    const altText = match[1];
    const imagePath = match[2];

    try {
      // Extract just the filename from the path
      const fileName = imagePath.split('/').pop() || imagePath;

      // Get the Firebase Storage URL
      const firebaseUrl = await getBlogImageUrl(slug, fileName);

      // Replace the local path with the Firebase URL
      const newImageMarkdown = `![${altText}](${firebaseUrl})`;
      processedContent = processedContent.replace(fullMatch, newImageMarkdown);

      console.log(`Replaced image: ${imagePath} -> ${firebaseUrl}`);
    } catch (error) {
      console.warn(`Could not process image ${imagePath}:`, error);
      // Keep the original if we can't process it
    }
  }

  return processedContent;
}
