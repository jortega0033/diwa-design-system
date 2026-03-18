'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

// ── Individual stories ───────────────────────────────────────────────────────

const endStory: Story<'diwa-flyout'> = {
  state: {
    properties: { open: false, heading: 'Product details', position: 'end', theme: 'dark' },
  },
  generator: ({ properties } = {}): (string | ElementConfig<HTMLTagOrComponent>)[] => {
    const attrs = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'diwa-button' as const,
        properties: { theme: attrs.theme ?? 'dark' },
        events: {
          onclick: { target: 'diwa-flyout', prop: 'open', value: true },
        },
        children: ['Open Flyout'],
      },
      {
        tag: 'diwa-flyout' as const,
        properties: {
          open: attrs.open ?? false,
          heading: attrs.heading ?? 'Product details',
          position: attrs.position ?? 'end',
          theme: attrs.theme ?? 'dark',
        },
        events: {
          ondismiss: { target: 'diwa-flyout', prop: 'open', value: false },
        },
        children: [
          'Use this panel to display supplementary information without navigating away from the current page.',
        ],
      },
    ];
  },
};

const startStory: Story<'diwa-flyout'> = {
  state: {
    properties: { open: false, heading: 'Navigation', position: 'start', theme: 'dark' },
  },
  generator: ({ properties } = {}): (string | ElementConfig<HTMLTagOrComponent>)[] => {
    const attrs = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'diwa-button' as const,
        properties: { theme: attrs.theme ?? 'dark' },
        events: {
          onclick: { target: 'diwa-flyout', prop: 'open', value: true },
        },
        children: ['Open Menu'],
      },
      {
        tag: 'diwa-flyout' as const,
        properties: {
          open: attrs.open ?? false,
          heading: attrs.heading ?? 'Navigation',
          position: attrs.position ?? 'start',
          theme: attrs.theme ?? 'dark',
        },
        events: {
          ondismiss: { target: 'diwa-flyout', prop: 'open', value: false },
        },
        children: [
          'Setting position="start" slides the panel in from the left edge, suitable for navigation drawers.',
        ],
      },
    ];
  },
};

const withFooterStory: Story<'diwa-flyout'> = {
  state: {
    properties: { open: false, heading: 'Confirm action', position: 'end', theme: 'dark' },
  },
  generator: ({ properties } = {}): (string | ElementConfig<HTMLTagOrComponent>)[] => {
    const attrs = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'diwa-button' as const,
        properties: { theme: attrs.theme ?? 'dark' },
        events: {
          onclick: { target: 'diwa-flyout', prop: 'open', value: true },
        },
        children: ['Open Flyout'],
      },
      {
        tag: 'diwa-flyout' as const,
        properties: {
          open: attrs.open ?? false,
          heading: attrs.heading ?? 'Confirm action',
          position: attrs.position ?? 'end',
          theme: attrs.theme ?? 'dark',
        },
        events: {
          ondismiss: { target: 'diwa-flyout', prop: 'open', value: false },
        },
        children: [
          'Place action buttons in the footer slot to keep them persistently visible regardless of how much content is in the body.',
          {
            tag: 'div' as const,
            properties: {
              slot: 'footer',
              style: { display: 'flex', gap: '12px', justifyContent: 'flex-end' },
            },
            children: [
              {
                tag: 'diwa-button' as const,
                properties: { variant: 'secondary', theme: attrs.theme ?? 'dark' },
                events: {
                  onclick: { target: 'diwa-flyout', prop: 'open', value: false },
                },
                children: ['Cancel'],
              },
              {
                tag: 'diwa-button' as const,
                properties: { theme: attrs.theme ?? 'dark' },
                children: ['Confirm'],
              },
            ],
          },
        ],
      },
    ];
  },
};

// ── Live demo — form inside flyout ──────────────────────────────────────────

function FlyoutFormDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const flyoutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (flyoutRef.current) {
      (flyoutRef.current as unknown as { open: boolean }).open = isOpen;
    }
  }, [isOpen]);

  useEffect(() => {
    const el = flyoutRef.current;
    if (!el) return;
    const onDismiss = () => setIsOpen(false);
    el.addEventListener('dismiss', onDismiss);
    return () => el.removeEventListener('dismiss', onDismiss);
  }, []);

  return (
    <>
      <diwa-button
        suppressHydrationWarning
        onclick={() => setIsOpen(true)}
      >
        Edit profile
      </diwa-button>

      <diwa-flyout
        suppressHydrationWarning
        ref={flyoutRef as React.Ref<HTMLElement>}
        heading="Edit profile"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--diwa-text-secondary)',
                marginBottom: '6px',
              }}
            >
              Full name
            </label>
            <input
              type="text"
              defaultValue="Jordan Garcia"
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid var(--diwa-border)',
                background: 'var(--diwa-bg-surface)',
                color: 'var(--diwa-text-primary)',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--diwa-text-secondary)',
                marginBottom: '6px',
              }}
            >
              Email
            </label>
            <input
              type="email"
              defaultValue="jordan@example.com"
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid var(--diwa-border)',
                background: 'var(--diwa-bg-surface)',
                color: 'var(--diwa-text-primary)',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>
        <div slot="footer" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <diwa-button
            suppressHydrationWarning
            variant="secondary"
            onclick={() => setIsOpen(false)}
          >
            Cancel
          </diwa-button>
          <diwa-button
            suppressHydrationWarning
            onclick={() => setIsOpen(false)}
          >
            Save changes
          </diwa-button>
        </div>
      </diwa-flyout>
    </>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FlyoutExamplesPage() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">
          End (default)
        </h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          By default the panel slides in from the right edge. Click the button to open it, then
          click the backdrop, dismiss button, or press{' '}
          <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">
            Escape
          </code>{' '}
          to close.
        </p>
        <ComponentStory story={endStory} />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">
          Start position
        </h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Setting{' '}
          <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">
            position=&quot;start&quot;
          </code>{' '}
          slides the panel in from the left edge. Useful for navigation drawers or filter panels.
        </p>
        <ComponentStory story={startStory} />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">
          With footer slot
        </h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Place action buttons in the{' '}
          <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">
            footer
          </code>{' '}
          slot to keep them always visible above the fold, regardless of body content length.
        </p>
        <ComponentStory story={withFooterStory} />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">
          Form inside flyout
        </h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          A common pattern — inline editing without a full page navigation. The footer holds the
          primary and secondary actions.
        </p>
        <FlyoutFormDemo />
      </section>
    </div>
  );
}
