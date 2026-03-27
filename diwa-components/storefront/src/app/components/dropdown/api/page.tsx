import React from 'react';
import { Section, Table, Code } from '@/components/docs';

export default function DropdownApiPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code key="theme">theme</Code>, <Code key="theme-type">'light' | 'dark'</Code>, <Code key="theme-default">'dark'</Code>, 'Per-component theme override.'],
            [<Code key="open">open</Code>, <Code key="open-type">boolean</Code>, <Code key="open-default">false</Code>, 'Controls whether the dropdown panel is visible. Mutable and can be controlled externally.'],
            [<Code key="disabled">disabled</Code>, <Code key="disabled-type">boolean</Code>, <Code key="disabled-default">false</Code>, 'Disables trigger interaction.'],
            [<Code key="submenu">submenu</Code>, <Code key="submenu-type">boolean</Code>, <Code key="submenu-default">false</Code>, 'Nested submenu mode. Uses side placement and submenu keyboard behavior.'],
            [<Code key="placement">placement</Code>, <Code key="placement-type">Floating placement string</Code>, <Code key="placement-default">'bottom-start'</Code>, 'Preferred dropdown placement relative to trigger.'],
            [<Code key="strategy">strategy</Code>, <Code key="strategy-type">'fixed' | 'absolute'</Code>, <Code key="strategy-default">'fixed'</Code>, 'Floating positioning strategy.'],
            [<Code key="offsetPx">offsetPx</Code>, <Code key="offset-type">number</Code>, <Code key="offset-default">6</Code>, 'Gap in pixels between trigger and panel.'],
            [<Code key="matchTriggerWidth">matchTriggerWidth</Code>, <Code key="match-type">boolean</Code>, <Code key="match-default">false</Code>, 'When true, panel min-width matches trigger width.'],
            [<Code key="closeOnSelect">closeOnSelect</Code>, <Code key="close-type">boolean</Code>, <Code key="close-default">true</Code>, 'Close panel after selecting an item.'],
            [<Code key="triggerLabel">triggerLabel</Code>, <Code key="label-type">string</Code>, <Code key="label-default">'Options'</Code>, 'Fallback trigger text when no trigger slot is supplied.'],
            [<Code key="triggerVariant">triggerVariant</Code>, <Code key="variant-type">'primary' | 'secondary' | 'ghost' | 'danger'</Code>, <Code key="variant-default">'secondary'</Code>, 'Fallback trigger button variant.'],
            [<Code key="triggerSize">triggerSize</Code>, <Code key="size-type">'xs' | 'sm' | 'md' | 'lg'</Code>, <Code key="size-default">'sm'</Code>, 'Fallback trigger button size.'],
            [<Code key="triggerIcon">triggerIcon</Code>, <Code key="icon-type">string</Code>, <Code key="icon-default">'none'</Code>, 'Fallback trigger icon name.'],
            [<Code key="hideTriggerLabel">hideTriggerLabel</Code>, <Code key="hide-type">boolean</Code>, <Code key="hide-default">false</Code>, 'Hides fallback trigger label visually (icon-only trigger).'],
          ]}
        />
      </Section>

      <Section title="Events">
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={[
            [<Code key="toggle">toggle</Code>, <Code key="toggle-detail">{`{ open: boolean }`}</Code>, 'Yes', 'Emitted when menu visibility changes.'],
            [<Code key="select">select</Code>, <Code key="select-detail">{`{ value?: string; label?: string }`}</Code>, 'Yes', 'Emitted when a menu item is selected.'],
          ]}
        />
      </Section>

      <Section title="Methods">
        <Table
          columns={['Name', 'Signature', 'Description']}
          rows={[
            [<Code key="show">show</Code>, <Code key="show-sig">() =&gt; Promise&lt;void&gt;</Code>, 'Programmatically opens the dropdown (no-op when disabled).'],
            [<Code key="hide">hide</Code>, <Code key="hide-sig">() =&gt; Promise&lt;void&gt;</Code>, 'Programmatically closes the dropdown.'],
            [<Code key="toggleOpen">toggleOpen</Code>, <Code key="toggle-sig">() =&gt; Promise&lt;void&gt;</Code>, 'Toggles open state.'],
          ]}
        />
      </Section>

      <Section title="Slots">
        <Table
          columns={['Name', 'Description']}
          rows={[
            [<Code key="trigger">trigger</Code>, 'Optional custom trigger element. Overrides built-in diwa-button trigger.'],
            ['(default)', 'Dropdown panel content. Supply menuitem buttons/links and optional nested diwa-dropdown nodes.'],
          ]}
        />
      </Section>

      <Section title="CSS custom properties">
        <Table
          columns={['Property', 'Fallback', 'Description']}
          rows={[
            [<Code key="bg">--diwa-bg-elevated</Code>, 'Token', 'Panel background colour.'],
            [<Code key="border">--diwa-border</Code>, 'Token', 'Panel border colour.'],
            [<Code key="radius">--diwa-radius-md</Code>, 'Token', 'Panel corner radius.'],
            [<Code key="shadow">--diwa-shadow-lg</Code>, 'Token', 'Panel shadow/elevation.'],
            [<Code key="text">--diwa-text-primary</Code>, 'Token', 'Menu item text colour.'],
            [<Code key="hover">--diwa-bg-hover</Code>, 'Token', 'Menu item hover background.'],
          ]}
        />
      </Section>
    </div>
  );
}
