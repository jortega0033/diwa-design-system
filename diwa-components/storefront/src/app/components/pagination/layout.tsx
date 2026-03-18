'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/pagination/configurator' },
  { label: 'Examples', href: '/components/pagination/examples' },
  { label: 'Usage', href: '/components/pagination/usage' },
  { label: 'Accessibility', href: '/components/pagination/accessibility' },
  { label: 'API', href: '/components/pagination/api' },
];

export default function PaginationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Pagination"
        description="Splits large data sets across numbered pages with previous and next navigation."
        tabs={TABS}
      />
      {children}
    </div>
  );
}
