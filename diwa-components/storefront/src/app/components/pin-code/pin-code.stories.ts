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
  { name: 'label', type: 'string', defaultValue: 'Verification code', description: 'Visible label for the PIN input' },
  { name: 'description', type: 'string', defaultValue: 'Enter the 6-digit code sent to your email.', description: 'Helper text shown below the control' },
  { name: 'length', type: 'number', defaultValue: 6, description: 'Number of input boxes / digits expected' },
  { name: 'type', type: 'select', options: ['number', 'password'], defaultValue: 'number', description: 'Input type for each digit (number or password)' },
  { name: 'state', type: 'select', options: ['none', 'error', 'success'], defaultValue: 'none', description: 'Validation state of the control' },
  { name: 'message', type: 'string', defaultValue: '', description: 'Validation or helper message text' },
  { name: 'required', type: 'boolean', defaultValue: false, description: 'Mark the field as required for form validation' },
  { name: 'disabled', type: 'boolean', defaultValue: false, description: 'Disable interaction and show disabled styling' },
  { name: 'compact', type: 'boolean', defaultValue: false, description: 'Use compact spacing for denser layouts' },
];
