import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Inline Notification",
  description: "A static inline banner that communicates contextual feedback — informational, success, warning, or error. Renders as a live region so screen readers are notified automatically.",
  pathname: '/components/inline-notification/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/inline-notification/configurator' },
  { label: 'Examples',     href: '/components/inline-notification/examples' },
  { label: 'Usage',        href: '/components/inline-notification/usage' },
  { label: 'Accessibility',href: '/components/inline-notification/accessibility' },
  { label: 'API',          href: '/components/inline-notification/api' },
];

export default function InlineNotificationLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Inline Notification" description="A static inline banner that communicates contextual feedback — informational, success, warning, or error. Renders as a live region so screen readers are notified automatically." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}
