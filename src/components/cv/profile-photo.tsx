import Image from 'next/image';

/**
 * The CV's portrait: a cut-out of the face (a PNG with a transparent
 * background) sitting on a yellow disc — washed from `#F7C400` at the top to
 * `#FFDA60` at the bottom — itself ringed in white.
 *
 * The image is the page's LCP element, so it is `priority` — Next preloads it
 * in the document head instead of waiting for the layout pass.
 */
export function ProfilePhoto({ alt }: { alt: string }) {
  return (
    <div className="h-[124px] w-[124px] shrink-0 rounded-full bg-white p-[7px] shadow-[0_2px_12px_rgba(0,0,0,0.07)] sm:h-[148px] sm:w-[148px]">
      <div className="relative h-full w-full overflow-hidden rounded-full bg-linear-to-b from-halo-start to-halo-end">
        <Image
          src="/hugo.png"
          alt={alt}
          fill
          priority
          sizes="148px"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}
