'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';

// ── Example stories ───────────────────────────────────────────────────────────

const infoStory: Story<'diwa-inline-notification'> = {
  state: {},
  generator: () => [
    {
      tag: 'diwa-inline-notification' as const,
      properties: {
        state: 'info',
        heading: 'Update available',
        description: 'A new version of the workspace is ready. Refresh to apply the update.',
      },
    },
  ],
};

const successStory: Story<'diwa-inline-notification'> = {
  state: {},
  generator: () => [
    {
      tag: 'diwa-inline-notification' as const,
      properties: {
        state: 'success',
        heading: 'Profile saved',
        description: 'Your changes have been saved and synced across all devices.',
      },
    },
  ],
};

const warningStory: Story<'diwa-inline-notification'> = {
  state: {},
  generator: () => [
    {
      tag: 'diwa-inline-notification' as const,
      properties: {
        state: 'warning',
        heading: 'Storage almost full',
        description: 'You have used 90% of your available storage. Consider cleaning up old files.',
      },
    },
  ],
};

const errorStory: Story<'diwa-inline-notification'> = {
  state: {},
  generator: () => [
    {
      tag: 'diwa-inline-notification' as const,
      properties: {
        state: 'error',
        heading: 'Save failed',
        description:
          'Could not save your changes. Check your connection and try again.',
      },
    },
  ],
};

const withActionStory: Story<'diwa-inline-notification'> = {
  state: {},
  generator: () => [
    {
      tag: 'diwa-inline-notification' as const,
      properties: {
        state: 'warning',
        heading: 'Session expiring',
        description: 'Your session will expire in 5 minutes. Save your work to avoid losing changes.',
        actionLabel: 'Extend session',
      },
    },
  ],
};

const noDismissStory: Story<'diwa-inline-notification'> = {
  state: {},
  generator: () => [
    {
      tag: 'diwa-inline-notification' as const,
      properties: {
        state: 'info',
        heading: 'Read-only mode',
        description: 'You do not have edit permissions for this workspace.',
        dismissButton: false,
      },
    },
  ],
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function InlineNotificationExamplesPage() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">
          Info (default)
        </h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          The default state. Use for neutral, informational messages that do not require
          immediate action.
        </p>
        <ComponentStory story={infoStory} />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">
          All states
        </h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Each state carries a distinct colour treatment and icon to communicate semantic
          severity at a glance.
        </p>
        <div className="flex flex-col gap-4">
          <ComponentStory story={infoStory} />
          <ComponentStory story={successStory} />
          <ComponentStory story={warningStory} />
          <ComponentStory story={errorStory} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">
          With action button
        </h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Set{' '}
          <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">
            actionLabel
          </code>{' '}
          to render a secondary action button. Clicking it emits the{' '}
          <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">
            action
          </code>{' '}
          event.
        </p>
        <ComponentStory story={withActionStory} />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">
          Without dismiss button
        </h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Set{' '}
          <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">
            dismissButton={'{false}'}
          </code>{' '}
          for persistent notifications the user should not dismiss — e.g. read-only mode
          indicators or non-dismissible policy banners.
        </p>
        <ComponentStory story={noDismissStory} />
      </section>
    </div>
  );
}
