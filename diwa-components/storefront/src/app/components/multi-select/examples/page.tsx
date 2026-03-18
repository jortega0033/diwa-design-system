'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';

const defaultStory: Story<'diwa-multi-select'> = {
  state: {},
  generator: () => [{ tag: 'diwa-multi-select' as const, properties: { label: 'Favourite fruits', name: 'fruits' }, children: [
    { tag: 'diwa-multi-select-option' as const, properties: { value: 'apple' }, children: ['Apple'] },
    { tag: 'diwa-multi-select-option' as const, properties: { value: 'banana' }, children: ['Banana'] },
    { tag: 'diwa-multi-select-option' as const, properties: { value: 'cherry' }, children: ['Cherry'] },
    { tag: 'diwa-multi-select-option' as const, properties: { value: 'dragonfruit' }, children: ['Dragon Fruit'] },
    { tag: 'diwa-multi-select-option' as const, properties: { value: 'elderberry' }, children: ['Elderberry'] },
    { tag: 'diwa-multi-select-option' as const, properties: { value: 'fig' }, children: ['Fig'] },
  ]}],
};

const withDescriptionStory: Story<'diwa-multi-select'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-multi-select' as const,
    properties: { label: 'Allergies', name: 'allergies', description: 'Select all that apply.', state: 'error', message: 'At least one allergy is required.' },
    children: [
      { tag: 'diwa-multi-select-option' as const, properties: { value: 'gluten' }, children: ['Gluten'] },
      { tag: 'diwa-multi-select-option' as const, properties: { value: 'dairy' }, children: ['Dairy'] },
      { tag: 'diwa-multi-select-option' as const, properties: { value: 'nuts' }, children: ['Tree nuts'] },
      { tag: 'diwa-multi-select-option' as const, properties: { value: 'shellfish' }, children: ['Shellfish'] },
    ],
  }],
};

const disabledStory: Story<'diwa-multi-select'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-multi-select' as const,
    properties: { label: 'Operating systems', name: 'os', disabled: true },
    children: [
      { tag: 'diwa-multi-select-option' as const, properties: { value: 'linux', selected: true }, children: ['Linux'] },
      { tag: 'diwa-multi-select-option' as const, properties: { value: 'macos' }, children: ['macOS'] },
      { tag: 'diwa-multi-select-option' as const, properties: { value: 'windows' }, children: ['Windows'] },
    ],
  }],
};

const compactStory: Story<'diwa-multi-select'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-multi-select' as const,
    properties: { label: 'Tags', name: 'tags', compact: true },
    children: [
      { tag: 'diwa-multi-select-option' as const, properties: { value: 'bug' }, children: ['Bug'] },
      { tag: 'diwa-multi-select-option' as const, properties: { value: 'feature' }, children: ['Feature'] },
      { tag: 'diwa-multi-select-option' as const, properties: { value: 'docs' }, children: ['Docs'] },
      { tag: 'diwa-multi-select-option' as const, properties: { value: 'chore' }, children: ['Chore'] },
    ],
  }],
};

const disabledOptionStory: Story<'diwa-multi-select'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-multi-select' as const,
    properties: { label: 'Subscription tier', name: 'tier' },
    children: [
      { tag: 'diwa-multi-select-option' as const, properties: { value: 'free' }, children: ['Free'] },
      { tag: 'diwa-multi-select-option' as const, properties: { value: 'pro' }, children: ['Pro'] },
      { tag: 'diwa-multi-select-option' as const, properties: { value: 'enterprise', disabled: true }, children: ['Enterprise (contact sales)'] },
    ],
  }],
};

export default function MultiSelectExamplesPage() {
  return (
    <div className="space-y-12">

      <section>
        <h2 className="text-xl font-semibold mb-1">Default</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Six options with no pre-selection. Type in the filter input to narrow the list.
        </p>
        <ComponentStory story={defaultStory} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-1">With description and message</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Use <code className="text-xs font-mono">description</code> to add a hint beneath the label, and{' '}
          <code className="text-xs font-mono">message</code> + <code className="text-xs font-mono">state</code>{' '}
          to show validation feedback.
        </p>
        <ComponentStory story={withDescriptionStory} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-1">Disabled</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          The entire component is non-interactive. The trigger is dimmed and keyboard focus is removed.
        </p>
        <ComponentStory story={disabledStory} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-1">Compact</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Enables dense mode by reducing the trigger height from 44 px (default touch target) to 32 px. Use in toolbars, sidebars, or data-dense layouts.
        </p>
        <ComponentStory story={compactStory} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-1">With disabled options</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Individual options can be disabled via the <code className="text-xs font-mono">disabled</code> attribute
          on <code className="text-xs font-mono">diwa-multi-select-option</code>.
        </p>
        <ComponentStory story={disabledOptionStory} />
      </section>

    </div>
  );
}

