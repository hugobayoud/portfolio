/** localStorage key holding the Player's Answers and Frontier. */
const STORAGE_KEY = 'reunion:play';

/**
 * What survives a reload: the Frontier (a Step number, see `PlayThrough`) and
 * the Answers by Question position — the Quiz is frozen, so positions never
 * shift. The Step being viewed is not kept: reopening lands on the Frontier.
 */
export type SavedPlay = {
  frontier: number;
  answers: number[];
};

/**
 * The stored play, or `undefined` when it is absent, corrupt, or doesn't fit a
 * Quiz of `questionCount` Questions. Every Question up to the Frontier's has an
 * Answer (its Prompt step can only be passed by picking), so anything else is
 * corrupt too.
 */
export function loadPlay(questionCount: number): SavedPlay | undefined {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const { frontier, answers }: Partial<SavedPlay> = JSON.parse(raw);
    if (
      Number.isInteger(frontier) &&
      frontier !== undefined &&
      frontier >= 0 &&
      frontier <= 3 * questionCount &&
      Array.isArray(answers) &&
      answers.length === Math.floor((frontier + 2) / 3) &&
      answers.every((answer) => [0, 1, 2, 3].includes(answer))
    ) {
      return { frontier, answers };
    }
  } catch {
    // Storage unavailable or not JSON — start fresh.
  }
  return undefined;
}

export function savePlay(play: SavedPlay) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(play));
  } catch {
    // Storage unavailable (private mode / quota) — keep in-memory play.
  }
}

/** Forgets the Answers and the Frontier, for a Re-download. */
export function wipePlay() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable — nothing was saved.
  }
}
