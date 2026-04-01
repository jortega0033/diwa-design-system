import React from 'react';
import { CodeTabs } from '@/components/CodeTabs';
import { Section, CodeSnippet, DoList, DontList, DoCard, DontCard } from '@/components/docs';
import type { Metadata } from 'next';
import { stylesSeo } from '@/lib/stylesSeo';
export const metadata: Metadata = stylesSeo['/styles/theme'];


/* ── Tile primitives ──────────────────────────────────────────────────────── */

type Tile = { label: string; token: string };

function ColorTile({ tile }: { tile: Tile }) {
  return (
    <div className="flex flex-col items-center gap-2" title={tile.token}>
      <div
        className="w-[64px] h-[64px] rounded-none shrink-0"
        style={{
          background: `var(${tile.token})`,
          border: '1px solid var(--diwa-border)',
        }}
      />
      <span
        className="text-[10px] font-mono text-center leading-tight"
        style={{ color: 'var(--diwa-text-secondary)', maxWidth: 68 }}
      >
        {tile.label}
      </span>
    </div>
  );
}

function TileGroup({ label, tiles }: { label: string; tiles: Tile[] }) {
  return (
    <div className="mb-7">
      <p
        className="text-[11px] font-semibold uppercase tracking-widest mb-3"
        style={{ color: 'var(--diwa-text-muted)' }}
      >
        {label}
      </p>
      <div className="flex flex-wrap gap-5">
        {tiles.map((t) => <ColorTile key={t.token} tile={t} />)}
      </div>
    </div>
  );
}

/* ── Token data ───────────────────────────────────────────────────────────── */

type ThemeGroup = { label: string; tiles: Tile[] };

const DARK_GROUPS: ThemeGroup[] = [
  {
    label: 'Background',
    tiles: [
      { label: 'primary',     token: '--diwa-primary' },
      { label: 'bg-base',     token: '--diwa-bg-base' },
      { label: 'bg-surface',  token: '--diwa-bg-surface' },
      { label: 'bg-shading',  token: '--diwa-bg-shading' },
      { label: 'bg-frosted',  token: '--diwa-bg-frosted' },
    ],
  },
  {
    label: 'Contrast',
    tiles: [
      { label: 'contrast-low',  token: '--diwa-contrast-low' },
      { label: 'contrast-med',  token: '--diwa-contrast-medium' },
      { label: 'contrast-high', token: '--diwa-contrast-high' },
    ],
  },
  {
    label: 'Notification',
    tiles: [
      { label: 'success',       token: '--diwa-notification-success' },
      { label: 'success-soft',  token: '--diwa-notification-success-soft' },
      { label: 'warning',       token: '--diwa-notification-warning' },
      { label: 'warning-soft',  token: '--diwa-notification-warning-soft' },
      { label: 'error',         token: '--diwa-notification-error' },
      { label: 'error-soft',    token: '--diwa-notification-error-soft' },
      { label: 'info',          token: '--diwa-notification-info' },
      { label: 'info-soft',     token: '--diwa-notification-info-soft' },
    ],
  },
  {
    label: 'State',
    tiles: [
      { label: 'hover',    token: '--diwa-state-hover' },
      { label: 'active',   token: '--diwa-state-active' },
      { label: 'focus',    token: '--diwa-state-focus' },
      { label: 'disabled', token: '--diwa-state-disabled' },
    ],
  },
];

