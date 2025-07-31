'use client';

import { Flex } from '@radix-ui/themes';

import ProjectCard from '../ui/project-card';
import SectionHeader from '../layout/section-header';
import { useLanguage } from '@/components/providers/language-providers';

export default function ProjectsStrategy() {
  const { messages } = useLanguage();

  return (
    <Flex direction="column" gap="8">
      <SectionHeader
        title={messages.strategies.projects.title}
        subTitle={messages.strategies.projects.subTitle}
      />

      <Flex gap="3" direction="column" className="mx-auto">
        <ProjectCard
          title={messages.strategies.projects.lepto.title}
          description={messages.strategies.projects.lepto.description}
          image="/projects/logos/lepto.png"
          backgroundImage="/projects/lepto_.webp"
          link="https://count.lepto.app/"
        />
        <ProjectCard
          title={messages.strategies.projects.sowhat.title}
          description={messages.strategies.projects.sowhat.description}
          image="/projects/logos/sowhat.png"
          backgroundImage="/projects/sowhat_.webp"
          link="https://sowhat-app.com"
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
}
