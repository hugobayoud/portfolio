import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

const ARROW_CLASS =
  'flex size-11 items-center justify-center rounded-full border-2 border-current disabled:opacity-30';

/**
 * The ← and → buttons in the top-right corner of every Step and the Score
 * screen. Drawn in `currentColor`, so they follow the screen's text colour.
 */
export const StepArrows = ({
  onBack,
  onForward,
  className = '',
}: {
  /** Omitted when there is no Step behind (disables ←). */
  onBack?: () => void;
  /** Omitted to disable → (on a Frontier Prompt, a Frontier Reveal, the Score screen). */
  onForward?: () => void;
  className?: string;
}) => {
  return (
    <nav className={`flex justify-end gap-3 ${className}`}>
      <button
        type="button"
        aria-label="Précédent"
        onClick={onBack}
        disabled={!onBack}
        className={ARROW_CLASS}
      >
        <ArrowLeftIcon className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Suivant"
        onClick={onForward}
        disabled={!onForward}
        className={ARROW_CLASS}
      >
        <ArrowRightIcon className="size-5" />
      </button>
    </nav>
  );
};
