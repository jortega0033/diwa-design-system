'use client';

import React from 'react';
import { Section, Code } from '@/components/docs';
import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';

// ── Individual story definitions ──────────────────────────────────────────

const basicStory: Story<'diwa-pagination'> = {
  state: {
    properties: {
      'total-items-count': 500,
      'items-per-page': 25,
      'active-page': 1,
      'show-last-page': true,
      theme: 'dark',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'diwa-pagination' as const,
      properties: (properties ?? {}) as Record<string, unknown>,
      events: {
        onupdate: {
          target: 'diwa-pagination',
          prop: 'active-page',
          eventValueKey: 'page',
        },
      },
    },
  ],
};

const shortStory: Story<'diwa-pagination'> = {
  state: {
    properties: {
      'total-items-count': 7,
      'items-per-page': 1,
      'active-page': 4,
      'show-last-page': true,
      theme: 'dark',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'diwa-pagination' as const,
      properties: (properties ?? {}) as Record<string, unknown>,
      events: {
        onupdate: {
          target: 'diwa-pagination',
          prop: 'active-page',
          eventValueKey: 'page',
        },
      },
    },
  ],
};

const noLastPageStory: Story<'diwa-pagination'> = {
  state: {
    properties: {
      'total-items-count': 1000,
      'items-per-page': 10,
      'active-page': 5,
      'show-last-page': false,
      theme: 'dark',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'diwa-pagination' as const,
      properties: (properties ?? {}) as Record<string, unknown>,
      events: {
        onupdate: {
          target: 'diwa-pagination',
          prop: 'active-page',
          eventValueKey: 'page',
        },
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────

export default function PaginationExamplesPage() {
  return (
    <div>
      <Section title="Basic">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          500 items at 25 per page gives 20 total pages. Ellipsis appears automatically once the
          window of 5 consecutive pages does not cover both ends.
        </p>
        <ComponentStory story={basicStory} />
      </Section>

      <Section title="Short list — no ellipsis">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          When the total page count is 7 or fewer, all pages are shown with no ellipsis.
        </p>
        <ComponentStory story={shortStory} />
      </Section>

      <Section title="Hide last-page shortcut">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          Set <Code>show-last-page=&quot;false&quot;</Code> to remove the direct link to the final
          page. Useful when the total count is unknown or very large.
        </p>
        <ComponentStory story={noLastPageStory} />
      </Section>
    </div>
  );
}
