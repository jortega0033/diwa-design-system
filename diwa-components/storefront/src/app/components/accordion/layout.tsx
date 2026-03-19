import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Accordion",
  description: "An animated, accessible panel that reveals or hides content when the user clicks its heading. Follows the controlled component pattern — the consumer manages open state.",
  pathname: '/components/accordion/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/accordion/configurator' },
  { label: 'Examples',     href: '/components/accordion/examples' },
  { label: 'Usage',        href: '/components/accordion/usage' },
  { label: 'Accessibility',href: '/components/accordion/accessibility' },
  { label: 'API',          href: '/components/accordion/api' },
];

export default function AccordionLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Accordion" description="An animated, accessible panel that reveals or hides content when the user clicks its heading. Follows the controlled component pattern — the consumer manages open state." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}
