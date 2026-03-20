'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { sitemap } from '@/sitemap';

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

  // Auto-open sections that contain the active page.
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    sitemap.reduce<Record<string, boolean>>((acc, section) => {
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
        {sitemap.map((section) => {
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
