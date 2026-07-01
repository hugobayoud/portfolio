'use client';

import { Cross2Icon, ExternalLinkIcon, QuoteIcon } from '@radix-ui/react-icons';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  Flex,
  Separator,
  Text,
  VisuallyHidden,
} from '@radix-ui/themes';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { useTheme } from '@/lib/hooks/use-theme';

interface Props {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  backgroundImage: string;
  link?: string;
  asDialog?: boolean;
}

export const ProjectCard = ({
  title,
  subtitle,
  description,
  image,
  backgroundImage,
  link,
  asDialog,
}: Props) => {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (asDialog) {
      setIsModalOpen(true);
    }
  };

  const cardContent = (
    <>
      {/* Background div (will fill the entire container) */}
      <Image
        className="absolute inset-0 w-full h-full"
        src={backgroundImage}
        alt={title}
        width={1000}
        height={800}
        loading="lazy"
        style={{ objectFit: 'cover' }}
      />

      {/* Content that determines the height */}
      <Flex
        direction="column"
        gap="3"
        className="p-6 relative group-hover:opacity-0 transition-opacity"
        style={{
          backgroundColor:
            theme === 'dark'
              ? 'rgba(10, 26, 51, 0.9)' // Dark blue with opacity for dark theme
              : 'rgba(0, 102, 255, 0.75)', // Primary blue with opacity for light theme
          backdropFilter: 'blur(8px)',
        }}
      >
        <Flex direction="column" gap="3">
          <Flex direction="row" align="center" gap="3">
            <Avatar size="3" src={image} fallback="X" />
            <Text
              size="3"
              weight="bold"
              style={{
                color: theme === 'dark' ? 'var(--accent-9)' : 'white',
              }}
            >
              {title}
              {subtitle && (
                <Text
                  size="2"
                  weight="bold"
                  style={{
                    color: theme === 'dark' ? 'var(--accent-9)' : 'white',
                  }}
                >
                  {` [${subtitle}]`}
                </Text>
              )}
            </Text>
          </Flex>
          <Text
            size="2"
            style={{
              color: theme === 'dark' ? 'var(--foreground)' : 'white',
              display: '-webkit-box',
              WebkitLineClamp: 5,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {description}
          </Text>
        </Flex>
      </Flex>
    </>
  );

  return (
    <>
      <Box
        className="rounded-lg border shadow-sm group"
        style={{
          maxWidth: '500px',
          width: '100%',
          position: 'relative',
          borderRadius: 'var(--radius-3)',
          overflow: 'hidden',
        }}
      >
        {link ? (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
            }}
          >
            {cardContent}
          </Link>
        ) : (
          <button
            onClick={handleClick}
            style={{
              all: 'unset',
              cursor: 'pointer',
              width: '100%',
              height: '100%',
            }}
          >
            {cardContent}
          </button>
        )}
      </Box>

      {/* Modal */}
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <VisuallyHidden>
          <Dialog.Title>{title}</Dialog.Title>
        </VisuallyHidden>
        <Dialog.Content
          style={{
            maxWidth: 'min(90vw, 600px)',
            padding: '24px',
            position: 'relative',
          }}
        >
          {/* Modal content */}
          <Flex direction="column" gap="4">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                alignSelf: 'flex-end',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme === 'dark' ? 'var(--gray-11)' : 'var(--gray-9)',
              }}
              aria-label="Close"
            >
              <Cross2Icon width={24} height={24} />
            </button>

            <Image
              src={image}
              alt={title}
              width={170}
              height={170}
              style={{
                alignSelf: 'center',
                objectFit: 'cover',
                borderRadius: 'var(--radius-2)',
              }}
            />
            <Flex direction="column" gap="2" className="items-center mb-2">
              <Text size="5" weight="bold" style={{ color: 'var(--accent-9)' }}>
                {title}
              </Text>
              {subtitle && (
                <Text size="2" style={{ color: 'var(--foreground)' }}>
                  {subtitle}
                </Text>
              )}
            </Flex>
            <Text
              size="3"
              style={{
                lineHeight: '1.5',
                whiteSpace: 'pre-line',
                color: 'var(--foreground)',
              }}
            >
              <div className="flex items-center justify-start opacity-50 p-2">
                <QuoteIcon />
              </div>
              {description}

              <div className="flex items-center justify-end opacity-50 p-2">
                <QuoteIcon />
              </div>
            </Text>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

// --- Professional experience timeline (reuses Radix Dialog / Image / Avatar patterns) ---

export type ExperienceTimelineItemProps = {
  companyName: string;
  myRole: string;
  companyDescription: string;
  myRoleShortDescription: string;
  myRoleLongDescription: string;
  icon: string;
  url: string;
  startDate: string;
  endDate: string;
  /** en-US / fr-FR */
  dateLocale: string;
  currentLabel: string;
  visitWebsiteLabel: string;
  sectionLabels: {
    company: string;
    roleOverview: string;
    roleInDepth: string;
  };
};

function parseMonthYear(value: string): number | null {
  const parts = value.trim().split('-');
  if (parts.length !== 2) return null;
  const month = Number(parts[0]);
  const year = Number(parts[1]);
  if (!Number.isFinite(month) || !Number.isFinite(year)) return null;
  if (month < 1 || month > 12) return null;
  return year * 12 + (month - 1);
}

function formatMonthYear(value: string, locale: string): string {
  const idx = parseMonthYear(value);
  if (idx === null) return value;
  const year = Math.floor(idx / 12);
  const month0 = idx % 12;
  const d = new Date(year, month0, 1);
  return d.toLocaleDateString(locale, { month: 'short', year: 'numeric' });
}

