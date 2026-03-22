import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import type { ElementConfig } from '@/utils/generator/generator';

export const tabsStory: Story<'diwa-tabs'> = {
  state: {
    properties: {
      activeTabIndex: 0,
    },
  },
  generator: ({ properties } = {}): ElementConfig<'diwa-tabs'>[] => [
    {
      tag: 'diwa-tabs' as const,
      properties: {
        'active-tab-index': properties?.activeTabIndex as number | undefined,
        className: 'block w-full',
      },
      children: [
        {
          tag: 'diwa-tabs-item' as const,
          properties: { label: 'Overview' },
          children: ['Overview content goes here.'],
        },
        {
          tag: 'diwa-tabs-item' as const,
          properties: { label: 'Details' },
          children: ['Detailed information goes here.'],
        },
        {
          tag: 'diwa-tabs-item' as const,
          properties: { label: 'Settings' },
          children: ['Settings content goes here.'],
        },
      ],
    },
  ],
};

export const tabsPropDefinitions: PropDefinition[] = [
  { name: 'activeTabIndex', type: 'number', defaultValue: 0, description: 'Zero-based index of the active tab' },
];
