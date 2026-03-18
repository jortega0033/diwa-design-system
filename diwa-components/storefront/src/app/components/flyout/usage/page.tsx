import React from 'react';
import { Section, Code, CodeSnippet } from '@/components/docs';




const vanillaSnippet = `<!-- Trigger -->
<diwa-button id="open-btn">Open flyout</diwa-button>

<!-- Flyout -->
<diwa-flyout id="my-flyout" heading="Settings">
  <p>Flyout body content.</p>
  <div slot="footer">
    <diwa-button id="save-btn">Save</diwa-button>
  </div>
</diwa-flyout>

<script>
  const flyout = document.getElementById('my-flyout');
  const openBtn = document.getElementById('open-btn');

  openBtn.addEventListener('click', () => { flyout.open = true; });
  flyout.addEventListener('dismiss', () => { flyout.open = false; });
</script>`;

const reactSnippet = `import { useState } from 'react';

function SettingsPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <diwa-button onclick={() => setIsOpen(true)}>Open flyout</diwa-button>

      <diwa-flyout
        open={isOpen}
        heading="Settings"
        ondismiss={() => setIsOpen(false)}
      >
        <p>Flyout body content.</p>
        <div slot="footer">
          <diwa-button onclick={() => setIsOpen(false)}>Save</diwa-button>
        </div>
      </diwa-flyout>
    </>
  );
}`;

const customWidthSnippet = `/* Override the default 480px width via the CSS custom property */
diwa-flyout {
  --diwa-flyout-width: 600px;
}`;

export default function FlyoutUsagePage() {
  return (
    <div className="max-w-3xl">
      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-lg border border-[var(--diwa-notification-success)] bg-[var(--diwa-notification-success-soft)]">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-success)]">
              Do
            </p>
            <ul className="space-y-2">
              {[
                'Use for contextual details, settings, or forms that augment the current view without full navigation.',
                'Use the footer slot for primary and secondary actions so they stay visible above the fold.',
                'Use position="start" for navigation drawers or filter panels that originate from the left.',
                'Always provide a meaningful heading so screen readers announce the dialog purpose.',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-[var(--diwa-text-secondary)]">
                  <span className="mt-0.5 text-[var(--diwa-notification-success)] shrink-0">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5 rounded-lg border border-[var(--diwa-notification-error)] bg-[var(--diwa-notification-error-soft)]">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-error)]">
              Don&apos;t
            </p>
            <ul className="space-y-2">
              {[
                "Don't use for critical blocking confirmations — use a modal dialog instead.",
                "Don't nest multiple flyouts — open only one at a time.",
                "Don't use for content that requires full-page context or complex multi-step flows.",
                "Don't forget to return focus to the trigger element when the flyout closes.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-[var(--diwa-text-secondary)]">
                  <span className="mt-0.5 text-[var(--diwa-notification-error)] shrink-0">✗</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Controlled pattern">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          The flyout follows the controlled component pattern. The consumer owns the{' '}
          <Code>open</Code> state and must update it in response to the{' '}
          <Code>dismiss</Code> event. The flyout never mutates <Code>open</Code>{' '}
          internally — it only emits <Code>dismiss</Code>.
        </p>

        <h3 className="text-base font-semibold text-[var(--diwa-text-primary)] mt-6 mb-3">
          Vanilla JS
        </h3>
        <CodeSnippet code={vanillaSnippet} />

        <h3 className="text-base font-semibold text-[var(--diwa-text-primary)] mt-6 mb-3">
          React
        </h3>
        <CodeSnippet code={reactSnippet} />
      </Section>

      <Section title="Slots">
        <div className="overflow-x-auto rounded-lg border border-[var(--diwa-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--diwa-bg-surface)] border-b border-[var(--diwa-border)]">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)] w-1/4">
                  Slot
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)]">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: 'default',
                  desc: 'Scrollable body content. Fills the available space between the header and footer.',
                },
                {
                  name: 'header',
                  desc: 'Extra content placed in the header row after the heading text and before the dismiss button.',
                },
                {
                  name: 'footer',
                  desc: 'Sticky footer content (typically action buttons). The footer area is automatically hidden when this slot is empty.',
                },
              ].map((slot, i) => (
                <tr key={slot.name} className={i % 2 === 0 ? '' : 'bg-[var(--diwa-bg-surface)]'}>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--diwa-accent)]">{slot.name}</td>
                  <td className="px-4 py-3 text-xs text-[var(--diwa-text-secondary)]">{slot.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Custom width">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Override the panel width using the{' '}
          <Code>--diwa-flyout-width</Code> CSS custom property. The panel has a
          hard minimum of <Code>320px</Code> and a maximum of <Code>100vw</Code>.
        </p>
        <CodeSnippet code={customWidthSnippet} />
      </Section>

      <Section title="Body scroll lock">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          When the flyout opens, <Code>document.body.style.overflow</Code> is set to{' '}
          <Code>hidden</Code> to prevent background content from scrolling beneath the
          backdrop. It is restored when the flyout closes or the element is removed from the
          DOM (<Code>disconnectedCallback</Code>). If your application manages body scroll
          independently, you may need to coordinate with this behaviour.
        </p>
      </Section>
    </div>
  );
}
