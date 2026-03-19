import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Popover",
  description: "A lightweight contextual panel that reveals additional information when a trigger is activated. Closes on Escape or clicking outside.",
  pathname: '/components/popover/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/popover/configurator' },
  { label: 'Examples',     href: '/components/popover/examples' },
  { label: 'Usage',        href: '/components/popover/usage' },
  { label: 'Accessibility',href: '/components/popover/accessibility' },
  { label: 'API',          href: '/components/popover/api' },
];

export default function PopoverLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Popover" description="A lightweight contextual panel that reveals additional information when a trigger is activated. Closes on Escape or clicking outside." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}
