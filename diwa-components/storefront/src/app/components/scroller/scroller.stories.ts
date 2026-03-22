import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

// ── Data ──────────────────────────────────────────────────────────────────────

const TECH_TAGS = [
  'React', 'TypeScript', 'Stencil', 'Design System', 'Web Components',
  'CSS Custom Properties', 'Accessibility', 'Dark Mode', 'Design Tokens',
  'Shadow DOM', 'Slots', 'Custom Events', 'Theming', 'Server-Side Rendering',
  'Progressive Enhancement',
];

const CARDS = [
  { title: 'Design Tokens', desc: 'CSS custom properties for consistent theming' },
  { title: 'Components', desc: 'Reusable UI building blocks with a unified API' },
  { title: 'Accessibility', desc: 'WCAG 2.1 compliant out of the box' },
  { title: 'Dark Mode', desc: 'First-class dark theme support built in' },
  { title: 'TypeScript', desc: 'Fully typed API surface across all frameworks' },
  { title: 'Web Standards', desc: 'Native custom elements with Shadow DOM' },
  { title: 'Framework Agnostic', desc: 'Works with React, Angular, Vue, and vanilla JS' },
  { title: 'Motion Safe', desc: 'Respects prefers-reduced-motion globally' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeCard(title: string, desc: string): ElementConfig<HTMLTagOrComponent> {
  return {
    tag: 'div' as const,
    properties: {
      style: {
        width: '180px',
        flexShrink: 0,
        background: 'var(--diwa-bg-elevated)',
        border: '1px solid var(--diwa-border)',
        borderRadius: '8px',
        padding: '16px',
        boxSizing: 'border-box',
      },
    },
    children: [
      {
        tag: 'p' as const,
        properties: {
          style: {
            margin: '0 0 6px',
            fontWeight: '600',
            fontSize: '13px',
            color: 'var(--diwa-text-primary)',
            lineHeight: '1.3',
          },
        },
        children: [title],
      },
      {
        tag: 'p' as const,
        properties: {
          style: {
            margin: '0',
            fontSize: '12px',
            color: 'var(--diwa-text-secondary)',
            lineHeight: '1.5',
          },
        },
        children: [desc],
      },
    ],
  };
}

function tagRow(
  tags: string[],
  variant: string,
): ElementConfig<HTMLTagOrComponent> {
  return {
    tag: 'div' as const,
    properties: { style: { display: 'flex', gap: '12px', padding: '12px 4px' } },
    children: tags.map((label) => ({
      tag: 'diwa-tag' as const,
      properties: { variant },
      children: [label],
    })),
  };
}

// ── Stories ───────────────────────────────────────────────────────────────────

export const scrollerTagListStory: Story<'diwa-scroller'> = {
  generator: () => [
    {
      tag: 'diwa-scroller' as const,
      properties: {},
      children: [tagRow(TECH_TAGS, 'neutral')],
    },
  ],
};

export const scrollerScrollbarStory: Story<'diwa-scroller'> = {
  generator: () => [
    {
      tag: 'diwa-scroller' as const,
      properties: { scrollbar: true },
      children: [tagRow(TECH_TAGS, 'primary')],
    },
  ],
};

export const scrollerCardsStory: Story<'diwa-scroller'> = {
  generator: () => [
    {
      tag: 'diwa-scroller' as const,
      properties: {},
      children: [
        {
          tag: 'div' as const,
          properties: { style: { display: 'flex', gap: '16px', padding: '16px 4px' } },
          children: CARDS.map(({ title, desc }) => makeCard(title, desc)),
        },
      ],
    },
  ],
};

export const scrollerAlignTopStory: Story<'diwa-scroller'> = {
  generator: () => [
    {
      tag: 'diwa-scroller' as const,
      properties: { 'align-scroll-indicator': 'top' },
      children: [tagRow(TECH_TAGS, 'neutral')],
    },
  ],
};

export const scrollerAlignCenterStory: Story<'diwa-scroller'> = {
  generator: () => [
    {
      tag: 'diwa-scroller' as const,
      properties: { 'align-scroll-indicator': 'center' },
      children: [tagRow(TECH_TAGS, 'neutral')],
    },
  ],
};

export const scrollerAlignBottomStory: Story<'diwa-scroller'> = {
  generator: () => [
    {
      tag: 'diwa-scroller' as const,
      properties: { 'align-scroll-indicator': 'bottom' },
      children: [tagRow(TECH_TAGS, 'neutral')],
    },
  ],
};

export const scrollerStory: Story<'diwa-scroller'> = {
  state: {
    properties: {
      scrollbar: false,
      alignScrollIndicator: 'center',
    },
  },
  generator: ({ properties } = {}): ElementConfig<'diwa-scroller'>[] => [
    {
      tag: 'diwa-scroller' as const,
      properties: {
        scrollbar: properties?.scrollbar as boolean | undefined,
        'align-scroll-indicator': properties?.alignScrollIndicator as string | undefined,
      },
      children: [
        {
          tag: 'div' as const,
          properties: { style: { display: 'flex', gap: '16px', padding: '16px 4px' } },
          children: CARDS.map(({ title, desc }) => makeCard(title, desc)),
        },
      ],
    },
  ],
};

export const scrollerPropDefinitions: PropDefinition[] = [
  {
    name: 'scrollbar',
    type: 'boolean',
    defaultValue: false,
    description: 'Show a scroll indicator/scrollbar inside the scroller',
  },
  {
    name: 'alignScrollIndicator',
    type: 'select',
    options: ['top', 'center', 'bottom'],
    defaultValue: 'center',
    description: 'Vertical alignment of the scroll indicator inside the scroller',
  },
];


