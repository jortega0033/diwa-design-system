import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Text",
  description: "A semantically correct text renderer that maps a visual type scale onto the right HTML element. Supports size, weight, alignment, colour, and ellipsis truncation.",
  pathname: '/components/text/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/text/configurator' },
  { label: 'Examples',     href: '/components/text/examples' },
  { label: 'Usage',        href: '/components/text/usage' },
  { label: 'Accessibility',href: '/components/text/accessibility' },
  { label: 'API',          href: '/components/text/api' },
];

export default function TextLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Text" description="A semantically correct text renderer that maps a visual type scale onto the right HTML element. Supports size, weight, alignment, colour, and ellipsis truncation." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}
