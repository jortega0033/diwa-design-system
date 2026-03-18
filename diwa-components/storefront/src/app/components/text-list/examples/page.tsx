'use client';

import React from 'react';
import { Code } from '@/components/docs';
import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';

// Story objects

const unorderedStory: Story<'diwa-text-list'> = {
  generator: () => [
    {
      tag: 'diwa-text-list' as const,
      properties: { type: 'unordered' },
      children: [
        { tag: 'diwa-text-list-item' as const, children: ['Design tokens for colour, typography, and spacing'] },
        { tag: 'diwa-text-list-item' as const, children: ['Stencil web components with shadow DOM'] },
        { tag: 'diwa-text-list-item' as const, children: ['CSS-in-JS styling with full token cascade'] },
        { tag: 'diwa-text-list-item' as const, children: ['Next.js storefront with live configurator'] },
      ],
    },
  ],
};

const orderedStory: Story<'diwa-text-list'> = {
  generator: () => [
    {
      tag: 'diwa-text-list' as const,
      properties: { type: 'ordered' },
      children: [
        { tag: 'diwa-text-list-item' as const, children: ['Install the package via npm'] },
        { tag: 'diwa-text-list-item' as const, children: ['Import the component loader'] },
        { tag: 'diwa-text-list-item' as const, children: ['Place the custom element in your HTML or JSX'] },
        { tag: 'diwa-text-list-item' as const, children: ['Override tokens with CSS custom properties as needed'] },
      ],
    },
  ],
};

const inlineStory: Story<'diwa-text-list'> = {
  generator: () => [
    {
      tag: 'diwa-text-list' as const,
      properties: { type: 'inline' },
      children: [
        { tag: 'diwa-text-list-item' as const, children: ['React'] },
        { tag: 'diwa-text-list-item' as const, children: ['Vue'] },
        { tag: 'diwa-text-list-item' as const, children: ['Angular'] },
        { tag: 'diwa-text-list-item' as const, children: ['Vanilla JS'] },
      ],
    },
  ],
};

const nestedStory: Story<'diwa-text-list'> = {
  generator: () => [
    {
      tag: 'diwa-text-list' as const,
      properties: { type: 'unordered' },
      children: [
        {
          tag: 'diwa-text-list-item' as const,
          children: [
            'Design',
            {
              tag: 'diwa-text-list' as const,
              properties: { type: 'unordered' },
              children: [
                { tag: 'diwa-text-list-item' as const, children: ['Tokens'] },
                { tag: 'diwa-text-list-item' as const, children: ['Icons'] },
                { tag: 'diwa-text-list-item' as const, children: ['Motion'] },
              ],
            },
          ],
        },
        {
          tag: 'diwa-text-list-item' as const,
          children: [
            'Development',
            {
              tag: 'diwa-text-list' as const,
              properties: { type: 'unordered' },
              children: [
                { tag: 'diwa-text-list-item' as const, children: ['Components'] },
                { tag: 'diwa-text-list-item' as const, children: ['Utilities'] },
                { tag: 'diwa-text-list-item' as const, children: ['Generators'] },
              ],
            },
          ],
        },
        {
          tag: 'diwa-text-list-item' as const,
          children: [
            'Documentation',
            {
              tag: 'diwa-text-list' as const,
              properties: { type: 'unordered' },
              children: [
                { tag: 'diwa-text-list-item' as const, children: ['Usage guidelines'] },
                { tag: 'diwa-text-list-item' as const, children: ['API reference'] },
                { tag: 'diwa-text-list-item' as const, children: ['Accessibility'] },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// Page

export default function TextListExamplesPage() {
  return (
    <div className="space-y-12">

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Unordered list</h2>
        <ComponentStory story={unorderedStory} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Ordered list</h2>
        <ComponentStory story={orderedStory} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Inline list</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Inline lists render as a horizontal flex row - useful for tags, breadcrumbs, or comma-separated values.
        </p>
        <ComponentStory story={inlineStory} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Nested list</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Place a <Code>diwa-text-list</Code> inside a <Code>diwa-text-list-item</Code> to create a nested hierarchy.
          The inner list can use any <Code>type</Code> independently of the outer list.
        </p>
        <ComponentStory story={nestedStory} />
      </section>

    </div>
  );
}

