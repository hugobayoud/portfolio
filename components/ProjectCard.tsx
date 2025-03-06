'use client';

import Image from 'next/image';
import {
  Avatar,
  Card,
  Flex,
  Link,
  Text,
  Box,
  AspectRatio,
  Container,
} from '@radix-ui/themes';
import { useTheme } from './ThemeProvider';

interface Props {
  title: string;
  description: string;
  image: string;
  backgroundImage: string;
  link: string;
}

const ProjectCard = ({
  title,
  description,
  image,
  backgroundImage,
  link,
}: Props) => {
  const { theme } = useTheme();

  return (
    <Box
      className="rounded-lg border shadow-sm group"
      style={{
        width: '500px',
        position: 'relative',
        borderRadius: 'var(--radius-3)',
        overflow: 'hidden',
      }}
    >
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
            </Text>
          </Flex>
          <Text
            size="2"
            style={{
              color: theme === 'dark' ? 'var(--foreground)' : 'white',
            }}
          >
            {description}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProjectCard;
