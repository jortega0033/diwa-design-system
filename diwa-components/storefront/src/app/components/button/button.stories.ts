import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import { ICON_NAMES } from '@/app/components/icon/icon.stories';

/**
 * Main configurator story for diwa-button.
 * Mirrors the PDS pattern: packages/storefront/src/app/components/button/button.stories.ts
 *
 * The generator receives the current Configurator state and returns an
 * ElementConfig array. The same output drives both the live React preview
 * and the HTML code-block generator.
 */
export const buttonStory: Story<'diwa-button'> = {
  state: {
    properties: {
      variant: 'primary',
      size: 'md',
      disabled: false,
      loading: false,
      hideLabel: false,
      type: 'button',
      theme: 'dark',
      label: 'Click me',
      icon: 'none',
    },
  },
  generator: ({ properties } = {}) => {
    const { label = 'Click me', ...attrs } = (properties ?? {}) as Record<string, unknown> & { label?: string };
    return [
      {
        tag: 'diwa-button' as const,
        properties: attrs,
        children: [label as string],
      },
    ];
  },
};

/** Variants showcase - one static story per variant. */
export const buttonStoryPrimary: Story<'diwa-button'> = {
  state: { properties: { variant: 'primary' } },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-button' as const, properties: { variant: 'primary', ...properties }, children: ['Primary'] },
  ],
};

export const buttonStorySecondary: Story<'diwa-button'> = {
  state: { properties: { variant: 'secondary' } },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-button' as const, properties: { variant: 'secondary', ...properties }, children: ['Secondary'] },
  ],
};

export const buttonStoryGhost: Story<'diwa-button'> = {
  state: { properties: { variant: 'ghost' } },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-button' as const, properties: { variant: 'ghost', ...properties }, children: ['Ghost'] },
  ],
};

export const buttonStoryDanger: Story<'diwa-button'> = {
  state: { properties: { variant: 'danger' } },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-button' as const, properties: { variant: 'danger', ...properties }, children: ['Danger'] },
  ],
};

export const buttonStoryLoading: Story<'diwa-button'> = {
  state: { properties: { variant: 'primary', loading: true } },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-button' as const, properties: { variant: 'primary', loading: true, ...properties }, children: ['Loading'] },
  ],
};

export const buttonStorySizes: Story<'diwa-button'> = {
  generator: () => [
    { tag: 'diwa-button' as const, properties: { size: 'xs' }, children: ['X Small'] },
    { tag: 'diwa-button' as const, properties: { size: 'sm' }, children: ['Small'] },
    { tag: 'diwa-button' as const, properties: { size: 'md' }, children: ['Medium'] },
    { tag: 'diwa-button' as const, properties: { size: 'lg' }, children: ['Large'] },
  ],
};

/**
 * Prop definitions for the Configurator controls panel.
 * Maps directly to the @Prop() declarations in diwa-button.tsx.
 */
export const buttonPropDefinitions: PropDefinition[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: 'Click me',
    group: 'Content',
    description: 'Text content rendered inside the button.',
  },
  {
    name: 'icon',
    type: 'select',
    options: ['none', ...ICON_NAMES],
    defaultValue: 'none',
    group: 'Content',
    description: 'Optional icon displayed alongside the label.',
  },
  {
    name: 'variant',
    type: 'select',
    options: ['primary', 'secondary', 'ghost', 'danger'],
    defaultValue: 'primary',
    group: 'Appearance',
    description: 'Visual style of the button.',
  },
  {
    name: 'size',
    type: 'select',
    options: ['xs', 'sm', 'md', 'lg'],
    defaultValue: 'md',
    group: 'Appearance',
    description: 'Controls padding and font size.',
  },
  {
    name: 'theme',
    type: 'select',
    options: ['dark', 'light'],
    defaultValue: 'dark',
    group: 'Appearance',
    description: 'Visual theme for the example preview and button surface',
  },
  {
    name: 'type',
    type: 'select',
    options: ['button', 'submit', 'reset'],
    defaultValue: 'button',
    group: 'Behavior',
    description: 'HTML button type attribute.',
  },
  {
    name: 'hideLabel',
    type: 'boolean',
    defaultValue: false,
    group: 'Behavior',
    description: 'Visually hides the label (icon-only mode). Label remains accessible.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    group: 'State',
    description: 'Disable the button and prevent interaction',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: false,
    group: 'State',
    description: 'Shows a spinner and disables interaction.',
  },
];
