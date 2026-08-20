'use client';

import { Cross2Icon, QuoteIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useId, useRef } from 'react';

import { CV_ACTION_CLASS } from '@/components/cv/cv-action';
import type { Testimonial } from '@/lib/types/i18n';

/**
 * A reference, opened from the experience it is about — same text-link
 * affordance as "visit website", so the recommendation reads as one more thing
 * you can do with that mission rather than a banner shouting for attention.
 *
 * The panel is a native `<dialog>`, which hands us the top layer, the backdrop,
 * focus containment and Esc-to-close for free. It holds no React state: the
 * scroll lock is a CSS `:has()` rule in globals.css keyed off `[open]`, so it
 * can never drift out of sync with the element's real state.
 */
export function ReferenceDialog({
  testimonial,
  triggerLabel,
  closeLabel,
}: {
  testimonial: Testimonial;
  /** Already interpolated, e.g. "Voir la référence : Jean Baptiste Thouard". */
  triggerLabel: string;
  closeLabel: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  // A click that lands on the <dialog> itself rather than on the panel inside
  // it is a click on the backdrop.
  const onDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) dialogRef.current?.close();
  };

  const paragraphs = testimonial.quote.split('\n\n');

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className={CV_ACTION_CLASS}
      >
        {triggerLabel}
        <QuoteIcon aria-hidden className="h-3.5 w-3.5" />
      </button>

      {/* biome-ignore lint/a11y/useKeyWithClickEvents: the keyboard equivalent
          of a backdrop click is Esc, which <dialog> handles natively. */}
      <dialog
        ref={dialogRef}
        onClick={onDialogClick}
        aria-labelledby={titleId}
        className="cv-dialog m-auto w-[min(34rem,calc(100vw-2rem))] rounded-2xl bg-white p-0 text-ink-soft shadow-[0_24px_60px_-12px_rgba(0,0,0,0.25)]"
      >
        <div className="max-h-[min(80vh,44rem)] overflow-y-auto overscroll-contain p-6 sm:p-7">
          <div className="flex items-start gap-3">
            <Image
              src={testimonial.photo}
              alt=""
              width={48}
              height={48}
              sizes="48px"
              // The panel starts hidden, so a lazy image would only begin
              // loading once it is already on screen.
              loading="eager"
              className="h-12 w-12 rounded-full object-cover ring-1 ring-black/5"
            />

            <div className="min-w-0">
              <p
                id={titleId}
                className="font-title text-[16px] leading-snug text-navy"
              >
                {testimonial.author}
              </p>
              <p className="text-[13px] leading-snug text-ink-faint">
                {testimonial.role}
              </p>
            </div>

            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label={closeLabel}
              title={closeLabel}
              className="ml-auto inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-quiet text-ink-soft transition-colors duration-150 hover:bg-quiet-hover hover:text-navy"
            >
              <Cross2Icon className="h-4 w-4" />
            </button>
          </div>

          <blockquote className="mt-5 space-y-3 text-[15px] leading-[1.7]">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </blockquote>
        </div>
      </dialog>
    </>
  );
}
