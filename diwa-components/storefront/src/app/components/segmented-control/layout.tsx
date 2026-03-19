import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Segmented Control",
  description: "A compact button group that lets users switch between a set of mutually exclusive views or modes.",
  pathname: '/components/segmented-control/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/segmented-control/configurator' },
  { label: 'Examples',     href: '/components/segmented-control/examples' },
  { label: 'Usage',        href: '/components/segmented-control/usage' },
  { label: 'Accessibility',href: '/components/segmented-control/accessibility' },
  { label: 'API',          href: '/components/segmented-control/api' },
];

export default function SegmentedControlLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Segmented Control" description="A compact button group that lets users switch between a set of mutually exclusive views or modes." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}
