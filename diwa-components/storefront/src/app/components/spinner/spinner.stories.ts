import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const spinnerSizesStory: Story<'diwa-spinner'> = {
  generator: () => [
    { tag: 'diwa-spinner' as const, properties: { size: 'sm', label: 'Loading small' } },
    { tag: 'diwa-spinner' as const, properties: { size: 'md', label: 'Loading' } },
    { tag: 'diwa-spinner' as const, properties: { size: 'lg', label: 'Please wait' } },
  ],
};

export const spinnerInlineStory: Story<'diwa-spinner'> = {
  generator: () => [
    { tag: 'diwa-spinner' as const, properties: { size: 'sm', label: 'Saving' } },
  ],
};

export const spinnerAsyncStory: Story<'diwa-spinner'> = {
  generator: () => [
    { tag: 'diwa-button' as const, properties: { loading: true, disabled: true }, children: ['Submitting…'] },
    { tag: 'diwa-spinner' as const, properties: { size: 'sm', label: 'Submitting form' } },
  ],
};

export const spinnerStory: Story<'diwa-spinner'> = {
  state: {
    properties: {
      size: 'md',
      label: 'Loading',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'diwa-spinner' as const,
      properties,
    },
  ],
};

export const spinnerPropDefinitions: PropDefinition[] = [
  {
    name: 'size',
    type: 'select',
    options: ['sm', 'md', 'lg'],
    defaultValue: 'md',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Loading',
  },
];
