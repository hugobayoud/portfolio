import { ArrowTopRightIcon } from '@radix-ui/react-icons';

import { CvActionLink } from '@/components/cv/cv-action';
import { LogoMark } from '@/components/cv/logo-mark';
import { ReferenceDialog } from '@/components/cv/reference-dialog';
import { SkillChips } from '@/components/cv/skill-chip';
import type { Experience } from '@/lib/types/i18n';

/**
 * One entry of the "Expériences" row, laid out like the printed CV: logo,
 * company + sector on the title line, the period pushed to the right, the role
 * underneath in muted semi-bold, then the summary — followed by the skills this
 * mission is remembered for and a strip of actions (the site, the reference).
 */
export function ExperienceItem({
  experience,
  visitSiteLabel,
  referenceLabel,
  closeLabel,
}: {
  experience: Experience;
  visitSiteLabel: string;
  /** Template carrying `{name}`, e.g. "Voir la référence : {name}". */
  referenceLabel: string;
  closeLabel: string;
}) {
  const { testimonial } = experience;

  return (
    <article className="flex gap-4">
      <LogoMark src={experience.logo} name={experience.company} />

      <div className="min-w-0 flex-1">
        {/* Company, sector and period share a line on desktop — the CV's
            "BPM (SportTech, app de rencontres) …… 07/2026" title row. On a
            phone the sector wraps under the name and the period, forced to
            full width, takes a line of its own. */}
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <h3 className="font-title text-[16.5px] leading-snug tracking-[-0.01em] text-navy sm:text-[17.5px]">
            {experience.company}
          </h3>

          <p className="text-[13.5px] text-ink-faint">{experience.sector}</p>

          <span className="w-full text-[13px] tabular-nums text-ink-faint sm:ml-auto sm:w-auto">
            {experience.period}
          </span>
        </div>

        <p className="mt-2 text-[14.5px] font-semibold text-ink-muted">
          {experience.role}
        </p>

        <p className="mt-3 text-[15px] leading-[1.65] text-ink-soft">
          {experience.summary}
        </p>

        <SkillChips skills={experience.skills} />

        {(experience.url || testimonial) && (
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            {experience.url && (
              <CvActionLink href={experience.url}>
                {visitSiteLabel}
                <ArrowTopRightIcon aria-hidden className="h-3.5 w-3.5" />
              </CvActionLink>
            )}

            {testimonial && (
              <ReferenceDialog
                testimonial={testimonial}
                triggerLabel={referenceLabel.replace(
                  '{name}',
                  testimonial.author,
                )}
                closeLabel={closeLabel}
              />
            )}
          </div>
        )}
      </div>
    </article>
  );
}
