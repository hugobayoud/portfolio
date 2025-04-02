import { Flex } from '@radix-ui/themes';

import HeroStrategy from '../../components/strategies/HeroStrategy';
import StoryStrategy from '../../components/strategies/StoryStrategy';
import SkillsStrategy from '../../components/strategies/SkillsStrategy';
import ProjectsStrategy from '../../components/strategies/ProjectsStrategy';
import ReferencesStrategy from '../../components/strategies/ReferencesStrategy';

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
