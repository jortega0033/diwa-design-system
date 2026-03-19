import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Flyout",
  description: "A full-height overlay panel that slides in from the edge of the viewport. Follows the controlled component pattern — the consumer manages open state and responds to the dismiss event.",
  pathname: '/components/flyout/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/flyout/configurator' },
  { label: 'Examples',     href: '/components/flyout/examples' },
  { label: 'Usage',        href: '/components/flyout/usage' },
  { label: 'Accessibility',href: '/components/flyout/accessibility' },
  { label: 'API',          href: '/components/flyout/api' },
];

export default function FlyoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Flyout" description="A full-height overlay panel that slides in from the edge of the viewport. Follows the controlled component pattern — the consumer manages open state and responds to the dismiss event." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}
