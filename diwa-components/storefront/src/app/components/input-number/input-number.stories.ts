import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const inputNumberStory: Story<'diwa-input-number'> = {
  state: {
    properties: {
      label: 'Quantity',
      placeholder: '0',
      description: '',
      message: '',
      state: 'none',
      value: '',
      disabled: false,
      required: false,
      readonly: false,
      hideLabel: false,
      compact: false,
      min: '',
      max: '',
      step: '',
      theme: 'dark',
    },
  },
  generator: ({ properties } = {}) => {
    const p = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'diwa-input-number' as const,
        properties: {
          label: p.label ?? 'Quantity',
          placeholder: p.placeholder ?? '0',
          description: p.description ?? '',
          message: p.message ?? '',
          state: p.state ?? 'none',
          value: p.value ?? '',
          disabled: p.disabled ?? false,
          required: p.required ?? false,
          readonly: p.readonly ?? false,
          hideLabel: p.hideLabel ?? false,
          compact: p.compact ?? false,
          ...(p.min !== undefined && p.min !== '' ? { min: Number(p.min) } : {}),
          ...(p.max !== undefined && p.max !== '' ? { max: Number(p.max) } : {}),
          ...(p.step !== undefined && p.step !== '' ? { step: Number(p.step) } : {}),
          theme: p.theme ?? 'dark',
        },
      },
    ];
  },
};

export const inputNumberPropDefinitions: PropDefinition[] = [
  { name: 'label', type: 'string', defaultValue: 'Quantity' },
  { name: 'placeholder', type: 'string', defaultValue: '0' },
  { name: 'description', type: 'string', defaultValue: '' },
  { name: 'message', type: 'string', defaultValue: '' },
  { name: 'state', type: 'select', options: ['none', 'error', 'success'], defaultValue: 'none' },
  { name: 'value', type: 'string', defaultValue: '' },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'required', type: 'boolean', defaultValue: false },
  { name: 'readonly', type: 'boolean', defaultValue: false },
  { name: 'hideLabel', type: 'boolean', defaultValue: false },
  { name: 'compact', type: 'boolean', defaultValue: false },
  { name: 'min', type: 'string', defaultValue: '' },
  { name: 'max', type: 'string', defaultValue: '' },
  { name: 'step', type: 'string', defaultValue: '' },
  { name: 'theme', type: 'select', options: ['dark', 'light'], defaultValue: 'dark' },
];
