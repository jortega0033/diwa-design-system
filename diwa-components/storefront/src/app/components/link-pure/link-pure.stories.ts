import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import { ICON_NAMES } from '@/app/components/icon/icon.stories';

export const linkPureStory: Story<'diwa-link-pure'> = {
  state: {
    properties: {
      label: 'Some label',
      href: '#',
      theme: 'dark',
      size: 'md',
      icon: 'arrow-right',
      alignLabel: 'end',
      underline: false,
      active: false,
      hideLabel: false,
      stretch: false,
    },
  },
  generator: ({ properties } = {}) => {
    const { label = 'Some label', ...attrs } = (properties ?? {}) as Record<string, unknown> & { label?: string };
    return [
      {
        tag: 'diwa-link-pure' as const,
        properties: attrs,
        children: [label as string],
      },
    ];
  },
};

export const linkPureStorySizes: Story<'diwa-link-pure'> = {
  generator: () => [
    { tag: 'diwa-link-pure' as const, properties: { size: 'sm', href: '#' }, children: ['Small'] },
    { tag: 'diwa-link-pure' as const, properties: { size: 'md', href: '#' }, children: ['Medium'] },
    { tag: 'diwa-link-pure' as const, properties: { size: 'lg', href: '#' }, children: ['Large'] },
  ],
};

export const linkPureStoryAlignLabel: Story<'diwa-link-pure'> = {
  generator: () => [
    { tag: 'diwa-link-pure' as const, properties: { alignLabel: 'end', href: '#' }, children: ['Label end (default)'] },
    { tag: 'diwa-link-pure' as const, properties: { alignLabel: 'start', icon: 'arrow-left', href: '#' }, children: ['Label start'] },
  ],
};

export const linkPureStoryUnderline: Story<'diwa-link-pure'> = {
  generator: () => [
    { tag: 'diwa-link-pure' as const, properties: { underline: true, href: '#' }, children: ['Underlined link'] },
  ],
};

export const linkPureStoryActive: Story<'diwa-link-pure'> = {
  generator: () => [
    { tag: 'diwa-link-pure' as const, properties: { active: true, href: '#' }, children: ['Active (current page)'] },
  ],
};

export const linkPureStoryIconOnly: Story<'diwa-link-pure'> = {
  generator: () => [
    { tag: 'diwa-link-pure' as const, properties: { hideLabel: true, label: 'Go to next page', href: '#' }, children: ['Next page'] },
  ],
};

export const linkPurePropDefinitions: PropDefinition[] = [
  { name: 'label', type: 'string', defaultValue: 'Some label' },
  { name: 'href', type: 'string', defaultValue: '#' },
  {
    name: 'icon',
    type: 'select',
    options: ['none', ...ICON_NAMES],
    defaultValue: 'arrow-right',
  },
  { name: 'size', type: 'select', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
  { name: 'theme', type: 'select', options: ['dark', 'light'], defaultValue: 'dark' },
  { name: 'alignLabel', type: 'select', options: ['end', 'start'], defaultValue: 'end' },
  { name: 'underline', type: 'boolean', defaultValue: false },
  { name: 'active', type: 'boolean', defaultValue: false },
  { name: 'hideLabel', type: 'boolean', defaultValue: false },
  { name: 'stretch', type: 'boolean', defaultValue: false },
];
