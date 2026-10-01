import parse from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

import type { Question } from '@/app/reunion/quiz';

/**
 * A Question's Explanation, rendered on the server so marked and DOMPurify
 * never reach the Player's phone. `text` blocks are markdown (paragraphs on
 * blank lines, **bold**, *italic*); `carousel` blocks are not rendered yet.
 * An Explanation with nothing to show renders nothing, leaving no gap.
 */
export const Explanation = ({
  blocks,
}: {
  blocks: Question['explanation'];
}) => {
  const texts = blocks.flatMap((block) => ('text' in block ? block.text : []));
  if (texts.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 text-ink text-lg leading-relaxed [&_p+p]:mt-4 [&_strong]:font-semibold">
      {texts.map((text) => (
        <div key={text}>
          {parse(DOMPurify.sanitize(marked.parse(text, { async: false })))}
        </div>
      ))}
    </div>
  );
};
