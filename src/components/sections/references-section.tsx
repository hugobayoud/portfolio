'use client';

import React from 'react';
import { Flex } from '@radix-ui/themes';

import { ProjectCard } from '../ui/project-card';
import { useLanguage } from '@/lib/hooks/use-language';
import { SectionHeader } from '../layout/section-header';

export const ReferencesSection = () => {
  const { messages } = useLanguage();

  return (
    <Flex direction="column" gap="8">
      <SectionHeader
        title={messages.strategies.references.title}
        subTitle={messages.strategies.references.subTitle}
      />

      <Flex gap="3" direction="column" maxWidth="500px" className="mx-auto">
        <ProjectCard
          title={messages.strategies.references.leProgres.title}
          description={messages.strategies.references.leProgres.description}
          image="/references/thumbnails/le_progres.png"
          backgroundImage="/references/le_progres_.webp"
          link="https://www.leprogres.fr/economie/2024/04/07/avec-cette-application-plus-de-dispute-autour-de-l-addition"
        />
        <ProjectCard
          title={messages.strategies.references.bfmLyon.title}
          description={messages.strategies.references.bfmLyon.description}
          image="/references/thumbnails/bfm_lyon.png"
          backgroundImage="/references/bfm_.webp"
          link="https://www.bfmtv.com/lyon/replay-emissions/bonsoir-lyon/sowhat-l-application-lyonnaise-qui-permet-de-mieux-gerer-son-budget_VN-202502170665.html"
        />
        <ProjectCard
          title={messages.strategies.references.podcast.title}
          description={messages.strategies.references.podcast.description}
          image="/references/thumbnails/podcast.png"
          backgroundImage="/references/podcast_.webp"
          link="https://youtu.be/oDuGcrbxy6s?si=imEuTjTFmLMlNxjS"
        />
      </Flex>
    </Flex>
  );
};
