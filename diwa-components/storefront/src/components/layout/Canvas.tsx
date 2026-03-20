'use client';

import React, { type ReactNode, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Navigation } from './Navigation';
import { useSidebar } from '@/context/SidebarContext';
import { useStorefrontTheme } from '@/hooks/useStorefrontTheme';

const THEMES = ['dark', 'light', 'auto'] as const;

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="2" y1="4.5" x2="16" y2="4.5" />
      <line x1="2" y1="9" x2="16" y2="9" />
      <line x1="2" y1="13.5" x2="16" y2="13.5" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

/**
 * Canvas — 3-panel layout shell.
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │  Header  (logo · nav toggle · GitHub · theme picker)        │
 * ├──────────────┬──────────────────────────┬──────────────────┤
 * │ sidebar-start│ main                     │ sidebar-end      │
 * │ (nav)        │ (page content)           │ (configurator)   │
 * └──────────────┴──────────────────────────┴──────────────────┘
 *
 * sidebar-end contains a `<div id="diwa-sidebar-end">` that
 * ConfiguratorControls portals its prop panel into.
 */
export function Canvas({ children }: { children: ReactNode }) {
  const { isSidebarStartOpen, toggleSidebarStart, isSidebarEndOpen } = useSidebar();
  const { theme, setTheme } = useStorefrontTheme();
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="h-screen flex flex-col bg-[var(--diwa-bg-base)] text-[var(--diwa-text-primary)]">
      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="h-16 shrink-0 z-50 flex items-center justify-between px-4 border-b border-[var(--diwa-border)] bg-[var(--diwa-bg-base)]">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebarStart}
            className="p-1.5 rounded hover:bg-[var(--diwa-bg-hover)] text-[var(--diwa-text-secondary)] hover:text-[var(--diwa-text-primary)] transition-colors"
            aria-label={isSidebarStartOpen ? 'Close navigation' : 'Open navigation'}
          >
            <MenuIcon />
          </button>
          <span className="font-semibold text-sm tracking-tight">
            Diwa Design System
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme picker */}
          <div className="flex items-center rounded-md border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-0.5">
            {THEMES.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={[
                  'px-2.5 py-1 rounded text-xs font-medium transition-colors',
                  theme === t
                    ? 'bg-[var(--diwa-bg-base)] text-[var(--diwa-text-primary)] shadow-sm'
                    : 'text-[var(--diwa-text-secondary)] hover:text-[var(--diwa-text-primary)]',
                ].join(' ')}
                aria-pressed={theme === t}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* GitHub link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded hover:bg-[var(--diwa-bg-hover)] text-[var(--diwa-text-secondary)] hover:text-[var(--diwa-text-primary)] transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar start */}
        {isSidebarStartOpen && (
          <aside className="w-60 shrink-0 border-r border-[var(--diwa-border)] overflow-y-auto bg-[var(--diwa-bg-raised)] flex flex-col">
            <Navigation />
          </aside>
        )}

        {/* Main */}
        <main ref={mainRef} className="flex-1 min-w-0 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-8">
            {children}
          </div>
        </main>

        {/* Sidebar end — visible only on configurator pages */}
        {isSidebarEndOpen && (
          <aside className="w-72 shrink-0 border-l border-[var(--diwa-border)] overflow-y-auto bg-[var(--diwa-bg-base)] flex flex-col">
            {/* Portal target — ConfiguratorControls renders here via createPortal */}
            <div id="diwa-sidebar-end" className="flex-1 overflow-y-auto" />
          </aside>
        )}
      </div>
    </div>
  );
}
