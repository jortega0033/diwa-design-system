'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/table/configurator' },
  { label: 'Examples', href: '/components/table/examples' },
  { label: 'Usage', href: '/components/table/usage' },
  { label: 'Accessibility', href: '/components/table/accessibility' },
  { label: 'API', href: '/components/table/api' },
];

export default function TableLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Table"
        description="Displays structured data in rows and columns with consistent styling and accessible markup."
        tabs={TABS}
      />
      {children}
    </div>
  );
}
