'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/checkbox/configurator' },
  { label: 'Examples', href: '/components/checkbox/examples' },
  { label: 'Usage', href: '/components/checkbox/usage' },
  { label: 'Accessibility', href: '/components/checkbox/accessibility' },
  { label: 'API', href: '/components/checkbox/api' },
];

export default function CheckboxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Checkbox"
        description="Checkboxes allow users to select one or more options from a set, or toggle a single binary choice. Supports indeterminate state for partial selection patterns."
        tabs={TABS}
      />
      {children}
    </div>
  );
}
