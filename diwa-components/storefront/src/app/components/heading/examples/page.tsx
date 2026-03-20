'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import { Playground } from '@/components/playground/Playground';
import type { Story } from '@/models/story';
import type { FrameworkCode } from '@/models/framework';

// ─── Type scale ──────────────────────────────────────────────────────────────

const typeScaleStory: Story<'diwa-heading'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'space-y-4' },
      children: [
        { tag: 'diwa-heading' as const, properties: { size: 'display' }, children: ['Display — Diwa Design System'] },
        { tag: 'diwa-heading' as const, properties: { size: 'h1' },      children: ['H1 — Diwa Design System'] },
        { tag: 'diwa-heading' as const, properties: { size: 'h2' },      children: ['H2 — Diwa Design System'] },
        { tag: 'diwa-heading' as const, properties: { size: 'h3' },      children: ['H3 — Diwa Design System'] },
        { tag: 'diwa-heading' as const, properties: { size: 'h4' },      children: ['H4 — Diwa Design System'] },
        { tag: 'diwa-heading' as const, properties: { size: 'h5' },      children: ['H5 — Diwa Design System'] },
        { tag: 'diwa-heading' as const, properties: { size: 'h6' },      children: ['H6 — Diwa Design System'] },
      ],
    },
  ],
};

// ─── Weight variants ─────────────────────────────────────────────────────────

const weightStory: Story<'diwa-heading'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'space-y-3' },
      children: [
        { tag: 'diwa-heading' as const, properties: { size: 'h3', weight: 'semibold' }, children: ['Semibold heading'] },
        { tag: 'diwa-heading' as const, properties: { size: 'h3', weight: 'bold' },     children: ['Bold heading'] },
      ],
    },
  ],
};

// ─── Colour variants ─────────────────────────────────────────────────────────

const colorStory: Story<'diwa-heading'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'space-y-3' },
      children: [
        { tag: 'diwa-heading' as const, properties: { size: 'h3', color: 'primary' },   children: ['Primary heading'] },
        { tag: 'diwa-heading' as const, properties: { size: 'h3', color: 'secondary' }, children: ['Secondary heading'] },
      ],
    },
  ],
};

// ─── Alignment ───────────────────────────────────────────────────────────────

const alignStory: Story<'diwa-heading'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'space-y-3' },
      children: [
        { tag: 'diwa-heading' as const, properties: { size: 'h4', align: 'start' },  children: ['Start aligned heading'] },
        { tag: 'diwa-heading' as const, properties: { size: 'h4', align: 'center' }, children: ['Center aligned heading'] },
        { tag: 'diwa-heading' as const, properties: { size: 'h4', align: 'end' },    children: ['End aligned heading'] },
      ],
    },
  ],
};

// ─── Semantic hierarchy ──────────────────────────────────────────────────────

const hierarchyStory: Story<'diwa-heading'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'space-y-2' },
      children: [
        { tag: 'diwa-heading' as const, properties: { size: 'h1' },                          children: ['Page title'] },
        { tag: 'diwa-heading' as const, properties: { size: 'h2' },                          children: ['Section heading'] },
        { tag: 'diwa-heading' as const, properties: { size: 'h3' },                          children: ['Subsection heading'] },
        { tag: 'diwa-heading' as const, properties: { size: 'h4', color: 'secondary' },      children: ['Card title'] },
        { tag: 'diwa-heading' as const, properties: { size: 'h5', color: 'secondary' },      children: ['Group label'] },
        { tag: 'diwa-heading' as const, properties: { size: 'h6', color: 'secondary' },      children: ['Sub-label'] },
      ],
    },
  ],
};

// ─── Tag override ────────────────────────────────────────────────────────────

const tagOverrideStory: Story<'diwa-heading'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'space-y-3' },
      children: [
        {
          tag: 'diwa-heading' as const,
          properties: { size: 'h1', tag: 'h3' },
          children: ['Visual size h1, semantic h3'],
        },
        {
          tag: 'diwa-heading' as const,
          properties: { size: 'h5', tag: 'h2' },
          children: ['Visual size h5, semantic h2'],
        },
      ],
    },
  ],
};

// ─── Ellipsis ────────────────────────────────────────────────────────────────

const ellipsisCode: FrameworkCode = {
  html: `<diwa-heading size="h3" ellipsis style="display: block; max-width: 360px">
  Diwa Design System — Building the future, one component at a time.
</diwa-heading>`,
  react: `<diwa-heading
  size="h3"
  ellipsis
  style={{ display: 'block', maxWidth: '360px' }}
>
  Diwa Design System — Building the future, one component at a time.
</diwa-heading>`,
  angular: `<diwa-heading
  size="h3"
  ellipsis
  style="display: block; max-width: 360px"
>
  Diwa Design System — Building the future, one component at a time.
</diwa-heading>`,
  vue: `<diwa-heading
  size="h3"
  ellipsis
  :style="{ display: 'block', maxWidth: '360px' }"
>
  Diwa Design System — Building the future, one component at a time.
</diwa-heading>`,
};

// ─── Hero editorial demo ─────────────────────────────────────────────────────

const heroCode: FrameworkCode = {
  html: `<diwa-heading size="display">Diwa Design System</diwa-heading>
<diwa-heading size="h3" color="secondary" style="margin-top: 12px">
  Build faster. Ship consistently. Scale with confidence.
</diwa-heading>`,
  react: `<>
  <diwa-heading size="display">Diwa Design System</diwa-heading>
  <diwa-heading size="h3" color="secondary" style={{ marginTop: '12px' }}>
    Build faster. Ship consistently. Scale with confidence.
  </diwa-heading>
</>`,
  angular: `<diwa-heading size="display">Diwa Design System</diwa-heading>
<diwa-heading size="h3" color="secondary" style="margin-top: 12px">
  Build faster. Ship consistently. Scale with confidence.
</diwa-heading>`,
  vue: `<diwa-heading size="display">Diwa Design System</diwa-heading>
<diwa-heading size="h3" color="secondary" :style="{ marginTop: '12px' }">
  Build faster. Ship consistently. Scale with confidence.
</diwa-heading>`,
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HeadingExamplesPage() {
  return (
    <div className="space-y-12">

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Type scale</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          All seven heading sizes rendered with fluid type tokens — sizes scale fluidly between viewport breakpoints.
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
          to decouple visual size from semantic level — useful when page structure constraints differ from visual intent.
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
            Diwa Design System — Building the future, one component at a time.
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
            <diwa-heading size="display">Diwa Design System</diwa-heading>
            <diwa-heading size="h3" color="secondary" style={{ marginTop: '12px' }}>
              Build faster. Ship consistently. Scale with confidence.
            </diwa-heading>
          </div>
        </Playground>
      </section>

    </div>
  );
}
