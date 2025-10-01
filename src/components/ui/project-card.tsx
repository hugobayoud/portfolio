'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Avatar,
  Flex,
  Text,
  Box,
  Dialog,
  VisuallyHidden,
} from '@radix-ui/themes';
import { Cross2Icon, QuoteIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

import { useTheme } from '@/lib/hooks/use-theme';

interface Props {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  backgroundImage: string;
  link?: string;
  asDialog?: boolean;
}

export const ProjectCard = ({
  title,
  subtitle,
  description,
  image,
  backgroundImage,
  link,
  asDialog,
}: Props) => {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (asDialog) {
      setIsModalOpen(true);
    }
  };

  const cardContent = (
    <>
      {/* Background div (will fill the entire container) */}
      <Image
        className="absolute inset-0 w-full h-full"
        src={backgroundImage}
        alt={title}
        width={1000}
        height={800}
        loading="lazy"
        style={{ objectFit: 'cover' }}
      />

      {/* Content that determines the height */}
      <Flex
        direction="column"
        gap="3"
        className="p-6 relative group-hover:opacity-0 transition-opacity"
        style={{
          backgroundColor:
            theme === 'dark'
              ? 'rgba(10, 26, 51, 0.9)' // Dark blue with opacity for dark theme
              : 'rgba(0, 102, 255, 0.75)', // Primary blue with opacity for light theme
          backdropFilter: 'blur(8px)',
        }}
      >
        <Flex direction="column" gap="3">
          <Flex direction="row" align="center" gap="3">
            <Avatar size="3" src={image} fallback="X" />
            <Text
              size="3"
              weight="bold"
              style={{
                color: theme === 'dark' ? 'var(--accent-9)' : 'white',
              }}
            >
              {title}
              {subtitle && (
                <Text
                  size="2"
                  weight="bold"
                  style={{
                    color: theme === 'dark' ? 'var(--accent-9)' : 'white',
                  }}
                >
                  {` [${subtitle}]`}
                </Text>
              )}
            </Text>
          </Flex>
          <Text
            size="2"
            style={{
              color: theme === 'dark' ? 'var(--foreground)' : 'white',
              display: '-webkit-box',
              WebkitLineClamp: 5,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {description}
          </Text>
        </Flex>
      </Flex>
    </>
  );

  return (
    <>
      <Box
        className="rounded-lg border shadow-sm group"
        style={{
          maxWidth: '500px',
          width: '100%',
          position: 'relative',
          borderRadius: 'var(--radius-3)',
          overflow: 'hidden',
        }}
      >
        {link ? (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
            }}
          >
            {cardContent}
          </Link>
        ) : (
          <button
            onClick={handleClick}
            style={{
              all: 'unset',
              cursor: 'pointer',
              width: '100%',
              height: '100%',
            }}
          >
            {cardContent}
          </button>
        )}
      </Box>

      {/* Modal */}
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <VisuallyHidden>
          <Dialog.Title>{title}</Dialog.Title>
        </VisuallyHidden>
        <Dialog.Content
          style={{
            maxWidth: 'min(90vw, 600px)',
            padding: '24px',
            position: 'relative',
          }}
        >
          {/* Modal content */}
          <Flex direction="column" gap="4">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                alignSelf: 'flex-end',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme === 'dark' ? 'var(--gray-11)' : 'var(--gray-9)',
              }}
              aria-label="Close"
            >
              <Cross2Icon width={24} height={24} />
            </button>

            <Image
              src={image}
              alt={title}
              width={170}
              height={170}
              style={{
                alignSelf: 'center',
                objectFit: 'cover',
                borderRadius: 'var(--radius-2)',
              }}
            />
            <Flex direction="column" gap="2" className="items-center mb-2">
              <Text size="5" weight="bold" style={{ color: 'var(--accent-9)' }}>
                {title}
              </Text>
              {subtitle && (
                <Text size="2" style={{ color: 'var(--foreground)' }}>
                  {subtitle}
                </Text>
              )}
            </Flex>
            <Text
              size="3"
              style={{
                lineHeight: '1.5',
                whiteSpace: 'pre-line',
                color: 'var(--foreground)',
              }}
            >
              <div className="flex items-center justify-start opacity-50 p-2">
                <QuoteIcon />
              </div>
              {description}

              <div className="flex items-center justify-end opacity-50 p-2">
                <QuoteIcon />
              </div>
            </Text>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
