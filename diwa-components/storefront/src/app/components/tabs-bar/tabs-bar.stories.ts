import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

const panels = [
  'Overview: A summary of the selected item and its key metrics.',
  'Details: In-depth specifications and configuration options.',
  'Settings: Customise preferences and notifications.',
];

export const tabsBarStory: Story<'diwa-tabs-bar'> = {
  state: {
    properties: {
      activeTabIndex: 0,
    },
  },
  generator: ({ properties } = {}): ElementConfig<HTMLTagOrComponent>[] => {
    const activeIndex = (properties?.activeTabIndex as number) ?? 0;
    return [
      {
        tag: 'div' as const,
        properties: { className: 'w-full' },
        children: [
          {
            tag: 'diwa-tabs-bar' as const,
            properties: {
              'active-tab-index': activeIndex,
              className: 'block w-full',
            },
            events: {
              // Keep configurator's activeTabIndex prop panel in sync with tab clicks.
              onupdate: { target: 'diwa-tabs-bar', prop: 'activeTabIndex', eventValueKey: 'activeTabIndex' },
            },
            children: [
              { tag: 'button' as const, properties: {}, children: ['Overview'] },
              { tag: 'button' as const, properties: {}, children: ['Details'] },
              { tag: 'button' as const, properties: {}, children: ['Settings'] },
            ],
          },
          {
            tag: 'div' as const,
            properties: {
              role: 'tabpanel',
              className: 'p-4 text-sm border border-t-0 border-[var(--diwa-border)] rounded-b text-[var(--diwa-text-secondary)]',
            },
            children: [panels[activeIndex]],
          },
        ],
      },
    ];
  },
};

export const tabsBarPropDefinitions: PropDefinition[] = [
  { name: 'activeTabIndex', type: 'number', defaultValue: 0, description: 'Zero-based index of the active tab' },
];
