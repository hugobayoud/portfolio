import NextLink from 'next/link';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';

interface ArticleCardProps {
  title: string;
  slug: string;
  date: string;
  description: string;
  category: string;
  devOnly: boolean;
}

export const ArticleCard = ({
  title,
  slug,
  date,
  description,
  category,
  devOnly,
}: ArticleCardProps) => {
  return (
    <Card size="2" asChild>
      <NextLink href={`/blog/${slug}`} passHref>
        <Box p="4" style={{ cursor: 'pointer' }}>
          <Flex direction="column" gap="3">
            <Heading size="4">{title}</Heading>
            {description && (
              <Text size="2" color="gray">
                {description}
              </Text>
            )}
            <Flex align="center" gap="2" justify="between">
              <Flex align="center" gap="2">
                <CalendarIcon />
                <Text size="2" color="gray">
                  {date}
                </Text>
              </Flex>
              <Flex align="center" gap="2">
                {devOnly && (
                  <Box
                    px="2"
                    py="1"
                    style={{
                      backgroundColor: 'var(--green-3)',
                      borderRadius: 9999,
                    }}
                  >
                    <Text size="1" color="green">
                      DEV
                    </Text>
                  </Box>
                )}
                <Text size="1" color="blue">
                  {category}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </NextLink>
    </Card>
  );
};
