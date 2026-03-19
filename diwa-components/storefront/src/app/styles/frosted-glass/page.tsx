import React from 'react';
import { CodeTabs } from '@/components/CodeTabs';
import { Section, CodeSnippet, DoList, DontList } from '@/components/docs';

const BLUR_TOKENS = [
  { token: '--diwa-blur-sm',  value: '4px',  use: 'Tooltips, small dropdowns' },
  { token: '--diwa-blur-md',  value: '8px',  use: 'Standard frosted panels, navigation bars' },
  { token: '--diwa-blur-lg',  value: '16px', use: 'Modals, flyouts, sheets' },
  { token: '--diwa-blur-xl',  value: '24px', use: 'Full-screen overlays, frosted backgrounds' },
];

export default function StylesFrostedGlassPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-[var(--diwa-text-primary)] mb-3">Frosted Glass</h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-2xl">
        The frosted-glass effect combines a semi-transparent background with{' '}
        <code className="font-mono text-[var(--diwa-accent)]">backdrop-filter: blur()</code> to
        create a translucent surface that reveals the content behind it. Diwa provides tokenised
        blur levels and a semantic background token so the effect adapts correctly across themes.
      </p>

      <Section title="Example">
        {/* Blur scale demo */}
        <div
          className="relative rounded-xl overflow-hidden p-1 mb-6"
          style={{ background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)' }}
        >
          <div className="absolute inset-0 flex flex-wrap gap-2 p-4 pointer-events-none" aria-hidden>
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-md bg-[var(--diwa-accent)]"
                style={{ opacity: 0.15 + (i % 5) * 0.05 }}
              />
            ))}
          </div>
          <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3 p-4">
            {BLUR_TOKENS.map((row) => (
              <div
                key={row.token}
                className="p-4 rounded-lg border border-white/20 flex flex-col gap-2"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: `blur(${row.value})`,
                  WebkitBackdropFilter: `blur(${row.value})`,
                }}
              >
                <code className="text-xs font-mono text-white font-semibold">{row.value}</code>
                <p className="text-xs text-white/80">{row.token.replace('--diwa-blur-', '')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Token table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--diwa-border)]">
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Token</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Value</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider">Use</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--diwa-border)]">
                <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-accent)]">--diwa-bg-frosted</td>
                <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-text-secondary)]">hsl(240 3% 18%/35%)</td>
                <td className="py-2.5 text-xs text-[var(--diwa-text-secondary)]">Semi-transparent background — theme-aware</td>
              </tr>
              {BLUR_TOKENS.map((row) => (
                <tr key={row.token} className="border-b border-[var(--diwa-border)] last:border-0">
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-accent)]">{row.token}</td>
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-text-secondary)]">{row.value}</td>
                  <td className="py-2.5 text-xs text-[var(--diwa-text-secondary)]">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Usage">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="p-5 rounded-lg border border-[var(--diwa-notification-success)] bg-[var(--diwa-notification-success-soft)]">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-success)]">Do</p>
            <DoList items={[
              'Apply frosted glass to a container to create an immersive moment.',
              'Use the effect as an overlay on contrast-rich, colourful backgrounds.',
              'Use it for hover state overlays and interactive surface elevations.',
              'Pair only with neutral colours for the panel background.',
              'Use sparingly — reserve for key moments, not as a default surface style.',
            ]} />
          </div>
          <div className="p-5 rounded-lg border border-[var(--diwa-notification-error)] bg-[var(--diwa-notification-error-soft)]">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-error)]">Don&apos;t</p>
            <DontList items={[
              "Don't apply the effect over low-contrast or near-white backgrounds — the blur becomes invisible.",
              "Don't use on elements with critical text when the underlying content could reduce readability.",
              "Don't combine with coloured backgrounds — always use the neutral --diwa-bg-frosted token.",
              "Don't use as a default card style; reserve it for immersive or overlay contexts.",
            ]} />
          </div>
        </div>

        {/* Hint callout */}
        <div className="p-4 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] flex gap-3">
          <span className="text-[var(--diwa-text-secondary)] shrink-0 mt-0.5">ℹ</span>
          <div className="space-y-1 text-sm text-[var(--diwa-text-secondary)]">
            <p><strong className="text-[var(--diwa-text-primary)]">Contrast:</strong> Be aware of contrast issues depending on the background — always verify text legibility against the blurred surface.</p>
            <p><strong className="text-[var(--diwa-text-primary)]">Browser support:</strong> Always include <code className="font-mono text-[var(--diwa-accent)]">-webkit-backdrop-filter</code> for Safari. If the property is unavailable, <code className="font-mono text-[var(--diwa-accent)]">--diwa-bg-frosted</code> still provides visual separation via its semi-transparent background.</p>
          </div>
        </div>
      </Section>

      <Section title="Styles">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Use the CSS tokens directly, or import the pre-composed JS style object from{' '}
          <code className="font-mono text-[var(--diwa-accent)]">@diwacopilot/components/styles</code>:
        </p>
        <CodeSnippet code={`/* CSS */
.nav-bar {
  background: var(--diwa-bg-frosted);
  backdrop-filter: blur(var(--diwa-blur-md));
  -webkit-backdrop-filter: blur(var(--diwa-blur-md));
  border-bottom: 1px solid var(--diwa-border);
}

/* JS — JSS / styled-components / inline styles */
import { frostedGlassStyle } from '@diwacopilot/components/styles';

// Returns:
// {
//   background: 'var(--diwa-bg-frosted)',
//   backdropFilter: 'blur(var(--diwa-blur-md))',
//   WebkitBackdropFilter: 'blur(var(--diwa-blur-md))',
// }

<div style={frostedGlassStyle}>Frosted Glass</div>`} />
        <CodeTabs tabs={[
          {
            label: 'Angular',
            code: `@use '@diwacopilot/components/styles' as *;

.nav-bar {
  background: $diwa-bg-frosted;
  backdrop-filter: blur($diwa-blur-md);
  -webkit-backdrop-filter: blur($diwa-blur-md);
  border-bottom: 1px solid $diwa-border;
}

.overlay-panel {
  background: $diwa-bg-frosted;
  backdrop-filter: blur($diwa-blur-lg);
  border-radius: $diwa-border-radius-lg;
}`,
          },
          {
            label: 'React',
            code: `import { frostedGlassStyle } from '@diwacopilot/components/styles';

function NavBar({ children }: { children: React.ReactNode }) {
  return <nav style={frostedGlassStyle}>{children}</nav>;
}

function OverlayPanel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        ...frostedGlassStyle,
        borderRadius: 'var(--diwa-border-radius-lg)',
      }}
    >
      {children}
    </div>
  );
}`,
          },
        ]} />
      </Section>
    </div>
  );
}

