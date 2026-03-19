import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Select",
  description: "Select allows users to choose a single option from a filterable dropdown list. Supports keyboard navigation, validation states, and dense mode (compact) for space-constrained layouts.",
  pathname: '/components/select/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/select/configurator' },
  { label: 'Examples',     href: '/components/select/examples' },
  { label: 'Usage',        href: '/components/select/usage' },
  { label: 'Accessibility',href: '/components/select/accessibility' },
  { label: 'API',          href: '/components/select/api' },
];

export default function SelectLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Select" description="Select allows users to choose a single option from a filterable dropdown list. Supports keyboard navigation, validation states, and dense mode (compact) for space-constrained layouts." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}
