'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container, Flex, Button } from '@radix-ui/themes';
import { ArchiveIcon, ChevronLeftIcon, HomeIcon } from '@radix-ui/react-icons';

import { ThemeToggle } from '../ui/theme-toggle';
import { useLanguage } from '@/lib/hooks/use-language';
import { LanguageToggle } from '../ui/language-toggle';

export const Header = () => {
  const pathname = usePathname();

  const isBlogPage = pathname === '/blog';
  const isHomePage = pathname === '/';
  const isArticlePage = pathname.startsWith('/blog/');

  const { messages } = useLanguage();

  return (
    <Container size="4">
      <Flex justify="between" align="center" gap="2" p="2" mb="4">
        {isHomePage && (
          <Link href="/blog" passHref>
            <Button variant="soft" size="2">
              <ArchiveIcon />
              {messages.header.blog.title}
            </Button>
          </Link>
        )}

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