/** Higher start date first (most recent experience on top). */
export function compareExperiencesByStartDesc(
  a: { startDate: string },
  b: { startDate: string },
): number {
  const pa = parseMonthYear(a.startDate);
  const pb = parseMonthYear(b.startDate);
  if (pa === null && pb === null) return 0;
  if (pa === null) return 1;
  if (pb === null) return -1;
  return pb - pa;
}

function formatExperiencePeriod(
  startDate: string,
  endDate: string,
  locale: string,
  currentLabel: string,
): string {
  const start = formatMonthYear(startDate, locale);
  if (endDate.trim().toLowerCase() === 'current') {
    return `${start} → ${currentLabel}`;
  }
  return `${start} → ${formatMonthYear(endDate, locale)}`;
}

export const ExperienceTimelineItem = ({
  companyName,
  myRole,
  companyDescription,
  myRoleShortDescription,
  myRoleLongDescription,
  icon,
  url,
  startDate,
  endDate,
  dateLocale,
  currentLabel,
  visitWebsiteLabel,
  sectionLabels,
}: ExperienceTimelineItemProps) => {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const periodLabel = formatExperiencePeriod(
    startDate,
    endDate,
    dateLocale,
    currentLabel,
  );

  const cardContent = (
    <>
      <Flex
        direction="column"
        gap="3"
        className="pl-0 p-5 sm:p-6 sm:pl-0 relative transition-opacity"
      >
        <Flex direction="column" gap="3">
          <Flex direction="row" align="center" gap="3">
            <Avatar
              size="5"
              style={{
                boxShadow:
                  theme === 'dark'
                    ? '1px 1px 3px 1px rgba(255,255,255, 0.2)'
                    : '1px 1px 3px 1px rgba(0, 0, 0, 0.2)',
              }}
              src={icon}
              fallback={companyName.slice(0, 1)}
            />
            <Flex direction="column" gap="1" className="min-w-0 flex-1">
              <Text size="3" weight="bold" style={{ color: 'var(--accent-9)' }}>
                {companyName}
              </Text>
              <Text
                size="2"
                weight="medium"
                style={{ color: 'var(--accent-9)', opacity: 0.95 }}
              >
                {myRole}
              </Text>
              <Text size="1" style={{ color: 'var(--gray-11)' }}>
                {periodLabel}
              </Text>
            </Flex>
          </Flex>
          <Text
            size="2"
            style={{
              color: 'var(--foreground)',
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {myRoleShortDescription}
          </Text>
        </Flex>
      </Flex>
    </>
  );

  return (
    <>
      <Box
        className="rounded-lg cursor-pointer w-full"
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-3)',
          overflow: 'hidden',
        }}
        onClick={() => setIsModalOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
        role="button"
        tabIndex={0}
      >
        {cardContent}
      </Box>

      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <VisuallyHidden>
          <Dialog.Title>
            {companyName} — {myRole}
          </Dialog.Title>
        </VisuallyHidden>
        <Dialog.Content
          style={{
            maxWidth: 'min(92vw, 640px)',
            maxHeight: 'min(88vh, 900px)',
            padding: '24px',
            position: 'relative',
            overflowY: 'auto',
          }}
        >
          <Flex direction="column" gap="4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              style={{
                alignSelf: 'flex-end',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme === 'dark' ? 'var(--gray-11)' : 'var(--gray-9)',
              }}
              aria-label="Close"
            >
              <Cross2Icon width={24} height={24} />
            </button>

            <Image
              src={icon}
              alt={companyName}
              width={150}
              height={150}
              style={{
                alignSelf: 'center',
                objectFit: 'cover',
                borderRadius: 'var(--radius-6)',
                boxShadow:
                  theme === 'dark'
                    ? '4px 4px 6px 1px rgba(255,255,255, 0.2)'
                    : '4px 4px 6px 1px rgba(0, 0, 0, 0.2)',
              }}
            />

            <Flex
              direction="column"
              gap="2"
              className="items-center text-center"
            >
              <Text size="6" weight="bold" style={{ color: 'var(--accent-9)' }}>
                {companyName}
              </Text>
              <Text size="3" weight="medium">
                {myRole}
              </Text>
              <Text size="2" color="gray">
                {periodLabel}
              </Text>
            </Flex>

            <Separator size="4" />

            <Flex direction="column" gap="2" style={{ marginBottom: '24px' }}>
              <Text size="2" weight="bold" style={{ color: 'var(--accent-9)' }}>
                {sectionLabels.company}
              </Text>
              <Text size="3" style={{ color: 'var(--foreground)' }}>
                {companyDescription}
              </Text>
            </Flex>

            <Flex direction="column" gap="2" style={{ marginBottom: '24px' }}>
              <Text size="2" weight="bold" style={{ color: 'var(--accent-9)' }}>
                {sectionLabels.roleOverview}
              </Text>
              <Text size="3" style={{ color: 'var(--foreground)' }}>
                {myRoleShortDescription}
              </Text>
            </Flex>

            <Flex direction="column" gap="2">
              <Text size="2" weight="bold" style={{ color: 'var(--accent-9)' }}>
                {sectionLabels.roleInDepth}
              </Text>
              <Text
                size="3"
                style={{
                  whiteSpace: 'pre-line',
                  color: 'var(--foreground)',
                }}
              >
                <div className="flex items-center justify-start opacity-50 py-1"></div>
                {myRoleLongDescription}
                <div className="flex items-center justify-end opacity-50 py-1"></div>
              </Text>
            </Flex>

            <Button size="3" asChild>
              <Link href={url} target="_blank" rel="noopener noreferrer">
                <Flex align="center" gap="2" justify="center">
                  <ExternalLinkIcon width={18} height={18} />
                  {visitWebsiteLabel}
                </Flex>
              </Link>
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
