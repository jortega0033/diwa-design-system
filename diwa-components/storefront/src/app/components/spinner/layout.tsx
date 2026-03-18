'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/spinner/configurator' },
  { label: 'Examples', href: '/components/spinner/examples' },
  { label: 'Usage', href: '/components/spinner/usage' },
  { label: 'Accessibility', href: '/components/spinner/accessibility' },
  { label: 'API', href: '/components/spinner/api' },
];

export default function SpinnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Spinner"
        description="A CSS-only animated loading indicator. Communicates asynchronous activity to both sighted users and screen readers via role=&quot;status&quot; and an accessible label."
        tabs={TABS}
      />
      {children}
    </div>
  );
}
