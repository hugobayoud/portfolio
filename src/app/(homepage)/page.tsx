import { Flex } from '@radix-ui/themes';

import HeroStrategy from '../../components/sections/hero-section';
import StoryStrategy from '../../components/sections/story-section';
import SkillsStrategy from '../../components/sections/skills-section';
import ProjectsStrategy from '../../components/sections/projects-section';
import ReferencesStrategy from '../../components/sections/references-section';

export default function Home() {
  return (
    <Flex direction="column" gap="8">
      <HeroStrategy />

      <StoryStrategy />

      <ProjectsStrategy />

      <SkillsStrategy />

      <ReferencesStrategy />
    </Flex>
  );
}
