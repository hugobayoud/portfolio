import React, { ComponentPropsWithoutRef } from 'react';
import { highlight } from 'sugar-high';
import Link from 'next/link';
import Image from 'next/image';
import {
  OpenSans,
  TTTrailersBold,
  PoppinsRegular,
} from './app/(homepage)/layout';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;
type HrProps = ComponentPropsWithoutRef<'hr'>;

type ImageWithCaptionProps = {
  src: string;
  alt: string;
  caption: string;
  maxHeight: number;
};

const components = {
  h1: (props: HeadingProps) => (
    <h1
      className={`text-3xl sm:text-6xl pt-12 pb-8 mb-0 fade-in text-center leading-tight ${TTTrailersBold.className}`}
      {...props}
    />
  ),
  Date: ({ children }: { children: React.ReactNode }) => (
    <p
      className={`text-sm sm:text-md text-center mb-12 opacity-70 ${PoppinsRegular.className}`}
    >
      {children}
    </p>
  ),
  h2: (props: HeadingProps) => (
    <h2
      className={`text-xl sm:text-3xl pt-16 font-semibold mt-16 mb-6 leading-tight ${TTTrailersBold.className}`}
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className={`text-lg sm:text-xl font-medium mt-12 mb-4 ${PoppinsRegular.className}`}
      {...props}
    />
  ),
  h4: (props: HeadingProps) => (
    <h4 className={`text-md ${OpenSans.className}`} {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p
      className={`text-base sm:text-lg text-pretty leading-relaxed mb-6 ${PoppinsRegular.className}`}
      {...props}
    />
  ),
  ol: (props: ListProps) => (
    <ol
      className={`list-decimal pl-6 space-y-3 mb-6 ${PoppinsRegular.className}`}
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className={`list-disc pl-6 space-y-2 mb-6 ${PoppinsRegular.className}`}
      {...props}
    />
  ),
  li: (props: ListItemProps) => (
    <li
      className={`pl-2 text-base sm:text-lg leading-relaxed ${PoppinsRegular.className}`}
      {...props}
    />
  ),
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-extrabold" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = 'text-amber-600 hover:text-amber-500';
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  ImageWithCaption: ({
    src,
    alt,
    caption,
    maxHeight,
  }: ImageWithCaptionProps) => (
    <div>
      <Image
        src={src}
        alt={alt}
        className="w-full object-cover"
        style={{ maxHeight: maxHeight ? `${maxHeight}px` : 'none' }}
        width={1000}
        height={700}
      />
      {caption && (
        <p className="text-sm text-gray-500 text-center">{caption}</p>
      )}
    </div>
  ),
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-gray-300 pl-4 !text-red-500"
      {...props}
    />
  ),
  hr: (props: HrProps) => (
    <hr className="my-10 h-px border-0 bg-yellow-200" {...props} />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
