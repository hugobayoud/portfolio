import type { Question } from '@/app/reunion/quiz';

import { ChoiceShape, choiceColours } from './choice-style';

/**
 * The Pick step: the whole screen takes the Answer's colour, the shape and
 * Choice text very large in the centre — the screen held up to the room.
 * Tapping anywhere moves on.
 */
export const PickStep = ({
  question,
  answer,
  onNext,
}: {
  question: Question;
  answer: number;
  onNext: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onNext}
      className={`flex min-h-dvh w-full flex-col px-4 pt-6 pb-[max(1rem,env(safe-area-inset-bottom))] text-left ${choiceColours(answer)}`}
    >
      <span className="mx-auto block w-full max-w-xl font-title text-base leading-snug">
        {question.prompt}
      </span>
      <span className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-6 py-8 text-center">
        <ChoiceShape position={answer} className="size-24" />
        <span className="break-words font-title text-5xl leading-tight">
          {question.choices[answer]}
        </span>
      </span>
    </button>
  );
};
