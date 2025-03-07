'use client';

import Link from 'next/link';
import { Flex, Text, Button } from '@radix-ui/themes';
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';

import EmailButton from '../EmailButton';
import { BsWhatsapp } from 'react-icons/bs';
import { MeWithSunglasses } from '../MeWithSunglasses';
import { useLanguage } from '../../src/i18n/LanguageProvider';

export default function HeaderStrategy() {
  const { messages } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
      <MeWithSunglasses />

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
            href="https://www.linkedin.com/in/hugo-bayoud-4aa927194/"
          />
          <SocialButton
            icon={<GitHubLogoIcon />}
            label={messages.strategies.header.social.github}
            href="https://www.github.com/hugobayoud/"
          />
          <SocialButton
            icon={<BsWhatsapp />}
            label={messages.strategies.header.social.whatsapp}
            href="https://wa.me/33698352892"
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
