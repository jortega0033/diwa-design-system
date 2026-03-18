import Link from 'next/link';
import React from 'react';
import { CodeSnippet, Section } from '@/components/docs';

const READY_HELPER = `const DEFAULT_TAGS = [
  'diwa-button',
  'diwa-input-text',
  'diwa-select',
  'diwa-toast',
] as const;

export async function waitForDiwaComponents(
  root: ParentNode = document,
  tags: readonly string[] = DEFAULT_TAGS,
): Promise<void> {
  const presentTags = tags.filter((tag) => root.querySelector(tag));

  await Promise.all(
    presentTags.map(async (tag) => {
      await customElements.whenDefined(tag);
      const nodes = Array.from(root.querySelectorAll<HTMLElement>(tag));
      await Promise.all(nodes.map((node) => node.componentOnReady?.() ?? Promise.resolve()));
    }),
  );
}`;

export default function ComponentsReadyPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-[var(--diwa-text-primary)] mb-3">
        Components Ready
      </h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-3xl">
        Use readiness checks when your logic depends on upgraded custom elements. This prevents race conditions in
        tests and app code that run immediately after mount.
      </p>

      <Section title="When to Wait for Readiness">
        <ul className="space-y-2">
          {[
            'Before reading internals that only exist after component upgrade.',
            'Before dispatching synthetic events in automated tests.',
            'Before measuring layout that depends on rendered shadow content.',
            'Before taking visual snapshots or asserting focus behavior.',
          ].map((item) => (
            <li key={item} className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
              - {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Readiness Helper">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Create one helper in your test or app utilities and use it consistently where asynchronous upgrade timing matters.
        </p>
        <CodeSnippet code={READY_HELPER} />
      </Section>

      <Section title="Test Caveats (jsdom and Browser)">
        <ul className="space-y-2 mb-4">
          {[
            'jsdom does not fully emulate browser rendering and focus behavior for every custom-element scenario.',
            'Use browser-based tests (Playwright/Cypress) for keyboard flow, focus ring visibility, and motion checks.',
            'Use unit tests for static rendering and event contract shape; keep interaction-critical assertions in real browsers.',
          ].map((item) => (
            <li key={item} className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
              - {item}
            </li>
          ))}
        </ul>
        <CodeSnippet code={`import { waitForDiwaComponents } from './waitForDiwaComponents';

it('opens flyout after trigger click', async () => {
  render(<App />);
  await waitForDiwaComponents();

  await user.click(screen.getByRole('button', { name: /open menu/i }));
  expect(screen.getByRole('dialog')).toBeVisible();
});`} />
      </Section>

      <Section title="Next Actions">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              href: '/developing',
              label: 'Back to Developing Intro',
              desc: 'Choose another framework path or revisit setup decisions.',
            },
            {
              href: '/components',
              label: 'Component Docs',
              desc: 'Apply readiness checks while implementing real component flows.',
            },
            {
              href: '/styles/focus',
              label: 'Focus Contract',
              desc: 'Validate focus-visible behavior after components are ready.',
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-4 hover:border-[var(--diwa-accent)] transition-colors"
            >
              <p className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-1">{item.label}</p>
              <p className="text-xs text-[var(--diwa-text-secondary)] leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
