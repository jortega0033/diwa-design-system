import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const inputWeekStory: Story<'diwa-input-week'> = {
  state: {
    properties: {
      label: 'Week',
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
      theme: 'dark',
    },
  },
  generator: ({ properties } = {}) => {
    const p = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'diwa-input-week' as const,
        properties: {
          label: p.label ?? 'Week',
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
          theme: p.theme ?? 'dark',
        },
      },
    ];
  },
};

export const inputWeekPropDefinitions: PropDefinition[] = [
  { name: 'label', type: 'string', defaultValue: 'Week' },
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
  { name: 'theme', type: 'select', options: ['dark', 'light'], defaultValue: 'dark' },
];
