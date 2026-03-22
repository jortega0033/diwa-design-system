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
  { name: 'label', type: 'string', defaultValue: 'Time', description: 'Label text for the time input control.' },
  { name: 'description', type: 'string', defaultValue: '', description: 'Supporting descriptive text displayed below the control.' },
  { name: 'message', type: 'string', defaultValue: '', description: 'Inline validation or helper message text.' },
  { name: 'state', type: 'select', options: ['none', 'error', 'success'], defaultValue: 'none', description: "Visual status of the control (e.g., 'error' or 'success')." },
  { name: 'value', type: 'string', defaultValue: '', description: 'Current value of the input (HH:MM or browser-local time format).' },
  { name: 'disabled', type: 'boolean', defaultValue: false, description: 'Disables interaction and applies the disabled styling.' },
  { name: 'required', type: 'boolean', defaultValue: false, description: 'Marks the field as required for form submission.' },
  { name: 'readonly', type: 'boolean', defaultValue: false, description: "Makes the control read-only; value cannot be edited." },
  { name: 'hideLabel', type: 'boolean', defaultValue: false, description: 'Visually hides the label while keeping it available to assistive tech.' },
  { name: 'compact', type: 'boolean', defaultValue: false, description: 'Enable compact spacing for dense layouts.' },
  { name: 'min', type: 'string', defaultValue: '', description: 'Minimum allowed time value (e.g., "09:00").' },
  { name: 'max', type: 'string', defaultValue: '', description: 'Maximum allowed time value (e.g., "17:00").' },
  { name: 'step', type: 'string', defaultValue: '', description: 'Step interval in seconds between valid times (e.g., 60 for 1 minute).' },
  { name: 'theme', type: 'select', options: ['dark', 'light'], defaultValue: 'dark', description: 'Theme variant used for rendering (dark or light).' },
];
