import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Button",
  description: "Buttons trigger actions, submit forms, and navigate through the application. Choose the variant that communicates the weight of the action.",
  pathname: '/components/button/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/button/configurator' },
  { label: 'Examples',     href: '/components/button/examples' },
  { label: 'Usage',        href: '/components/button/usage' },
  { label: 'Accessibility',href: '/components/button/accessibility' },
  { label: 'API',          href: '/components/button/api' },
];

export default function ButtonLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Button" description="Buttons trigger actions, submit forms, and navigate through the application. Choose the variant that communicates the weight of the action." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}
