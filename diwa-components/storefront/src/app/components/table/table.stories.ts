import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import type { ElementConfig } from '@/utils/generator/generator';

const TEAM = [
  { name: 'Alice Chen', role: 'Product Designer', dept: 'Design', status: 'Active', joined: '2022-03' },
  { name: 'Bob Kumar', role: 'Frontend Engineer', dept: 'Engineering', status: 'Away', joined: '2021-07' },
  { name: 'Carlos Silva', role: 'Backend Engineer', dept: 'Engineering', status: 'Active', joined: '2023-01' },
  { name: 'Diana Müller', role: 'QA Engineer', dept: 'Quality', status: 'Active', joined: '2022-11' },
];

const tableHead = (props: Record<string, unknown> = {}): ElementConfig<'diwa-table-head'> => ({
  tag: 'diwa-table-head' as const,
  properties: {},
  children: [
    {
      tag: 'diwa-table-row' as const,
      properties: {},
      children: [
        { tag: 'diwa-table-head-cell' as const, properties: {}, children: ['Name'] },
        { tag: 'diwa-table-head-cell' as const, properties: {}, children: ['Role'] },
        { tag: 'diwa-table-head-cell' as const, properties: {}, children: ['Department'] },
        { tag: 'diwa-table-head-cell' as const, properties: {}, children: ['Status'] },
        { tag: 'diwa-table-head-cell' as const, properties: {}, children: ['Joined'] },
      ],
    },
  ],
});

const tableBody = (): ElementConfig<'diwa-table-body'> => ({
  tag: 'diwa-table-body' as const,
  properties: {},
  children: TEAM.map((m) => ({
    tag: 'diwa-table-row' as const,
    properties: {},
    children: [
      { tag: 'diwa-table-cell' as const, properties: {}, children: [m.name] },
      { tag: 'diwa-table-cell' as const, properties: {}, children: [m.role] },
      { tag: 'diwa-table-cell' as const, properties: {}, children: [m.dept] },
      { tag: 'diwa-table-cell' as const, properties: {}, children: [m.status] },
      { tag: 'diwa-table-cell' as const, properties: {}, children: [m.joined] },
    ],
  })),
});

export const tableStory: Story<'diwa-table'> = {
  state: {
    properties: {
      caption: 'Team members',
      compact: false,
      layout: 'auto',
      bordered: false,
      striped: false,
    },
  },
  generator: ({ properties } = {}): ElementConfig<'diwa-table'>[] => [
    {
      tag: 'diwa-table' as const,
      properties: {
        caption: properties?.caption as string | undefined,
        compact: properties?.compact as boolean | undefined,
        layout: properties?.layout as 'auto' | 'fixed' | undefined,
        bordered: properties?.bordered as boolean | undefined,
        striped: properties?.striped as boolean | undefined,
      },
      children: [tableHead(), tableBody()],
    },
  ],
};

export const tableBasicStory: Story<'diwa-table'> = {
  generator: (): ElementConfig<'diwa-table'>[] => [
    {
      tag: 'diwa-table' as const,
      properties: { caption: 'Team members' },
      children: [tableHead(), tableBody()],
    },
  ],
};

export const tableCompactStory: Story<'diwa-table'> = {
  generator: (): ElementConfig<'diwa-table'>[] => [
    {
      tag: 'diwa-table' as const,
      properties: { caption: 'Team members', compact: true },
      children: [tableHead(), tableBody()],
    },
  ],
};

export const tableBorderedStory: Story<'diwa-table'> = {
  generator: (): ElementConfig<'diwa-table'>[] => [
    {
      tag: 'diwa-table' as const,
      properties: { caption: 'Team members', bordered: true },
      children: [tableHead(), tableBody()],
    },
  ],
};

export const tableStripedStory: Story<'diwa-table'> = {
  generator: (): ElementConfig<'diwa-table'>[] => [
    {
      tag: 'diwa-table' as const,
      properties: { caption: 'Team members', striped: true },
      children: [tableHead(), tableBody()],
    },
  ],
};

export const tablePropDefinitions: PropDefinition[] = [
  { name: 'caption', type: 'string', defaultValue: 'Team members' },
  { name: 'compact', type: 'boolean', defaultValue: false },
  { name: 'bordered', type: 'boolean', defaultValue: false },
  { name: 'striped', type: 'boolean', defaultValue: false },
  { name: 'layout', type: 'select', options: ['auto', 'fixed'], defaultValue: 'auto' },
];
