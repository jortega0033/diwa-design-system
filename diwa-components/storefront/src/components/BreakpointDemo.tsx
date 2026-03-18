'use client';

import React, { useEffect, useState } from 'react';

const BREAKPOINTS = [
  { token: '--diwa-breakpoint-xs',  value: 480,  label: 'xs' },
  { token: '--diwa-breakpoint-sm',  value: 760,  label: 'sm' },
  { token: '--diwa-breakpoint-md',  value: 1000, label: 'md' },
  { token: '--diwa-breakpoint-lg',  value: 1300, label: 'lg' },
  { token: '--diwa-breakpoint-xl',  value: 1760, label: 'xl' },
  { token: '--diwa-breakpoint-2xl', value: 1920, label: '2xl' },
];

const BAR_MAX = 1920;

export function BreakpointDemo() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // The active breakpoint is the largest one whose value <= current width
  const active = width !== null
    ? [...BREAKPOINTS].reverse().find((bp) => width >= bp.value) ?? null
    : null;

  return (
    <div className="space-y-2.5 mb-6">
      {/* Current width badge */}
      <div className="flex items-center gap-2 mb-4 text-xs text-[var(--diwa-text-secondary)]">
        <span>Current viewport:</span>
        <code className="font-mono text-[var(--diwa-accent)]">
          {width !== null ? `${width}px` : '—'}
        </code>
        {active && (
          <span className="px-1.5 py-0.5 rounded bg-[var(--diwa-accent-bg)] border border-[var(--diwa-accent-muted)] text-[var(--diwa-accent)] font-semibold">
            {active.label} active
          </span>
        )}
      </div>

      {/* Bars */}
      {BREAKPOINTS.map((bp) => {
        const isActive = active?.label === bp.label;
        const barWidth = `${(bp.value / BAR_MAX) * 100}%`;
        return (
          <div key={bp.token} className="flex items-center gap-3">
            <span
              className="text-xs font-mono w-7 shrink-0 text-right"
              style={{ color: isActive ? 'var(--diwa-accent)' : 'var(--diwa-text-muted)' }}
            >
              {bp.label}
            </span>
            <div className="flex-1 h-4 rounded-sm bg-[var(--diwa-bg-surface)] relative overflow-hidden">
              <div
                className="h-full rounded-sm transition-all duration-150"
                style={{
                  width: barWidth,
                  background: 'var(--diwa-accent)',
                  opacity: isActive ? 1 : 0.35,
                }}
              />
              {/* Viewport cursor line */}
              {width !== null && (
                <div
                  className="absolute top-0 bottom-0 w-px bg-[var(--diwa-text-primary)] opacity-60"
                  style={{ left: `${Math.min((width / BAR_MAX) * 100, 100)}%` }}
                />
              )}
            </div>
            <span
              className="text-xs font-mono shrink-0 w-14 text-right"
              style={{ color: isActive ? 'var(--diwa-accent)' : 'var(--diwa-text-secondary)' }}
            >
              {bp.value}px
            </span>
          </div>
        );
      })}
    </div>
  );
}
