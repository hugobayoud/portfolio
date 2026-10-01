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

/** Background and text colour of a Choice position. */
export const choiceColours = (position: number) =>
  POSITIONS[position].className;

export const ChoiceShape = ({
  position,
  className,
}: {
  position: number;
  className: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={`shrink-0 fill-current ${className}`}
  >
    {POSITIONS[position].shape}
  </svg>
);
