import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

/**
 * Main configurator story for diwa-checkbox.
 * Semi-controlled: the onupdate event updates `checked` in story state.
 */
export const checkboxStory: Story<'diwa-checkbox'> = {
  state: {
    properties: {
      theme: 'dark',
      label: 'Accept terms and conditions',
      name: 'terms',
      value: 'on',
      checked: false,
      indeterminate: false,
      disabled: false,
      required: false,
      state: 'none',
      message: '',
      compact: false,
      'hide-label': false,
    },
  },
  generator: ({ properties } = {}) => {
    const attrs = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'diwa-checkbox' as const,
        properties: attrs,
        events: {
          // React 19: key.slice(2) without lowercase → 'onupdate' → addEventListener('update')
          onupdate: {
            target: 'diwa-checkbox',
            prop: 'checked',
            eventValueKey: 'checked',
          },
        },
      },
    ];
  },
};

export const checkboxPropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Accept terms and conditions',
    description: 'Visible label for the checkbox',
  },
  {
    name: 'checked',
    type: 'boolean',
    defaultValue: false,
    description: 'Whether the checkbox is checked',
  },
  {
    name: 'indeterminate',
    type: 'boolean',
    defaultValue: false,
    description: 'Visually indicates an indeterminate state',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Disable interaction and dim the control',
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: false,
    description: 'Marks the field as required for form validation',
  },
  {
    name: 'state',
    type: 'select',
    options: ['none', 'error', 'success'],
    defaultValue: 'none',
    description: 'Visual state used to show validation feedback',
  },
  {
    name: 'message',
    type: 'string',
    defaultValue: '',
    description: 'Optional helper or validation message shown below the control',
  },
  {
    name: 'compact',
    type: 'boolean',
    defaultValue: false,
    description: 'Use a more compact layout for tight spaces',
  },
  {
    name: 'hide-label',
    type: 'boolean',
    defaultValue: false,
    description: 'Visually hide the label while keeping it accessible',
  },
  {
    name: 'name',
    type: 'string',
    defaultValue: 'terms',
    description: 'Form name used when submitting the control value',
  },
  {
    name: 'value',
    type: 'string',
    defaultValue: 'on',
    description: 'Submitted value when the checkbox is checked',
  },
  {
    name: 'theme',
    type: 'select',
    options: ['dark', 'light'],
    defaultValue: 'dark',
    description: 'Visual theme variant for the control',
  },
];
