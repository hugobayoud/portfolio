import NextLink from 'next/link';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';

import { Article } from '@/utils/getArticles';

const ArticleCard = ({ title, slug, date }: Article) => {
  return (
    <Card size="2" asChild>
      <NextLink href={`/blog/${slug}`} passHref>
        <Box p="4" style={{ cursor: 'pointer' }}>
          <Flex direction="column" gap="2">
            <Heading size="4">{title}</Heading>
            <Flex align="center" gap="2">
              <CalendarIcon />
              <Text size="2" color="gray">
                {date}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </NextLink>
    </Card>
  );
};

export default ArticleCard;
