import React from 'react';
import { CodeTabs } from '@/components/CodeTabs';
import { Section, CodeSnippet, DoList, DontList } from '@/components/docs';

const GRADIENT_TOKENS = [
  {
    token: '--diwa-gradient-to-top',
    label: 'Gradient To Top',
    use: 'Fade text over an image from bottom — scrim rises upward',
    style: 'linear-gradient(to top, #0b0b0c 0%, transparent 100%)',
  },
  {
    token: '--diwa-gradient-to-bottom',
    label: 'Gradient To Bottom',
    use: 'Fade text over an image from top — scrim falls downward',
    style: 'linear-gradient(to bottom, #0b0b0c 0%, transparent 100%)',
  },
  {
    token: '--diwa-gradient-to-left',
    label: 'Gradient To Left',
    use: 'Horizontal scrim fading leftward — side-panel overlays',
    style: 'linear-gradient(to left, #0b0b0c 0%, transparent 100%)',
  },
  {
    token: '--diwa-gradient-to-right',
    label: 'Gradient To Right',
    use: 'Horizontal scrim fading rightward — text-on-image banners',
    style: 'linear-gradient(to right, #0b0b0c 0%, transparent 100%)',
  },
  {
    token: '--diwa-gradient-accent',
    label: 'Accent',
    use: 'Brand CTA surfaces, loading bars, decorative accents',
    style: 'linear-gradient(135deg, #10a37f 0%, #0c8464 100%)',
  },
];

export default function StylesGradientPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-[var(--diwa-text-primary)] mb-3">Gradient</h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-2xl">
        Diwa provides directional scrim gradients for placing legible text over images, plus a
        brand accent gradient. Always consume these tokens rather than composing raw gradients
        in component code.
      </p>

      <Section title="Example">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {GRADIENT_TOKENS.map((row) => (
            <div key={row.token} className="overflow-hidden rounded-lg border border-[var(--diwa-border)]">
              <div className="h-20 relative">
                {/* background image stand-in */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'radial-gradient(circle at 30% 40%, #10a37f 0%, #0c8464 50%, #064d3c 100%)' }}
                />
                {/* gradient overlay */}
                <div className="absolute inset-0" style={{ background: row.style }} />
                <span className="absolute bottom-2 left-3 text-xs font-medium text-white drop-shadow">
                  {row.label}
                </span>
              </div>
              <div className="p-3 bg-[var(--diwa-bg-surface)]">
                <code className="text-xs font-mono text-[var(--diwa-accent)] block mb-1">{row.token}</code>
                <p className="text-xs text-[var(--diwa-text-secondary)]">{row.use}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--diwa-border)]">
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Token</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider">Use</th>
              </tr>
            </thead>
            <tbody>
              {GRADIENT_TOKENS.map((row) => (
                <tr key={row.token} className="border-b border-[var(--diwa-border)] last:border-0">
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-accent)] whitespace-nowrap">{row.token}</td>
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
              'Use scrim gradients when placing text over images (e.g. link tiles, hero banners) to ensure legible contrast.',
              'Choose the direction that matches the text position — gradient-to-top for bottom-anchored labels, gradient-to-right for left-edge text.',
              'Use --diwa-gradient-accent for brand CTA surfaces and decorative accents.',
            ]} />
          </div>
          <div className="p-5 rounded-lg border border-[var(--diwa-notification-error)] bg-[var(--diwa-notification-error-soft)]">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-error)]">Don&apos;t</p>
            <DontList items={[
              "Don't compose gradients from raw hex values — always use a defined token.",
              "Don't use scrim gradients on plain coloured backgrounds where no image is present.",
              "Don't use gradient-accent as a neutral background; it is a brand-intent surface only.",
            ]} />
          </div>
        </div>

        {/* Hint callout */}
        <div className="p-4 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] flex gap-3">
          <span className="text-[var(--diwa-text-secondary)] shrink-0 mt-0.5">ℹ</span>
          <p className="text-sm text-[var(--diwa-text-secondary)]">
            <strong className="text-[var(--diwa-text-primary)]">Hint:</strong> The scrim gradients use
            multiple colour stops to produce a smooth, natural-looking fade rather than a harsh
            two-stop linear transition.
          </p>
        </div>
      </Section>

      <Section title="Styles">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          All gradient tokens are available as JS constants from{' '}
          <code className="font-mono text-[var(--diwa-accent)]">@diwa/components/styles</code>:
        </p>
        <CodeSnippet code={`import {
  gradientToTopStyle,
  gradientToBottomStyle,
  gradientToLeftStyle,
  gradientToRightStyle,
  gradientAccent,
} from '@diwa/components/styles';

/* CSS */
.image-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--diwa-gradient-to-bottom);
}

.hero-cta {
  background: var(--diwa-gradient-accent);
  color: white;
}`} />
        <CodeTabs tabs={[
          {
            label: 'Angular',
            code: `@use '@diwa/components/styles' as *;

.hero-cta {
  background: $diwa-gradient-accent;
  color: white;
}

.image-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: $diwa-gradient-to-bottom;
  pointer-events: none;
}

.fade-top { background: $diwa-gradient-to-top; }`,
          },
          {
            label: 'React',
            code: `import {
  gradientToBottomStyle,
  gradientAccent,
} from '@diwa/components/styles';

function HeroCta({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: gradientAccent, color: 'white' }}>
      {children}
    </div>
  );
}

function ImageCard({ image }: { image: string }) {
  return (
    <div style={{ position: 'relative' }}>
      <img src={image} alt="" />
      <div style={{ ...gradientToBottomStyle, position: 'absolute', inset: 0 }} />
    </div>
  );
}`,
          },
        ]} />
      </Section>
    </div>
  );
}

