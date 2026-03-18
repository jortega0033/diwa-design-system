import React from 'react';
import { Section, Code, DoList, DontList, DoCard, DontCard } from '@/components/docs';

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="underline text-[var(--diwa-accent)] hover:opacity-80"
    >
      {children}
    </a>
  );
}

export default function IconUsagePage() {
  return (
    <div className="max-w-3xl">
      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DoCard>
            <DoList
              items={[
                'Use icons from the Lucide library for visual consistency.',
                'Use icons as a supplementary element alongside text for faster recognition.',
                'Provide a descriptive label via the label prop when the icon carries meaning on its own.',
                'Keep icons at a size that ensures clarity — 24px is the standard baseline.',
                'Use currentColor so the icon inherits the surrounding text color.',
              ]}
            />
          </DoCard>
          <DontCard>
            <DontList
              items={[
                "Don't use icons as the sole communication for critical actions — pair them with a label.",
                "Don't use icons smaller than 16px; they become illegible and hard to interact with.",
                "Don't use icons with ambiguous metaphors — clarity always wins over novelty.",
                "Don't rely on color alone to convey icon meaning; ensure contrast and context.",
                "Don't mix icon styles or sources — stick to Lucide for visual cohesion.",
              ]}
            />
          </DontCard>
        </div>
      </Section>

      <Section title="Sizing guidelines">
        <div className="overflow-x-auto rounded-lg border border-[var(--diwa-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--diwa-bg-surface)] border-b border-[var(--diwa-border)]">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)] w-1/4">
                  Size
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)]">
                  Use case
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ['16px', 'Inline with small body text, badges, compact UI elements.'],
                ['20px', 'Secondary actions, input prefix/suffix icons, list items.'],
                ['24px', 'Default. Buttons, navigation items, general purpose.'],
                ['32px', 'Prominent actions, section headings, empty states.'],
                ['48px', 'Hero sections, large decorative use, feature highlights.'],
              ].map(([size, desc], i) => (
                <tr key={size} className={i % 2 !== 0 ? 'bg-[var(--diwa-bg-surface)]' : ''}>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--diwa-text-primary)]">{size}</td>
                  <td className="px-4 py-3 text-[var(--diwa-text-secondary)]">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Icon with text">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Icons work best when they reinforce a text label. Place icons before the label for actions
          (e.g. in buttons) or after for navigation cues (e.g. external-link indicators). Use{' '}
          <Code>display: inline-flex; align-items: center; gap: 0.5rem</Code>{' '}
          to align icon and text on the same baseline.
        </p>
      </Section>

      <Section title="Custom icons">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          Diwa uses the{' '}
          <ExternalLink href="https://lucide.dev/icons/">Lucide icon library</ExternalLink> — a
          consistent, open-source set built on a 24×24 grid with 2px strokes. If you need an icon
          not in the library, follow these guidelines to maintain visual consistency.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DoCard>
            <DoList
              items={[
                'Check Lucide for a similar icon before creating a new one.',
                'Stick to basic geometric shapes and universally-understood metaphors.',
                'Design on a 24×24px artboard — the default Lucide grid, with 2px default stroke.',
                'Snap all anchor points to the pixel grid for crisp rendering.',
                'Respect a ~2px safe area inset on all four sides.',
                'Export as plain SVG with viewBox="0 0 24 24", optimised through SVGO.',
              ]}
            />
          </DoCard>
          <DontCard>
            <DontList
              items={[
                "Don't create custom icons where a Lucide equivalent exists.",
                "Don't use gradient fills — single foreground colour only.",
                "Don't include metadata, hidden layers, or clipping masks in the export.",
                "Don't leave unsnapped anchor points — anti-aliasing will blur the icon.",
                "Don't use extreme aspect ratios — keep the icon balanced within its box.",
              ]}
            />
          </DontCard>
        </div>
      </Section>

      <Section title="Further reading">
        <ul className="space-y-2 text-sm">
          <li>
            <ExternalLink href="https://lucide.dev/guide/design/icon-design-guide">
              Lucide icon design guide
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://nngroup.com/articles/icon-testing">
              Nielsen Norman Group — Icon usability
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html">
              WCAG 2.1 — Non-text content
            </ExternalLink>
          </li>
        </ul>
      </Section>
    </div>
  );
}
