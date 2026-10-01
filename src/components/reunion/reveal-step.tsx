import type { ReactNode } from 'react';

import type { Question } from '@/app/reunion/quiz';

import { ChoiceShape, choiceColours } from './choice-style';

/**
 * The Reveal step: the points earned, the Correct choice, then the
 * Explanation, with the button to move on at the bottom. May scroll.
 */
export const RevealStep = ({
  question,
  answer,
  explanation,
  isLast,
  onNext,
  arrows,
}: {
  question: Question;
  answer: number;
  explanation: ReactNode;
  isLast: boolean;
  onNext: () => void;
  arrows: ReactNode;
}) => {
  const isRight = answer === question.correct;

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col gap-6 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      {arrows}

      <p
        className={`font-semibold text-xl leading-snug ${isRight ? 'text-(--color-right)' : 'text-(--color-wrong)'}`}
      >
        {isRight
          ? '+3 points'
          : `+0 points, tu avais répondu : ${question.choices[answer]}`}
      </p>

      <div
        className={`flex items-center gap-4 rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.07)] ${choiceColours(question.correct)}`}
      >
        <ChoiceShape position={question.correct} className="size-10" />
        <span className="break-words font-title text-3xl leading-tight">
          {question.choices[question.correct]}
        </span>
      </div>

      {explanation}

      <button
        type="button"
        onClick={onNext}
        className="mt-auto w-full rounded-2xl bg-navy px-6 py-5 font-semibold text-white text-xl"
      >
        {isLast ? 'Voir mon score' : 'Question suivante'}
      </button>
    </main>
  );
};
