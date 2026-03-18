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
  },
  {
    name: 'description',
    type: 'string',
    defaultValue: '',
  },
  {
    name: 'name',
    type: 'string',
    defaultValue: 'fruits',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'state',
    type: 'select',
    options: ['none', 'error', 'success'],
    defaultValue: 'none',
  },
  {
    name: 'message',
    type: 'string',
    defaultValue: '',
  },
  {
    name: 'compact',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'hide-label',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'dropdown-direction',
    type: 'select',
    options: ['auto', 'down', 'up'],
    defaultValue: 'auto',
  },
  {
    name: 'theme',
    type: 'select',
    options: ['dark', 'light'],
    defaultValue: 'dark',
  },
];
