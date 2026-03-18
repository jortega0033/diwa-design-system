import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import { ICON_NAMES } from '@/app/components/icon/icon.stories';

/**
 * Main configurator story for diwa-button-pure.
 * Mirrors the PDS pattern for p-button-pure.
 */
export const buttonPureStory: Story<'diwa-button-pure'> = {
  state: {
    properties: {
      theme: 'dark',
      size: 'md',
      icon: 'arrow-right',
      alignLabel: 'end',
      type: 'button',
      underline: false,
      active: false,
      hideLabel: false,
      stretch: false,
      disabled: false,
      loading: false,
      label: 'Some label',
    },
  },
  generator: ({ properties } = {}) => {
    const { label = 'Some label', ...attrs } = (properties ?? {}) as Record<string, unknown> & { label?: string };
    return [
      {
        tag: 'diwa-button-pure' as const,
        properties: attrs,
        children: [label as string],
      },
    ];
  },
};

export const buttonPurePropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Some label',
  },
  {
    name: 'icon',
    type: 'select',
    options: ['none', ...ICON_NAMES],
    defaultValue: 'arrow-right',
  },
  {
    name: 'size',
    type: 'select',
    options: ['sm', 'md', 'lg'],
    defaultValue: 'md',
  },
  {
    name: 'theme',
    type: 'select',
    options: ['dark', 'light'],
    defaultValue: 'dark',
  },
  {
    name: 'alignLabel',
    type: 'select',
    options: ['end', 'start'],
    defaultValue: 'end',
  },
  {
    name: 'type',
    type: 'select',
    options: ['button', 'submit', 'reset'],
    defaultValue: 'button',
  },
  {
    name: 'underline',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'active',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'hideLabel',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'stretch',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: false,
  },
];
