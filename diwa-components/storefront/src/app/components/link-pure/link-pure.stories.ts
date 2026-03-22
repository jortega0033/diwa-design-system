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
      color: 'primary',
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
  { name: 'label', type: 'string', defaultValue: 'Some label', description: 'Text content of the link' },
  { name: 'href', type: 'string', defaultValue: '#', description: 'URL the link navigates to' },
  {
    name: 'icon',
    type: 'select',
    options: ['none', ...ICON_NAMES],
    defaultValue: 'arrow-right',
    description: 'Optional leading icon name; `none` hides the icon',
  },
  { name: 'size', type: 'select', options: ['sm', 'md', 'lg'], defaultValue: 'md', description: 'Visual size/density' },
  { name: 'color', type: 'select', options: ['primary', 'secondary', 'accent', 'danger', 'inherit'], defaultValue: 'primary', description: 'Foreground color alias for the control' },
  { name: 'theme', type: 'select', options: ['dark', 'light'], defaultValue: 'dark', description: 'Preview theme/background' },
  { name: 'alignLabel', type: 'select', options: ['end', 'start'], defaultValue: 'end', description: 'Position of label relative to icon' },
  { name: 'underline', type: 'boolean', defaultValue: false, description: 'Show underline under the label' },
  { name: 'active', type: 'boolean', defaultValue: false, description: 'Visual active/selected state' },
  { name: 'hideLabel', type: 'boolean', defaultValue: false, description: 'Hide label visually (accessible label remains)' },
  { name: 'stretch', type: 'boolean', defaultValue: false, description: 'Allow link to stretch to container width' },
];
