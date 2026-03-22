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
      color: 'primary',
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
    description: 'Text label rendered by the control',
  },
  {
    name: 'icon',
    type: 'select',
    options: ['none', ...ICON_NAMES],
    defaultValue: 'arrow-right',
    description: 'Optional leading icon name; set to `none` to omit',
  },
  {
    name: 'color',
    type: 'select',
    options: ['primary', 'secondary', 'accent', 'danger', 'inherit'],
    defaultValue: 'primary',
    description: 'Foreground color alias for the control (affects icon and label)',
  },
  {
    name: 'size',
    type: 'select',
    options: ['sm', 'md', 'lg'],
    defaultValue: 'md',
    description: 'Visual size / density of the control',
  },
  {
    name: 'theme',
    type: 'select',
    options: ['dark', 'light'],
    defaultValue: 'dark',
    description: 'Visual theme for preview/background',
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
    description: 'HTML button type attribute',
  },
  {
    name: 'underline',
    type: 'boolean',
    defaultValue: false,
    description: 'Render the label with an underline',
  },
  {
    name: 'active',
    type: 'boolean',
    defaultValue: false,
    description: 'Visual active/selected state',
  },
  {
    name: 'hideLabel',
    type: 'boolean',
    defaultValue: false,
    description: 'Hide the textual label, useful for icon-only mode (label remains accessible)',
  },
  {
    name: 'stretch',
    type: 'boolean',
    defaultValue: false,
    description: 'Allow the control to stretch to the container width',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Disable interaction and show muted styling',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: false,
    description: 'Show a loading indicator and prevent interaction',
  },
];
