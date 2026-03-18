'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/button-pure/configurator' },
  { label: 'Examples', href: '/components/button-pure/examples' },
  { label: 'Usage', href: '/components/button-pure/usage' },
  { label: 'Accessibility', href: '/components/button-pure/accessibility' },
  { label: 'API', href: '/components/button-pure/api' },
];

export default function ButtonPureLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Button Pure"
        description="A minimal, transparent button — icon and label only, without background or border. Use it for inline actions, contextual links, and secondary affordances where a full button would be too heavy."
        tabs={TABS}
      />
      {children}
    </div>
  );
}
