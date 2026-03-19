import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Tabs",
  description: "A full-featured tabbed interface that combines a tab bar with associated panel content.",
  pathname: '/components/tabs/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/tabs/configurator' },
  { label: 'Examples',     href: '/components/tabs/examples' },
  { label: 'Usage',        href: '/components/tabs/usage' },
  { label: 'Accessibility',href: '/components/tabs/accessibility' },
  { label: 'API',          href: '/components/tabs/api' },
];

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Tabs" description="A full-featured tabbed interface that combines a tab bar with associated panel content." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}
