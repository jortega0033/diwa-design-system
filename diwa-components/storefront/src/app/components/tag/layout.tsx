'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/tag/configurator' },
  { label: 'Examples', href: '/components/tag/examples' },
  { label: 'Usage', href: '/components/tag/usage' },
  { label: 'Accessibility', href: '/components/tag/accessibility' },
  { label: 'API', href: '/components/tag/api' },
];

export default function TagLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Tag"
        description="Compact inline labels for categorisation, status, and metadata. Use diwa-tag for static labels and diwa-tag-dismissible when the user needs to remove an item."
        tabs={TABS}
      />
      {children}
    </div>
  );
}
