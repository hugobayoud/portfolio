/**
 * The Score screen: the Score out of three points per Question, and the
 * Restart button (not wired yet).
 */
export const ScoreScreen = ({
  score,
  maxScore,
}: {
  score: number;
  maxScore: number;
}) => {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-4 pt-6 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="flex flex-1 items-center justify-center py-6">
        <p className="font-title text-7xl text-navy">
          {score} / {maxScore}
        </p>
      </div>

      <button
        type="button"
        className="w-full rounded-2xl bg-navy px-6 py-5 font-semibold text-white text-xl"
      >
        Recommencer
      </button>
    </main>
  );
};
