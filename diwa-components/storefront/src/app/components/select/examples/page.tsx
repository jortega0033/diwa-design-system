'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';

const FRUIT_OPTIONS = [
  { tag: 'diwa-select-option' as const, children: ['Please select…'] },
  { tag: 'diwa-select-option' as const, properties: { value: 'apple' }, children: ['Apple'] },
  { tag: 'diwa-select-option' as const, properties: { value: 'banana' }, children: ['Banana'] },
  { tag: 'diwa-select-option' as const, properties: { value: 'cherry' }, children: ['Cherry'] },
  { tag: 'diwa-select-option' as const, properties: { value: 'dragonfruit' }, children: ['Dragon Fruit'] },
  { tag: 'diwa-select-option' as const, properties: { value: 'elderberry' }, children: ['Elderberry'] },
  { tag: 'diwa-select-option' as const, properties: { value: 'fig' }, children: ['Fig'] },
];

const defaultStory: Story<'diwa-select'> = {
  state: {},
  generator: () => [{ tag: 'diwa-select' as const, properties: { label: 'Favourite fruit', name: 'fruit' }, children: FRUIT_OPTIONS }],
};

const withDescriptionStory: Story<'diwa-select'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-select' as const,
    properties: { label: 'Country', name: 'country', description: 'Select your country of residence.', state: 'error', message: 'A country is required.' },
    children: [
      { tag: 'diwa-select-option' as const, children: ['Please select…'] },
      { tag: 'diwa-select-option' as const, properties: { value: 'nl' }, children: ['Netherlands'] },
      { tag: 'diwa-select-option' as const, properties: { value: 'de' }, children: ['Germany'] },
      { tag: 'diwa-select-option' as const, properties: { value: 'be' }, children: ['Belgium'] },
    ],
  }],
};

const disabledStory: Story<'diwa-select'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-select' as const,
    properties: { label: 'Role', name: 'role', disabled: true },
    children: [
      { tag: 'diwa-select-option' as const, properties: { value: 'admin' }, children: ['Admin'] },
      { tag: 'diwa-select-option' as const, properties: { value: 'editor' }, children: ['Editor'] },
      { tag: 'diwa-select-option' as const, properties: { value: 'viewer' }, children: ['Viewer'] },
    ],
  }],
};

const compactStory: Story<'diwa-select'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-select' as const,
    properties: { label: 'Size', name: 'size', compact: true },
    children: [
      { tag: 'diwa-select-option' as const, properties: { value: 'sm' }, children: ['Small'] },
      { tag: 'diwa-select-option' as const, properties: { value: 'md' }, children: ['Medium'] },
      { tag: 'diwa-select-option' as const, properties: { value: 'lg' }, children: ['Large'] },
    ],
  }],
};

export default function SelectExamplesPage() {
  return (
    <div className="space-y-12">

      <section>
        <h2 className="text-xl font-semibold mb-1">Default</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Six options with an empty placeholder option for deselection. Type in the filter input to narrow the list.
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
          Set <code className="text-xs font-mono">disabled</code> to prevent interaction.
        </p>
        <ComponentStory story={disabledStory} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-1">Compact</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          The <code className="text-xs font-mono">compact</code> prop enables dense mode and reduces trigger height for toolbars or dense layouts.
        </p>
        <ComponentStory story={compactStory} />
      </section>

    </div>
  );
}
