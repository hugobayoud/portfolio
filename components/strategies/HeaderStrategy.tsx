'use client';

import { Flex, Text, Button, Avatar } from '@radix-ui/themes';
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { useTheme } from '../ThemeProvider';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../src/i18n/LanguageProvider';

import EmailButton from '../EmailButton';
import Link from 'next/link';

export default function HeaderStrategy() {
  const { theme } = useTheme();
  const { messages } = useLanguage();
  const [showSunglasses, setShowSunglasses] = useState(false);

  // Effect to animate sunglasses when theme changes to light
  useEffect(() => {
    if (theme === 'light') {
      // Small delay before showing sunglasses for better animation effect
      const timer = setTimeout(() => {
        setShowSunglasses(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setShowSunglasses(false);
    }
  }, [theme]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
      <div className="relative">
        <Avatar src="/hugo.png" size="9" fallback="HB" radius="full" />

        {/* Sunglasses overlay */}
        {theme === 'light' && (
          <div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
            style={{
              opacity: showSunglasses ? 1 : 0,
              transform: `translateY(${showSunglasses ? '0' : '-10px'})`,
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
          >
            {/* <img
              src="/sunglasses.png"
              alt="Sunglasses"
              className="w-full h-auto"
              style={{
                position: 'absolute',
                zIndex: 10,
              }}
            /> */}
            <Avatar
              src="/sunglasses.png"
              size="9"
              fallback="HB"
              radius="full"
              style={{
                position: 'absolute',
                zIndex: 10,
              }}
            />
          </div>
        )}
      </div>

      <Flex direction="column" gap="6" className="sm:text-left text-center">
        <Flex
          direction="column"
          gap="2"
          align={{ initial: 'center', sm: 'start' }}
        >
          <Text
            weight="bold"
            size={{ initial: '6', sm: '8' }}
            align={{ initial: 'center', sm: 'left' }}
          >
            {messages.strategies.header.name}
          </Text>
          <Text
            weight="bold"
            size={{ initial: '3', sm: '4' }}
            style={{ color: 'var(--accent-9)' }}
            align={{ initial: 'center', sm: 'left' }}
          >
            {messages.strategies.header.title}
          </Text>

          <Text
            style={{
              maxWidth: '500px',
              opacity: 0.8,
            }}
            wrap="pretty"
            align={{ initial: 'center', sm: 'left' }}
            className="mx-auto sm:mx-0"
          >
            {messages.strategies.header.description}
          </Text>
        </Flex>

        <Flex
          direction="row"
          gap="2"
          justify={{ initial: 'center', sm: 'start' }}
          className="flex-wrap"
        >
          <SocialButton
            icon={<LinkedInLogoIcon />}
            label={messages.strategies.header.social.linkedin}
            href="www.linkedin.com/in/hugo-bayoud-4aa927194/"
          />

          <SocialButton
            icon={<GitHubLogoIcon />}
            label={messages.strategies.header.social.github}
            href="https://github.com/hugobayoud/"
          />

          <EmailButton />
        </Flex>
      </Flex>
    </div>
  );
}

const SocialButton = ({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: 'none',
      }}
    >
      <Button>
        {icon}
        {label}
      </Button>
    </Link>
  );
};
