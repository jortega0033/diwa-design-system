import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Tag",
  description: "Compact inline labels for categorisation, status, and metadata. Use diwa-tag for static labels and diwa-tag-dismissible when the user needs to remove an item.",
  pathname: '/components/tag/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/tag/configurator' },
  { label: 'Examples',     href: '/components/tag/examples' },
  { label: 'Usage',        href: '/components/tag/usage' },
  { label: 'Accessibility',href: '/components/tag/accessibility' },
  { label: 'API',          href: '/components/tag/api' },
];

export default function TagLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Tag" description="Compact inline labels for categorisation, status, and metadata. Use diwa-tag for static labels and diwa-tag-dismissible when the user needs to remove an item." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}
