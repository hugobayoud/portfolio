'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

import type { Question } from '@/app/reunion/quiz';

import { PickStep } from './pick-step';
import { PromptStep } from './prompt-step';
import { RevealStep } from './reveal-step';
import { ScoreScreen } from './score-screen';
import { StepArrows } from './step-arrows';

/** The Steps of every Question, in order. */
const STEPS = ['prompt', 'pick', 'reveal'] as const;

/**
 * The Player's play. Steps are numbered in play order — Question `i` has its
 * Prompt at `3i`, Pick at `3i + 1`, Reveal at `3i + 2` — and the Score screen
 * comes last. `at` never exceeds the Frontier, which never moves back.
 */
type Play = {
  at: number;
  frontier: number;
  answers: number[];
};

/** The key this quiz keeps in `history.state` to know which Step an entry is. */
type HistoryState = { reunionStep?: number } | null;

/**
 * One play of the Quiz, from the first Prompt step to the Score screen, with
 * ← / → between the first Step and the Frontier. Every forward move pushes a
 * history entry (the URL stays `/`), so the browser's back and forward walk
 * the same Steps. State lives in memory only: reloading starts over.
 */
export const PlayThrough = ({
  questions,
  explanations,
}: {
  questions: Question[];
  /** The rendered Explanation of each Question, in the same order. */
  explanations: ReactNode[];
}) => {
  const [{ at, frontier, answers }, setPlay] = useState<Play>({
    at: 0,
    frontier: 0,
    answers: [],
  });
  /** A browser back is on its way (see `back`). */
  const traversing = useRef(false);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    // Keeps the router's own keys (`__NA`): without them Next reloads the page
    // on every back/forward.
    window.history.replaceState(
      { ...window.history.state, reunionStep: 0 },
      '',
    );

    // A history entry only ever holds a Step at or behind the Frontier; the
    // clamp covers entries left over from before a reload.
    const onPopState = (event: PopStateEvent) => {
      traversing.current = false;
      const step = (event.state as HistoryState)?.reunionStep;
      if (step === undefined) return;
      setPlay((previous) => ({
        ...previous,
        at: Math.min(step, previous.frontier),
      }));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: every Step change, from any source, starts at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [at]);

  /** Moves one Step forward, pushing the Frontier if it is there. */
  const forward = (nextAnswers = answers) => {
    if (traversing.current) return;
    const next = at + 1;
    setPlay({
      at: next,
      frontier: Math.max(frontier, next),
      answers: nextAnswers,
    });
    window.history.pushState({ reunionStep: next }, '');
  };

  // Every Step behind has its own history entry, so ← is the browser's back.
  // `at` only changes once popstate lands; until then further moves are
  // ignored, so a double tap on ← can't step back twice (or off the site).
  const back =
    at > 0
      ? () => {
          if (traversing.current) return;
          traversing.current = true;
          window.history.back();
        }
      : undefined;
  const forwardBehindFrontier = at < frontier ? () => forward() : undefined;

  const scoreAt = STEPS.length * questions.length;
  if (at === scoreAt) {
    const score = questions.reduce(
      (sum, question, i) => sum + (answers[i] === question.correct ? 3 : 0),
      0,
    );
    return (
      <ScoreScreen
        score={score}
        maxScore={3 * questions.length}
        arrows={<StepArrows onBack={back} className="text-navy" />}
      />
    );
  }

  const questionIndex = Math.floor(at / STEPS.length);
  const step = STEPS[at % STEPS.length];
  const question = questions[questionIndex];
  const answer = answers[questionIndex];

  if (step === 'prompt') {
    return (
      <PromptStep
        question={question}
        answer={answer}
        onPick={(position) => {
          const next = [...answers];
          next[questionIndex] = position;
          forward(next);
        }}
        arrows={
          <StepArrows
            onBack={back}
            onForward={forwardBehindFrontier}
            className="text-navy"
          />
        }
      />
    );
  }

  if (step === 'pick') {
    // The Pick step always moves on: → on the Frontier pushes it to the Reveal.
    return (
      <PickStep
        question={question}
        answer={answer}
        onNext={() => forward()}
        arrows={<StepArrows onBack={back} onForward={() => forward()} />}
      />
    );
  }

  return (
    <RevealStep
      question={question}
      answer={answer}
      explanation={explanations[questionIndex]}
      isLast={questionIndex === questions.length - 1}
      onNext={() => forward()}
      arrows={
        <StepArrows
          onBack={back}
          onForward={forwardBehindFrontier}
          className="text-navy"
        />
      }
    />
  );
};
