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
    version: '3.0.0',
    date: 'April 1, 2026',
    summary: 'V3 visual system rollout across tokens, components, and storefront docs with coming-soon-inspired styling.',
    added: [
      'Added V3 token layer integration in the global token contract and storefront style documentation.',
      'Added semantic token aliases for notification borders and updated focus/interaction token guidance.',
    ],
    changed: [
      'Migrated component styling surfaces to V3 token usage for typography, color, border, radius, and spacing behavior.',
      'Updated storefront style pages and demos to resolve visual values from semantic tokens instead of hardcoded literals.',
      'Refreshed storefront typography alignment to the V3 direction and normalized page-level token usage.',
    ],
    fixed: [
      'Fixed segmented-control style corruption and normalized tokenized radius behavior in affected styles.',
      'Fixed popover trigger icon visibility in light mode and restored rounded switch track treatment.',
    ],
    deprecated: [],
    removed: [
      'Removed legacy token-file naming references in source in favor of the V3 token source.',
    ],
  },
  {
    version: '2.0.0',
    date: 'March 29, 2026',
    summary: 'Breaking event-contract alignment release: Input and Textarea now use native event names consistently across core and framework wrappers.',
    added: [
      'Added focus event support to `diwa-textarea` for parity with `diwa-input`.',
      'Added migration guidance for React, Angular, and Vue event handler updates.',
    ],
    changed: [
      'Standardized `diwa-input` events to native names: `input`, `change`, `focus`, `blur`.',
      'Hardened React wrapper event wiring so `onInput`/`onChange` handlers receive stable custom events with `event.detail`.',
      'Adjusted textarea event dispatch to prevent duplicate callback paths from shadow DOM native events.',
      'Migration (React): `onDiwaInput={(e)=>setValue(e.detail)}` -> `onInput={(e)=>setValue(e.detail)}`.',
      'Migration (Angular): `(diwaInput)=\"onInput($event)\"` -> `(input)=\"onInput($event)\"`.',
      'Migration (Vue): `@diwaInput=\"onInput\"` -> `@input=\"onInput\"`.',
    ],
    fixed: [
      'Fixed flaky React form behavior where textarea/input content could desync when relying on synthetic event paths.',
    ],
    deprecated: [],
    removed: [
      'Removed `diwaInput`, `diwaChange`, `diwaFocus`, and `diwaBlur` events from `diwa-input`.',
    ],
  },
  {
    version: '1.4.2',
    date: 'March 27, 2026',
    summary: 'Dropdown shipped with a polished menu system, while form configurators and helper text handling were corrected across the docs experience.',
    added: [
      'Added the Dropdown component to the core package and storefront documentation, including configurator, usage, API, accessibility, and examples pages.',
    ],
    changed: [
      'Refined dropdown visuals, trigger behavior, submenu presentation, and placement stability for a more consistent enterprise menu experience.',
      'Updated configurator controls to route helper copy through component-level description props where supported.',
    ],
    fixed: [
      'Fixed configurator text and number inputs that could incorrectly coerce typed values to 0.',
      'Fixed select, multi-select, and checkbox helper messages so they render whenever a message is provided.',
      'Fixed dropdown hover and active states, submenu separation, and bottom-end placement jitter on open.',
    ],
    deprecated: [],
    removed: [],
  },
  {
    version: '1.4.1',
    date: 'March 26, 2026',
    summary: 'Typography refinement release with updated base font and synchronized package patch versions.',
    added: [],
    changed: [
      'Standardized storefront typography on Onest for base and display roles to align with V3 tokens.',
      'Bumped patch versions across the core package, framework wrappers, and storefront metadata.',    ],
    fixed: [],
    deprecated: [],
    removed: [],
  },
  {
    version: '1.4.0',
    date: 'March 26, 2026',
    summary: 'Release alignment for package versions, wrapper compatibility, and storefront release metadata.',
    added: [
      'Added release metadata for v1.4.0 in the storefront changelog.',
    ],
    changed: [
      'Bumped Diwa package versions to the next minor release across core and wrappers.',
      'Updated wrapper peer dependency ranges to align with @diwacopilot/components v1.4.0.',
    ],
    fixed: [],
    deprecated: [],
    removed: [],
  },
  {
    version: '1.3.9',
    date: 'March 25, 2026',
    summary: 'Banner is now fully documented and polished across the component library and storefront.',
    added: [
      'Added full Banner documentation with Configurator, Examples, Usage, Accessibility, and API pages.',
    ],
    changed: [
      'Updated banner demos to open on demand instead of showing by default.',
      'Refined banner layout so it appears as a floating centered element near the top of the viewport.',
    ],
    fixed: [
      'Fixed missing banner documentation routes that previously led to 404 pages.',
      'Updated banner styling to use solid semantic backgrounds for clearer visual feedback.',
    ],
    deprecated: [],
    removed: [],
  },
  {
    version: '1.3.8',
    date: 'March 24, 2026',
    summary: 'Improved configurator consistency and stabilized badge rendering in the docs experience.',
    added: [
      'Updated the configurator experience to use Diwa components throughout the sidebar controls.',
    ],
    changed: [],
    fixed: [
      'Fixed badge variants so visual changes update reliably in configurator previews.',
      'Improved configurator interactions for select, segmented control, and input-based components in React previews.',
    ],
    deprecated: [],
    removed: [],
  },
  {
    version: '1.3.7',
    date: 'March 24, 2026',
    summary: 'Improved select reliability when options change dynamically.',
    added: [],
    changed: [],
    fixed: [
      'Fixed `diwa-select` so dynamically added or removed options are detected reliably.',
    ],
    deprecated: [],
    removed: [],
  },
  {
    version: '1.3.6',
    date: 'March 23, 2026',
    summary: 'Improved form-field layout and select value presentation.',
    added: [],
    changed: [
      'Aligned select and multi-select descriptions so helper text appears consistently below the control.',
    ],
    fixed: [
      'Fixed form layout alignment issues in grid-based select-like fields.',
      'Fixed preselected select values so labels display reliably after updates.',
    ],
    deprecated: [],
    removed: [],
  },
  {
    version: '1.3.4',
    date: 'March 22, 2026',
    summary: 'Improved input rendering stability across supported environments.',
    added: [],
    changed: [
      'Improved shared input styling for more consistent rendering in WebKit-based browsers.',
    ],
    fixed: [
      'Fixed an input styling issue that could break rendering in some build and test contexts.',
    ],
    deprecated: [],
    removed: [],
  },
  {
    version: '1.3.3',
    date: 'March 22, 2026',
    summary: 'Form controls were aligned to a more consistent sizing system.',
    added: [],
    changed: [
      'Aligned input, select, switch, and checkbox heights with the default button sizing rhythm.',
    ],
    fixed: [
      'Fixed inconsistent control heights across common form components.',
    ],
    deprecated: [],
    removed: [],
  },
  {
    version: '1.3.2',
    date: 'March 22, 2026',
    summary: 'Buttons now support an extra-small size with improved icon clarity.',
    added: [
      'Added an `xs` button size for more compact actions.',
    ],
    changed: [
      'Increased icon size within `xs` buttons to improve legibility.',
    ],
    fixed: [],
    deprecated: [],
    removed: [],
  },
  {
    version: '1.3.1',
    date: 'March 21, 2026',
    summary: 'Documentation and release communication were cleaned up for clarity and accuracy.',
    added: [],
    changed: [
      'Improved help and versioning content across the storefront docs.',
      'Updated home release messaging and component count references for accuracy.',
    ],
    fixed: [
      'Fixed outdated repository links and stale release messaging in the storefront.',
    ],
    deprecated: [],
    removed: [],
  },
  {
    version: '1.3.0',
    date: 'March 21, 2026',
    summary: 'Added React Server Component support for core presentational components.',
    added: [
      'Added a React Server Component-safe export path for key presentational components in Next.js App Router projects.',
    ],
    changed: [],
    fixed: [
      'Fixed runtime errors when importing supported Diwa React components inside Next.js Server Components.',
    ],
    deprecated: [],
    removed: [],
  },
  {
    version: '1.2.3',
    date: 'March 20, 2026',
    summary: 'Expanded React wrapper exports with short D-prefixed aliases across the component set.',
    added: [
      'Added D-prefixed shorthand exports for the full React wrapper component set.',
    ],
    changed: [],
    fixed: [],
    deprecated: [],
    removed: [],
  },
  {
    version: '1.2.2',
    date: 'March 20, 2026',
    summary: 'Improved storefront navigation and documentation discoverability.',
    added: [],
    changed: [
      'Storefront navigation sections reordered for improved discoverability.',
      'Updated documentation links to reflect the current production website URL.',
    ],
    fixed: [],
    deprecated: [],
    removed: [],
  },
  {
    version: '1.2.1',
    date: 'March 20, 2026',
    summary: 'Added badge dot status support and refreshed supporting platform compatibility.',
    added: [
      'Added a `dot` prop to Badge for live-status and activity indicators.',
    ],
    changed: [
      'Updated supporting platform dependencies for improved compatibility.',
    ],
    fixed: [
      'Refined badge dot styling and animation to better match the design system.',
    ],
    deprecated: [],
    removed: [],
  },
  {
    version: '1.1.0',
    date: 'March 20, 2026',
    summary: 'Refined storefront foundations and improved typography consistency across the system.',
    added: [
      'Added richer storefront metadata and release surfaces for better documentation discovery.',
    ],
    changed: [
      'Typography and font families updated for consistency across all components.',
      'Refined table styling and spacing for compact and default density modes.',
    ],
    fixed: [
      'Improved storefront release and hosting stability.',
    ],
    deprecated: [],
    removed: [],
  },
  {
    version: '1.0.0',
    date: 'March 19, 2026',
    summary: 'First public release of the Diwa Design System packages and storefront docs.',
    added: [
      'Published the core Web Components package together with React, Vue, and Angular wrappers.',
      'Launched the first storefront documentation experience with component, setup, and release guidance.',
    ],
    changed: [
      'Expanded storefront navigation to support a full component and framework onboarding experience.',
    ],
    fixed: [
      'Improved discoverability of setup paths and release communication pages.',
    ],
    deprecated: [],
    removed: [],
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
        Track the release notes that matter most to adopters of the design system. Entries focus on shipped
        components, visible improvements, developer-facing features, and important fixes.
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

          {CHANGE_SECTIONS.filter((section) => release[section.key].length > 0).map((section) => (
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
