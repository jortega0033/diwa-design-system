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
  },
  {
    name: 'size',
    type: 'select',
    options: ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'],
    defaultValue: 'small',
  },
  {
    name: 'weight',
    type: 'select',
    options: ['regular', 'semibold', 'bold'],
    defaultValue: 'regular',
  },
  {
    name: 'align',
    type: 'select',
    options: ['start', 'center', 'end'],
    defaultValue: 'start',
  },
  {
    name: 'color',
    type: 'select',
    options: ['primary', 'secondary', 'tertiary', 'inherit'],
    defaultValue: 'primary',
  },
  {
    name: 'ellipsis',
    type: 'boolean',
    defaultValue: false,
  },
];
