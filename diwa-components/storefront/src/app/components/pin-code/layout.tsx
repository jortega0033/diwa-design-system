import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Pin Code",
  description: "A segmented code entry field with automatic focus advancement. Used for OTP, verification codes, and PINs.",
  pathname: '/components/pin-code/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/pin-code/configurator' },
  { label: 'Examples',     href: '/components/pin-code/examples' },
  { label: 'Usage',        href: '/components/pin-code/usage' },
  { label: 'Accessibility',href: '/components/pin-code/accessibility' },
  { label: 'API',          href: '/components/pin-code/api' },
];

export default function PinCodeLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Pin Code" description="A segmented code entry field with automatic focus advancement. Used for OTP, verification codes, and PINs." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}