const LIGHT_GROUPS: ThemeGroup[] = [
  {
    label: 'Background',
    tiles: [
      { label: 'primary',     token: '--diwa-primary' },
      { label: 'bg-base',     token: '--diwa-bg-base' },
      { label: 'bg-surface',  token: '--diwa-bg-surface' },
      { label: 'bg-shading',  token: '--diwa-bg-shading' },
      { label: 'bg-frosted',  token: '--diwa-bg-frosted' },
    ],
  },
  {
    label: 'Contrast',
    tiles: [
      { label: 'contrast-low',  token: '--diwa-contrast-low' },
      { label: 'contrast-med',  token: '--diwa-contrast-medium' },
      { label: 'contrast-high', token: '--diwa-contrast-high' },
    ],
  },
  {
    label: 'Notification',
    tiles: [
      { label: 'success',       token: '--diwa-notification-success' },
      { label: 'success-soft',  token: '--diwa-notification-success-soft' },
      { label: 'warning',       token: '--diwa-notification-warning' },
      { label: 'warning-soft',  token: '--diwa-notification-warning-soft' },
      { label: 'error',         token: '--diwa-notification-error' },
      { label: 'error-soft',    token: '--diwa-notification-error-soft' },
      { label: 'info',          token: '--diwa-notification-info' },
      { label: 'info-soft',     token: '--diwa-notification-info-soft' },
    ],
  },
  {
    label: 'State',
    tiles: [
      { label: 'hover',    token: '--diwa-state-hover' },
      { label: 'active',   token: '--diwa-state-active' },
      { label: 'focus',    token: '--diwa-state-focus' },
      { label: 'disabled', token: '--diwa-state-disabled' },
    ],
  },
];

const ACCENT_TILES: Tile[] = [
  { label: 'accent-50',  token: '--diwa-color-accent-50' },
  { label: 'accent-100', token: '--diwa-color-accent-100' },
  { label: 'accent-200', token: '--diwa-color-accent-200' },
  { label: 'accent-300', token: '--diwa-color-accent-300' },
  { label: 'accent-400', token: '--diwa-color-accent-400' },
  { label: 'accent-500', token: '--diwa-color-accent-500' },
  { label: 'accent-600', token: '--diwa-color-accent-600' },
  { label: 'accent-700', token: '--diwa-color-accent-700' },
];

/* ── Page ──────────────────────────────────────────────────────────────────── */

