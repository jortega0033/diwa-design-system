import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

/**
 * Main configurator story for diwa-select.
 * The change event updates `value` in story state.
 */
export const selectStory: Story<'diwa-select'> = {
  state: {
    properties: {
      theme: 'dark',
      label: 'Favourite fruit',
      name: 'fruit',
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
        tag: 'diwa-select' as const,
        properties: attrs,
        events: {
          onchange: {
            target: 'diwa-select',
            prop: 'value',
            eventValueKey: 'value',
          },
        },
        children: [
          {
            tag: 'diwa-select-option' as const,
            properties: {},
            children: ['Please select…'],
          },
          {
            tag: 'diwa-select-option' as const,
            properties: { value: 'apple' },
            children: ['Apple'],
          },
          {
            tag: 'diwa-select-option' as const,
            properties: { value: 'banana' },
            children: ['Banana'],
          },
          {
            tag: 'diwa-select-option' as const,
            properties: { value: 'cherry' },
            children: ['Cherry'],
          },
          {
            tag: 'diwa-select-option' as const,
            properties: { value: 'dragonfruit' },
            children: ['Dragon Fruit'],
          },
          {
            tag: 'diwa-select-option' as const,
            properties: { value: 'elderberry' },
            children: ['Elderberry'],
          },
          {
            tag: 'diwa-select-option' as const,
            properties: { value: 'fig' },
            children: ['Fig'],
          },
        ],
      },
    ];
  },
};

export const selectPropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Favourite fruit',
    group: 'Content',
    description: 'Main visible label for the select control',
  },
  {
    name: 'description',
    type: 'string',
    defaultValue: '',
    group: 'Content',
    description: 'Helper text displayed below the select.',
  },
  {
    name: 'name',
    type: 'string',
    defaultValue: 'fruit',
    group: 'Content',
    description: 'Form field name used when submitting the value',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    group: 'State',
    description: 'Disable interaction and visually dim the control',
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: false,
    group: 'State',
    description: 'Marks the field as required for form validation',
  },
  {
    name: 'state',
    type: 'select',
    options: ['none', 'error', 'success'],
    defaultValue: 'none',
    group: 'State',
    description: 'Validation state indicator.',
  },
  {
    name: 'message',
    type: 'string',
    defaultValue: '',
    group: 'State',
    description: 'Validation or helper message text.',
  },
  {
    name: 'compact',
    type: 'boolean',
    defaultValue: false,
    group: 'Appearance',
    description: 'Use a more compact visual density',
  },
  {
    name: 'hide-label',
    type: 'boolean',
    defaultValue: false,
    group: 'Appearance',
    description: 'Visually hides the label. It remains accessible.',
  },
  {
    name: 'dropdown-direction',
    type: 'select',
    options: ['auto', 'down', 'up'],
    defaultValue: 'auto',
    group: 'Behavior',
    description: 'Preferred dropdown opening direction',
  },
  {
    name: 'theme',
    type: 'select',
    options: ['dark', 'light'],
    defaultValue: 'dark',
    group: 'Appearance',
    description: 'Visual theme variant for the control',
  },
];
