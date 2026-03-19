import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Multi Select",
  description: "Multi Select allows users to choose one or more options from a filterable dropdown list. Supports keyboard navigation, validation states, and dense mode (compact) for space-constrained layouts.",
  pathname: '/components/multi-select/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/multi-select/configurator' },
  { label: 'Examples',     href: '/components/multi-select/examples' },
  { label: 'Usage',        href: '/components/multi-select/usage' },
  { label: 'Accessibility',href: '/components/multi-select/accessibility' },
  { label: 'API',          href: '/components/multi-select/api' },
];

export default function MultiSelectLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Multi Select" description="Multi Select allows users to choose one or more options from a filterable dropdown list. Supports keyboard navigation, validation states, and dense mode (compact) for space-constrained layouts." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}
