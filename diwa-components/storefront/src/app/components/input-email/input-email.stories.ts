import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const inputEmailStory: Story<'diwa-input-email'> = {
  state: {
    properties: {
      label: 'Email address',
      placeholder: 'you@example.com',
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
        tag: 'diwa-input-email' as const,
        properties: {
          label: p.label ?? 'Email address',
          placeholder: p.placeholder ?? 'you@example.com',
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

export const inputEmailPropDefinitions: PropDefinition[] = [
  { name: 'label', type: 'string', defaultValue: 'Email address' },
  { name: 'placeholder', type: 'string', defaultValue: 'you@example.com' },
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
