'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/input-email/configurator' },
  { label: 'Examples', href: '/components/input-email/examples' },
  { label: 'Usage', href: '/components/input-email/usage' },
  { label: 'Accessibility', href: '/components/input-email/accessibility' },
  { label: 'API', href: '/components/input-email/api' },
];

export default function InputEmailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Input Email"
        description="An email address input. Provides native browser email validation, appropriate mobile keyboard, and autocomplete hints."
        tabs={TABS}
      />
      {children}
    </div>
  );
}
