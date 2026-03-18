import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import type { ElementConfig } from '@/utils/generator/generator';

export const radioGroupStory: Story<'diwa-radio-group'> = {
  state: {
    properties: {
      label: 'Pick a size',
      value: 'm',
      direction: 'column',
      compact: false,
      required: false,
      disabled: false,
      state: 'none',
    },
  },
  generator: ({ properties } = {}): ElementConfig<'diwa-radio-group'>[] => [
    {
      tag: 'diwa-radio-group' as const,
      properties: {
        label: properties?.label as string | undefined,
        value: properties?.value as string | undefined,
        direction: properties?.direction as string | undefined,
        compact: properties?.compact as boolean | undefined,
        required: properties?.required as boolean | undefined,
        disabled: properties?.disabled as boolean | undefined,
        state: properties?.state as string | undefined,
      },
      children: [
        {
          tag: 'diwa-radio-group-item' as const,
          properties: { value: 's' },
          children: ['Small'],
        },
        {
          tag: 'diwa-radio-group-item' as const,
          properties: { value: 'm' },
          children: ['Medium'],
        },
        {
          tag: 'diwa-radio-group-item' as const,
          properties: { value: 'l' },
          children: ['Large'],
        },
      ],
    },
  ],
};

export const radioGroupPropDefinitions: PropDefinition[] = [
  { name: 'label', type: 'string', defaultValue: 'Pick a size' },
  { name: 'value', type: 'string', defaultValue: 'm' },
  { name: 'direction', type: 'select', options: ['column', 'row'], defaultValue: 'column' },
  { name: 'compact', type: 'boolean', defaultValue: false },
  { name: 'required', type: 'boolean', defaultValue: false },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'state', type: 'select', options: ['none', 'error', 'success'], defaultValue: 'none' },
];
