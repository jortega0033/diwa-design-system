import React from 'react';
import { CodeTabs } from '@/components/CodeTabs';
import { Section, CodeSnippet, DoList, DontList, DoCard, DontCard } from '@/components/docs';
import type { Metadata } from 'next';
import { stylesSeo } from '@/lib/stylesSeo';
export const metadata: Metadata = stylesSeo['/styles/theme'];


/* ── Tile primitives ──────────────────────────────────────────────────────── */

type Tile = { label: string; token: string; color: string };

function ColorTile({ tile, onDark }: { tile: Tile; onDark: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2" title={tile.token}>
      <div
        className="w-[64px] h-[64px] rounded-xl shrink-0"
        style={{
          background: tile.color,
          border: `1px solid ${onDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.10)'}`,
        }}
      />
      <span
        className="text-[10px] font-mono text-center leading-tight"
        style={{ color: onDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.50)', maxWidth: 68 }}
      >
        {tile.label}
      </span>
    </div>
  );
}

function TileGroup({ label, tiles, onDark }: { label: string; tiles: Tile[]; onDark: boolean }) {
  return (
    <div className="mb-7">
      <p
        className="text-[11px] font-semibold uppercase tracking-widest mb-3"
        style={{ color: onDark ? 'rgba(255,255,255,0.30)' : 'rgba(0,0,0,0.35)' }}
      >
        {label}
      </p>
      <div className="flex flex-wrap gap-5">
        {tiles.map((t) => <ColorTile key={t.token} tile={t} onDark={onDark} />)}
      </div>
    </div>
  );
}

/* ── Token data ───────────────────────────────────────────────────────────── */

type ThemeGroup = { label: string; tiles: Tile[] };

const NOIR_GROUPS: ThemeGroup[] = [
  {
    label: 'Background',
    tiles: [
      { label: 'primary',     token: '--diwa-primary',    color: '#e6e6e7' },
      { label: 'bg-base',     token: '--diwa-bg-base',    color: '#0b0b0c' },
      { label: 'bg-surface',  token: '--diwa-bg-surface', color: '#1f1f23' },
      { label: 'bg-shading',  token: '--diwa-bg-shading', color: 'rgba(17,17,19,0.85)' },
      { label: 'bg-frosted',  token: '--diwa-bg-frosted', color: 'hsl(240 3% 18% / 35%)' },
    ],
  },
  {
    label: 'Contrast',
    tiles: [
      { label: 'contrast-low',  token: '--diwa-contrast-low',    color: '#27272a' },
      { label: 'contrast-med',  token: '--diwa-contrast-medium', color: '#71717a' },
      { label: 'contrast-high', token: '--diwa-contrast-high',   color: '#d4d4d8' },
    ],
  },
  {
    label: 'Notification',
    tiles: [
      { label: 'success',       token: '--diwa-notification-success',       color: '#22c55e' },
      { label: 'success-soft',  token: '--diwa-notification-success-soft',  color: 'rgba(34,197,94,0.08)' },
      { label: 'warning',       token: '--diwa-notification-warning',       color: '#f59e0b' },
      { label: 'warning-soft',  token: '--diwa-notification-warning-soft',  color: 'rgba(245,158,11,0.08)' },
      { label: 'error',         token: '--diwa-notification-error',         color: '#ef4444' },
      { label: 'error-soft',    token: '--diwa-notification-error-soft',    color: 'rgba(239,68,68,0.08)' },
      { label: 'info',          token: '--diwa-notification-info',          color: '#178bff' },
      { label: 'info-soft',     token: '--diwa-notification-info-soft',     color: 'rgba(23,139,255,0.08)' },
    ],
  },
  {
    label: 'State',
    tiles: [
      { label: 'hover',    token: '--diwa-state-hover',    color: 'rgba(148,149,152,0.18)' },
      { label: 'active',   token: '--diwa-state-active',   color: 'rgba(126,127,130,0.20)' },
      { label: 'focus',    token: '--diwa-state-focus',    color: '#10a37f' },
      { label: 'disabled', token: '--diwa-state-disabled', color: '#52525b' },
    ],
  },
];

const LIGHT_GROUPS: ThemeGroup[] = [
  {
    label: 'Background',
    tiles: [
      { label: 'primary',     token: '--diwa-primary',    color: '#010205' },
      { label: 'bg-base',     token: '--diwa-bg-base',    color: '#ffffff' },
      { label: 'bg-surface',  token: '--diwa-bg-surface', color: '#eeeff2' },
      { label: 'bg-shading',  token: '--diwa-bg-shading', color: 'rgba(17,17,19,0.85)' },
      { label: 'bg-frosted',  token: '--diwa-bg-frosted', color: 'hsl(240 4% 85% / 35%)' },
    ],
  },
  {
    label: 'Contrast',
    tiles: [
      { label: 'contrast-low',  token: '--diwa-contrast-low',    color: '#d8d8db' },
      { label: 'contrast-med',  token: '--diwa-contrast-medium', color: '#6b6d70' },
      { label: 'contrast-high', token: '--diwa-contrast-high',   color: '#535457' },
    ],
  },
  {
    label: 'Notification',
    tiles: [
      { label: 'success',       token: '--diwa-notification-success',       color: '#197e10' },
      { label: 'success-soft',  token: '--diwa-notification-success-soft',  color: '#e4ffec' },
      { label: 'warning',       token: '--diwa-notification-warning',       color: '#f3be00' },
      { label: 'warning-soft',  token: '--diwa-notification-warning-soft',  color: '#fff4d2' },
      { label: 'error',         token: '--diwa-notification-error',         color: '#cc1922' },
      { label: 'error-soft',    token: '--diwa-notification-error-soft',    color: '#ffe2e4' },
      { label: 'info',          token: '--diwa-notification-info',          color: '#2762ec' },
      { label: 'info-soft',     token: '--diwa-notification-info-soft',     color: '#d3e1ff' },
    ],
  },
  {
    label: 'State',
    tiles: [
      { label: 'hover',    token: '--diwa-state-hover',    color: 'rgba(148,149,152,0.18)' },
      { label: 'active',   token: '--diwa-state-active',   color: 'rgba(126,127,130,0.20)' },
      { label: 'focus',    token: '--diwa-state-focus',    color: '#10a37f' },
      { label: 'disabled', token: '--diwa-state-disabled', color: '#949598' },
    ],
  },
];

const ACCENT_TILES: Tile[] = [
  { label: 'accent-50',  token: '--diwa-color-accent-50',  color: 'rgba(16,163,127,0.05)' },
  { label: 'accent-100', token: '--diwa-color-accent-100', color: 'rgba(16,163,127,0.10)' },
  { label: 'accent-200', token: '--diwa-color-accent-200', color: 'rgba(16,163,127,0.15)' },
  { label: 'accent-300', token: '--diwa-color-accent-300', color: 'rgba(16,163,127,0.25)' },
  { label: 'accent-400', token: '--diwa-color-accent-400', color: '#10a37f' },
  { label: 'accent-500', token: '--diwa-color-accent-500', color: '#0e9470' },
  { label: 'accent-600', token: '--diwa-color-accent-600', color: '#0c8464' },
  { label: 'accent-700', token: '--diwa-color-accent-700', color: '#0a7456' },
];

/* ── Page ──────────────────────────────────────────────────────────────────── */

export default function StylesThemePage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-[var(--diwa-text-primary)] mb-4">Theme</h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-12 leading-relaxed max-w-2xl">
        Diwa ships two themes —{' '}
        <strong className="text-[var(--diwa-text-primary)]">Noir</strong> (dark, default) and{' '}
        <strong className="text-[var(--diwa-text-primary)]">Light</strong>. Semantic tokens
        automatically resolve to the correct value for the active theme. Switching is done by
        toggling{' '}
        <code className="font-mono text-[var(--diwa-accent)]">data-theme=&quot;light&quot;</code>{' '}
        on any ancestor element.
      </p>

      {/* ── Example ─────────────────────────────────────────────────────────── */}
      <Section title="Example">

        {/* Theme Noir */}
        <h3 className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-4">Theme Noir</h3>
        <div
          className="rounded-xl p-8 mb-10"
          style={{ background: '#0b0b0c', border: '1px solid #27272a' }}
        >
          {NOIR_GROUPS.map((grp) => (
            <TileGroup key={grp.label} label={grp.label} tiles={grp.tiles} onDark={true} />
          ))}
        </div>

        {/* Theme Light */}
        <h3 className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-4">Theme Light</h3>
        <div
          className="rounded-xl p-8 mb-10"
          style={{ background: '#ffffff', border: '1px solid #d8d8db' }}
        >
          {LIGHT_GROUPS.map((grp) => (
            <TileGroup key={grp.label} label={grp.label} tiles={grp.tiles} onDark={false} />
          ))}
        </div>

        {/* Accent scale */}
        <h3 className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-4">
          Accent Scale
          <span className="text-[var(--diwa-text-muted)] font-normal ml-2 text-xs">(theme-invariant)</span>
        </h3>
        <div
          className="rounded-xl p-8"
          style={{ background: 'radial-gradient(circle at 30% 40%, #10a37f 0%, #0c8464 50%, #064d3c 100%)' }}
        >
          <div className="flex flex-wrap gap-5">
            {ACCENT_TILES.map((t) => <ColorTile key={t.token} tile={t} onDark={true} />)}
          </div>
        </div>
      </Section>

      {/* ── Usage ───────────────────────────────────────────────────────────── */}
      <Section title="Usage">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-6 leading-relaxed">
          Noir is the primary design expression. Use Light only where context demands it — for
          example, in print-oriented views, high-ambient-light environments, or sub-sections
          embedded in external light-themed surfaces.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          <DoCard><DoList
            items={[
              'Choose Noir as the first choice for Diwa AI interfaces — it reduces visual fatigue in long sessions.',
              'Use accessibility-safe semantic tokens: contrast-high for primary text, contrast-medium for secondary, contrast-low only for decorative dividers.',
              'Play with bg-base / bg-surface layers to create hierarchy — surface sits one step above base.',
              'Scope light theme to a subtree with data-theme="light" on a container element when mixing is intentional.',
            ]}
          /></DoCard>
          <DontCard><DontList
            items={[
              "Don't use contrast-low for text or critical information — it fails WCAG AA contrast.",
              "Don't mix tokens from different themes (e.g. using a Noir color value in a Light context).",
              "Don't add new raw color values to components. Always reference a semantic token.",
              "Don't override semantic tokens with primitives in ad-hoc inline styles.",
            ]}
          /></DontCard>
        </div>

        {/* Theme switching hint */}
        <div className="flex gap-4 p-5 rounded-lg bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)]">
          <span className="text-base shrink-0 mt-0.5">ℹ</span>
          <div>
            <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-3">
              <strong className="text-[var(--diwa-text-primary)]">Theme switching: </strong>
              Toggle by setting{' '}
              <code className="font-mono text-[var(--diwa-accent)]">data-theme=&quot;light&quot;</code>{' '}
              on <code className="font-mono text-[var(--diwa-accent)]">&lt;html&gt;</code>. Removing
              the attribute returns to Noir. Themes can be scoped to any subtree.
            </p>
            <pre className="text-xs font-mono text-[var(--diwa-text-secondary)] leading-relaxed">
              <code>{`// Switch to Light
document.documentElement.setAttribute('data-theme', 'light');
// Return to Noir
document.documentElement.removeAttribute('data-theme');
// Scope to a subtree
<section data-theme="light">…</section>`}</code>
            </pre>
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
        <CodeSnippet code={`import {
  // Theme objects (resolved values for current theme)
  themeNoir,
  themeLight,

  // Noir semantic tokens
  themeNoirPrimary,
  themeNoirBackgroundBase, themeNoirBackgroundSurface,
  themeNoirBackgroundShading, themeNoirBackgroundFrosted,
  themeNoirContrastLow, themeNoirContrastMedium, themeNoirContrastHigh,
  themeNoirNotificationSuccess, themeNoirNotificationSuccessSoft,
  themeNoirNotificationWarning, themeNoirNotificationWarningSoft,
  themeNoirNotificationError, themeNoirNotificationErrorSoft,
  themeNoirNotificationInfo, themeNoirNotificationInfoSoft,
  themeNoirStateHover, themeNoirStateActive,
  themeNoirStateFocus, themeNoirStateDisabled,

  // Light semantic tokens
  themeLightPrimary,
  themeLightBackgroundBase, themeLightBackgroundSurface,
  themeLightBackgroundShading, themeLightBackgroundFrosted,
  themeLightContrastLow, themeLightContrastMedium, themeLightContrastHigh,
  themeLightNotificationSuccess, themeLightNotificationSuccessSoft,
  themeLightNotificationWarning, themeLightNotificationWarningSoft,
  themeLightNotificationError, themeLightNotificationErrorSoft,
  themeLightNotificationInfo, themeLightNotificationInfoSoft,
  themeLightStateHover, themeLightStateActive,
  themeLightStateFocus, themeLightStateDisabled,

  // Accent scale (theme-invariant)
  colorAccent50, colorAccent100, colorAccent200, colorAccent300,
  colorAccent400, colorAccent500, colorAccent600, colorAccent700,
} from '@diwacopilot/components/styles';

/* ─── CSS — always resolve via semantic tokens ────────────────────── */
.card {
  background: var(--diwa-bg-surface);  /* adapts to active theme */
  color:      var(--diwa-primary);
  border:     1px solid var(--diwa-contrast-low);
}

.badge-accent {
  background: var(--diwa-color-accent-100);
  color:      var(--diwa-color-accent-400);
}

/* ─── Scoped light theme region ──────────────────────────────────── */
[data-theme="light"] .card {
  /* tokens above already resolve correctly — no extra overrides needed */
}`} />
        <CodeTabs tabs={[
          {
            label: 'Angular',
            code: `@use '@diwacopilot/components/styles' as *;

/* Scoped theme override for a region */
.dark-panel  { @include diwa-theme-noir; }
.light-panel { @include diwa-theme-light; }

/* Use semantic tokens directly in component styles */
.card {
  background: $diwa-bg-surface;
  border: 1px solid $diwa-border;
  color: $diwa-text-primary;
}

.badge-accent {
  background: $diwa-color-accent-100;
  color: $diwa-color-accent-400;
}`,
          },
          {
            label: 'React',
            code: `import { themeNoir, themeLight, colorAccent500 } from '@diwacopilot/components/styles';

function DarkPanel({ children }: { children: React.ReactNode }) {
  return <div style={themeNoir}>{children}</div>;
}

function LightPanel({ children }: { children: React.ReactNode }) {
  return <div style={themeLight}>{children}</div>;
}

function AccentBadge({ label }: { label: string }) {
  return (
    <span style={{ background: colorAccent500, color: 'white' }}>
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

