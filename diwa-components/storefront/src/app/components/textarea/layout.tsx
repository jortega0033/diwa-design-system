'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/textarea/configurator' },
  { label: 'Examples', href: '/components/textarea/examples' },
  { label: 'Usage', href: '/components/textarea/usage' },
  { label: 'Accessibility', href: '/components/textarea/accessibility' },
  { label: 'API', href: '/components/textarea/api' },
];

export default function TextareaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Textarea"
        description="A multi-line text input for longer freeform content. Supports validation states, labels, descriptions, and resizing."
        tabs={TABS}
      />
      {children}
    </div>
  );
}
