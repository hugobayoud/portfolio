import photos from './photos.json';
import type { Question } from './quiz';

type PhotoSize = { width: number; height: number };

/** A Carousel photo: its URL and its size from the manifest. */
export type Photo = PhotoSize & { src: string };

/**
 * Width and height of every photo in `public/reunion/<id>/`, keyed by
 * Question id then file name. Written by `npm run reunion:photos` — never
 * edit by hand.
 */
const manifest: Record<string, Record<string, PhotoSize>> = photos;

/** The photos of a `carousel` block of a Question, in their authored order. */
export const carouselPhotos = (questionId: string, files: string[]): Photo[] =>
  files.map((file) => ({
    src: `/reunion/${questionId}/${file}`,
    ...manifest[questionId][file],
  }));

/**
 * Throws, naming the Question and file, if a `carousel` block references a
 * photo the pipeline has not produced — so a typo fails the build instead of
 * shipping a broken image to Players.
 */
export function assertCarouselPhotos(questions: Question[]) {
  for (const question of questions) {
    for (const block of question.explanation) {
      if (!('carousel' in block)) continue;
      for (const file of block.carousel) {
        if (!manifest[question.id]?.[file]) {
          throw new Error(
            `Question "${question.id}": carousel photo "${file}" is missing from public/reunion/${question.id}/ — check the file name or run \`npm run reunion:photos\`.`,
          );
        }
      }
    }
  }
}
