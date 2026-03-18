import React from 'react';
import { Section, Table, Code } from '@/components/docs';

export default function ButtonPureApiPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>icon</Code>, <Code>string</Code>, <Code>"arrow-right"</Code>, 'Lucide icon name in kebab-case, or "none" to render no icon.'],
            [<Code>size</Code>, <Code>{`"sm" | "md" | "lg"`}</Code>, <Code>"md"</Code>, 'Text and icon size tier.'],
            [<Code>alignLabel</Code>, <Code>{`"end" | "start"`}</Code>, <Code>"end"</Code>, 'Side the label appears on relative to the icon. "end" = icon left, label right.'],
            [<Code>underline</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Adds underline decoration to the label text.'],
            [<Code>active</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Forces the active/pressed visual state (background pill).'],
            [<Code>stretch</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Fills the container width; icon and label pushed to opposite edges.'],
            [<Code>hideLabel</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Hides the label visually (sr-only). Always provide descriptive slot text.'],
            [<Code>disabled</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Disables the button. Blocks all pointer and keyboard interaction.'],
            [<Code>loading</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Shows a spinner in place of the icon. Sets aria-busy. Disables interaction.'],
            [<Code>type</Code>, <Code>{`"button" | "submit" | "reset"`}</Code>, <Code>"button"</Code>, 'Native button type. Ignored when href is set.'],
            [<Code>href</Code>, <Code>string</Code>, '—', 'When set, renders as an <a> element with link semantics.'],
            [<Code>target</Code>, <Code>{`"_blank" | "_self" | "_parent" | "_top"`}</Code>, '—', 'Link target. Only meaningful when href is set.'],
            [<Code>name</Code>, <Code>string</Code>, '—', 'Native button name for form submission.'],
            [<Code>value</Code>, <Code>string</Code>, '—', 'Native button value for form submission.'],
            [<Code>label</Code>, <Code>string</Code>, '—', 'Accessible label override. Required when hideLabel is true and slot text is absent.'],
            [<Code>theme</Code>, <Code>{`"dark" | "light"`}</Code>, <Code>"dark"</Code>, 'Per-component theme override. Sets data-theme on the host element.'],
          ]}
        />
      </Section>

      <Section title="Events">
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={[
            [<Code>click</Code>, <Code>MouseEvent</Code>, 'Yes', 'Native DOM click event. Suppressed (preventDefault + stopPropagation) when disabled or loading.'],
          ]}
        />
      </Section>

      <Section title="Slots">
        <Table
          columns={['Slot', 'Description']}
          rows={[
            [<Code>default</Code>, <>Button label text. Visually hidden when <Code>hideLabel</Code> is true but always present in the accessibility tree.</>],
          ]}
        />
      </Section>

      <Section title="CSS Parts">
        <Table
          columns={['Part', 'Description']}
          rows={[
            [<Code>base</Code>, 'The inner <button> or <a> element. Target with ::part(base) for custom styling.'],
            [<Code>label</Code>, 'The <span> wrapping the label slot.'],
            [<Code>spinner</Code>, 'The spinner element shown during loading.'],
          ]}
        />
      </Section>
    </div>
  );
}
