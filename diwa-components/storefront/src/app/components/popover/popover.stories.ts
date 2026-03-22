import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import type { ElementConfig } from '@/utils/generator/generator';

export const popoverStory: Story<'diwa-popover'> = {
  state: {
    properties: {
      direction: 'bottom',
      description: 'This is a helpful explanation that provides additional context.',
    },
  },
  generator: ({ properties } = {}): ElementConfig<'diwa-popover'>[] => [
    {
      tag: 'diwa-popover' as const,
      properties: {
        direction: properties?.direction as string | undefined,
        description: properties?.description as string | undefined,
      },
    },
  ],
};

export const popoverPropDefinitions: PropDefinition[] = [
  {
    name: 'direction',
    type: 'select',
    options: ['top', 'bottom', 'start', 'end'],
    defaultValue: 'bottom',
    description: 'Preferred popover placement relative to the trigger',
  },
  {
    name: 'description',
    type: 'string',
    defaultValue: 'This is a helpful explanation that provides additional context.',
    description: 'Body text displayed inside the popover',
  },
];
