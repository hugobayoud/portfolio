import type { Question } from '@/app/reunion/quiz';

import { ChoiceButton } from './choice-button';

/**
 * The Prompt step: the prompt on top, the four Choices in a 2×2 grid at the
 * bottom of the screen, under the thumb.
 */
export const PromptStep = ({ question }: { question: Question }) => {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-4 pt-6 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="flex flex-1 items-center py-6">
        <h1 className="font-title text-2xl text-navy leading-snug sm:text-3xl">
          {question.prompt}
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {question.choices.map((choice, position) => (
          <ChoiceButton key={choice} position={position} text={choice} />
        ))}
      </div>
    </main>
  );
};