export default function StylesThemePage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-[var(--diwa-text-primary)] mb-4">Theme</h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-12 leading-relaxed max-w-2xl">
        Diwa ships two themes —{' '}
        <strong className="text-[var(--diwa-text-primary)]">Dark</strong> (default) and{' '}
        <strong className="text-[var(--diwa-text-primary)]">Light</strong>. Semantic tokens
        automatically resolve to the correct value for the active theme. Switching is done by
        toggling{' '}
        <code className="font-mono text-[var(--diwa-accent)]">data-theme=&quot;light&quot;</code>{' '}
        on any ancestor element.
      </p>

      {/* ── Example ─────────────────────────────────────────────────────────── */}
      <Section title="Example">

        {/* Theme Dark */}
        <h3 className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-4">Theme Dark</h3>
        <div
          data-theme="dark"
          className="rounded-none p-8 mb-10"
          style={{ background: 'var(--diwa-bg-base)', border: '1px solid var(--diwa-border)' }}
        >
          {DARK_GROUPS.map((grp) => (
            <TileGroup key={grp.label} label={grp.label} tiles={grp.tiles} />
          ))}
        </div>

        {/* Theme Light */}
        <h3 className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-4">Theme Light</h3>
        <div
          data-theme="light"
          className="rounded-none p-8 mb-10"
          style={{ background: 'var(--diwa-bg-base)', border: '1px solid var(--diwa-border)' }}
        >
          {LIGHT_GROUPS.map((grp) => (
            <TileGroup key={grp.label} label={grp.label} tiles={grp.tiles} />
          ))}
        </div>

        {/* Accent scale */}
        <h3 className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-4">
          Accent Scale
          <span className="text-[var(--diwa-text-muted)] font-normal ml-2 text-xs">(theme-invariant)</span>
        </h3>
        <div
          data-theme="dark"
          className="rounded-none p-8"
          style={{ background: 'radial-gradient(circle at 30% 40%, var(--diwa-color-accent-400) 0%, var(--diwa-color-accent-600) 55%, var(--diwa-color-accent-700) 100%)' }}
        >
          <div className="flex flex-wrap gap-5">
            {ACCENT_TILES.map((t) => <ColorTile key={t.token} tile={t} />)}
          </div>
        </div>
      </Section>

      {/* ── Usage ───────────────────────────────────────────────────────────── */}
      <Section title="Usage">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-6 leading-relaxed">
          Dark is the primary V3 design expression. Use Light only where context demands it — for
          example, in print-oriented views, high-ambient-light environments, or sub-sections
          embedded in external light-themed surfaces.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          <DoCard><DoList
            items={[
              'Choose Dark as the first choice for Diwa interfaces — it reduces visual fatigue in long sessions.',
              'Use accessibility-safe semantic tokens: contrast-high for primary text, contrast-medium for secondary, contrast-low only for decorative dividers.',
              'Play with bg-base / bg-surface layers to create hierarchy — surface sits one step above base.',
              'Scope light theme to a subtree with data-theme="light" on a container element when mixing is intentional.',
            ]}
          /></DoCard>
          <DontCard><DontList
            items={[
              "Don't use contrast-low for text or critical information — it fails WCAG AA contrast.",
              "Don't mix tokens from different themes (e.g. using a dark color value in a light context).",
              "Don't add new raw color values to components. Always reference a semantic token.",
              "Don't override semantic tokens with primitives in ad-hoc inline styles.",
            ]}
          /></DontCard>
        </div>

        {/* Theme switching hint */}
        <div className="flex gap-4 p-5 rounded-none bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)]">
          <span className="text-base shrink-0 mt-0.5">ℹ</span>
          <div>
            <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-3">
              <strong className="text-[var(--diwa-text-primary)]">Theme switching: </strong>
              Toggle by setting{' '}
              <code className="font-mono text-[var(--diwa-accent)]">data-theme=&quot;light&quot;</code>{' '}
              on <code className="font-mono text-[var(--diwa-accent)]">&lt;html&gt;</code>. Removing
              the attribute returns to Dark. Themes can be scoped to any subtree.
            </p>
            <CodeSnippet
              language="typescript"
              code={`// Switch to Light
document.documentElement.setAttribute('data-theme', 'light');
// Return to Dark (default)
document.documentElement.removeAttribute('data-theme');
// Scope to a subtree
<section data-theme="light">…</section>`}
            />
          </div>
        </div>
      </Section>

      {/* ── Styles ──────────────────────────────────────────────────────────── */}
      <Section title="Styles">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-5 leading-relaxed">
          Import JS tokens for CSS-in-JS frameworks. Hover any tile above to see its full token
          name. Use CSS custom properties directly in stylesheets — they resolve automatically for
          the active theme.
        </p>
        <CodeSnippet code={`import { getFocusStyle, space4 } from '@diwacopilot/components/styles';

const cardStyle = {
  padding: space4,
  background: 'var(--diwa-bg-surface)',
  color: 'var(--diwa-text-primary)',
  border: '1px solid var(--diwa-border)',
  ...getFocusStyle(),
};

/* CSS remains token-first and theme-aware */
.card {
  background: var(--diwa-bg-surface);
  color: var(--diwa-text-primary);
  border: 1px solid var(--diwa-border);
}`} />
        <CodeTabs tabs={[
          {
            label: 'Angular',
            code: `/* Use semantic tokens directly in component styles */
.card {
  background: var(--diwa-bg-surface);
  border: 1px solid var(--diwa-border);
  color: var(--diwa-text-primary);
}

.badge-accent {
  background: var(--diwa-color-accent-100);
  color: var(--diwa-color-accent-400);
}`,
          },
          {
            label: 'React',
            code: `function ThemedRegion({ light = false, children }: {
  light?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section data-theme={light ? 'light' : undefined}>
      {children}
    </section>
  );
}

function AccentBadge({ label }: { label: string }) {
  return (
    <span style={{
      background: 'var(--diwa-color-accent-500)',
      color: 'var(--diwa-text-inverse)',
      padding: '0.25rem 0.5rem',
      borderRadius: 'var(--diwa-radius-xs)',
    }}>
      {label}
    </span>
  );
}`,
          },
        ]} />
      </Section>
    </div>
  );
}

