'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/link/configurator' },
  { label: 'Examples', href: '/components/link/examples' },
  { label: 'Usage', href: '/components/link/usage' },
  { label: 'Accessibility', href: '/components/link/accessibility' },
  { label: 'API', href: '/components/link/api' },
];

export default function LinkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Link"
        description="Links navigate users to a new page or section. Use the variant that communicates the visual weight of the navigation action."
        tabs={TABS}
      />
      {children}
    </div>
  );
}