import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Pagination",
  description: "Splits large data sets across numbered pages with previous and next navigation.",
  pathname: '/components/pagination/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/pagination/configurator' },
  { label: 'Examples',     href: '/components/pagination/examples' },
  { label: 'Usage',        href: '/components/pagination/usage' },
  { label: 'Accessibility',href: '/components/pagination/accessibility' },
  { label: 'API',          href: '/components/pagination/api' },
];

export default function PaginationLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Pagination" description="Splits large data sets across numbered pages with previous and next navigation." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}
