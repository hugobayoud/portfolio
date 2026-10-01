import type { ReactNode } from 'react';

import type { Question } from '@/app/reunion/quiz';

import { ChoiceButton } from './choice-button';

/**
 * The Prompt step: the prompt on top, the four Choices in a 2×2 grid at the
 * bottom of the screen, under the thumb. When the Question already has an
 * Answer (the Player came back), that Choice is highlighted; any Choice, even
 * the same one, can be picked again.
 */
export const PromptStep = ({
  question,
  answer,
  onPick,
  arrows,
}: {
  question: Question;
  answer: number | undefined;
  onPick: (position: number) => void;
  arrows: ReactNode;
}) => {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      {arrows}

      <div className="flex flex-1 items-center py-6">
        <h1 className="font-title text-2xl text-navy leading-snug sm:text-3xl">
          {question.prompt}
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {question.choices.map((choice, position) => (
          <ChoiceButton
            key={choice}
            position={position}
            text={choice}
            isAnswer={position === answer}
            onClick={() => onPick(position)}
          />
        ))}
      </div>
    </main>
  );
};
