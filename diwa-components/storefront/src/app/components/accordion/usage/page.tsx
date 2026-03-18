import React from 'react';
import { Section, Code } from '@/components/docs';



export default function AccordionUsagePage() {
  return (
    <div className="max-w-3xl">
      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-lg border border-[var(--diwa-notification-success)] bg-[var(--diwa-notification-success-soft)]">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-success)]">Do</p>
            <ul className="space-y-2">
              {[
                'Use to organize large amounts of content in a structured, scannable way.',
                'Group related content together within each panel.',
                'Use clear, concise headings so users can quickly identify what is inside.',
                'Choose a heading tag that fits the surrounding page outline (headingTag prop).',
                'Use dense mode (compact) in sidebars, configuration panels, or data tables.',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-[var(--diwa-text-secondary)]">
                  <span className="mt-0.5 text-[var(--diwa-notification-success)] shrink-0">✓</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5 rounded-lg border border-[var(--diwa-notification-error)] bg-[var(--diwa-notification-error-soft)]">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-error)]">Don&apos;t</p>
            <ul className="space-y-2">
              {[
                "Don't hide content that is critical or required — users may not discover it.",
                "Don't overuse accordions on a single page; too many create navigation fatigue.",
                "Don't use ambiguous or vague headings — users must understand the content without expanding.",
                "Don't overload individual panels with excessive content.",
                "Don't add a manual divider above the first accordion — the component provides its own.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-[var(--diwa-text-secondary)]">
                  <span className="mt-0.5 text-[var(--diwa-notification-error)] shrink-0">✕</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Controlled component pattern">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          <Code>diwa-accordion</Code> never mutates its own{' '}
          <Code>open</Code> prop. Instead it emits an{' '}
          <Code>update</Code> event with{' '}
          <Code>{`{ open: boolean }`}</Code> representing the <em>requested</em> new state.
          The consumer must reflect that value back onto the <Code>open</Code> prop. This pattern gives
          the consumer full control: you can intercept, delay, or veto state transitions.
        </p>
        <pre className="p-4 rounded-md bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-sm font-mono text-[var(--diwa-text-primary)] overflow-x-auto">
{`// Vanilla JS
const el = document.querySelector('diwa-accordion');
el.addEventListener('update', (e) => { el.open = e.detail.open; });

// React (JSX) — note lowercase onupdate for custom element event mapping
// See: https://react.dev/reference/react-dom/components/common#custom-html-elements
<diwa-accordion
  heading="FAQ item"
  open={isOpen}
  onupdate={(e) => setIsOpen(e.detail.open)}
/>`}
        </pre>
      </Section>

      <Section title="Exclusive group (accordion accordion)">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          To make only one panel open at a time, track a single active index and close all others
          when a panel is opened. Because each accordion is independent, this is entirely handled
          in user-land without any group container prop:
        </p>
        <pre className="p-4 rounded-md bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-sm font-mono text-[var(--diwa-text-primary)] overflow-x-auto">
{`const [activeIndex, setActiveIndex] = useState<number | null>(null);

items.map((item, i) => (
  <diwa-accordion
    key={i}
    heading={item.heading}
    open={activeIndex === i}
    onupdate={(e) => e.detail.open ? setActiveIndex(i) : setActiveIndex(null)}
  >
    {item.content}
  </diwa-accordion>
))`}
        </pre>
      </Section>

      <Section title="Heading tag">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          The <Code>headingTag</Code> prop wraps the toggle button in a semantic heading element. Set it
          to match the heading hierarchy at the point the accordion appears in the document. If the nearest
          ancestor section heading is <Code>h2</Code>, use <Code>headingTag=&quot;h3&quot;</Code>.
          The default is <Code>h2</Code>, which is appropriate for top-level FAQ or content sections.
        </p>
      </Section>

      <Section title="Dense mode (compact)">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          The <Code>compact</Code> prop enables dense mode and reduces header padding from{' '}
          <Code>20px 0</Code> to <Code>4px 0</Code> and the font from the{' '}
          <Code>lg</Code> to <Code>base</Code> scale. Use it in space-constrained contexts
          such as sidebars, inspection panels, or nested accordion groups.
        </p>
      </Section>
    </div>
  );
}
