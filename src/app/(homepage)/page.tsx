import { Flex } from '@radix-ui/themes';

import { HeroSection } from '@/components/sections/hero-section';
import { StorySection } from '@/components/sections/story-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ReferencesSection } from '@/components/sections/references-section';

export default function Home() {
  return (
    <Flex direction="column" gap="8">
      <HeroSection />

      <StorySection />

      <ProjectsSection />

      <SkillsSection />

      <ReferencesSection />
    </Flex>
  );
}
