import { Flex } from '@radix-ui/themes';

import { ThemeToggle } from '../../components/ThemeToggle';
import { LanguageToggle } from '../../components/LanguageToggle';
import StoryStrategy from '../../components/strategies/StoryStrategy';
import HeaderStrategy from '../../components/strategies/HeaderStrategy';
import SkillsStrategy from '../../components/strategies/SkillsStrategy';
import ProjectsStrategy from '../../components/strategies/ProjectsStrategy';
import ReferencesStrategy from '../../components/strategies/ReferencesStrategy';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto p-8 flex flex-col gap-16 sm:p-20 mb-16">
      <div className="flex justify-end mb-4">
        <Flex justify="end" gap="2" p="2">
          <LanguageToggle />
          <ThemeToggle />
        </Flex>
      </div>

      <HeaderStrategy />

      <StoryStrategy />

      <ProjectsStrategy />

      <SkillsStrategy />

      <ReferencesStrategy />
    </div>
  );
}
