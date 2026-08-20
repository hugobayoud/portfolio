'use client';

import { CvRow } from '@/components/cv/cv-row';
import { ExperienceItem } from '@/components/cv/experience-item';
import { ProfileHeader } from '@/components/cv/profile-header';
import { useLanguage } from '@/lib/hooks/use-language';

/**
 * The site *is* the CV: the same rows, in the same order, with the same
 * right-aligned gutter labels as the printed version.
 *
 * Everything renders from the bundled locale files, so switching FR ⇄ EN is a
 * re-render rather than a navigation, and the whole page ships as static HTML.
 */
export default function Home() {
  const { messages } = useLanguage();
  const { profile, sections, experience, education, ai } = messages;

  return (
    <main>
      <ProfileHeader />

      {/* No gutter label: the job title already sits under the name. */}
      <CvRow>
        <p className="max-w-[46ch] text-[16.5px] leading-[1.6] text-ink-soft sm:text-[17.5px]">
          {profile.tagline}
        </p>
      </CvRow>

      <CvRow label={sections.experience}>
        <div className="flex flex-col gap-11 sm:gap-12">
          {experience.items.map((item) => (
            <ExperienceItem
              key={item.id}
              experience={item}
              visitSiteLabel={experience.visitSite}
              referenceLabel={experience.seeReference}
              closeLabel={experience.close}
            />
          ))}
        </div>
      </CvRow>

      <CvRow label={sections.education}>
        <p className="font-title text-[15.5px] leading-snug text-navy">
          {education.degree}
        </p>

        <p className="mt-2 text-[15px] leading-[1.65] text-ink-soft">
          {education.detail}
        </p>
      </CvRow>

      <CvRow label={sections.ai}>
        <p className="text-[15px] leading-[1.65] text-ink-soft">{ai.text}</p>
      </CvRow>
    </main>
  );
}
