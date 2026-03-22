import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const inputUrlStory: Story<'diwa-input-url'> = {
  state: {
    properties: {
      label: 'Website URL',
      placeholder: 'https://example.com',
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
        tag: 'diwa-input-url' as const,
        properties: {
          label: p.label ?? 'Website URL',
          placeholder: p.placeholder ?? 'https://example.com',
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

export const inputUrlPropDefinitions: PropDefinition[] = [
  { name: 'label', type: 'string', defaultValue: 'Website URL', description: 'Visible label for the control' },
  { name: 'placeholder', type: 'string', defaultValue: 'https://example.com', description: 'Placeholder text shown when the control is empty' },
  { name: 'description', type: 'string', defaultValue: '', description: 'Helper text shown below the input' },
  { name: 'message', type: 'string', defaultValue: '', description: 'Validation or helper message text' },
  { name: 'state', type: 'select', options: ['none', 'error', 'success'], defaultValue: 'none', description: 'Validation visual state' },
  { name: 'value', type: 'string', defaultValue: '', description: 'Current value of the control' },
  { name: 'disabled', type: 'boolean', defaultValue: false, description: 'Disable interaction and show disabled styling' },
  { name: 'required', type: 'boolean', defaultValue: false, description: 'Mark field as required for form validation' },
  { name: 'readonly', type: 'boolean', defaultValue: false, description: 'Make the control read-only' },
  { name: 'hideLabel', type: 'boolean', defaultValue: false, description: 'Visually hide the label while keeping it accessible' },
  { name: 'compact', type: 'boolean', defaultValue: false, description: 'Use a more compact visual density' },
  { name: 'theme', type: 'select', options: ['dark', 'light'], defaultValue: 'dark', description: 'Visual theme for preview' },
];
