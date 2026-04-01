'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import { Playground } from '@/components/playground/Playground';
import type { Story } from '@/models/story';
import type { FrameworkCode } from '@/models/framework';

const QUICK_FOX = 'The quick brown fox jumps over the lazy dog';

const typeScaleStory: Story<'diwa-heading'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'space-y-4' },
      children: [
        { tag: 'diwa-heading' as const, properties: { size: 'display' }, children: [`Display - ${QUICK_FOX}`] },
        { tag: 'diwa-heading' as const, properties: { size: 'h1' }, children: [`H1 - ${QUICK_FOX}`] },
        { tag: 'diwa-heading' as const, properties: { size: 'h2' }, children: [`H2 - ${QUICK_FOX}`] },
        { tag: 'diwa-heading' as const, properties: { size: 'h3' }, children: [`H3 - ${QUICK_FOX}`] },
        { tag: 'diwa-heading' as const, properties: { size: 'h4' }, children: [`H4 - ${QUICK_FOX}`] },
        { tag: 'diwa-heading' as const, properties: { size: 'h5' }, children: [`H5 - ${QUICK_FOX}`] },
        { tag: 'diwa-heading' as const, properties: { size: 'h6' }, children: [`H6 - ${QUICK_FOX}`] },
      ],
    },
  ],
};

const weightStory: Story<'diwa-heading'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'space-y-3' },
      children: [
        { tag: 'diwa-heading' as const, properties: { size: 'h3', weight: 'semibold' }, children: [QUICK_FOX] },
        { tag: 'diwa-heading' as const, properties: { size: 'h3', weight: 'bold' }, children: [QUICK_FOX] },
      ],
    },
  ],
};

const colorStory: Story<'diwa-heading'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'space-y-3' },
      children: [
        { tag: 'diwa-heading' as const, properties: { size: 'h3', color: 'primary' }, children: [QUICK_FOX] },
        { tag: 'diwa-heading' as const, properties: { size: 'h3', color: 'secondary' }, children: [QUICK_FOX] },
      ],
    },
  ],
};

const alignStory: Story<'diwa-heading'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'space-y-3' },
      children: [
        { tag: 'diwa-heading' as const, properties: { size: 'h4', align: 'start' }, children: [QUICK_FOX] },
        { tag: 'diwa-heading' as const, properties: { size: 'h4', align: 'center' }, children: [QUICK_FOX] },
        { tag: 'diwa-heading' as const, properties: { size: 'h4', align: 'end' }, children: [QUICK_FOX] },
      ],
    },
  ],
};

const hierarchyStory: Story<'diwa-heading'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'space-y-2' },
      children: [
        { tag: 'diwa-heading' as const, properties: { size: 'h1' }, children: [QUICK_FOX] },
        { tag: 'diwa-heading' as const, properties: { size: 'h2' }, children: [QUICK_FOX] },
        { tag: 'diwa-heading' as const, properties: { size: 'h3' }, children: [QUICK_FOX] },
        { tag: 'diwa-heading' as const, properties: { size: 'h4', color: 'secondary' }, children: [QUICK_FOX] },
        { tag: 'diwa-heading' as const, properties: { size: 'h5', color: 'secondary' }, children: [QUICK_FOX] },
        { tag: 'diwa-heading' as const, properties: { size: 'h6', color: 'secondary' }, children: [QUICK_FOX] },
      ],
    },
  ],
};

const tagOverrideStory: Story<'diwa-heading'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'space-y-3' },
      children: [
        { tag: 'diwa-heading' as const, properties: { size: 'h1', tag: 'h3' }, children: [QUICK_FOX] },
        { tag: 'diwa-heading' as const, properties: { size: 'h5', tag: 'h2' }, children: [QUICK_FOX] },
      ],
    },
  ],
};

const ellipsisCode: FrameworkCode = {
  html: `<diwa-heading size="h3" ellipsis style="display: block; max-width: 360px">
  The quick brown fox jumps over the lazy dog and keeps running through typography tests.
</diwa-heading>`,
  react: `<diwa-heading
  size="h3"
  ellipsis
  style={{ display: 'block', maxWidth: '360px' }}
>
  The quick brown fox jumps over the lazy dog and keeps running through typography tests.
</diwa-heading>`,
  angular: `<diwa-heading
  size="h3"
  ellipsis
  style="display: block; max-width: 360px"
>
  The quick brown fox jumps over the lazy dog and keeps running through typography tests.
</diwa-heading>`,
  vue: `<diwa-heading
  size="h3"
  ellipsis
  :style="{ display: 'block', maxWidth: '360px' }"
>
  The quick brown fox jumps over the lazy dog and keeps running through typography tests.
</diwa-heading>`,
};

const heroCode: FrameworkCode = {
  html: `<diwa-heading size="display">The quick brown fox jumps over the lazy dog</diwa-heading>
<diwa-heading size="h3" color="secondary" style="margin-top: 12px">
  The quick brown fox jumps over the lazy dog and keeps typography readable.
</diwa-heading>`,
  react: `<>
  <diwa-heading size="display">The quick brown fox jumps over the lazy dog</diwa-heading>
  <diwa-heading size="h3" color="secondary" style={{ marginTop: '12px' }}>
    The quick brown fox jumps over the lazy dog and keeps typography readable.
  </diwa-heading>
</>`,
  angular: `<diwa-heading size="display">The quick brown fox jumps over the lazy dog</diwa-heading>
<diwa-heading size="h3" color="secondary" style="margin-top: 12px">
  The quick brown fox jumps over the lazy dog and keeps typography readable.
</diwa-heading>`,
  vue: `<diwa-heading size="display">The quick brown fox jumps over the lazy dog</diwa-heading>
<diwa-heading size="h3" color="secondary" :style="{ marginTop: '12px' }">
  The quick brown fox jumps over the lazy dog and keeps typography readable.
</diwa-heading>`,
};

export default function HeadingExamplesPage() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Type scale</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          All seven heading sizes rendered with fluid type tokens - sizes scale fluidly between viewport breakpoints.
        </p>
        <ComponentStory story={typeScaleStory} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Semantic hierarchy</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Use the size scale to reflect document structure. Screen readers and search engines both rely on correct heading order.
        </p>
        <ComponentStory story={hierarchyStory} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Weight variants</h2>
        <ComponentStory story={weightStory} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Colour variants</h2>
        <ComponentStory story={colorStory} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Alignment</h2>
        <ComponentStory story={alignStory} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Tag override</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Use the <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">tag</code> prop
          to decouple visual size from semantic level - useful when page structure constraints differ from visual intent.
        </p>
        <ComponentStory story={tagOverrideStory} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Ellipsis truncation</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Set <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">ellipsis</code> on a
          fixed-width host to clip overflow to a single line.
        </p>
        <Playground frameworkCode={ellipsisCode}>
          <diwa-heading size="h3" ellipsis style={{ display: 'block', maxWidth: '360px' }}>
            The quick brown fox jumps over the lazy dog and keeps running through typography tests.
          </diwa-heading>
        </Playground>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Editorial hero</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Pair a <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">display</code> heading
          with a secondary subtitle for high-impact hero sections.
        </p>
        <Playground frameworkCode={heroCode}>
          <div>
            <diwa-heading size="display">The quick brown fox jumps over the lazy dog</diwa-heading>
            <diwa-heading size="h3" color="secondary" style={{ marginTop: '12px' }}>
              The quick brown fox jumps over the lazy dog and keeps typography readable.
            </diwa-heading>
          </div>
        </Playground>
      </section>
    </div>
  );
}
