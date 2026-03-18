'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/input-week/configurator' },
  { label: 'Examples', href: '/components/input-week/examples' },
  { label: 'Usage', href: '/components/input-week/usage' },
  { label: 'Accessibility', href: '/components/input-week/accessibility' },
  { label: 'API', href: '/components/input-week/api' },
];

export default function InputWeekLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Input Week"
        description="A week-and-year picker input (YYYY-Www). Delegates to the native browser week picker. Supports min and max week constraints."
        tabs={TABS}
      />
      {children}
    </div>
  );
}
