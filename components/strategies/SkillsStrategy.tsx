import React from 'react';
import { Box, Card, Flex, Grid, Link, Text } from '@radix-ui/themes';
import {
  SiNestjs,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiFigma,
  SiExpo,
  SiTypescript,
  SiTypeorm,
  SiClerk,
  SiGithubactions,
  SiVercel,
  SiGithub,
  SiGit,
  SiSentry,
  SiObsidian,
  SiObsstudio,
} from 'react-icons/si';
import { AiOutlineDeploymentUnit } from 'react-icons/ai';
import { RiCodeBlock, RiVideoAiLine } from 'react-icons/ri';
import { HiOutlineCog } from 'react-icons/hi';
import { VscAzure } from 'react-icons/vsc';

export default function SkillsStrategy() {
  return (
    <Flex direction="column" gap="6">
      <Text weight="bold" size="7">
        Mes outils
      </Text>
      <Text>The tools I use everyday</Text>

      <Grid columns="3" gap="3" width="auto">
        <SkillList title="Front-end Web">
          <SkillListItem href="https://reactjs.org/">
            <SiReact />
            React
          </SkillListItem>
          <SkillListItem href="https://nextjs.org/">
            <SiNextdotjs />
            Next.js
          </SkillListItem>
          <SkillListItem href="https://tailwindcss.com/">
            <SiTailwindcss />
            Tailwind CSS
          </SkillListItem>
          <SkillListItem href="https://www.figma.com/">
            <SiFigma />
            Figma
          </SkillListItem>
        </SkillList>

        <SkillList title="Front-end Mobile">
          <SkillListItem href="https://reactnative.dev/">
            <SiReact />
            React Native
          </SkillListItem>
          <SkillListItem href="https://expo.dev/">
            <SiExpo />
            Expo
          </SkillListItem>
          <SkillListItem href="https://expo.dev/eas">
            <AiOutlineDeploymentUnit />
            Expo Application Services (EAS)
          </SkillListItem>
        </SkillList>

        <SkillList title="Back-end">
          <SkillListItem href="https://www.typescriptlang.org/">
            <SiTypescript />
            Typescript
          </SkillListItem>
          <SkillListItem href="https://nestjs.com/">
            <SiNestjs />
            NestJs
          </SkillListItem>
          <SkillListItem href="https://typeorm.io/">
            <SiTypeorm />
            Typeorm
          </SkillListItem>
          <SkillListItem href="https://aws.amazon.com/fr/compare/the-difference-between-graphql-and-rest/">
            <HiOutlineCog />
            API REST & GraphQL
          </SkillListItem>
          <SkillListItem href="https://clerk.com/">
            <SiClerk />
            Clerk
          </SkillListItem>
        </SkillList>

        <SkillList title="CI/CD">
          <SkillListItem href="https://github.com/features/actions/">
            <SiGithubactions />
            GitHub Actions
          </SkillListItem>
          <SkillListItem href="https://azure.microsoft.com/en-us/products/devops/">
            <VscAzure />
            Azure DevOps
          </SkillListItem>
          <SkillListItem href="https://vercel.com/">
            <SiVercel />
            Vercel
          </SkillListItem>
        </SkillList>

        <SkillList title="Code">
          <SkillListItem href="https://github.com/">
            <SiGithub />
            GitHub
          </SkillListItem>
          <SkillListItem href="https://cursor.com/">
            <RiCodeBlock />
            Cursor
          </SkillListItem>
          <SkillListItem href="https://git-scm.com/">
            <SiGit />
            GIT
          </SkillListItem>
          <SkillListItem href="https://sentry.io/">
            <SiSentry />
            Sentry
          </SkillListItem>
        </SkillList>

        <SkillList title="Création contenus">
          <SkillListItem href="https://obsidian.md/">
            <SiObsidian />
            Obsidian
          </SkillListItem>
          <SkillListItem href="https://obsproject.com/">
            <SiObsstudio />
            OBS
          </SkillListItem>
          <SkillListItem href="https://www.capcut.com/">
            <RiVideoAiLine />
            Capcut
          </SkillListItem>
        </SkillList>
      </Grid>
    </Flex>
  );
}

interface SkillListProps {
  title: string;
  children: React.ReactNode;
}

const SkillList = ({ title, children }: SkillListProps) => {
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

interface SkillListItemProps {
  href: string;
  children: React.ReactNode;
}

const SkillListItem = ({ href, children }: SkillListItemProps) => {
  // Extract icon and text from children
  const childrenArray = React.Children.toArray(children);
  const icon = childrenArray[0];
  const text = childrenArray.slice(1).join('');

  return (
    <Link href={href} target="_blank" style={{ textDecoration: 'none' }}>
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
