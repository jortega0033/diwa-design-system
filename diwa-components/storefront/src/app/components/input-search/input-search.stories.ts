import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const inputSearchStory: Story<'diwa-input-search'> = {
  state: {
    properties: {
      label: 'Search',
      placeholder: 'Search components…',
      description: '',
      message: '',
      state: 'none',
      value: '',
      disabled: false,
      required: false,
      readonly: false,
      hideLabel: false,
      compact: false,
      showClearButton: true,
      theme: 'dark',
    },
  },
  generator: ({ properties } = {}) => {
    const p = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'diwa-input-search' as const,
        properties: {
          label: p.label ?? 'Search',
          placeholder: p.placeholder ?? 'Search components…',
          description: p.description ?? '',
          message: p.message ?? '',
          state: p.state ?? 'none',
          value: p.value ?? '',
          disabled: p.disabled ?? false,
          required: p.required ?? false,
          readonly: p.readonly ?? false,
          hideLabel: p.hideLabel ?? false,
          compact: p.compact ?? false,
          showClearButton: p.showClearButton ?? true,
          theme: p.theme ?? 'dark',
        },
      },
    ];
  },
};

export const inputSearchPropDefinitions: PropDefinition[] = [
  { name: 'label', type: 'string', defaultValue: 'Search' },
  { name: 'placeholder', type: 'string', defaultValue: 'Search components…' },
  { name: 'description', type: 'string', defaultValue: '' },
  { name: 'message', type: 'string', defaultValue: '' },
  { name: 'state', type: 'select', options: ['none', 'error', 'success'], defaultValue: 'none' },
  { name: 'value', type: 'string', defaultValue: '' },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'required', type: 'boolean', defaultValue: false },
  { name: 'readonly', type: 'boolean', defaultValue: false },
  { name: 'hideLabel', type: 'boolean', defaultValue: false },
  { name: 'compact', type: 'boolean', defaultValue: false },
  { name: 'showClearButton', type: 'boolean', defaultValue: true },
  { name: 'theme', type: 'select', options: ['dark', 'light'], defaultValue: 'dark' },
];
