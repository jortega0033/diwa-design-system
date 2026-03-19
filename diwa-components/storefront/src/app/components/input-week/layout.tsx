import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Input Week",
  description: "A week-and-year picker input (YYYY-Www). Delegates to the native browser week picker. Supports min and max week constraints.",
  pathname: '/components/input-week/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/input-week/configurator' },
  { label: 'Examples',     href: '/components/input-week/examples' },
  { label: 'Usage',        href: '/components/input-week/usage' },
  { label: 'Accessibility',href: '/components/input-week/accessibility' },
  { label: 'API',          href: '/components/input-week/api' },
];

export default function InputWeekLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Input Week" description="A week-and-year picker input (YYYY-Www). Delegates to the native browser week picker. Supports min and max week constraints." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}
