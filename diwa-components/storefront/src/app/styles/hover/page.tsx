import React from 'react';
import { CodeTabs } from '@/components/CodeTabs';
import { Section, CodeSnippet, DoList, DontList, DoCard, DontCard } from '@/components/docs';
import type { Metadata } from 'next';
import { stylesSeo } from '@/lib/stylesSeo';
export const metadata: Metadata = stylesSeo['/styles/hover'];


export default function StylesHoverPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-[var(--diwa-text-primary)] mb-3">Hover</h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-2xl">
        Hover overlays are translucent state tokens layered on top of any background rather than
        hardcoded colours. This ensures correct contrast in both Dark and Light themes without
        duplicating rules. The{' '}
        <code className="font-mono text-[var(--diwa-accent)]">:hover</code> state gives visual
        feedback on interactive elements and is only visible when a pointer is over the element.
      </p>

      {/* ── Example ─────────────────────────────────────────────────────────── */}
      <Section title="Example">
        {/* Inline hover CSS — Server Component safe */}
        <style>{`
          @media (hover: hover) {
            .hover-demo-tile:hover::after {
              opacity: 1;
            }
            .hover-demo-anchor:hover {
              text-decoration-color: currentColor;
            }
          }
          .hover-demo-tile {
            position: relative;
            cursor: pointer;
            transition: box-shadow 120ms ease;
          }
          .hover-demo-tile::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: inherit;
            background: var(--diwa-state-hover);
            pointer-events: none;
            opacity: 0;
            transition: opacity 120ms ease;
          }
          .hover-demo-anchor {
            text-decoration: underline;
            text-decoration-color: transparent;
            transition: text-decoration-color 120ms ease;
          }
        `}</style>

        {/* Demo panels — dark + light */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Dark panel */}
          <div
            data-theme="dark"
            className="p-5 rounded-lg"
            style={{ background: 'radial-gradient(circle at 30% 40%, var(--diwa-color-accent-400) 0%, var(--diwa-color-accent-600) 55%, var(--diwa-color-accent-700) 100%)' }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--diwa-text-secondary)' }}>Hover — Dark</p>
            <a href="#" className="hover-demo-anchor block mb-3 text-sm font-medium text-[var(--diwa-text-inverse)]">
              Some Anchor
            </a>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--diwa-text-inverse)', opacity: 0.86 }}>
              Lorem Ipsum{' '}
              <a href="#" className="hover-demo-anchor text-[var(--diwa-text-inverse)] font-medium">
                is simply dummy text of the printing
              </a>{' '}
              and typesetting industry.
            </p>
            <div className="flex gap-2 mt-4 flex-wrap">
              <div className="hover-demo-tile px-3 py-2 rounded-md text-xs text-[var(--diwa-text-inverse)] border border-[var(--diwa-border)]">
                state-hover overlay
              </div>
              <div className="hover-demo-tile px-3 py-2 rounded-md text-xs text-[var(--diwa-text-inverse)]" style={{ background: 'var(--diwa-bg-frosted)' }}>
                bg-surface tile
              </div>
            </div>
          </div>

          {/* Light panel */}
          <div className="p-5 rounded-lg bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)]">
            <p className="text-xs font-semibold text-[var(--diwa-text-muted)] uppercase tracking-wider mb-4">Hover — Light</p>
            <a href="#" className="hover-demo-anchor block mb-3 text-sm font-medium text-[var(--diwa-accent)]">
              Some Anchor
            </a>
            <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
              Lorem Ipsum{' '}
              <a href="#" className="hover-demo-anchor text-[var(--diwa-accent)] font-medium">
                is simply dummy text of the printing
              </a>{' '}
              and typesetting industry.
            </p>
            <div className="flex gap-2 mt-4 flex-wrap">
              <div className="hover-demo-tile px-3 py-2 rounded-md text-xs text-[var(--diwa-text-primary)] border border-[var(--diwa-border)]">
                state-hover overlay
              </div>
              <div className="px-3 py-2 rounded-md text-xs text-[var(--diwa-text-disabled)] border border-[var(--diwa-border)] opacity-40 cursor-not-allowed">
                disabled
              </div>
            </div>
          </div>
        </div>

        {/* Token table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--diwa-border)]">
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Token</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Value</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider">Role</th>
              </tr>
            </thead>
            <tbody>
              {[
                { token: '--diwa-state-hover',    value: 'Theme-resolved overlay token', role: 'Standard hover overlay — works on any bg in both themes' },
                { token: '--diwa-state-active',   value: 'Theme-resolved overlay token', role: 'Pressed / active overlay' },
                { token: '--diwa-state-disabled', value: 'Theme-resolved state token',   role: 'Disabled element fill — theme-aware' },
              ].map((row) => (
                <tr key={row.token} className="border-b border-[var(--diwa-border)] last:border-0">
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-accent)]">{row.token}</td>
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-text-secondary)]">{row.value}</td>
                  <td className="py-2.5 text-xs text-[var(--diwa-text-secondary)]">{row.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Experimental note */}
        <div className="flex gap-3 mt-4 p-3 rounded-lg bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)]">
          <span className="text-base shrink-0 mt-0.5">ℹ</span>
          <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
            <strong className="text-[var(--diwa-text-primary)]">Experimental: </strong>
            The <code className="font-mono text-[var(--diwa-accent)]">getHoverStyle()</code> utility
            is still experimental — its interface may change in future versions.
          </p>
        </div>
      </Section>

      {/* ── Usage ───────────────────────────────────────────────────────────── */}
      <Section title="Usage">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DoCard><DoList
            items={[
              'Always wrap :hover rules in @media (hover: hover) to prevent sticky hover states on touch devices.',
              'Apply the hover overlay via a ::after pseudo-element so the component background remains unchanged on any surface.',
              'Use the state-hover token on all interactive elements — buttons, cards, list items, anchors.',
              'Pair hover with a :active overlay (state-active) to complete the full press interaction feedback.',
            ]}
          /></DoCard>
          <DontCard><DontList
            items={[
              "Don't omit @media (hover: hover) — tapping a card on iOS will leave a permanently stuck hover overlay.",
              "Don't apply hover to non-interactive elements such as static text, images, or decorative dividers.",
              "Don't hardcode the hover colour — always use the state-hover token so both themes work correctly.",
              "Don't rely on hover as the sole indicator of interactivity — pair it with cursor: pointer and focus styles.",
            ]}
          /></DontCard>
        </div>
      </Section>

      {/* ── Styles ──────────────────────────────────────────────────────────── */}
      <Section title="Styles">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Import the JS helper or use the CSS pseudo-element pattern directly. The{' '}
          <code className="font-mono text-[var(--diwa-accent)]">borderRadius</code> parameter
          rounds the overlay to match the host element.
        </p>
        <CodeSnippet code={`// JS
import { getHoverStyle } from '@diwacopilot/components/styles';

// Returns CSS-in-JS object with pseudo-element hover overlay
const hoverStyle = getHoverStyle({ borderRadius: 'small' });
// { '&::after': { content: "''", position: 'absolute', inset: 0,
//    borderRadius: 'var(--diwa-border-radius-sm)', background: 'var(--diwa-state-hover)', ... } }

/* ─── CSS — pseudo-element overlay pattern ───────────────────────────── */
/* Standard component / Shadow DOM */
:host {
  position: relative;
}

:host::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: transparent;
  transition: background var(--diwa-motion-duration-short) var(--diwa-motion-easing-base);
}

@media (hover: hover) {
  :host(:hover)::after {
    background: var(--diwa-state-hover);
  }
}

:host(:active)::after {
  background: var(--diwa-state-active);
}

/* Plain CSS — same pattern for non-Shadow DOM */
@media (hover: hover) {
  .card:hover::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--diwa-state-hover);
    border-radius: inherit;
    pointer-events: none;
  }
}`} />
        <CodeTabs tabs={[
          {
            label: 'Angular',
            code: `@use '@diwacopilot/components/styles' as *;

:host {
  position: relative;
}

:host::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: transparent;
  transition: background $diwa-motion-duration-short $diwa-motion-easing-base;
}

@media (hover: hover) {
  :host(:hover)::after { background: $diwa-state-hover; }
}

:host(:active)::after { background: $diwa-state-active; }`,
          },
          {
            label: 'React',
            code: `import { getHoverStyle } from '@diwacopilot/components/styles';

// Returns a CSS-in-JS pseudo-element overlay descriptor
const hoverOverlay = getHoverStyle({ borderRadius: 'small' });

function HoverCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ position: 'relative' }}
      className="hover-card"
    >
      {children}
    </div>
  );
}

/* In your global CSS or CSS module: */
/*
  .hover-card::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    background: transparent;
    transition: background var(--diwa-motion-duration-short);
  }
  @media (hover: hover) {
    .hover-card:hover::after { background: var(--diwa-state-hover); }
  }
*/`,
          },
        ]} />
      </Section>
    </div>
  );
}