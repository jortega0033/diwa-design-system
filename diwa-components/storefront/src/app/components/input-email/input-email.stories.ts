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
  { name: 'label', type: 'string', defaultValue: 'Email address', description: 'Label text for the input control.' },
  { name: 'placeholder', type: 'string', defaultValue: 'you@example.com', description: 'Placeholder text shown when the control is empty.' },
  { name: 'description', type: 'string', defaultValue: '', description: 'Supporting descriptive text displayed below the control.' },
  { name: 'message', type: 'string', defaultValue: '', description: 'Inline validation or helper message text.' },
  { name: 'state', type: 'select', options: ['none', 'error', 'success'], defaultValue: 'none', description: "Visual status of the control (e.g., 'error' or 'success')." },
  { name: 'value', type: 'string', defaultValue: '', description: 'Current value of the input.' },
  { name: 'disabled', type: 'boolean', defaultValue: false, description: 'Disables interaction and applies the disabled styling.' },
  { name: 'required', type: 'boolean', defaultValue: false, description: 'Marks the field as required for form submission.' },
  { name: 'readonly', type: 'boolean', defaultValue: false, description: "Makes the control read-only; value cannot be edited." },
  { name: 'hideLabel', type: 'boolean', defaultValue: false, description: 'Visually hides the label while keeping it available to assistive tech.' },
  { name: 'compact', type: 'boolean', defaultValue: false, description: 'Enable compact spacing for dense layouts.' },
  { name: 'theme', type: 'select', options: ['dark', 'light'], defaultValue: 'dark', description: 'Theme variant used for rendering (dark or light).' },
];
