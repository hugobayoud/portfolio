import { type ReactNode, useRef } from 'react';

/**
 * The Score screen: the Score out of three points per Question, and the
 * Restart button, which asks for confirmation first.
 */
export const ScoreScreen = ({
  score,
  maxScore,
  onRestart,
  arrows,
}: {
  score: number;
  maxScore: number;
  onRestart: () => void;
  arrows: ReactNode;
}) => {
  const confirmation = useRef<HTMLDialogElement>(null);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      {arrows}

      <div className="flex flex-1 items-center justify-center py-6">
        <p className="font-title text-7xl text-navy">
          {score} / {maxScore}
        </p>
      </div>

      <button
        type="button"
        onClick={() => confirmation.current?.showModal()}
        className="w-full rounded-2xl bg-navy px-6 py-5 font-semibold text-white text-xl"
      >
        Recommencer
      </button>

      <dialog
        ref={confirmation}
        className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl p-6 text-navy backdrop:bg-black/50"
      >
        <p className="font-title text-2xl leading-snug">
          Effacer tes réponses et recommencer ?
        </p>
        <form method="dialog" className="mt-6 flex gap-3">
          <button
            type="submit"
            className="flex-1 rounded-2xl border-2 border-navy px-4 py-4 font-semibold text-lg"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="flex-1 rounded-2xl bg-navy px-4 py-4 font-semibold text-lg text-white"
          >
            Recommencer
          </button>
        </form>
      </dialog>
    </main>
  );
};
