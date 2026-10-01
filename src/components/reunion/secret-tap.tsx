'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { type ReactNode, useEffect, useRef } from 'react';

/** Taps in a row that open the dialog. */
const TAPS = 10;

/** The longest gap between two taps of the same row. */
const TAP_GAP_MS = 500;

/**
 * Where a tap breaks the row: buttons (Choices and photos included), links,
 * fields, and any open dialog.
 */
const INTERACTIVE = 'button, a, input, dialog';

/**
 * The Secret tap around a screen of the Quiz: ten quick taps in a row on an
 * empty, non-interactive part of it open the Re-download dialog. A tap on
 * anything interactive breaks the row. The Pick step needs no exception — it is
 * one big button. The Viewer is drawn outside the screen, so it never counts.
 */
export const SecretTap = ({
  onRedownload,
  children,
}: {
  onRedownload: () => void;
  children: ReactNode;
}) => {
  const screen = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = screen.current;
    if (!element) return;
    let taps = 0;
    let lastTap = 0;
    const onClick = (event: MouseEvent) => {
      if ((event.target as Element).closest(INTERACTIVE)) {
        taps = 0;
        return;
      }
      taps = event.timeStamp - lastTap <= TAP_GAP_MS ? taps + 1 : 1;
      lastTap = event.timeStamp;
      if (taps === TAPS) {
        taps = 0;
        dialog.current?.showModal();
      }
    };
    element.addEventListener('click', onClick);
    return () => element.removeEventListener('click', onClick);
  }, []);

  return (
    <div ref={screen}>
      {children}

      {/* A tap outside lands on the dialog itself, around its content. */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: the keyboard's close is Escape, which <dialog> handles itself. */}
      <dialog
        ref={dialog}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl p-0 text-navy backdrop:bg-black/50"
      >
        <div className="flex flex-col gap-6 p-6">
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => dialog.current?.close()}
            className="-m-2 self-end p-2"
          >
            <Cross2Icon className="size-6" />
          </button>
          <p className="text-lg leading-snug">
            Supprime le quiz et tes réponses de cet appareil, puis retélécharge
            tout.
          </p>
          <button
            type="button"
            onClick={() => {
              dialog.current?.close();
              onRedownload();
            }}
            className="w-full rounded-2xl bg-(--color-wrong) px-4 py-4 font-semibold text-lg text-white"
          >
            Retélécharger
          </button>
        </div>
      </dialog>
    </div>
  );
};
