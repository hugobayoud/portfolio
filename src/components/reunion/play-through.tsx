'use client';

import { type ReactNode, useState } from 'react';

import type { Question } from '@/app/reunion/quiz';

import { PickStep } from './pick-step';
import { PromptStep } from './prompt-step';
import { RevealStep } from './reveal-step';
import { ScoreScreen } from './score-screen';

type Step = 'prompt' | 'pick' | 'reveal';

/**
 * One play of the Quiz, from the first Prompt step to the Score screen. State
 * lives in memory only: reloading starts over.
 */
export const PlayThrough = ({
  questions,
  explanations,
}: {
  questions: Question[];
  /** The rendered Explanation of each Question, in the same order. */
  explanations: ReactNode[];
}) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [step, setStep] = useState<Step | 'score'>('prompt');
  const [answers, setAnswers] = useState<number[]>([]);

  const goTo = (next: Step | 'score', nextQuestionIndex = questionIndex) => {
    setQuestionIndex(nextQuestionIndex);
    setStep(next);
    window.scrollTo(0, 0);
  };

  if (step === 'score') {
    const score = questions.reduce(
      (sum, question, i) => sum + (answers[i] === question.correct ? 3 : 0),
      0,
    );
    return <ScoreScreen score={score} maxScore={3 * questions.length} />;
  }

  const question = questions[questionIndex];
  const answer = answers[questionIndex];

  if (step === 'prompt') {
    return (
      <PromptStep
        question={question}
        onPick={(position) => {
          setAnswers((previous) => {
            const next = [...previous];
            next[questionIndex] = position;
            return next;
          });
          goTo('pick');
        }}
      />
    );
  }

  if (step === 'pick') {
    return (
      <PickStep
        question={question}
        answer={answer}
        onNext={() => goTo('reveal')}
      />
    );
  }

  const isLast = questionIndex === questions.length - 1;
  return (
    <RevealStep
      question={question}
      answer={answer}
      explanation={explanations[questionIndex]}
      isLast={isLast}
      onNext={() =>
        isLast ? goTo('score') : goTo('prompt', questionIndex + 1)
      }
    />
  );
};
