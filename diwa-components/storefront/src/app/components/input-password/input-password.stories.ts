import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const inputPasswordStory: Story<'diwa-input-password'> = {
  state: {
    properties: {
      label: 'Password',
      placeholder: 'Enter your password',
      description: '',
      message: '',
      state: 'none',
      value: '',
      disabled: false,
      required: false,
      readonly: false,
      hideLabel: false,
      compact: false,
      showToggle: true,
      theme: 'dark',
    },
  },
  generator: ({ properties } = {}) => {
    const p = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'diwa-input-password' as const,
        properties: {
          label: p.label ?? 'Password',
          placeholder: p.placeholder ?? 'Enter your password',
          description: p.description ?? '',
          message: p.message ?? '',
          state: p.state ?? 'none',
          value: p.value ?? '',
          disabled: p.disabled ?? false,
          required: p.required ?? false,
          readonly: p.readonly ?? false,
          hideLabel: p.hideLabel ?? false,
          compact: p.compact ?? false,
          showToggle: p.showToggle ?? true,
          theme: p.theme ?? 'dark',
        },
      },
    ];
  },
};

export const inputPasswordPropDefinitions: PropDefinition[] = [
  { name: 'label', type: 'string', defaultValue: 'Password' },
  { name: 'placeholder', type: 'string', defaultValue: 'Enter your password' },
  { name: 'description', type: 'string', defaultValue: '' },
  { name: 'message', type: 'string', defaultValue: '' },
  { name: 'state', type: 'select', options: ['none', 'error', 'success'], defaultValue: 'none' },
  { name: 'value', type: 'string', defaultValue: '' },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'required', type: 'boolean', defaultValue: false },
  { name: 'readonly', type: 'boolean', defaultValue: false },
  { name: 'hideLabel', type: 'boolean', defaultValue: false },
  { name: 'compact', type: 'boolean', defaultValue: false },
  { name: 'showToggle', type: 'boolean', defaultValue: true },
  { name: 'theme', type: 'select', options: ['dark', 'light'], defaultValue: 'dark' },
];
