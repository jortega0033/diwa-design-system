'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';

const calendarViewStory: Story<'diwa-segmented-control'> = {
  state: { properties: { value: 'week' } },
  generator: ({ properties } = {}) => [{
    tag: 'diwa-segmented-control' as const,
    properties: { value: (properties as Record<string, unknown>)?.value },
    events: {
      onupdate: { target: 'diwa-segmented-control', prop: 'value', eventValueKey: 'value' },
    },
    children: [
      { tag: 'diwa-segmented-control-item' as const, properties: { value: 'day' }, children: ['Day'] },
      { tag: 'diwa-segmented-control-item' as const, properties: { value: 'week' }, children: ['Week'] },
      { tag: 'diwa-segmented-control-item' as const, properties: { value: 'month' }, children: ['Month'] },
    ],
  }],
};

const compactStory: Story<'diwa-segmented-control'> = {
  state: { properties: { value: 'normal' } },
  generator: ({ properties } = {}) => [{
    tag: 'diwa-segmented-control' as const,
    properties: { value: (properties as Record<string, unknown>)?.value, compact: true },
    events: {
      onupdate: { target: 'diwa-segmented-control', prop: 'value', eventValueKey: 'value' },
    },
    children: [
      { tag: 'diwa-segmented-control-item' as const, properties: { value: 'compact' }, children: ['Compact'] },
      { tag: 'diwa-segmented-control-item' as const, properties: { value: 'normal' }, children: ['Normal'] },
      { tag: 'diwa-segmented-control-item' as const, properties: { value: 'comfortable' }, children: ['Comfortable'] },
    ],
  }],
};

const disabledStory: Story<'diwa-segmented-control'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-segmented-control' as const,
    properties: { value: 'week', disabled: true },
    children: [
      { tag: 'diwa-segmented-control-item' as const, properties: { value: 'day' }, children: ['Day'] },
      { tag: 'diwa-segmented-control-item' as const, properties: { value: 'week' }, children: ['Week'] },
      { tag: 'diwa-segmented-control-item' as const, properties: { value: 'month' }, children: ['Month'] },
    ],
  }],
};

export default function SegmentedControlExamplesPage() {
  return (
    <div className="space-y-12">

      <section>
        <h2 className="text-xl font-semibold mb-1">Basic selection</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Mutually exclusive option group. Each item emits an <code className="text-xs font-mono">update</code> event with the selected value.
        </p>
        <ComponentStory story={calendarViewStory} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-1">Dense mode (compact)</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Use <code className="text-xs font-mono">compact</code> to enable dense mode and reduce item height for toolbars and dense layouts.
        </p>
        <ComponentStory story={compactStory} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-1">Disabled</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Setting <code className="text-xs font-mono">disabled</code> on the container propagates to all child items.
        </p>
        <ComponentStory story={disabledStory} />
      </section>

    </div>
  );
}

