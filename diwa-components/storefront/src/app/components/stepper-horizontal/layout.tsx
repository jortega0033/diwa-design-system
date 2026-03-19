import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Stepper Horizontal",
  description: "Displays progress through a sequential multi-step process with a horizontal step indicator.",
  pathname: '/components/stepper-horizontal/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/stepper-horizontal/configurator' },
  { label: 'Examples',     href: '/components/stepper-horizontal/examples' },
  { label: 'Usage',        href: '/components/stepper-horizontal/usage' },
  { label: 'Accessibility',href: '/components/stepper-horizontal/accessibility' },
  { label: 'API',          href: '/components/stepper-horizontal/api' },
];

export default function StepperHorizontalLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Stepper Horizontal" description="Displays progress through a sequential multi-step process with a horizontal step indicator." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}
