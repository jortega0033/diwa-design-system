import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Text List",
  description: "A styled list component that renders as a bulleted list, a numbered list, or an inline flex row. Accepts diwa-text-list-item children.",
  pathname: '/components/text-list/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/text-list/configurator' },
  { label: 'Examples',     href: '/components/text-list/examples' },
  { label: 'Usage',        href: '/components/text-list/usage' },
  { label: 'Accessibility',href: '/components/text-list/accessibility' },
  { label: 'API',          href: '/components/text-list/api' },
];

export default function TextListLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Text List" description="A styled list component that renders as a bulleted list, a numbered list, or an inline flex row. Accepts diwa-text-list-item children." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}
