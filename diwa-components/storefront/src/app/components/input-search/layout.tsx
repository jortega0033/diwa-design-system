'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/input-search/configurator' },
  { label: 'Examples', href: '/components/input-search/examples' },
  { label: 'Usage', href: '/components/input-search/usage' },
  { label: 'Accessibility', href: '/components/input-search/accessibility' },
  { label: 'API', href: '/components/input-search/api' },
];

export default function InputSearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Input Search"
        description="A search input with an optional clear button. The clear button appears automatically when the field has a value and disappears once cleared."
        tabs={TABS}
      />
      {children}
    </div>
  );
}
