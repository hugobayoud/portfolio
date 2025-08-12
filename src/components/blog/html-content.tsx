'use client';

import parse, {
  HTMLReactParserOptions,
  Element,
  domToReact,
  DOMNode,
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
                className="text-sky-600 dark:text-amber-400 font-bold hover:opacity-80"
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
              <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4">
                {children}
              </blockquote>
            );
          case 'img':
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={el.attribs?.src}
                alt={el.attribs?.alt || ''}
                className="rounded-xl my-3 sm:my-5"
              />
            );
          case 'code':
            return (
              <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                {children}
              </code>
            );
          case 'pre':
            return (
              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-x-auto my-4">
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
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {parse(html, options)}
    </div>
  );
}

export default HtmlContent;
