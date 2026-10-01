import { ChoiceShape, choiceColours } from './choice-style';

export const ChoiceButton = ({
  position,
  text,
  onClick,
}: {
  position: number;
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-28 flex-col items-start justify-between gap-3 rounded-2xl p-4 text-left font-semibold text-base leading-snug shadow-[0_2px_10px_rgba(0,0,0,0.07)] ${choiceColours(position)}`}
    >
      <ChoiceShape position={position} className="size-6" />
      <span className="break-words">{text}</span>
    </button>
  );
};
