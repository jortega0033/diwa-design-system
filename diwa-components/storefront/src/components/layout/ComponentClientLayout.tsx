'use client';

import React from 'react';
import { PageHeader, type PageTab } from './PageHeader';

interface ComponentClientLayoutProps {
  title: string;
  description?: string;
  tabs: PageTab[];
  children: React.ReactNode;
}

/**
 * Client-side shell for component pages.
 * Wraps <PageHeader> (which uses usePathname) so parent layout.tsx files
 * can stay as React Server Components and export `metadata`.
 */
export function ComponentClientLayout({
  title,
  description,
  tabs,
  children,
}: ComponentClientLayoutProps) {
  return (
    <div>
      <PageHeader title={title} description={description} tabs={tabs} />
      {children}
    </div>
  );
}
