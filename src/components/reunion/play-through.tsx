'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

import type { Question } from '@/app/reunion/quiz';

import { PickStep } from './pick-step';
import { PromptStep } from './prompt-step';
import { RevealStep } from './reveal-step';
import { loadPlay, type SavedPlay, savePlay } from './saved-play';
import { ScoreScreen } from './score-screen';
import { StepArrows } from './step-arrows';

/** The Steps of every Question, in order. */
const STEPS = ['prompt', 'pick', 'reveal'] as const;

/**
 * The Player's play. Steps are numbered in play order — Question `i` has its
 * Prompt at `3i`, Pick at `3i + 1`, Reveal at `3i + 2` — and the Score screen
 * comes last. `at` never exceeds the Frontier, which never moves back.
 */
type Play = SavedPlay & { at: number };

/**
 * The keys this quiz keeps in `history.state`: which Step an entry is, which
 * load of the page pushed it, and whether it is a Viewer's (see `Viewer`).
 */
type HistoryState = {
  reunionStep?: number;
  reunionLoad?: number;
  reunionViewer?: boolean;
} | null;

/** This load of the page, to tell its history entries from earlier loads'. */
const PAGE_LOAD = Date.now();

/**
 * The history entry of a Step. Keeps the router's own keys (`__NA`): without
 * them Next reloads the page on every back/forward, and it only adds them
 * itself to entries pushed after it has mounted. Drops the Viewer's flag, left
 * on the current entry by a reload while the Viewer was open.
 */
const stepEntry = (step: number) => {
  const { reunionViewer, ...state }: NonNullable<HistoryState> =
    window.history.state ?? {};
  return { ...state, reunionStep: step, reunionLoad: PAGE_LOAD };
};

/**
 * One play of the Quiz, from the first Prompt step to the Score screen, with
 * ← / → between the first Step and the Frontier. Every forward move pushes a
 * history entry (the URL stays `/`), so the browser's back and forward walk
 * the same Steps. The Answers and the Frontier are saved on every change, and
 * reopening the Quiz lands on the Frontier.
 */
export const PlayThrough = ({
  questions,
  explanations,
}: {
  questions: Question[];
  /** The rendered Explanation of each Question, in the same order. */
  explanations: ReactNode[];
}) => {
  // Unknown until mounted: the saved play only exists in the browser, so the
  // server and the first client render draw nothing rather than Q1.
  const [play, setPlay] = useState<Play>();
  /** A browser back is on its way (see `back`). */
  const traversing = useRef(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: the saved play is read once, on mount.
  useEffect(() => {
    const saved = loadPlay(questions.length) ?? { frontier: 0, answers: [] };

    window.history.scrollRestoration = 'manual';
    // One entry per Step up to the Frontier, step 0 first, so ← (the browser's
    // back) walks them from there and back on Q1 still leaves the site.
    let at = 0;
    try {
      window.history.replaceState(stepEntry(0), '');
      while (at < saved.frontier) {
        window.history.pushState(stepEntry(at + 1), '');
        at++;
      }
    } catch {
      // Safari caps history calls per 10 s (rapid reloads near the Score
      // screen): land on the last Step entered — → reaches the Frontier.
    }
    setPlay({ ...saved, at });

    const onPopState = (event: PopStateEvent) => {
      const state = event.state as HistoryState;
      const step = state?.reunionStep;
      if (step === undefined) return;
      if (state?.reunionLoad !== PAGE_LOAD) {
        // An entry left by an earlier load of the page: skip it, and the next,
        // until back on Q1 has left the site.
        window.history.back();
        return;
      }
      if (state.reunionViewer) {
        // A closed Viewer's entry, reached by forward: nothing to show there.
        window.history.back();
        return;
      }
      traversing.current = false;
      // Entries ahead of the Frontier are only left by a Restart.
      setPlay(
        (previous) =>
          previous && { ...previous, at: Math.min(step, previous.frontier) },
      );
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: moving between Steps changes nothing worth saving.
  useEffect(() => {
    if (play) savePlay({ frontier: play.frontier, answers: play.answers });
  }, [play?.frontier, play?.answers]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: every Step change, from any source, starts at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [play?.at]);

  if (!play) return null;
  const { at, frontier, answers } = play;

  /** Moves one Step forward, pushing the Frontier if it is there. */
  const forward = (nextAnswers = answers) => {
    if (traversing.current) return;
    const next = at + 1;
    setPlay({
      at: next,
      frontier: Math.max(frontier, next),
      answers: nextAnswers,
    });
    window.history.pushState(stepEntry(next), '');
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

  /**
   * Restart: back to Q1's Prompt step with no Answers, and to its history
   * entry, so back from there leaves the site.
   */
  const restart = () => {
    setPlay({ at: 0, frontier: 0, answers: [] });
    window.history.go(-at);
  };

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
        onRestart={restart}
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
