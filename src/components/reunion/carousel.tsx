import { photoSize } from '@/app/reunion/photos';

/**
 * A Carousel of an Explanation: its photos in a row, swiped horizontally with
 * native scroll-snap. Each photo reserves its size from the manifest, so
 * nothing shifts while it loads. Plain `<img>` pointing at the generated WebP
 * files — not the Next image optimiser — so the exact URLs can be saved for
 * offline play.
 *
 * The row bleeds to the edges of the Reveal step's padding. It only scrolls
 * sideways: a vertical swipe over it still scrolls the page, and overscroll
 * stays contained so a sideways swipe never turns into a browser back/forward.
 */
export const Carousel = ({
  questionId,
  files,
}: {
  questionId: string;
  files: string[];
}) => (
  <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-4 [scrollbar-width:none]">
    {files.map((file) => {
      const { width, height } = photoSize(questionId, file);
      return (
        // biome-ignore lint/performance/noImgElement: the exact WebP URL must be cacheable offline, which the Next image optimiser's URLs are not.
        <img
          key={file}
          src={`/reunion/${questionId}/${file}`}
          alt=""
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{ aspectRatio: `${width} / ${height}` }}
          className="h-72 w-auto max-w-[85%] shrink-0 snap-start rounded-2xl bg-ink/5 object-cover"
        />
      );
    })}
  </div>
);
