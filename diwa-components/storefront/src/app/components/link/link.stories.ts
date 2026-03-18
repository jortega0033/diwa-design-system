import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import { ICON_NAMES } from '@/app/components/icon/icon.stories';

export const linkStory: Story<'diwa-link'> = {
  state: {
    properties: {
      variant: 'primary',
      icon: 'none',
      href: '#',
      target: '_self',
      hideLabel: false,
      compact: false,
      theme: 'dark',
      label: 'Some label',
    },
  },
  generator: ({ properties } = {}) => {
    const { label = 'Some label', ...attrs } = (properties ?? {}) as Record<string, unknown> & { label?: string };
    return [
      {
        tag: 'diwa-link' as const,
        properties: attrs,
        children: [label as string],
      },
    ];
  },
};

export const linkStoryPrimary: Story<'diwa-link'> = {
  state: { properties: { variant: 'primary' } },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-link' as const, properties: { variant: 'primary', href: '#', ...properties }, children: ['Primary'] },
  ],
};

export const linkStorySecondary: Story<'diwa-link'> = {
  state: { properties: { variant: 'secondary' } },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-link' as const, properties: { variant: 'secondary', href: '#', ...properties }, children: ['Secondary'] },
  ],
};

export const linkStoryGhost: Story<'diwa-link'> = {
  state: { properties: { variant: 'ghost' } },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-link' as const, properties: { variant: 'ghost', href: '#', ...properties }, children: ['Ghost'] },
  ],
};

export const linkStoryWithIcon: Story<'diwa-link'> = {
  generator: () => [
    { tag: 'diwa-link' as const, properties: { variant: 'primary', href: '#', icon: 'arrow-right' }, children: ['With Icon'] },
    { tag: 'diwa-link' as const, properties: { variant: 'secondary', href: '#', icon: 'external-link' }, children: ['External'] },
    { tag: 'diwa-link' as const, properties: { variant: 'ghost', href: '#', icon: 'download' }, children: ['Download'] },
  ],
};

export const linkStoryDanger: Story<'diwa-link'> = {
  state: { properties: { variant: 'danger' } },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-link' as const, properties: { variant: 'danger', href: '#', ...properties }, children: ['Danger'] },
  ],
};

export const linkStoryDisabled: Story<'diwa-link'> = {
  generator: () => [
    { tag: 'diwa-link' as const, properties: { variant: 'primary', href: '#', disabled: true }, children: ['Primary Disabled'] },
    { tag: 'diwa-link' as const, properties: { variant: 'secondary', href: '#', disabled: true }, children: ['Secondary Disabled'] },
    { tag: 'diwa-link' as const, properties: { variant: 'ghost', href: '#', disabled: true }, children: ['Ghost Disabled'] },
  ],
};

export const linkStoryCompact: Story<'diwa-link'> = {
  generator: () => [
    { tag: 'diwa-link' as const, properties: { variant: 'primary', href: '#', compact: true }, children: ['Compact Primary'] },
    { tag: 'diwa-link' as const, properties: { variant: 'secondary', href: '#', compact: true }, children: ['Compact Secondary'] },
    { tag: 'diwa-link' as const, properties: { variant: 'ghost', href: '#', compact: true }, children: ['Compact Ghost'] },
  ],
};

export const linkPropDefinitions: PropDefinition[] = [
  { name: 'label', type: 'string', defaultValue: 'Some label' },
  { name: 'variant', type: 'select', options: ['primary', 'secondary', 'ghost', 'danger'], defaultValue: 'primary' },
  { name: 'icon', type: 'select', options: ['none', ...ICON_NAMES], defaultValue: 'none' },
  { name: 'href', type: 'string', defaultValue: '#' },
  { name: 'target', type: 'select', options: ['_self', '_blank', '_parent', '_top'], defaultValue: '_self' },
  { name: 'hideLabel', type: 'boolean', defaultValue: false },
  { name: 'compact', type: 'boolean', defaultValue: false },
  { name: 'disabled', type: 'boolean', defaultValue: false },
  { name: 'theme', type: 'select', options: ['dark', 'light'], defaultValue: 'dark' },
];