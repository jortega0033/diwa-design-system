import React from 'react';
import { Section, Table, Code } from '@/components/docs';




export default function LinkPureApiPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code key="theme">theme</Code>, <Code key="t">&apos;light&apos; | &apos;dark&apos;</Code>, <Code key="d">&apos;dark&apos;</Code>, 'Per-component theme override.'],
            [<Code key="size">size</Code>, <Code key="t">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</Code>, <Code key="d">&apos;md&apos;</Code>, 'Text and icon size tier.'],
            [<Code key="icon">icon</Code>, <Code key="t">string</Code>, <Code key="d">&apos;arrow-right&apos;</Code>, 'Lucide icon name (kebab-case), or "none" to hide icon.'],
            [<Code key="alignLabel">alignLabel</Code>, <Code key="t">&apos;end&apos; | &apos;start&apos;</Code>, <Code key="d">&apos;end&apos;</Code>, 'Label position relative to icon. "end": [icon][label], "start": [label][icon].'],
            [<Code key="underline">underline</Code>, <Code key="t">boolean</Code>, <Code key="d">false</Code>, 'Adds underline decoration to the label text.'],
            [<Code key="active">active</Code>, <Code key="t">boolean</Code>, <Code key="d">false</Code>, 'Forces active visual state. Sets aria-current="page".'],
            [<Code key="hideLabel">hideLabel</Code>, <Code key="t">boolean</Code>, <Code key="d">false</Code>, 'Visually hides the label (icon-only mode). Always pair with label.'],
            [<Code key="stretch">stretch</Code>, <Code key="t">boolean</Code>, <Code key="d">false</Code>, 'Stretches component to fill container width.'],
            [<Code key="href">href</Code>, <Code key="t">string</Code>, <Code key="d">undefined</Code>, 'URL the link navigates to. Renders as <a> when set, <span> otherwise.'],
            [<Code key="target">target</Code>, <Code key="t">&apos;_self&apos; | &apos;_blank&apos; | &apos;_parent&apos; | &apos;_top&apos;</Code>, <Code key="d">&apos;_self&apos;</Code>, 'Where to open the linked URL.'],
            [<Code key="download">download</Code>, <Code key="t">string</Code>, <Code key="d">undefined</Code>, 'Triggers browser download dialog.'],
            [<Code key="rel">rel</Code>, <Code key="t">string</Code>, <Code key="d">undefined</Code>, 'Relationship of the target. Defaults to noopener noreferrer when target="_blank".'],
            [<Code key="label">label</Code>, <Code key="t">string</Code>, <Code key="d">undefined</Code>, 'Accessible aria-label for icon-only usage.'],
          ]}
        />
      </Section>

      <Section title="Events">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          <Code>diwa-link-pure</Code> is a navigation element and emits no custom events.
        </p>
      </Section>

      <Section title="Slots">
        <Table
          columns={['Name', 'Description']}
          rows={[
            [<Code key="default">(default)</Code>, 'Link label text.'],
          ]}
        />
      </Section>

      <Section title="CSS shadow parts">
        <Table
          columns={['Part', 'Description']}
          rows={[
            [<Code key="base">base</Code>, 'The inner <a> or <span> element.'],
            [<Code key="label">label</Code>, 'The label span wrapping the slotted content.'],
          ]}
        />
      </Section>
    </div>
  );
}
