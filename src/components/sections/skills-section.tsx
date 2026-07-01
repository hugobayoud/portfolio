'use client';

import { Flex, Grid } from '@radix-ui/themes';
import React from 'react';
import { AiOutlineDeploymentUnit } from 'react-icons/ai';
import { HiOutlineCog } from 'react-icons/hi';
import { RiCodeBlock, RiVideoAiLine } from 'react-icons/ri';
import {
  SiClerk,
  SiExpo,
  SiFigma,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiNestjs,
  SiNextdotjs,
  SiObsidian,
  SiObsstudio,
  SiReact,
  SiSentry,
  SiTailwindcss,
  SiTypeorm,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';
import { useLanguage } from '@/lib/hooks/use-language';
import { SectionHeader } from '../layout/section-header';
import { SkillList } from '../ui/skill-list';
import { SkillListItem } from '../ui/skill-list-item';

export const SkillsSection = () => {
  const { messages } = useLanguage();

  return (
    <Flex direction="column" gap="8">
      <SectionHeader
        title={messages.strategies.skills.title}
        subTitle={messages.strategies.skills.subTitle}
      />

      <Grid columns={{ xs: '1', sm: '3' }} gap="8">
        <SkillList title={messages.strategies.skills.frontend}>
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

        <SkillList title={messages.strategies.skills.mobile}>
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

        <SkillList title={messages.strategies.skills.backend}>
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

        <SkillList title={messages.strategies.skills.ciCd}>
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

        <SkillList title={messages.strategies.skills.code}>
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

        <SkillList title={messages.strategies.skills.other}>
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
};
