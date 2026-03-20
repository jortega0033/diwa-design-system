import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: 'Heading',
  description: 'A responsive heading renderer that maps a visual size scale onto the correct semantic HTML heading element. Supports fluid typography, colour, alignment, weight, and ellipsis truncation.',
  pathname: '/components/heading/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/heading/configurator' },
  { label: 'Examples',     href: '/components/heading/examples' },
  { label: 'Usage',        href: '/components/heading/usage' },
  { label: 'Accessibility',href: '/components/heading/accessibility' },
  { label: 'API',          href: '/components/heading/api' },
];

export default function HeadingLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout
      title="Heading"
      description="A responsive heading renderer that maps a visual size scale onto the correct semantic HTML heading element. Supports fluid typography, colour, alignment, weight, and ellipsis truncation."
      tabs={TABS}
    >
      {children}
    </ComponentClientLayout>
  );
}
