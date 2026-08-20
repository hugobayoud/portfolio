'use client';

import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { BsWhatsapp } from 'react-icons/bs';

import { ProfilePhoto } from '@/components/cv/profile-photo';
import { CopyEmail } from '@/components/ui/copy-email';
import { QuietLink } from '@/components/ui/quiet-link';
import { useLanguage } from '@/lib/hooks/use-language';

const LINKEDIN_URL = 'https://www.linkedin.com/in/hugo-bayoud-4aa927194/';
const GITHUB_URL = 'https://www.github.com/hugobayoud/';

export function ProfileHeader() {
  const { messages } = useLanguage();
  const profile = messages.profile;
  const phoneHref = `tel:${profile.phone.replace(/\s/g, '')}`;
  const whatsappHref = `https://wa.me/${profile.phone.replace(/[^\d]/g, '')}`;

  return (
    <header className="flex flex-col items-center gap-6 pb-9 text-center sm:flex-row sm:gap-9 sm:pb-11 sm:text-left">
      <ProfilePhoto alt={profile.photoAlt} />

      <div className="min-w-0">
        <h1 className="font-title text-[34px] leading-[1.05] tracking-[-0.025em] text-navy sm:text-[46px]">
          {profile.name}
        </h1>

        <p className="mt-2 text-[14px] font-semibold leading-snug text-ink-muted sm:text-[15px]">
          {profile.headline}
        </p>

        <div className="mt-4 flex flex-col items-center gap-1.5 sm:items-start">
          <a
            href={phoneHref}
            className="text-[15px] tabular-nums text-ink-soft transition-colors hover:text-navy"
          >
            {profile.phone}
          </a>

          <CopyEmail
            email={profile.email}
            copyLabel={profile.copyEmail}
            copiedLabel={profile.emailCopied}
          />
        </div>

        <div className="print-hidden mt-5 flex justify-center gap-2 sm:justify-start">
          <QuietLink external href={LINKEDIN_URL} label={profile.linkedin}>
            <LinkedInLogoIcon />
          </QuietLink>

          <QuietLink external href={GITHUB_URL} label={profile.github}>
            <GitHubLogoIcon />
          </QuietLink>

          <QuietLink external href={whatsappHref} label={profile.whatsapp}>
            <BsWhatsapp />
          </QuietLink>
        </div>
      </div>
    </header>
  );
}
