'use client';

import { useEffect, useRef, useState } from 'react';
import Lightbox, { type ZoomRef } from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

import type { Photo } from '@/app/reunion/photos';

/** Two taps closer than this, in time and distance, make a double-tap. */
const DOUBLE_TAP_MS = 300;
const DOUBLE_TAP_PX = 30;

/**
 * Pushes the history entry of an opening Viewer, so the phone's back gesture
 * (or the browser's back) closes it instead of stepping back a Step. Called
 * from the tap that opens it, not from an effect, so it is pushed exactly once.
 * Keeps the Step's own keys: `PlayThrough` sees the same Step on either side.
 */
export const pushViewerEntry = () =>
  window.history.pushState(
    { ...window.history.state, reunionViewer: true },
    '',
  );

/**
 * The Viewer: a Carousel's photos full-screen on black, no captions, covering
 * the Step and its arrows. Swipe between photos, pinch to zoom, double-tap to
 * zoom ×2 on the tapped point and again to zoom out; once zoomed, a drag only
 * pans. Closes with the cross, a swipe down, or back — every close goes
 * through the history entry pushed on opening, so the Reveal step underneath,
 * never unmounted, keeps its scroll position.
 *
 * yet-another-react-lightbox does the gestures. Its own double-tap goes
 * straight to the photo's maximum zoom on a single stop, so it is turned off
 * and replaced by the exact ×2 toggle below.
 */
export const Viewer = ({
  photos,
  index,
  onClose,
}: {
  photos: Photo[];
  /** The photo to open on; `undefined` while closed. */
  index: number | undefined;
  onClose: () => void;
}) => {
  const isOpen = index !== undefined;
  const zoom = useRef<ZoomRef>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: `onClose` is a fresh closure every render; only opening and closing matter.
  useEffect(() => {
    if (!isOpen) return;
    // Back, from any source, lands on the Reveal step's entry.
    const onPopState = () => onClose();

    let lastTap: PointerEvent | undefined;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Element;
      const container = target.closest('.yarl__container');
      if (!event.isPrimary || !container || target.closest('button')) {
        lastTap = undefined;
        return;
      }
      if (
        !lastTap ||
        event.timeStamp - lastTap.timeStamp > DOUBLE_TAP_MS ||
        Math.hypot(
          event.clientX - lastTap.clientX,
          event.clientY - lastTap.clientY,
        ) > DOUBLE_TAP_PX
      ) {
        lastTap = event;
        return;
      }
      lastTap = undefined;
      const current = zoom.current;
      if (!current || current.disabled) return;
      if (current.zoom > 1) {
        current.changeZoom(1);
        return;
      }
      // The zoom keeps the tapped point still, given from the centre.
      const { left, top, width, height } = container.getBoundingClientRect();
      current.changeZoom(
        2,
        false,
        event.clientX - left - width / 2,
        event.clientY - top - height / 2,
      );
    };

    window.addEventListener('popstate', onPopState);
    // Captured: once zoomed, the library stops taps on the photo from bubbling.
    document.addEventListener('pointerdown', onPointerDown, true);
    return () => {
      window.removeEventListener('popstate', onPopState);
      document.removeEventListener('pointerdown', onPointerDown, true);
      setIsZoomed(false);
    };
  }, [isOpen]);

  return (
    <Lightbox
      open={isOpen}
      index={index ?? 0}
      // The cross and the swipe down close through back, like the back gesture
      // — once, even if a second close lands during the fade-out.
      close={() => {
        if (window.history.state?.reunionViewer) window.history.back();
      }}
      slides={photos}
      plugins={[Zoom]}
      carousel={{ finite: true }}
      controller={{
        closeOnPullDown: !isZoomed,
        disableSwipeNavigation: isZoomed,
      }}
      zoom={{
        ref: zoom,
        // Lets ×2 reach past the photo's own resolution on large screens.
        maxZoomPixelRatio: 2,
        doubleTapDelay: 0,
        doubleClickDelay: 0,
      }}
      on={{ zoom: ({ zoom: level }) => setIsZoomed(level > 1) }}
      render={{
        buttonPrev: () => null,
        buttonNext: () => null,
        buttonZoom: () => null,
      }}
    />
  );
};
