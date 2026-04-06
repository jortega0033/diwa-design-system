'use client';

import React, { type ReactNode, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navigation } from './Navigation';
import { useSidebar } from '@/context/SidebarContext';
import { type StorefrontTheme, useStorefrontTheme } from '@/hooks/useStorefrontTheme';

const THEMES = ['dark', 'light', 'auto'] as const;

function themeIconName(theme: StorefrontTheme): string {
  if (theme === 'light') return 'sun';
  if (theme === 'auto') return 'monitor';
  return 'moon';
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
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [isMobileConfigOpen, setMobileConfigOpen] = useState(false);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
    setMobileNavOpen(false);
    setMobileConfigOpen(false);
  }, [pathname]);

  const nextTheme: StorefrontTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'auto' : 'dark';

  const handleStartSidebarToggle = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches) {
      setMobileNavOpen((v) => !v);
      return;
    }
    toggleSidebarStart();
  };

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
    <div className="h-screen flex flex-col bg-[var(--diwa-sf-shell-canvas)] text-[var(--diwa-text-primary)]">
      {/* -- Header ------------------------------------------------ */}
      <header className="min-h-16 shrink-0 z-50 flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-b border-[var(--diwa-border)] bg-[var(--diwa-sf-shell-header)]">
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={handleStartSidebarToggle}
            className="p-1.5 rounded hover:bg-[var(--diwa-bg-hover)] text-[var(--diwa-text-secondary)] hover:text-[var(--diwa-text-primary)] transition-colors"
            aria-label="Toggle navigation"
          >
            <diwa-icon name="menu" size={18} />
          </button>
          <Link href="/" className="font-semibold text-sm tracking-tight truncate hover:text-[var(--diwa-accent)] transition-colors" aria-label="Go to home page">
            Diwa Design System
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <diwa-button icon={themeIconName(theme)} size="sm" variant="ghost" hide-label onClick={() => setTheme(nextTheme)} aria-label={`Switch theme to ${nextTheme}`} />

          {isSidebarEndOpen && (
            <diwa-button icon="settings" size="sm" variant="ghost" hide-label aria-label="Toggle configurator" onClick={() => setMobileConfigOpen((v) => !v)} />
          )}
        </div>
      </header>

      {/* -- Body -------------------------------------------------- */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile nav drawer */}
        {isMobileNavOpen && (
          <>
            <button
              type="button"
              className="md:hidden fixed inset-0 bg-black/40 z-40"
              onClick={() => setMobileNavOpen(false)}
              aria-label="Close navigation"
            />
            <aside className="md:hidden fixed left-0 top-16 bottom-0 z-50 w-72 max-w-[85vw] border-r border-[var(--diwa-border)] overflow-y-auto bg-[var(--diwa-sf-shell-sidebar-start)] flex flex-col">
              <Navigation />
            </aside>
          </>
        )}

        {/* Mobile configurator backdrop */}
        {isSidebarEndOpen && isMobileConfigOpen && (
          <button
            type="button"
            className="lg:hidden fixed inset-0 bg-black/40 z-40"
            onClick={() => setMobileConfigOpen(false)}
            aria-label="Close configurator"
          />
        )}

        {/* Sidebar start */}
        {isSidebarStartOpen && (
          <aside className="hidden md:flex w-60 shrink-0 border-r border-[var(--diwa-border)] overflow-y-auto bg-[var(--diwa-sf-shell-sidebar-start)] flex-col">
            <Navigation />
          </aside>
        )}

        {/* Main */}
        <main ref={mainRef} className="flex-1 min-w-0 overflow-y-auto bg-[var(--diwa-sf-shell-main)]">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
            {children}
          </div>
        </main>

        {/* Sidebar end - visible only on configurator pages */}
        {isSidebarEndOpen && (
          <aside
            className={[
              'fixed top-16 bottom-0 right-0 z-50 w-80 max-w-[90vw] border-l border-[var(--diwa-border)] overflow-y-auto bg-[var(--diwa-sf-shell-sidebar-end)] flex flex-col transform transition-transform duration-200 lg:static lg:top-auto lg:bottom-auto lg:right-auto lg:z-auto lg:w-72 lg:max-w-none lg:translate-x-0',
              isMobileConfigOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0',
            ].join(' ')}
          >
            {/* Portal target - ConfiguratorControls renders here via createPortal */}
            <div id="diwa-sidebar-end" className="flex-1 overflow-y-auto" />
          </aside>
        )}
      </div>
    </div>
  );
}
