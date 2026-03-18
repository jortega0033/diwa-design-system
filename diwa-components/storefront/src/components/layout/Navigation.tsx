'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { sitemap } from '@/sitemap';

const SECTION_PRIORITY: Record<string, number> = {
  'Getting Started': 1,
  Developing: 2,
  Components: 3,
  Styles: 4,
  'Must Know': 5,
  Patterns: 6,
  Partials: 7,
  Designing: 8,
  News: 9,
  Help: 10,
};

const SECTION_ITEM_PRIORITY: Record<string, string[]> = {
  Developing: ['Introduction', 'Next.js', 'React', 'Vanilla JS', 'Angular', 'Vue', 'Components Ready'],
  Components: ['Introduction', 'Button', 'Input Text', 'Select', 'Checkbox', 'Modal', 'Toast', 'Tabs'],
  Styles: ['Introduction', 'Theme', 'Spacing', 'Typography', 'Focus', 'Hover', 'Motion', 'Grid'],
  'Must Know': ['Introduction', 'Initialization', 'Accessibility', 'Performance', 'Browser Compatibility', 'Versioning', 'Security', 'Definition of Done'],
  Patterns: ['Introduction', 'Forms', 'Notifications'],
  Partials: ['Introduction', 'Loader Script', 'Initial Styles', 'Component Chunk Links', 'Browser Support Fallback', 'DSR Ponyfill'],
  News: ['Changelog', 'Roadmap', 'Migration Guide'],
  Help: ['Introduction', 'FAQ', 'Support', 'Bug Report', 'Feature Request', 'Contribution'],
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 transition-transform duration-150 ${open ? 'rotate-90' : ''}`}
    >
      <path d="M4.5 2.5 8.5 6l-4 3.5" />
    </svg>
  );
}

/** Returns true when a NavItem's base path matches the current pathname. */
function isItemActive(itemHref: string, pathname: string | null): boolean {
  if (!pathname) return false;
  if (itemHref === '/') return pathname === '/';
  const base = itemHref.split('/configurator')[0];
  // Exact-match for section index pages (e.g. /styles) so they don't stay
  // active when navigating to a child page like /styles/border.
  if (/^\/[^/]+$/.test(base)) return pathname === base || pathname.startsWith(base + '/configurator');
  // Append '/' to prevent '/components/button' matching '/components/button-pure'
  return pathname === base || pathname.startsWith(base + '/');
}

export function Navigation() {
  const pathname = usePathname();
  const orderedSections = React.useMemo(
    () =>
      [...sitemap]
        .map((section) => {
          const itemPriority = SECTION_ITEM_PRIORITY[section.title] ?? [];
          const items = [...section.items].sort((a, b) => {
            const aPriority = itemPriority.indexOf(a.label);
            const bPriority = itemPriority.indexOf(b.label);
            const aRank = aPriority === -1 ? Number.MAX_SAFE_INTEGER : aPriority;
            const bRank = bPriority === -1 ? Number.MAX_SAFE_INTEGER : bPriority;
            if (aRank !== bRank) return aRank - bRank;
            return a.label.localeCompare(b.label);
          });

          return { ...section, items };
        })
        .sort((a, b) => {
          const aPriority = SECTION_PRIORITY[a.title] ?? Number.MAX_SAFE_INTEGER;
          const bPriority = SECTION_PRIORITY[b.title] ?? Number.MAX_SAFE_INTEGER;
          if (aPriority !== bPriority) return aPriority - bPriority;
          return a.title.localeCompare(b.title);
        }),
    [],
  );

  // Auto-open sections that contain the active page.
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    orderedSections.reduce<Record<string, boolean>>((acc, section) => {
      acc[section.title] = section.items.some((item) => isItemActive(item.href, pathname));
      return acc;
    }, {}),
  );

  function toggle(title: string) {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  }

  return (
    <nav className="flex-1 flex flex-col py-3" aria-label="Main navigation">
      <div className="flex-1">
        {orderedSections.map((section) => {
          const isOpen = openSections[section.title] ?? false;
          return (
            <div key={section.title} className="mb-0.5">
              {/* Section toggle button */}
              <button
                onClick={() => toggle(section.title)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)] hover:text-[var(--diwa-text-primary)] hover:bg-[var(--diwa-bg-hover)] rounded-md transition-colors"
                aria-expanded={isOpen}
              >
                <span>{section.title}</span>
                <ChevronIcon open={isOpen} />
              </button>

              {/* Collapsible items */}
              {isOpen && (
                <ul className="mt-0.5 mb-1 space-y-0.5">
                  {section.items.map((item) => {
                    const active = isItemActive(item.href, pathname);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={active ? 'page' : undefined}
                          className={[
                            'block pl-5 pr-3 py-1.5 rounded-md text-sm transition-colors',
                            active
                              ? 'bg-[var(--diwa-accent-bg)] text-[var(--diwa-accent)] font-medium'
                              : 'text-[var(--diwa-text-secondary)] hover:text-[var(--diwa-text-primary)] hover:bg-[var(--diwa-bg-hover)]',
                          ].join(' ')}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-3 py-4 text-xs text-[var(--diwa-text-muted)] border-t border-[var(--diwa-border)] mt-4">
        © {new Date().getFullYear()} Diwa Design System
      </div>
    </nav>
  );
}
