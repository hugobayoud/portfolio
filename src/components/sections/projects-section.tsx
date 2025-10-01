'use client';

import { Flex } from '@radix-ui/themes';

import { ProjectCard } from '../ui/project-card';
import { useLanguage } from '@/lib/hooks/use-language';
import { SectionHeader } from '../layout/section-header';

export const ProjectsSection = () => {
  const { messages } = useLanguage();

  return (
    <Flex direction="column" gap="8">
      <SectionHeader
        title={messages.strategies.projects.title}
        subTitle={messages.strategies.projects.subTitle}
      />

      <Flex gap="3" direction="column" className="mx-auto">
        <ProjectCard
          title={messages.strategies.projects.sapio.title}
          description={messages.strategies.projects.sapio.description}
          image="/projects/logos/sapio.png"
          backgroundImage="/projects/sapio_.webp"
          link="https://apps.apple.com/fr/app/sapio-culture-g%C3%A9n%C3%A9rale/id6741903694"
        />

        <ProjectCard
          title={messages.strategies.projects.bankraft.title}
          description={messages.strategies.projects.bankraft.description}
          image="/projects/logos/bankraft.png"
          backgroundImage="/projects/bankraft_.webp"
          link="https://bankraft.com"
        />

        <ProjectCard
          title={messages.strategies.projects.lepto.title}
          description={messages.strategies.projects.lepto.description}
          image="/projects/logos/lepto.png"
          backgroundImage="/projects/lepto_.webp"
          link="https://count.lepto.app/"
        />

        <ProjectCard
          title={messages.strategies.projects.mybus.title}
          description={messages.strategies.projects.mybus.description}
          image="/projects/logos/mybus.png"
          backgroundImage="/projects/mybus_.webp"
          link="https://mybus.io/"
        />
      </Flex>
    </Flex>
  );
};
