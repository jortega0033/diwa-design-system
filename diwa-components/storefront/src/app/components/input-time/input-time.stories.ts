import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const inputTimeStory: Story<'diwa-input-time'> = {
  state: {
    properties: {
      label: 'Time',
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
        tag: 'diwa-input-time' as const,
        properties: {
          label: p.label ?? 'Time',
          description: p.description ?? '',
          message: p.message ?? '',
          state: p.state ?? 'none',
          value: p.value ?? '',
          disabled: p.disabled ?? false,
          required: p.required ?? false,
          readonly: p.readonly ?? false,
          hideLabel: p.hideLabel ?? false,
          compact: p.compact ?? false,
          ...(p.min !== undefined && p.min !== '' ? { min: String(p.min) } : {}),
          ...(p.max !== undefined && p.max !== '' ? { max: String(p.max) } : {}),
          ...(p.step !== undefined && p.step !== '' ? { step: Number(p.step) } : {}),
          theme: p.theme ?? 'dark',
        },
      },
    ];
  },
};

export const inputTimePropDefinitions: PropDefinition[] = [
  { name: 'label', type: 'string', defaultValue: 'Time' },
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
