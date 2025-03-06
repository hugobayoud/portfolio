import StoryStrategy from '../../components/strategies/StoryStrategy';
import HeaderStrategy from '../../components/strategies/HeaderStrategy';
import SkillsStrategy from '../../components/strategies/SkillsStrategy';
import ProjectsStrategy from '../../components/strategies/ProjectsStrategy';
import ReferencesStrategy from '../../components/strategies/ReferencesStrategy';
import { ThemeToggle } from '../../components/ThemeToggle';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto p-8 pb-20 flex flex-col gap-16 sm:p-20">
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>

      <HeaderStrategy />

      <StoryStrategy />

      <ProjectsStrategy />

      <SkillsStrategy />

      <ReferencesStrategy />
    </div>
  );
}
