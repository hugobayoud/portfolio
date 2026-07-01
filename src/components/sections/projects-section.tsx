'use client';

import { Box, Flex } from '@radix-ui/themes';
import { useLanguage } from '@/lib/hooks/use-language';
import { SectionHeader } from '../layout/section-header';
import {
  compareExperiencesByStartDesc,
  ExperienceTimelineItem,
} from '../ui/project-card';

export const ProjectsSection = () => {
  const { messages, language } = useLanguage();
  const dateLocale = language === 'fr' ? 'fr-FR' : 'en-US';
  const projects = messages.strategies.projects;
  const sorted = Object.values(projects.experiences).sort(
    compareExperiencesByStartDesc,
  );

  return (
    <Flex direction="column" gap="8">
      <SectionHeader title={projects.title} subTitle={projects.subTitle} />

      <Box className="w-full max-w-3xl mx-auto px-1 sm:px-0">
        <Box className="relative">
          <Box
            aria-hidden
            className="pointer-events-none absolute left-[19px] top-4 bottom-4 z-0 w-px bg-[var(--gray-6)] sm:left-[23px]"
          />

          <Flex direction="column" gap="6" className="relative z-[1] sm:gap-8">
            {sorted.map((exp) => (
              <Flex key={exp.id} gap="4" align="start">
                <Box
                  className="relative z-[2] mt-[22px] flex h-4 w-10 shrink-0 justify-center sm:w-12"
                  aria-hidden
                >
                  <span className="mt-0.5 block h-3.5 w-3.5 shrink-0 rounded-full border-2 border-[var(--accent-9)] bg-[var(--color-panel)] shadow-[0_0_0_4px_var(--gray-3)]" />
                </Box>

                <Box className="min-w-0 flex-1">
                  <ExperienceTimelineItem
                    companyName={exp.companyName}
                    myRole={exp.myRole}
                    companyDescription={exp.companyDescription}
                    myRoleShortDescription={exp.myRoleShortDescription}
                    myRoleLongDescription={exp.myRoleLongDescription}
                    icon={exp.icon}
                    url={exp.url}
                    startDate={exp.startDate}
                    endDate={exp.endDate}
                    dateLocale={dateLocale}
                    currentLabel={projects.currentLabel}
                    visitWebsiteLabel={projects.visitWebsite}
                    sectionLabels={projects.labels}
                  />
                </Box>
              </Flex>
            ))}
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};
