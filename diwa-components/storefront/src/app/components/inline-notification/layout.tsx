'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/inline-notification/configurator' },
  { label: 'Examples', href: '/components/inline-notification/examples' },
  { label: 'Usage', href: '/components/inline-notification/usage' },
  { label: 'Accessibility', href: '/components/inline-notification/accessibility' },
  { label: 'API', href: '/components/inline-notification/api' },
];

export default function InlineNotificationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Inline Notification"
        description="A static inline banner that communicates contextual feedback — informational, success, warning, or error. Renders as a live region so screen readers are notified automatically."
        tabs={TABS}
      />
      {children}
    </div>
  );
}
