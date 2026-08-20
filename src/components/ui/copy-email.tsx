'use client';

import { CheckIcon, CopyIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { useEffect, useRef, useState } from 'react';

/**
 * The email address, shown in full and copied on click — no mail client hijack,
 * no toast library. The label swaps to a confirmation for a couple of seconds
 * and is announced politely to screen readers.
 */
export function CopyEmail({
  email,
  copyLabel,
  copiedLabel,
}: {
  email: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard denied (insecure context, permission): leave the address
      // on screen so it can still be selected by hand.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copyLabel}
      className="group inline-flex items-center gap-2 text-[15px] text-ink-soft transition-colors hover:text-navy"
    >
      <EnvelopeClosedIcon
        aria-hidden
        className="h-4 w-4 shrink-0 text-ink-faint"
      />

      <span aria-live="polite">{copied ? copiedLabel : email}</span>

      {copied ? (
        <CheckIcon aria-hidden className="h-4 w-4 shrink-0 text-navy" />
      ) : (
        <CopyIcon
          aria-hidden
          className="h-4 w-4 shrink-0 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}
    </button>
  );
}
