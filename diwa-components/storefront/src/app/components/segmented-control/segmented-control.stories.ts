import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import type { ElementConfig } from '@/utils/generator/generator';

export const segmentedControlStory: Story<'diwa-segmented-control'> = {
  state: {
    properties: {
      value: 'week',
      disabled: false,
      compact: false,
    },
  },
  generator: ({ properties } = {}): ElementConfig<'diwa-segmented-control'>[] => [
    {
      tag: 'diwa-segmented-control' as const,
      properties: {
        value: properties?.value as string | undefined,
        disabled: properties?.disabled as boolean | undefined,
        compact: properties?.compact as boolean | undefined,
      },
      children: [
        {
          tag: 'diwa-segmented-control-item' as const,
          properties: { value: 'day' },
          children: ['Day'],
        },
        {
          tag: 'diwa-segmented-control-item' as const,
          properties: { value: 'week' },
          children: ['Week'],
        },
        {
          tag: 'diwa-segmented-control-item' as const,
          properties: { value: 'month' },
          children: ['Month'],
        },
      ],
    },
  ],
};

export const segmentedControlPropDefinitions: PropDefinition[] = [
  { name: 'value', type: 'string', defaultValue: 'week', description: 'Currently selected value' },
  { name: 'disabled', type: 'boolean', defaultValue: false, description: 'Disable the entire control' },
  { name: 'compact', type: 'boolean', defaultValue: false, description: 'Use compact spacing for items' },
];
