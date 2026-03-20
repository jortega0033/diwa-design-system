import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const headingStory: Story<'diwa-heading'> = {
  state: {
    properties: {
      size:     'h2',
      weight:   'bold',
      align:    'start',
      color:    'primary',
      ellipsis: false,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'diwa-heading' as const,
      properties,
      children: ['Diwa Design System'],
    },
  ],
};

export const headingPropDefinitions: PropDefinition[] = [
  {
    type: 'select',
    name: 'size',
    options: ['display', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit'],
    group: 'Typography',
    description: 'Visual size and inferred semantic heading level. Determines the rendered HTML tag when no explicit tag prop is given.',
  },
  {
    type: 'select',
    name: 'weight',
    options: ['semibold', 'bold'],
    group: 'Typography',
    description: 'Font weight applied to the heading text.',
  },
  {
    type: 'select',
    name: 'align',
    options: ['start', 'center', 'end'],
    group: 'Typography',
    description: 'Horizontal text alignment. start and end are RTL-aware.',
  },
  {
    type: 'select',
    name: 'color',
    options: ['primary', 'secondary', 'inherit'],
    group: 'Appearance',
    description: 'Text colour alias. Use inherit to pass through the surrounding colour unchanged.',
  },
  {
    type: 'boolean',
    name: 'ellipsis',
    group: 'Behaviour',
    description: 'Clip overflow text with a trailing ellipsis. The host element must have a defined width for this to take effect.',
  },
  {
    type: 'select',
    name: 'tag',
    options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'],
    group: 'Behaviour',
    description: 'Override the rendered HTML tag. If omitted, the tag is inferred from the size prop. Use to decouple visual size from semantic level.',
  },
];
