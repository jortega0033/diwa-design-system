'use client';

import React, { useRef, useState } from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import { Playground } from '@/components/playground/Playground';
import type { Story } from '@/models/story';
import type { FrameworkCode } from '@/models/framework';

// ── Individual stories ───────────────────────────────────────────────────────

const defaultStory: Story<'diwa-accordion'> = {
  state: { properties: { heading: 'What is diwa?', open: false } },
  generator: ({ properties } = {}) => [
    {
      tag: 'diwa-accordion' as const,
      properties,
      events: { onupdate: { target: 'diwa-accordion', prop: 'open', eventValueKey: 'open' } },
      children: [
        'Diwa is a Stencil-based design system that provides accessible, themed web components. It follows a controlled component pattern throughout.',
      ],
    },
  ],
};

const openStory: Story<'diwa-accordion'> = {
  state: { properties: { heading: 'Open by default', open: true } },
  generator: ({ properties } = {}) => [
    {
      tag: 'diwa-accordion' as const,
      properties,
      events: { onupdate: { target: 'diwa-accordion', prop: 'open', eventValueKey: 'open' } },
      children: [
        'This accordion starts in the open state by passing open={true}. The consumer controls what state it is in at any time.',
      ],
    },
  ],
};

const compactStory: Story<'diwa-accordion'> = {
  state: { properties: { heading: 'Dense mode (compact)', open: false, compact: true } },
  generator: ({ properties } = {}) => [
    {
      tag: 'diwa-accordion' as const,
      properties,
      events: { onupdate: { target: 'diwa-accordion', prop: 'open', eventValueKey: 'open' } },
      children: [
        'The compact prop enables dense mode and reduces header padding and font size for sidebars, data tables, or configuration panels.',
      ],
    },
  ],
};

// ── FAQ group — each accordion managed independently ─────────────────────────

const FAQ_ITEMS = [
  {
    heading: 'How do I control the open state?',
    content:
      'Listen to the update event on the accordion element. The event detail contains { open: boolean } representing the requested new state. Set your local state, then pass it back to the open prop.',
  },
  {
    heading: 'Can multiple accordions be open at the same time?',
    content:
      'Yes — because each accordion manages nothing internally, the consumer decides. Keep separate open booleans per item to allow multiple panels open simultaneously, or track a single active index for exclusive behaviour.',
  },
  {
    heading: 'What heading level should I pick?',
    content:
      'Choose the level that fits your page heading hierarchy at the point the accordion appears. If the nearest ancestor heading is h2, use headingTag="h3". The default is h2 — appropriate for top-level FAQ sections.',
  },
];

const faqFrameworkCode: FrameworkCode = {
  html: `<diwa-accordion heading="How do I control the open state?" open="false">
  Listen to the update event. The detail contains { open: boolean } — set your local state and pass it back.
</diwa-accordion>
<diwa-accordion heading="Can multiple accordions be open at the same time?" open="false">
  Yes — each accordion has no internal state. Track a separate open boolean per item.
</diwa-accordion>
<diwa-accordion heading="What heading level should I pick?" open="false">
  Choose the level that fits your page hierarchy. The default heading tag is h2.
</diwa-accordion>`,
  react: `const [openStates, setOpenStates] = React.useState([false, false, false]);
const toggle = (i) => setOpenStates(prev => prev.map((v, idx) => idx === i ? !v : v));

{faqItems.map((item, i) => (
  <diwa-accordion
    key={item.heading}
    heading={item.heading}
    open={openStates[i]}
    onupdate={() => toggle(i)}
  >
    {item.content}
  </diwa-accordion>
))}`,
  angular: `<diwa-accordion
  *ngFor="let item of faqItems; let i = index"
  [heading]="item.heading"
  [open]="openStates[i]"
  (update)="toggle(i)"
>
  {{ item.content }}
</diwa-accordion>`,
  vue: `<diwa-accordion
  v-for="(item, i) in faqItems"
  :key="item.heading"
  :heading="item.heading"
  :open="openStates[i]"
  @update="toggle(i)"
>
  {{ item.content }}
</diwa-accordion>`,
};

function AccordionGroup() {
  const [openStates, setOpenStates] = useState<boolean[]>(FAQ_ITEMS.map(() => false));

  const toggle = (i: number) =>
    setOpenStates((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div className="w-full max-w-2xl">
      {FAQ_ITEMS.map((item, i) => (
        <diwa-accordion
          key={item.heading}
          suppressHydrationWarning
          heading={item.heading}
          open={openStates[i]}
          onupdate={(e: CustomEvent<{ open: boolean }>) => toggle(i)}
        >
          {item.content}
        </diwa-accordion>
      ))}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AccordionExamplesPage() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Default</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Closed by default. Click the header to expand or collapse the panel.
        </p>
        <ComponentStory story={defaultStory} />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Open by default</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Pass <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">open=true</code> to render the accordion in the expanded state on first load.
        </p>
        <ComponentStory story={openStory} />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Dense mode (compact)</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          The <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">compact</code> prop enables dense mode and reduces header padding and font size.
        </p>
        <ComponentStory story={compactStory} />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Group — FAQ pattern</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Multiple independently controlled accordions. The consumer owns state for each panel.
        </p>
        <Playground frameworkCode={faqFrameworkCode}>
          <AccordionGroup />
        </Playground>
      </section>
    </div>
  );
}
