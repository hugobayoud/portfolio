'use client';

import Image from 'next/image';
import { Avatar, Card, Flex, Link, Text, Box } from '@radix-ui/themes';
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
    <Card
      className="rounded-lg border shadow-sm group overflow-hidden"
      variant="classic"
      style={{ padding: '0' }}
    >
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        <Image
          className="inset-0 absolute object-cover "
          src={backgroundImage}
          alt={title}
          width={600}
          height={400}
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        <Box
          position="relative"
          style={{
            backgroundColor:
              theme === 'dark'
                ? 'rgba(10, 26, 51, 0.9)' // Dark blue with opacity for dark theme
                : 'rgba(0, 102, 255, 0.75)', // Primary blue with opacity for light theme
            backdropFilter: 'blur(8px)',
          }}
          className="group-hover:opacity-0 transition-opacity"
        >
          <Flex gap="3" align="center" className="p-6">
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
      </Link>
    </Card>
  );
};

export default ProjectCard;
