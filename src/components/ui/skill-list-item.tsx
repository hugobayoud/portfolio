import React from 'react';
import { Box, Flex, Link, Text } from '@radix-ui/themes';

interface SkillListItemProps {
  href: string;
  children: React.ReactNode;
}

export const SkillListItem = ({ href, children }: SkillListItemProps) => {
  // Extract icon and text from children
  const childrenArray = React.Children.toArray(children);
  const icon = childrenArray[0];
  const text = childrenArray.slice(1).join('');

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: 'none',
      }}
    >
      <Flex align="center" gap="2" py="1">
        <Box
          style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center' }}
        >
          {icon}
        </Box>
        <Text>{text}</Text>
      </Flex>
    </Link>
  );
};
