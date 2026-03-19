import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Input Text",
  description: "A single-line text input for freeform string values. Supports label, description, validation states, dense mode (compact), and character limits.",
  pathname: '/components/input-text/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/input-text/configurator' },
  { label: 'Examples',     href: '/components/input-text/examples' },
  { label: 'Usage',        href: '/components/input-text/usage' },
  { label: 'Accessibility',href: '/components/input-text/accessibility' },
  { label: 'API',          href: '/components/input-text/api' },
];

export default function InputTextLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Input Text" description="A single-line text input for freeform string values. Supports label, description, validation states, dense mode (compact), and character limits." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}
