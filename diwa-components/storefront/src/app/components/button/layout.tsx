'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/button/configurator' },
  { label: 'Examples', href: '/components/button/examples' },
  { label: 'Usage', href: '/components/button/usage' },
  { label: 'Accessibility', href: '/components/button/accessibility' },
  { label: 'API', href: '/components/button/api' },
];

export default function ButtonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Button"
        description="Buttons trigger actions, submit forms, and navigate through the application. Choose the variant that communicates the weight of the action."
        tabs={TABS}
      />
      {children}
    </div>
  );
}
