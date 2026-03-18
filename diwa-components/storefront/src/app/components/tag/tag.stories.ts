import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import type { ElementConfig } from '@/utils/generator/generator';

export const tagStory: Story<'diwa-tag'> = {
  state: {
    properties: {
      variant: 'neutral',
      compact: false,
      icon: '',
    },
  },
  generator: ({ properties } = {}): ElementConfig<'diwa-tag'>[] => [
    {
      tag: 'diwa-tag' as const,
      properties: {
        variant: properties?.variant as string | undefined,
        compact: properties?.compact as boolean | undefined,
        icon: properties?.icon as string | undefined,
      },
      children: ['Status'],
    },
  ],
};

export const tagPropDefinitions: PropDefinition[] = [
  {
    name: 'variant',
    type: 'select',
    options: ['neutral', 'primary', 'info', 'success', 'warning', 'error'],
    defaultValue: 'neutral',
  },
  {
    name: 'compact',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'icon',
    type: 'string',
    defaultValue: '',
  },
];
