import React from 'react';
import { CodeTabs } from '@/components/CodeTabs';
import { Section, CodeSnippet, DoList, DontList } from '@/components/docs';
import type { Metadata } from 'next';
import { stylesSeo } from '@/lib/stylesSeo';
export const metadata: Metadata = stylesSeo['/styles/grid'];


function GridTile({
  span,
  label,
  sublabel,
  color = 'accent',
  tall = false,
}: {
  span: number;
  label: string;
  sublabel?: string;
  color?: 'accent' | 'surface' | 'muted';
  tall?: boolean;
}) {
  const bg =
    color === 'accent'
      ? 'rgba(16,163,127,0.18)'
      : color === 'surface'
      ? 'rgba(16,163,127,0.08)'
      : 'rgba(16,163,127,0.05)';

  return (
    <div
      className={`rounded-md border border-[var(--diwa-accent)] border-opacity-30 px-2 py-2 flex flex-col gap-0.5 ${tall ? 'min-h-[72px]' : ''}`}
      style={{ gridColumn: `span ${span}`, background: bg }}
    >
      <span className="text-[10px] font-semibold text-[var(--diwa-accent)]">{label}</span>
      {sublabel && <span className="text-[10px] text-[var(--diwa-text-muted)]">{sublabel}</span>}
    </div>
  );
}

const GRID_TOKENS = [
  { token: '--diwa-grid-columns',   value: '12',                          desc: 'Column count' },
  { token: '--diwa-grid-gutter',    value: 'var(--diwa-space-fluid-lg)',   desc: 'Gap between columns — 16–28px fluid' },
  { token: '--diwa-grid-margin',    value: 'var(--diwa-space-fluid-xl)',   desc: 'Page-edge horizontal margin — 24–40px fluid' },
  { token: '--diwa-grid-max-width', value: '1440px',                      desc: 'Maximum content width before centring' },
];

