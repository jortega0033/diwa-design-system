'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/badge/configurator' },
  { label: 'Examples', href: '/components/badge/examples' },
  { label: 'Usage', href: '/components/badge/usage' },
  { label: 'Accessibility', href: '/components/badge/accessibility' },
  { label: 'API', href: '/components/badge/api' },
];

export default function BadgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Badge"
        description="Compact pill-shaped labels for status, counts, and metadata. Use Badge for small semantic indicators that should stay visually lightweight."
        tabs={TABS}
      />
      {children}
    </div>
  );
}