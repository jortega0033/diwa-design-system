import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const textListStory: Story<'diwa-text-list'> = {
  state: {
    properties: {
      type: 'unordered',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'diwa-text-list' as const,
      properties,
      children: [
        { tag: 'diwa-text-list-item' as const, children: ['First list item'] },
        { tag: 'diwa-text-list-item' as const, children: ['Second list item'] },
        { tag: 'diwa-text-list-item' as const, children: ['Third list item'] },
      ],
    },
  ],
};

export const textListPropDefinitions: PropDefinition[] = [
  {
    name: 'type',
    type: 'select',
    options: ['unordered', 'ordered', 'inline'],
    defaultValue: 'unordered',
  },
];
