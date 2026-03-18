import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const inputTelStory: Story<'diwa-input-tel'> = {
  state: {
    properties: {
      label: 'Phone number',
      placeholder: '+1 (555) 000-0000',
      description: '',
      message: '',
      state: 'none',
      value: '',
      disabled: false,
      required: false,
      readonly: false,
      hideLabel: false,
      compact: false,
      theme: 'dark',
    },
  },
  generator: ({ properties } = {}) => {
    const p = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'diwa-input-tel' as const,
        properties: {
          label: p.label ?? 'Phone number',
          placeholder: p.placeholder ?? '+1 (555) 000-0000',
          description: p.description ?? '',
          message: p.message ?? '',
          state: p.state ?? 'none',
          value: p.value ?? '',
          disabled: p.disabled ?? false,
          required: p.required ?? false,
          readonly: p.readonly ?? false,
          hideLabel: p.hideLabel ?? false,
          compact: p.compact ?? false,
          theme: p.theme ?? 'dark',
        },
      },
    ];
  },
};

export const inputTelPropDefinitions: PropDefinition[] = [
  { name: 'label', type: 'string', defaultValue: 'Phone number' },
  { name: 'placeholder', type: 'string', defaultValue: '+1 (555) 000-0000' },
  { name: 'description', type: 'string', defaultValue: '' },
  { name: 'message', type: 'string', defaultValue: '' },
  { name: 'state', type: 'select', options: ['none', 'error', 'success'], defaultValue: 'none' },
  { name: 'value', type: 'string', defaultValue: '' },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'required', type: 'boolean', defaultValue: false },
  { name: 'readonly', type: 'boolean', defaultValue: false },
  { name: 'hideLabel', type: 'boolean', defaultValue: false },
  { name: 'compact', type: 'boolean', defaultValue: false },
  { name: 'theme', type: 'select', options: ['dark', 'light'], defaultValue: 'dark' },
];
