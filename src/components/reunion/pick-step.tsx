import type { ReactNode } from 'react';

import type { Question } from '@/app/reunion/quiz';

import { ChoicePin, choiceColours } from './choice-style';

/**
 * The Pick step: the whole screen takes the Answer's colour, the Pin and
 * Choice text very large in the centre — the screen held up to the room.
 * Tapping anywhere except the arrows moves on: the arrows sit over the
 * full-screen button rather than inside it, so they never trigger it.
 */
export const PickStep = ({
  question,
  answer,
  onNext,
  arrows,
}: {
  question: Question;
  answer: number;
  onNext: () => void;
  arrows: ReactNode;
}) => {
  return (
    <div className={`relative ${choiceColours(answer)}`}>
      <button
        type="button"
        onClick={onNext}
        className="flex min-h-dvh w-full flex-col px-4 pt-[4.5rem] pb-[max(1rem,env(safe-area-inset-bottom))] text-left"
      >
        <span className="mx-auto block w-full max-w-xl font-title text-base leading-snug">
          {question.prompt}
        </span>
        <span className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-6 py-8 text-center">
          <ChoicePin position={answer} className="size-32" />
          <span className="break-words font-title text-5xl leading-tight">
            {question.choices[answer]}
          </span>
        </span>
      </button>
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto w-full max-w-xl px-4 pt-4 [&_button]:pointer-events-auto">
        {arrows}
      </div>
    </div>
  );
};
