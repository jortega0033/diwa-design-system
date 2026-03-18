import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const inputTextStory: Story<'diwa-input-text'> = {
  state: {
    properties: {
      label: 'Full name',
      placeholder: 'Jane Smith',
      description: '',
      message: '',
      state: 'none',
      value: '',
      disabled: false,
      required: false,
      readonly: false,
      hideLabel: false,
      compact: false,
      maxLength: '',
      minLength: '',
      theme: 'dark',
    },
  },
  generator: ({ properties } = {}) => {
    const p = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'diwa-input-text' as const,
        properties: {
          label: p.label ?? 'Full name',
          placeholder: p.placeholder ?? 'Jane Smith',
          description: p.description ?? '',
          message: p.message ?? '',
          state: p.state ?? 'none',
          value: p.value ?? '',
          disabled: p.disabled ?? false,
          required: p.required ?? false,
          readonly: p.readonly ?? false,
          hideLabel: p.hideLabel ?? false,
          compact: p.compact ?? false,
          ...(p.maxLength !== undefined && p.maxLength !== '' ? { maxLength: Number(p.maxLength) } : {}),
          ...(p.minLength !== undefined && p.minLength !== '' ? { minLength: Number(p.minLength) } : {}),
          theme: p.theme ?? 'dark',
        },
      },
    ];
  },
};

export const inputTextPropDefinitions: PropDefinition[] = [
  { name: 'label', type: 'string', defaultValue: 'Full name' },
  { name: 'placeholder', type: 'string', defaultValue: 'Jane Smith' },
  { name: 'description', type: 'string', defaultValue: '' },
  { name: 'message', type: 'string', defaultValue: '' },
  { name: 'state', type: 'select', options: ['none', 'error', 'success'], defaultValue: 'none' },
  { name: 'value', type: 'string', defaultValue: '' },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'required', type: 'boolean', defaultValue: false },
  { name: 'readonly', type: 'boolean', defaultValue: false },
  { name: 'hideLabel', type: 'boolean', defaultValue: false },
  { name: 'compact', type: 'boolean', defaultValue: false },
  { name: 'maxLength', type: 'string', defaultValue: '' },
  { name: 'minLength', type: 'string', defaultValue: '' },
  { name: 'theme', type: 'select', options: ['dark', 'light'], defaultValue: 'dark' },
];
