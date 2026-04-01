'use client';

import React, { type ReactNode, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Navigation } from './Navigation';
import { useSidebar } from '@/context/SidebarContext';
import { type StorefrontTheme, useStorefrontTheme } from '@/hooks/useStorefrontTheme';

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

/**
 * Canvas - 3-panel layout shell.
 *
 * +-------------------------------------------------------------+
 * |  Header  (logo - nav toggle - theme picker)                  |
 * +--------------+--------------------------+------------------+
 * | sidebar-start| main                     | sidebar-end      |
 * | (nav)        | (page content)           | (configurator)   |
 * +--------------+--------------------------+------------------+
 *
 * sidebar-end contains a `<div id="diwa-sidebar-end">` that
 * ConfiguratorControls portals its prop panel into.
 */
export function Canvas({ children }: { children: ReactNode }) {
  const { isSidebarStartOpen, toggleSidebarStart, isSidebarEndOpen } = useSidebar();
  const { theme, setTheme } = useStorefrontTheme();
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);
  const themeControlRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  useEffect(() => {
    const el = themeControlRef.current;
    if (!el) return;

    const onUpdate = (event: Event) => {
      const detail = (event as CustomEvent<{ value?: string }>).detail;
      const nextTheme = detail?.value;
      if (nextTheme === 'dark' || nextTheme === 'light' || nextTheme === 'auto') {
        setTheme(nextTheme as StorefrontTheme);
      }
    };

    el.addEventListener('update', onUpdate as EventListener);
    return () => el.removeEventListener('update', onUpdate as EventListener);
  }, [setTheme]);

  return (
    <div className="h-screen flex flex-col bg-[var(--diwa-bg-base)] text-[var(--diwa-text-primary)]">
      {/* -- Header ------------------------------------------------ */}
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
          <diwa-segmented-control
            ref={(node: HTMLElement | null) => {
              themeControlRef.current = node;
            }}
            value={theme}
            aria-label="Theme"
            compact
          >
            {THEMES.map((t) => (
              <diwa-segmented-control-item key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </diwa-segmented-control-item>
            ))}
          </diwa-segmented-control>
        </div>
      </header>

      {/* -- Body -------------------------------------------------- */}
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

        {/* Sidebar end - visible only on configurator pages */}
        {isSidebarEndOpen && (
          <aside className="w-72 shrink-0 border-l border-[var(--diwa-border)] overflow-y-auto bg-[var(--diwa-bg-base)] flex flex-col">
            {/* Portal target - ConfiguratorControls renders here via createPortal */}
            <div id="diwa-sidebar-end" className="flex-1 overflow-y-auto" />
          </aside>
        )}
      </div>
    </div>
  );
}
