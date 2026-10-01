import parse from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

import type { Question } from '@/app/reunion/quiz';

import { Carousel } from './carousel';

/**
 * A Question's Explanation, rendered on the server so marked and DOMPurify
 * never reach the Player's phone. Blocks render in their authored order:
 * `text` blocks are markdown (paragraphs on blank lines, **bold**, *italic*),
 * `carousel` blocks are a Carousel of the Question's photos. An Explanation
 * with nothing to show renders nothing, leaving no gap.
 */
export const Explanation = ({ question }: { question: Question }) => {
  if (question.explanation.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 text-ink text-lg leading-relaxed [&_p+p]:mt-4 [&_strong]:font-semibold">
      {question.explanation.map((block) =>
        'text' in block ? (
          <div key={block.text}>
            {parse(
              DOMPurify.sanitize(marked.parse(block.text, { async: false })),
            )}
          </div>
        ) : (
          <Carousel
            key={block.carousel.join()}
            questionId={question.id}
            files={block.carousel}
          />
        ),
      )}
    </div>
  );
};
