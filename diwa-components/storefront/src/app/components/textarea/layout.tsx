import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Textarea",
  description: "A multi-line text input for longer freeform content. Supports validation states, labels, descriptions, and resizing.",
  pathname: '/components/textarea/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/textarea/configurator' },
  { label: 'Examples',     href: '/components/textarea/examples' },
  { label: 'Usage',        href: '/components/textarea/usage' },
  { label: 'Accessibility',href: '/components/textarea/accessibility' },
  { label: 'API',          href: '/components/textarea/api' },
];

export default function TextareaLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Textarea" description="A multi-line text input for longer freeform content. Supports validation states, labels, descriptions, and resizing." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}
