import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Divider",
  description: "A thin visual rule used to separate content sections or items. Supports horizontal and vertical orientations.",
  pathname: '/components/divider/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/divider/configurator' },
  { label: 'Examples',     href: '/components/divider/examples' },
  { label: 'Usage',        href: '/components/divider/usage' },
  { label: 'Accessibility',href: '/components/divider/accessibility' },
  { label: 'API',          href: '/components/divider/api' },
];

export default function DividerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Divider" description="A thin visual rule used to separate content sections or items. Supports horizontal and vertical orientations." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}
