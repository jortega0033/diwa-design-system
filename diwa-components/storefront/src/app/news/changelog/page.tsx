import Link from 'next/link';
import React from 'react';
import { Section } from '@/components/docs';
import type { Metadata } from 'next';
import { pageSeo } from '@/lib/pageSeo';
export const metadata: Metadata = pageSeo['/news/changelog'];


type Release = {
  version: string;
  date: string;
  summary: string;
  added: string[];
  changed: string[];
  fixed: string[];
  deprecated: string[];
  removed: string[];
};

const RELEASES: Release[] = [
  {
    version: '1.3.0',
    date: 'March 21, 2026',
    summary: 'React Server Component (RSC) support via a new /server export path. Pure function wrappers for presentational components are now importable directly in Next.js App Router Server Components without a \'use client\' boundary.',
    added: [
      '@diwacopilot/components-react/server — new RSC-safe export path. Exports pure function wrappers for DHeading, DText, DDivider, DBadge, and DIcon. No Stencil class inheritance, no defineCustomElements() call, fully compatible with Next.js App Router Server Components.',
      'Server export renders the correct custom element HTML shell on the server; the browser upgrades it and attaches Shadow DOM once the Stencil bundle loads.',
      'suppressHydrationWarning applied automatically on all /server components to handle shadow DOM reconciliation without console warnings.',
    ],
    changed: [
      '@diwacopilot/components-react package.json exports field now includes a "./server" condition pointing to dist/server/index.js and dist/server/index.d.ts.',
      'All four packages (@diwacopilot/components, components-react, components-vue, components-angular) bumped to 1.3.0.',
    ],
    fixed: [
      'Runtime TypeError "Class extends value undefined is not a constructor or null" when importing DS components in Next.js Server Components — resolved by the new /server export path.',
    ],
    deprecated: [
      'No deprecations in this release.',
    ],
    removed: [
      'No removals in this release.',
    ],
  },
  {
    version: '1.2.3',
    date: 'March 20, 2026',
    summary: 'D* short-name aliases for all 57 components added to the React wrapper. Only 4 aliases previously existed; now every component has a D-prefixed export.',
    added: [
      '@diwacopilot/components-react — D* short-name aliases for all 57 components: DAccordion, DButtonPure, DCheckbox, DDivider, DFlyout, DHeading, DIcon, DInlineNotification, DInputDate, DInputEmail, DInputMonth, DInputNumber, DInputPassword, DInputSearch, DInputTel, DInputText, DInputTime, DInputUrl, DInputWeek, DLink, DLinkPure, DModal, DMultiSelect, DMultiSelectOption, DPagination, DPinCode, DPopover, DRadioGroup, DRadioGroupItem, DScroller, DSegmentedControl, DSegmentedControlItem, DSelect, DSelectOption, DStepperHorizontal, DStepperHorizontalItem, DSwitch, DTable, DTableBody, DTableCell, DTableHead, DTableHeadCell, DTableRow, DTabs, DTabsBar, DTabsItem, DText, DTextList, DTextListItem, DTextarea, DToast, DToastItem, DWordmark.',
    ],
    changed: [
      'Overlay component and utils files — @ts-nocheck comments reintroduced after build tooling regression identified during prior 1.1.1 cleanup. Managed automatically by the pre-build patch script.',
    ],
    fixed: [
      'No functional fixes in this release.',
    ],
    deprecated: [
      'No deprecations in this release.',
    ],
    removed: [
      'No removals in this release.',
    ],
  },
  {
    version: '1.2.2',
    date: 'March 20, 2026',
    summary: 'Storefront navigation reorder and README website link update. Docs-only release.',
    added: [
      'No new components in this release.',
    ],
    changed: [
      'Storefront navigation sections reordered for improved discoverability.',
      'README website link updated to reflect current production URL.',
    ],
    fixed: [
      'No fixes in this release.',
    ],
    deprecated: [
      'No deprecations in this release.',
    ],
    removed: [
      'No removals in this release.',
    ],
  },
  {
    version: '1.2.1',
    date: 'March 20, 2026',
    summary: 'Stencil upgraded to 4.43, DiwaBadge dot prop added, jsdom bumped to 29.0.1 for test environment accuracy.',
    added: [
      'DiwaBadge / DBadge — new dot boolean prop. When true, renders an animated pulsing indicator before slot content; use for live status or active process signals.',
    ],
    changed: [
      '@stencil/core upgraded to v4.43.3.',
      'jsdom upgraded to 29.0.1 in the test environment.',
      'Angular, React, and Vue wrapper packages updated to match base components version.',
      '@ts-nocheck comments removed from React overlay component and utils files (later reverted in 1.2.3).',
    ],
    fixed: [
      'Badge styling — dot indicator positioning and animation tokens aligned with design specification.',
    ],
    deprecated: [
      'No deprecations in this release.',
    ],
    removed: [
      'No removals in this release.',
    ],
  },
  {
    version: '1.1.1',
    date: 'March 20, 2026',
    summary: 'Type-safety patch for React overlay components. @ts-nocheck directives removed from generated overlay and utils files.',
    added: [
      'No new components in this release.',
    ],
    changed: [
      'createOverlayComponent.tsx and utils/index.tsx — @ts-nocheck directives removed to surface any latent type errors during local development.',
    ],
    fixed: [
      'No functional fixes in this release.',
    ],
    deprecated: [
      'No deprecations in this release.',
    ],
    removed: [
      'No removals in this release.',
    ],
  },
  {
    version: '1.1.0',
    date: 'March 20, 2026',
    summary: 'Component refinements, storefront SEO infrastructure, and curated agency agent integration. Typography tokens updated across components.',
    added: [
      'Curated agency agents and adaptation layer for Diwa Design System contributor workflows.',
      'Open Graph images for key storefront sections with automated SVG generation script.',
      'Sitemap generation script; layout enhanced with JSON-LD structured data for SEO.',
      'Firebase release configured for design.diwacopilot.com — dedicated hosting target isolated from landing site.',
    ],
    changed: [
      'Typography and font families updated for consistency across all components.',
      'DTable — styling and spacing refined for compact and default density modes.',
      'Code structure refactored across multiple components for improved readability and maintainability.',
    ],
    fixed: [
      'Firebase deploy — design docs hosting target isolated so releases do not affect the landing site.',
    ],
    deprecated: [
      'No deprecations in this release.',
    ],
    removed: [
      'No removals in this release.',
    ],
  },
  {
    version: '1.0.0',
    date: 'March 19, 2026',
    summary: 'First public release. @diwacopilot/components, components-react, components-vue, and components-angular published to npm. Root monorepo workspace migrated to npm workspaces.',
    added: [
      '@diwacopilot/components — Stencil-based web component library with 57 components published to npm for the first time.',
      '@diwacopilot/components-react, @diwacopilot/components-vue, @diwacopilot/components-angular — framework wrapper packages published with full type definitions.',
      'Root monorepo workspace migrated to npm workspaces; pnpm-workspace.yaml retained for pnpm users.',
      'New storefront docs sections: Designing, Developing, and News.',
      'Framework setup guides for Vanilla JS, Next.js, React, Angular, and Vue.',
      'Components Ready guidance for readiness-sensitive integration and testing.',
    ],
    changed: [
      'Getting Started and Components introductions now cross-link to new docs areas.',
      'Storefront navigation expanded with docs IA sections aligned to Diwa support matrix.',
    ],
    fixed: [
      'Improved discoverability of setup paths and release communication pages.',
    ],
    deprecated: [
      'No deprecations in this release.',
    ],
    removed: [
      'No removals in this release.',
    ],
  },
];

