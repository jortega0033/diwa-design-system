import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import type { ElementConfig } from '@/utils/generator/generator';

export const textareaStory: Story<'diwa-textarea'> = {
  state: {
    properties: {
      label: 'Message',
      description: 'Describe your request in detail.',
      placeholder: 'Enter your message here...',
      state: 'none',
      message: '',
      required: false,
      disabled: false,
      readOnly: false,
      resize: 'vertical',
      rows: 4,
      compact: false,
    },
  },
  generator: ({ properties } = {}): ElementConfig<'diwa-textarea'>[] => [
    {
      tag: 'diwa-textarea' as const,
      properties: {
        label: properties?.label as string | undefined,
        description: properties?.description as string | undefined,
        placeholder: properties?.placeholder as string | undefined,
        state: properties?.state as string | undefined,
        message: properties?.message as string | undefined,
        required: properties?.required as boolean | undefined,
        disabled: properties?.disabled as boolean | undefined,
        'read-only': properties?.readOnly as boolean | undefined,
        resize: properties?.resize as string | undefined,
        rows: properties?.rows as number | undefined,
        compact: properties?.compact as boolean | undefined,
      },
    },
  ],
};

export const textareaPropDefinitions: PropDefinition[] = [
  { name: 'label', type: 'string', defaultValue: 'Message', description: 'Label text for the textarea control.' },
  { name: 'description', type: 'string', defaultValue: 'Describe your request in detail.', description: 'Supporting descriptive text displayed below the control.' },
  { name: 'placeholder', type: 'string', defaultValue: 'Enter your message here...', description: 'Placeholder text shown when the control is empty.' },
  { name: 'state', type: 'select', options: ['none', 'error', 'success'], defaultValue: 'none', description: "Visual status of the control (e.g., 'error' or 'success')." },
  { name: 'message', type: 'string', defaultValue: '', description: 'Inline validation or helper message text.' },
  { name: 'required', type: 'boolean', defaultValue: false, description: 'Marks the field as required for form submission.' },
  { name: 'disabled', type: 'boolean', defaultValue: false, description: 'Disables interaction and applies the disabled styling.' },
  { name: 'readOnly', type: 'boolean', defaultValue: false, description: "Makes the control read-only; value cannot be edited." },
  { name: 'resize', type: 'select', options: ['none', 'both', 'vertical', 'horizontal'], defaultValue: 'vertical', description: 'Controls whether the textarea can be resized by the user.' },
  { name: 'rows', type: 'number', defaultValue: 4, description: 'Initial number of visible text rows.' },
  { name: 'compact', type: 'boolean', defaultValue: false, description: 'Enable compact spacing for dense layouts.' },
];
