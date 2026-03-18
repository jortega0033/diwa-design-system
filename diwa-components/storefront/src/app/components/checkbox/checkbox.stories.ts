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
  },
  {
    name: 'checked',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'indeterminate',
    type: 'boolean',
    defaultValue: false,
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
    name: 'name',
    type: 'string',
    defaultValue: 'terms',
  },
  {
    name: 'value',
    type: 'string',
    defaultValue: 'on',
  },
  {
    name: 'theme',
    type: 'select',
    options: ['dark', 'light'],
    defaultValue: 'dark',
  },
];
