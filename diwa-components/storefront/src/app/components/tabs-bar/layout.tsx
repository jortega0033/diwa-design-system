import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Tabs Bar",
  description: "A navigation bar that organises content into labelled tabs, allowing users to switch between related views.",
  pathname: '/components/tabs-bar/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/tabs-bar/configurator' },
  { label: 'Examples',     href: '/components/tabs-bar/examples' },
  { label: 'Usage',        href: '/components/tabs-bar/usage' },
  { label: 'Accessibility',href: '/components/tabs-bar/accessibility' },
  { label: 'API',          href: '/components/tabs-bar/api' },
];

export default function TabsBarLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Tabs Bar" description="A navigation bar that organises content into labelled tabs, allowing users to switch between related views." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}
