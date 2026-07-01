import { Box, Flex, Text } from '@radix-ui/themes';
import type React from 'react';

interface SkillListProps {
  title: string;
  children: React.ReactNode;
}

export const SkillList = ({ title, children }: SkillListProps) => {
  return (
    <Box>
      <Flex direction="column" gap="3">
        <Text weight="medium" size="5">
          {title}
        </Text>
        <Flex direction="column" gap="2" className="pl-2">
          {children}
        </Flex>
      </Flex>
    </Box>
  );
};
