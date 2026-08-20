'use client';

import parse, {
  type DOMNode,
  domToReact,
  type Element,
  type HTMLReactParserOptions,
} from 'html-react-parser';
import React from 'react';

interface HtmlContentProps {
  html: string;
}

/**
 * HtmlContent renders a raw HTML string as React elements while allowing
 * per-tag styling/overrides. Adjust the switch cases below to theme tags.
 */
export function HtmlContent({ html }: HtmlContentProps) {
  const options: HTMLReactParserOptions = {
    replace: (node) => {
      if (node.type === 'tag') {
        const el = node as Element;
        const children = domToReact(el.children as DOMNode[], options);

        switch (el.name) {
          case 'p':
            return <p className="leading-7 my-2 text-pretty">{children}</p>;
          case 'h1':
            return <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>;
          case 'h2':
            return (
              <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>
            );
          case 'h3':
            return (
              <h3 className="text-xl font-semibold mt-5 mb-2">{children}</h3>
            );
          case 'a':
            return (
              <a
                href={(el.attribs && el.attribs.href) || '#'}
                className="text-navy font-bold underline decoration-yellow decoration-2 underline-offset-2 hover:opacity-80"
                target={el.attribs && el.attribs.target}
                rel={el.attribs && el.attribs.rel}
              >
                {children}
              </a>
            );
          case 'ul':
            return <ul className="list-disc pl-2 sm:pl-6 my-4">{children}</ul>;
          case 'ol':
            return <ol className="list-decimal pl-6 my-4">{children}</ol>;
          case 'li':
            return <li className="my-1">{children}</li>;
          case 'blockquote':
            return (
              <blockquote className="border-l-4 border-yellow pl-4 italic my-4">
                {children}
              </blockquote>
            );
          case 'img':
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={el.attribs?.src}
                alt={el.attribs?.alt || ''}
                loading="lazy"
                decoding="async"
                className="rounded-xl my-3 sm:my-5"
              />
            );
          case 'code':
            return (
              <code className="bg-black/[0.06] px-1 py-0.5 rounded">
                {children}
              </code>
            );
          case 'pre':
            return (
              <pre className="bg-black/[0.05] p-4 rounded overflow-x-auto my-4">
                {children}
              </pre>
            );
          default:
            return undefined;
        }
      }
      return undefined;
    },
  };

  return (
    <div className="prose prose-lg max-w-none">{parse(html, options)}</div>
  );
}
