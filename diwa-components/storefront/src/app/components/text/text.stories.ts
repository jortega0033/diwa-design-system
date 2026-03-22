import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const textStory: Story<'diwa-text'> = {
  state: {
    properties: {
      tag: 'p',
      size: 'small',
      weight: 'regular',
      align: 'start',
      color: 'primary',
      ellipsis: false,
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'diwa-text' as const,
      properties,
      children: ['The quick brown fox jumps over the lazy dog.'],
    },
  ],
};

export const textPropDefinitions: PropDefinition[] = [
  {
    name: 'tag',
    type: 'select',
    options: ['p', 'span', 'div', 'label', 'li'],
    defaultValue: 'p',
    description: 'HTML tag used for the text element',
  },
  {
    name: 'size',
    type: 'select',
    options: ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'],
    defaultValue: 'small',
    description: 'Visual size of the text element',
  },
  {
    name: 'weight',
    type: 'select',
    options: ['regular', 'semibold', 'bold'],
    defaultValue: 'regular',
    description: 'Font weight applied to the text',
  },
  {
    name: 'align',
    type: 'select',
    options: ['start', 'center', 'end'],
    defaultValue: 'start',
    description: 'Horizontal text alignment (RTL-aware)',
  },
  {
    name: 'color',
    type: 'select',
    options: ['primary', 'secondary', 'accent', 'tertiary', 'inherit'],
    defaultValue: 'primary',
    description: 'Semantic color alias for the text',
  },
  {
    name: 'ellipsis',
    type: 'boolean',
    defaultValue: false,
    description: 'Truncate overflow text with an ellipsis',
  },
];
