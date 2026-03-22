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
  { name: 'label', type: 'string', defaultValue: 'Full name', description: 'Label text for the input control.' },
  { name: 'placeholder', type: 'string', defaultValue: 'Jane Smith', description: 'Placeholder text shown when the control is empty.' },
  { name: 'description', type: 'string', defaultValue: '', description: 'Supporting descriptive text displayed below the control.' },
  { name: 'message', type: 'string', defaultValue: '', description: 'Inline validation or helper message text.' },
  { name: 'state', type: 'select', options: ['none', 'error', 'success'], defaultValue: 'none', description: "Visual status of the control (e.g., 'error' or 'success')." },
  { name: 'value', type: 'string', defaultValue: '', description: 'Current value of the input.' },
  { name: 'disabled', type: 'boolean', defaultValue: false, description: 'Disables interaction and applies the disabled styling.' },
  { name: 'required', type: 'boolean', defaultValue: false, description: 'Marks the field as required for form submission.' },
  { name: 'readonly', type: 'boolean', defaultValue: false, description: "Makes the control read-only; value cannot be edited." },
  { name: 'hideLabel', type: 'boolean', defaultValue: false, description: 'Visually hides the label while keeping it available to assistive tech.' },
  { name: 'compact', type: 'boolean', defaultValue: false, description: 'Enable compact spacing for dense layouts.' },
  { name: 'maxLength', type: 'string', defaultValue: '', description: 'Maximum number of characters allowed.' },
  { name: 'minLength', type: 'string', defaultValue: '', description: 'Minimum number of characters required.' },
  { name: 'theme', type: 'select', options: ['dark', 'light'], defaultValue: 'dark', description: 'Theme variant used for rendering (dark or light).' },
];
