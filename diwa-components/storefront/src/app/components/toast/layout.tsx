'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/toast/configurator' },
  { label: 'Examples', href: '/components/toast/examples' },
  { label: 'Usage', href: '/components/toast/usage' },
  { label: 'Accessibility', href: '/components/toast/accessibility' },
  { label: 'API', href: '/components/toast/api' },
];

export default function ToastLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Toast"
        description="Toast notifications display brief, auto-dismissing messages in the corner of the screen."
        tabs={TABS}
      />
      {children}
    </div>
  );
}
