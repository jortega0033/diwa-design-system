'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export type PageTab = {
  label: string;
  /** null = disabled/greyed tab (no link) */
  href: string | null;
};

type Props = {
  title: string;
  description?: string;
  tabs: PageTab[];
};

/**
 * PageHeader — component page header with title, description, and tab navigation.
 * Mirrors the PDS component page layout: prominent h1 + description + tab bar.
 * Disabled tabs (href === null) are rendered as non-interactive spans.
 */
export function PageHeader({ title, description, tabs }: Props) {
  const pathname = usePathname();

  return (
    <div className="mb-0">
      <h1 className="text-3xl font-bold text-[var(--diwa-text-primary)] mb-2">{title}</h1>

      {description && (
        <p className="text-[var(--diwa-text-secondary)] mb-6 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}

      <nav
        className="flex border-b border-[var(--diwa-border)] mb-8"
        aria-label="Component page tabs"
      >
        {tabs.map((tab) => {
          if (!tab.href) {
            return (
              <span
                key={tab.label}
                title="Coming soon"
                className="px-4 py-2.5 text-sm font-medium border-b-2 border-transparent -mb-px text-[var(--diwa-text-muted)] cursor-not-allowed select-none opacity-50"
                aria-disabled="true"
              >
                {tab.label}
              </span>
            );
          }

          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive ? 'page' : undefined}
              className={[
                'px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors',
                isActive
                  ? 'border-[var(--diwa-accent)] text-[var(--diwa-accent)]'
                  : 'border-transparent text-[var(--diwa-text-secondary)] hover:text-[var(--diwa-text-primary)]',
              ].join(' ')}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
