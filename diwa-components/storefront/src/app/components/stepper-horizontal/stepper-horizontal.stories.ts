import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import type { ElementConfig } from '@/utils/generator/generator';

export const stepperHorizontalStory: Story<'diwa-stepper-horizontal'> = {
  state: {
    properties: {
      activeStepIndex: 1,
    },
  },
  generator: ({ properties } = {}): ElementConfig<'diwa-stepper-horizontal'>[] => [
    {
      tag: 'diwa-stepper-horizontal' as const,
      properties: {
        'active-step-index': properties?.activeStepIndex as number | undefined,
      },
      children: [
        {
          tag: 'diwa-stepper-horizontal-item' as const,
          properties: { label: 'Account' },
          children: [],
        },
        {
          tag: 'diwa-stepper-horizontal-item' as const,
          properties: { label: 'Details' },
          children: [],
        },
        {
          tag: 'diwa-stepper-horizontal-item' as const,
          properties: { label: 'Review' },
          children: [],
        },
        {
          tag: 'diwa-stepper-horizontal-item' as const,
          properties: { label: 'Confirm' },
          children: [],
        },
      ],
    },
  ],
};

export const stepperHorizontalPropDefinitions: PropDefinition[] = [
  { name: 'activeStepIndex', type: 'number', defaultValue: 1 },
];
