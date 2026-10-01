'use client';

import { type ReactNode, useEffect, useState } from 'react';

import {
  isQuizSaved,
  registerServiceWorker,
  saveQuiz,
  wipeSavedQuiz,
} from './saved-quiz';

type Preparing =
  | { status: 'checking' }
  | { status: 'saving'; saved: number; total?: number }
  | { status: 'failed' }
  | { status: 'ready' };

/**
 * Whether this page can save the Quiz for offline play. Not in development —
 * a cache-first service worker would freeze the dev server's code — and only
 * on the Réunion subdomain, so the service worker never lands on another host.
 */
const canSave = () =>
  process.env.NODE_ENV === 'production' &&
  window.location.hostname.startsWith('reunion.') &&
  'serviceWorker' in navigator &&
  'caches' in window;

/**
 * Shows the Preparing screen until the whole Quiz is saved on the device,
 * then `children` — the Quiz, which starts on its own on the Frontier. Once
 * saved, later visits go straight to the Quiz, online or offline. A failed
 * download offers "Réessayer": a full Re-download, from zero.
 */
export const PreparingScreen = ({
  photos,
  children,
}: {
  /** URL of every Carousel photo of the Quiz. */
  photos: string[];
  children: ReactNode;
}) => {
  const [preparing, setPreparing] = useState<Preparing>({ status: 'checking' });

  const save = () => {
    setPreparing({ status: 'saving', saved: 0 });
    saveQuiz(photos, (saved, total) =>
      setPreparing({ status: 'saving', saved, total }),
    ).then(
      () => setPreparing({ status: 'ready' }),
      () => setPreparing({ status: 'failed' }),
    );
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: the device is checked once, on mount.
  useEffect(() => {
    if (!canSave()) {
      setPreparing({ status: 'ready' });
      return;
    }
    // A cache that can't be read counts as not saved: save it from zero.
    isQuizSaved()
      .catch(() => false)
      .then((isSaved) => {
        if (!isSaved) return save();
        // In case the browser dropped it while keeping the cache. Offline,
        // registering fails — the worker already there keeps serving.
        registerServiceWorker().catch(() => {});
        setPreparing({ status: 'ready' });
      });
  }, []);

  if (preparing.status === 'ready') return children;
  if (preparing.status === 'checking') return null;

  if (preparing.status === 'failed') {
    return (
      <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col justify-center gap-8 px-4">
        <p className="text-center font-title text-3xl text-navy">
          Connexion perdue
        </p>
        <button
          type="button"
          onClick={() => wipeSavedQuiz().then(save, save)}
          className="w-full rounded-2xl bg-navy px-6 py-5 font-semibold text-white text-xl"
        >
          Réessayer
        </button>
      </main>
    );
  }

  const { saved, total } = preparing;
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col justify-center gap-3 px-4">
      <progress
        value={saved}
        max={total ?? 1}
        className="h-3 w-full appearance-none overflow-hidden rounded-full bg-navy/10 [&::-moz-progress-bar]:bg-navy [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-navy"
      />
      <p className="text-center font-semibold text-navy tabular-nums">
        {total === undefined ? ' ' : `${saved} / ${total}`}
      </p>
    </main>
  );
};
