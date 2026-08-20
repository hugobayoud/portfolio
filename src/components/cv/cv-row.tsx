import type { ReactNode } from 'react';

/**
 * One row of the printed CV: a right-aligned Lexend label in the left gutter,
 * the content in the right column, a hairline rule above.
 *
 * On phones the two columns stack and the label goes left-aligned — the gutter
 * would eat too much of a narrow screen.
 *
 * A `\n` inside `label` is honoured (the CV stacks "Études / Diplômes"), and
 * omitting `label` keeps the gutter empty — used by the opening row, whose
 * heading already sits under the name.
 */
export function CvRow({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 gap-x-10 gap-y-4 border-t border-rule py-8 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:py-11 lg:grid-cols-[11rem_minmax(0,1fr)]">
      {label ? (
        <h2 className="whitespace-pre-line font-title text-[19px] leading-[1.15] tracking-[-0.01em] text-navy sm:text-right sm:text-[21px]">
          {label}
        </h2>
      ) : (
        <div aria-hidden />
      )}

      <div className="min-w-0">{children}</div>
    </section>
  );
}
