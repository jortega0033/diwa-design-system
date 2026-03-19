import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Modal",
  description: "An overlay dialog that focuses the user's attention on a single task or piece of information. The page behind is blocked from interaction until the modal is dismissed.",
  pathname: '/components/modal/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/modal/configurator' },
  { label: 'Examples',     href: '/components/modal/examples' },
  { label: 'Usage',        href: '/components/modal/usage' },
  { label: 'Accessibility',href: '/components/modal/accessibility' },
  { label: 'API',          href: '/components/modal/api' },
];

export default function ModalLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Modal" description="An overlay dialog that focuses the user's attention on a single task or piece of information. The page behind is blocked from interaction until the modal is dismissed." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}
