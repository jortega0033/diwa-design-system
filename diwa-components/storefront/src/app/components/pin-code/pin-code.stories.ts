import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import type { ElementConfig } from '@/utils/generator/generator';

export const pinCodeStory: Story<'diwa-pin-code'> = {
  state: {
    properties: {
      label: 'Verification code',
      description: 'Enter the 6-digit code sent to your email.',
      length: 6,
      type: 'number',
      state: 'none',
      message: '',
      required: false,
      disabled: false,
      compact: false,
    },
  },
  generator: ({ properties } = {}): ElementConfig<'diwa-pin-code'>[] => [
    {
      tag: 'diwa-pin-code' as const,
      properties: {
        label: properties?.label as string | undefined,
        description: properties?.description as string | undefined,
        length: properties?.length as number | undefined,
        type: properties?.type as string | undefined,
        state: properties?.state as string | undefined,
        message: properties?.message as string | undefined,
        required: properties?.required as boolean | undefined,
        disabled: properties?.disabled as boolean | undefined,
        compact: properties?.compact as boolean | undefined,
      },
    },
  ],
};

export const pinCodePropDefinitions: PropDefinition[] = [
  { name: 'label', type: 'string', defaultValue: 'Verification code' },
  { name: 'description', type: 'string', defaultValue: 'Enter the 6-digit code sent to your email.' },
  { name: 'length', type: 'number', defaultValue: 6 },
  { name: 'type', type: 'select', options: ['number', 'password'], defaultValue: 'number' },
  { name: 'state', type: 'select', options: ['none', 'error', 'success'], defaultValue: 'none' },
  { name: 'message', type: 'string', defaultValue: '' },
  { name: 'required', type: 'boolean', defaultValue: false },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'compact', type: 'boolean', defaultValue: false },
];
