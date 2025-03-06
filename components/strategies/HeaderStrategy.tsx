import { Flex, Text, Button, Avatar } from '@radix-ui/themes';
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';

import EmailButton from '../EmailButton';
import Link from 'next/link';

export default function HeaderStrategy() {
  return (
    <Flex direction="row" gap="6">
      <Flex direction="column" gap="4">
        <Text weight="bold" size="8">
          HUGO BAYOUD
        </Text>
        <Text weight="light" color="indigo">
          Développeur Full Stack Web & Mobile spécialisé dans l'écosystème
          JavaScript, j'allie expertise technique et sensibilité UX/UI pour
          créer des applications performantes et intuitives.
        </Text>
        <Flex direction="row" gap="2">
          <SocialButton
            icon={<LinkedInLogoIcon />}
            label="LinkedIn"
            href="www.linkedin.com/in/hugo-bayoud-4aa927194/"
          />

          <SocialButton
            icon={<GitHubLogoIcon />}
            label="GitHub"
            href="https://github.com/hugobayoud/"
          />

          <EmailButton />
        </Flex>
      </Flex>

      <Avatar src="/hugo_filled.png" size="9" fallback="HB" radius="full" />
    </Flex>
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