export default function StylesGridPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-[var(--diwa-text-primary)] mb-3">Grid</h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-2xl">
        Diwa uses a 12-column CSS grid with fluid gutters and page margins that scale with the
        viewport — ranging from 320px to 1440px. All grid values are exposed as CSS tokens so
        layouts stay consistent without hardcoded numbers.
      </p>

      <Section title="Example">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          The layout below illustrates common column patterns on a 12-column grid. Each tile shows
          the column span and its recommended use.
        </p>

        {/* Layout demo using CSS grid */}
        <div
          className="p-4 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-base)] mb-6"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '6px' }}
        >
          {/* Row 1: full-bleed hero */}
          <GridTile span={12} label="Full — 12/12" sublabel="Hero background, full-width media" tall />

          {/* Row 2: main + sidebar */}
          <GridTile span={8} label="Main — 8/12" sublabel="Page content, article body" color="surface" tall />
          <GridTile span={4} label="Sidebar — 4/12" sublabel="Navigation, filters" color="muted" tall />

          {/* Row 3: half + half */}
          <GridTile span={6} label="Half — 6/12" sublabel="Large teaser, image grid" color="surface" />
          <GridTile span={6} label="Half — 6/12" sublabel="Large teaser, image grid" color="surface" />

          {/* Row 4: thirds */}
          <GridTile span={4} label="Third — 4/12" sublabel="Content tile" color="accent" />
          <GridTile span={4} label="Third — 4/12" sublabel="Content tile" color="accent" />
          <GridTile span={4} label="Third — 4/12" sublabel="Content tile" color="accent" />

          {/* Row 5: quarters */}
          <GridTile span={3} label="Quarter — 3/12" sublabel="Small card" color="muted" />
          <GridTile span={3} label="Quarter — 3/12" sublabel="Small card" color="muted" />
          <GridTile span={3} label="Quarter — 3/12" sublabel="Small card" color="muted" />
          <GridTile span={3} label="Quarter — 3/12" sublabel="Small card" color="muted" />

          {/* Row 6: narrow content */}
          <GridTile span={2} label="" sublabel="" color="muted" />
          <GridTile span={8} label="Narrow — 8/12" sublabel="Focused copy, forms, small components" color="surface" />
          <GridTile span={2} label="" sublabel="" color="muted" />
        </div>

        {/* Token table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--diwa-border)]">
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Token</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Value</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody>
              {GRID_TOKENS.map((row) => (
                <tr key={row.token} className="border-b border-[var(--diwa-border)] last:border-0">
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-accent)]">{row.token}</td>
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-text-secondary)]">{row.value}</td>
                  <td className="py-2.5 text-xs text-[var(--diwa-text-secondary)]">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Usage">
        <div className="mb-6 text-sm text-[var(--diwa-text-secondary)] space-y-3 leading-relaxed">
          <p><strong className="text-[var(--diwa-text-primary)]">12-column (default):</strong> All productive content — copy, graphics, descriptive imagery. Headlines should align to the left edge of the 12-column grid.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">Full-bleed:</strong> Immersive moments — background images and colours can stretch to the full viewport width. This falls outside the column grid.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="p-5 rounded-lg border border-[var(--diwa-notification-success)] bg-[var(--diwa-notification-success-soft)]">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-success)]">Do</p>
            <DoList items={[
              'Use the grid for a consistent appearance across all pages and breakpoints.',
              'Align all left-aligned headlines to the left edge of the content grid.',
              'Ensure images are at least focused within the 12-column content area even if they bleed to full width.',
              'Use a grid at the top level — wrap page sections in the grid wrapper, not individual components.',
            ]} />
          </div>
          <div className="p-5 rounded-lg border border-[var(--diwa-notification-error)] bg-[var(--diwa-notification-error-soft)]">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-error)]">Don&apos;t</p>
            <DontList items={[
              "Don't nest one grid inside another — the Diwa grid is a top-level layout primitive.",
              "Don't scale elements beyond the 1440px maximum — they should centre within the page.",
              "Don't use hardcoded pixel gutters or margins; always consume the grid tokens.",
              "Don't create ad-hoc column counts outside the token scale.",
            ]} />
          </div>
        </div>
      </Section>

      <Section title="Styles">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Import the grid style helper from{' '}
          <code className="font-mono text-[var(--diwa-accent)]">@diwacopilot/components/styles</code>, or
          use the CSS tokens directly for full control:
        </p>
        <CodeSnippet code={`import { gridStyle } from '@diwacopilot/components/styles';

// Returns { display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '...' }
const grid = gridStyle();

/* ── CSS ─────────────────────────────────────── */

/* Page wrapper */
.page {
  display: grid;
  grid-template-columns: repeat(var(--diwa-grid-columns), 1fr);
  gap: var(--diwa-grid-gutter);
  padding-inline: var(--diwa-grid-margin);
  max-width: var(--diwa-grid-max-width);
  margin-inline: auto;
}

/* Main content + sidebar */
.main    { grid-column: span 8; }
.sidebar { grid-column: span 4; }

/* Halves, thirds */
.half   { grid-column: span 6; }
.third  { grid-column: span 4; }

/* Centred narrow content */
.narrow {
  grid-column: 3 / span 8; /* 8 cols, offset by 2 */
}

/* Collapse all to full-width on mobile */
@media (max-width: 759px) {
  .main, .sidebar, .half, .third, .narrow {
    grid-column: span 12;
  }
}`} />
        <CodeTabs tabs={[
          {
            label: 'Angular',
            code: `@use '@diwacopilot/components/styles' as *;

.page {
  display: grid;
  grid-template-columns: repeat($diwa-grid-columns, 1fr);
  gap: $diwa-grid-gutter;
  padding-inline: $diwa-grid-margin;
  max-width: $diwa-grid-max-width;
  margin-inline: auto;
}

.content { grid-column: span 8; }
.sidebar { grid-column: span 4; }

@media (max-width: $diwa-breakpoint-sm) {
  .content, .sidebar { grid-column: span 12; }
}`,
          },
          {
            label: 'React',
            code: `import { gridStyle } from '@diwacopilot/components/styles';

const grid = gridStyle();
// { display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '...' }

function PageLayout({ children }: { children: React.ReactNode }) {
  return <div style={grid}>{children}</div>;
}

function ContentArea({ children }: { children: React.ReactNode }) {
  return <main style={{ gridColumn: 'span 8' }}>{children}</main>;
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return <aside style={{ gridColumn: 'span 4' }}>{children}</aside>;
}`,
          },
        ]} />
      </Section>
    </div>
  );
}

