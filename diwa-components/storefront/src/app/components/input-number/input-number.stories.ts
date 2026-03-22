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
  { name: 'label', type: 'string', defaultValue: 'Quantity', description: 'Label text for the numeric input.' },
  { name: 'placeholder', type: 'string', defaultValue: '0', description: 'Placeholder text shown when the control is empty.' },
  { name: 'description', type: 'string', defaultValue: '', description: 'Supporting descriptive text displayed below the control.' },
  { name: 'message', type: 'string', defaultValue: '', description: 'Inline validation or helper message text.' },
  { name: 'state', type: 'select', options: ['none', 'error', 'success'], defaultValue: 'none', description: "Visual status of the control (e.g., 'error' or 'success')." },
  { name: 'value', type: 'string', defaultValue: '', description: 'Current numeric value of the input.' },
  { name: 'disabled', type: 'boolean', defaultValue: false, description: 'Disables interaction and applies the disabled styling.' },
  { name: 'required', type: 'boolean', defaultValue: false, description: 'Marks the field as required for form submission.' },
  { name: 'readonly', type: 'boolean', defaultValue: false, description: "Makes the control read-only; value cannot be edited." },
  { name: 'hideLabel', type: 'boolean', defaultValue: false, description: 'Visually hides the label while keeping it available to assistive tech.' },
  { name: 'compact', type: 'boolean', defaultValue: false, description: 'Enable compact spacing for dense layouts.' },
  { name: 'min', type: 'string', defaultValue: '', description: 'Minimum allowed numeric value.' },
  { name: 'max', type: 'string', defaultValue: '', description: 'Maximum allowed numeric value.' },
  { name: 'step', type: 'string', defaultValue: '', description: 'Increment step between valid numeric values.' },
  { name: 'theme', type: 'select', options: ['dark', 'light'], defaultValue: 'dark', description: 'Theme variant used for rendering (dark or light).' },
];
