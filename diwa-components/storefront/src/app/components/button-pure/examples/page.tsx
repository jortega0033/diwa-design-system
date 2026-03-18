'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';

const alignLabelStory: Story<'diwa-button-pure'> = {
  generator: () => [
    { tag: 'diwa-button-pure' as const, properties: { 'align-label': 'end' }, children: ['Read more'] },
    { tag: 'diwa-button-pure' as const, properties: { 'align-label': 'start' }, children: ['Go back'] },
  ],
};

const iconOnlyStory: Story<'diwa-button-pure'> = {
  generator: () => [
    { tag: 'diwa-button-pure' as const, properties: { icon: 'x', 'hide-label': true, label: 'Close' }, children: ['Close'] },
    { tag: 'diwa-button-pure' as const, properties: { icon: 'settings', 'hide-label': true, label: 'Settings' }, children: ['Settings'] },
    { tag: 'diwa-button-pure' as const, properties: { icon: 'share-2', 'hide-label': true, label: 'Share' }, children: ['Share'] },
  ],
};

const stretchStory: Story<'diwa-button-pure'> = {
  generator: () => [
    { tag: 'diwa-button-pure' as const, properties: { stretch: true, 'align-label': 'start' }, children: ['Expand section'] },
  ],
};

const sizesStory: Story<'diwa-button-pure'> = {
  generator: () => [
    { tag: 'diwa-button-pure' as const, properties: { size: 'sm' }, children: ['Small'] },
    { tag: 'diwa-button-pure' as const, properties: { size: 'md' }, children: ['Medium'] },
    { tag: 'diwa-button-pure' as const, properties: { size: 'lg' }, children: ['Large'] },
  ],
};

const statesStory: Story<'diwa-button-pure'> = {
  generator: () => [
    { tag: 'diwa-button-pure' as const, properties: {}, children: ['Default'] },
    { tag: 'diwa-button-pure' as const, properties: { active: true }, children: ['Active'] },
    { tag: 'diwa-button-pure' as const, properties: { underline: true }, children: ['Underline'] },
    { tag: 'diwa-button-pure' as const, properties: { loading: true }, children: ['Loading'] },
    { tag: 'diwa-button-pure' as const, properties: { disabled: true }, children: ['Disabled'] },
  ],
};

export default function ButtonPureExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold mb-4">Label alignment</h2>
        <ComponentStory story={alignLabelStory} previewClassName="gap-4" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Icon only</h2>
        <ComponentStory story={iconOnlyStory} previewClassName="gap-4" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Stretch</h2>
        <ComponentStory story={stretchStory} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Sizes</h2>
        <ComponentStory story={sizesStory} previewClassName="gap-4" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">States</h2>
        <ComponentStory story={statesStory} previewClassName="gap-4 flex-wrap" />
      </section>
    </div>
  );
}