const CHANGE_SECTIONS: Array<{
  title: 'Added' | 'Changed' | 'Fixed' | 'Deprecated' | 'Removed';
  key: keyof Pick<Release, 'added' | 'changed' | 'fixed' | 'deprecated' | 'removed'>;
}> = [
  { title: 'Added', key: 'added' },
  { title: 'Changed', key: 'changed' },
  { title: 'Fixed', key: 'fixed' },
  { title: 'Deprecated', key: 'deprecated' },
  { title: 'Removed', key: 'removed' },
];

export default function ChangelogPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-[var(--diwa-text-primary)] mb-3">
        Changelog
      </h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-3xl">
        Track release-level changes across components, styles, docs, and developer workflows. Entries follow a
        consistent Added / Changed / Fixed / Deprecated / Removed format.
      </p>

      {RELEASES.map((release) => (
        <section
          key={release.version}
          className="mb-8 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-5"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h2 className="text-lg font-semibold text-[var(--diwa-text-primary)]">
              v{release.version}
            </h2>
            <span className="text-xs text-[var(--diwa-text-muted)]">{release.date}</span>
          </div>
          <p className="text-sm text-[var(--diwa-text-secondary)] mb-5 leading-relaxed">{release.summary}</p>

          {CHANGE_SECTIONS.map((section) => (
            <div key={section.title} className="mb-4 last:mb-0">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)] mb-2">
                {section.title}
              </h3>
              <ul className="space-y-1.5">
                {release[section.key].map((item) => (
                  <li key={item} className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
                    - {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}

      <Section title="Next Actions">
        <div className="flex flex-wrap gap-2">
          {[
            { href: '/news/roadmap', label: 'View Roadmap' },
            { href: '/news/migration-guide', label: 'Open Migration Guide' },
            { href: '/developing', label: 'Go to Developing Intro' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center rounded-md border border-[var(--diwa-border)] px-3 py-1.5 text-xs font-medium text-[var(--diwa-text-secondary)] hover:border-[var(--diwa-accent)] hover:text-[var(--diwa-accent)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
