'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import { CodeSnippet } from '@/components/docs';
import type { Story } from '@/models/story';

// Simple description-only variant used as the primary code example
const simpleStory: Story<'diwa-popover'> = {
  state: {},
  generator: () => [
    { tag: 'diwa-popover' as const, properties: { description: 'Additional context about this field.' } },
  ],
};

const directionsStory: Story<'diwa-popover'> = {
  state: {},
  generator: () => [
    { tag: 'diwa-popover' as const, properties: { direction: 'bottom', description: 'Opens below the trigger.' } },
    { tag: 'diwa-popover' as const, properties: { direction: 'top', description: 'Opens above the trigger.' } },
    { tag: 'diwa-popover' as const, properties: { direction: 'start', description: 'Opens to the start (left in LTR).' } },
    { tag: 'diwa-popover' as const, properties: { direction: 'end', description: 'Opens to the end (right in LTR).' } },
  ],
};

export default function PopoverExamplesPage() {
  return (
    <div className="space-y-12">

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Default</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          A popover triggered by an info icon. Pass a <code className="text-xs font-mono">description</code> string for simple text content, or use the default slot for richer markup.
        </p>
        <ComponentStory story={simpleStory} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Directions</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">Click each info icon to see the panel open in different directions.</p>
        <ComponentStory story={directionsStory} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Rich content via default slot</h2>
        <div className="p-10 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] flex items-center gap-3">
          <span className="text-sm text-[var(--diwa-text-primary)]">Transcript quality</span>
          <diwa-popover direction="bottom">
            <div>
              <p className="text-sm font-semibold mb-1">Quality tiers</p>
              <ul className="text-sm text-[var(--diwa-text-secondary)] space-y-1 list-disc pl-4">
                <li><strong className="text-[var(--diwa-text-primary)]">High</strong> — full accuracy, higher cost</li>
                <li><strong className="text-[var(--diwa-text-primary)]">Medium</strong> — balanced cost/quality</li>
                <li><strong className="text-[var(--diwa-text-primary)]">Low</strong> — fast, lower accuracy</li>
              </ul>
            </div>
          </diwa-popover>
        </div>
        <CodeSnippet code={`<diwa-popover direction="bottom">
  <div>
    <p>Quality tiers</p>
    <ul>
      <li>High — full accuracy, higher cost</li>
      <li>Medium — balanced cost/quality</li>
      <li>Low — fast, lower accuracy</li>
    </ul>
  </div>
</diwa-popover>`} />
      </section>

    </div>
  );
}
