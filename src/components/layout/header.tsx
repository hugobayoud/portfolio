'use client';

import { ArchiveIcon, ChevronLeftIcon, HomeIcon } from '@radix-ui/react-icons';
import { Button, Container, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/hooks/use-language';
import { LanguageToggle } from '../ui/language-toggle';
import { ThemeToggle } from '../ui/theme-toggle';

export const Header = () => {
  const pathname = usePathname();

  const isBlogPage = pathname === '/blog';
  const isHomePage = pathname === '/';
  const isArticlePage = pathname.startsWith('/blog/');

  const { messages } = useLanguage();

  return (
    <Container size="4">
      <Flex justify="end" align="end" gap="2" p="2" mb="4">
        {isBlogPage && (
          <Link href="/" passHref>
            <Button variant="soft" size="2">
              <ChevronLeftIcon />
              {messages.header.home.title}
            </Button>
          </Link>
        )}

        {isArticlePage && (
          <Flex gap="2" direction="row">
            <Link href="/blog" passHref>
              <Button variant="soft" size="2">
                <ChevronLeftIcon />
                {messages.header.blog.title}
              </Button>
            </Link>
            <Link href="/" passHref>
              <Button variant="outline" size="2">
                <HomeIcon />
              </Button>
            </Link>
          </Flex>
        )}

        <Flex gap="2">
          <LanguageToggle />
          <ThemeToggle />
        </Flex>
      </Flex>
    </Container>
  );
};
