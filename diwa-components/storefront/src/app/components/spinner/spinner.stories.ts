import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const spinnerStory: Story<'diwa-spinner'> = {
  state: {
    properties: {
      size: 'md',
      label: 'Loading',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'diwa-spinner' as const,
      properties,
    },
  ],
};

export const spinnerPropDefinitions: PropDefinition[] = [
  {
    name: 'size',
    type: 'select',
    options: ['sm', 'md', 'lg'],
    defaultValue: 'md',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Loading',
  },
];
