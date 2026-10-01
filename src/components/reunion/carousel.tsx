'use client';

import { useState } from 'react';

import type { Photo } from '@/app/reunion/photos';

import { pushViewerEntry, Viewer } from './viewer';

/**
 * A Carousel of an Explanation: its photos in a row, swiped horizontally with
 * native scroll-snap. Each photo reserves its size, so nothing shifts while
 * it loads; sizes are looked up on the server, keeping the manifest off the
 * phone. Plain `<img>` pointing at the generated WebP files — not the Next
 * image optimiser — so the exact URLs can be saved for offline play. Tapping a
 * photo opens the Viewer on it.
 *
 * The row bleeds to the edges of the Reveal step's padding. It only scrolls
 * sideways: a vertical swipe over it still scrolls the page, and overscroll
 * stays contained so a sideways swipe never turns into a browser back/forward.
 */
export const Carousel = ({ photos }: { photos: Photo[] }) => {
  // Index of the photo open in the Viewer, if any.
  const [viewingIndex, setViewingIndex] = useState<number>();

  return (
    <>
      <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-4 [scrollbar-width:none]">
        {photos.map(({ src, width, height }, index) => (
          <button
            key={src}
            type="button"
            aria-label="Agrandir la photo"
            onClick={() => {
              pushViewerEntry();
              setViewingIndex(index);
            }}
            className="max-w-[85%] shrink-0 snap-start"
          >
            {/* biome-ignore lint/performance/noImgElement: the exact WebP URL must be cacheable offline, which the Next image optimiser's URLs are not. */}
            <img
              src={src}
              alt=""
              width={width}
              height={height}
              loading="lazy"
              decoding="async"
              draggable={false}
              style={{ aspectRatio: `${width} / ${height}` }}
              className="h-72 w-auto max-w-full rounded-2xl bg-ink/5 object-cover"
            />
          </button>
        ))}
      </div>
      <Viewer
        photos={photos}
        index={viewingIndex}
        onClose={() => setViewingIndex(undefined)}
      />
    </>
  );
};
