'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/accordion/configurator' },
  { label: 'Examples', href: '/components/accordion/examples' },
  { label: 'Usage', href: '/components/accordion/usage' },
  { label: 'Accessibility', href: '/components/accordion/accessibility' },
  { label: 'API', href: '/components/accordion/api' },
];

export default function AccordionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Accordion"
        description="An animated, accessible panel that reveals or hides content when the user clicks its heading. Follows the controlled component pattern — the consumer manages open state."
        tabs={TABS}
      />
      {children}
    </div>
  );
}
