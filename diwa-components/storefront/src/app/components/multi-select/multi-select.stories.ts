import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

/**
 * Main configurator story for diwa-multi-select.
 * The change event updates `value` in story state.
 */
export const multiSelectStory: Story<'diwa-multi-select'> = {
  state: {
    properties: {
      theme: 'dark',
      label: 'Favourite fruits',
      name: 'fruits',
      description: '',
      state: 'none',
      message: '',
      disabled: false,
      required: false,
      compact: false,
      'hide-label': false,
      'dropdown-direction': 'auto',
    },
  },
  generator: ({ properties } = {}) => {
    const attrs = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'diwa-multi-select' as const,
        properties: attrs,
        events: {
          onchange: {
            target: 'diwa-multi-select',
            prop: 'value',
            eventValueKey: 'value',
          },
        },
        children: [
          {
            tag: 'diwa-multi-select-option' as const,
            properties: { value: 'apple' },
            children: ['Apple'],
          },
          {
            tag: 'diwa-multi-select-option' as const,
            properties: { value: 'banana' },
            children: ['Banana'],
          },
          {
            tag: 'diwa-multi-select-option' as const,
            properties: { value: 'cherry' },
            children: ['Cherry'],
          },
          {
            tag: 'diwa-multi-select-option' as const,
            properties: { value: 'dragonfruit' },
            children: ['Dragon Fruit'],
          },
          {
            tag: 'diwa-multi-select-option' as const,
            properties: { value: 'elderberry' },
            children: ['Elderberry'],
          },
          {
            tag: 'diwa-multi-select-option' as const,
            properties: { value: 'fig' },
            children: ['Fig'],
          },
        ],
      },
    ];
  },
};

export const multiSelectPropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Favourite fruits',
    description: 'Visible label for the control',
  },
  {
    name: 'description',
    type: 'string',
    defaultValue: '',
    description: 'Helper text shown below the control',
  },
  {
    name: 'name',
    type: 'string',
    defaultValue: 'fruits',
    description: 'Form field name used when submitting selected values',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Disable interaction and show muted styling',
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: false,
    description: 'Mark the field as required for form validation',
  },
  {
    name: 'state',
    type: 'select',
    options: ['none', 'error', 'success'],
    defaultValue: 'none',
    description: 'Validation visual state for the control',
  },
  {
    name: 'message',
    type: 'string',
    defaultValue: '',
    description: 'Validation or helper message text',
  },
  {
    name: 'compact',
    type: 'boolean',
    defaultValue: false,
    description: 'Use a more compact visual density',
  },
  {
    name: 'hide-label',
    type: 'boolean',
    defaultValue: false,
    description: 'Visually hide the label while keeping it accessible',
  },
  {
    name: 'dropdown-direction',
    type: 'select',
    options: ['auto', 'down', 'up'],
    defaultValue: 'auto',
    description: 'Preferred dropdown opening direction',
  },
  {
    name: 'theme',
    type: 'select',
    options: ['dark', 'light'],
    defaultValue: 'dark',
    description: 'Visual theme for the control',
  },
];
