/**
 * Each Choice position has a fixed colour and shape so Players can name it out
 * loud: Lave ▲, Lagon ◆, Soleil ●, Forêt ■. Colours come from the quiz-scoped
 * tokens in src/app/reunion/quiz.css; shapes are drawn rather than typed, as
 * the ▲◆●■ glyphs differ in size from font to font.
 */
const POSITIONS = [
  {
    shape: <path d="M12 2.5 23 21.5H1Z" />,
    className: 'bg-(--color-lave) text-white',
  },
  {
    shape: <path d="M12 1 23 12 12 23 1 12Z" />,
    className: 'bg-(--color-lagon) text-white',
  },
  {
    shape: <circle cx="12" cy="12" r="10.5" />,
    className: 'bg-(--color-soleil) text-navy',
  },
  {
    shape: <rect x="2.5" y="2.5" width="19" height="19" />,
    className: 'bg-(--color-foret) text-white',
  },
];

export const ChoiceButton = ({
  position,
  text,
}: {
  position: number;
  text: string;
}) => {
  const { shape, className } = POSITIONS[position];

  return (
    <button
      type="button"
      className={`flex min-h-28 flex-col items-start justify-between gap-3 rounded-2xl p-4 text-left font-semibold text-base leading-snug shadow-[0_2px_10px_rgba(0,0,0,0.07)] ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-6 fill-current"
      >
        {shape}
      </svg>
      <span className="break-words">{text}</span>
    </button>
  );
};
