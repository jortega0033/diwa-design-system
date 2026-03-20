import React from 'react';
import { Section, Table, Code, Type } from '@/components/docs';

export default function HeadingApiPage() {
  return (
    <div className="max-w-5xl space-y-10">

      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [
              <Code key="size-n">size</Code>,
              <Type key="size-t">{`'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'inherit'`}</Type>,
              <Code key="size-d">'h2'</Code>,
              'Visual size and inferred semantic heading level. Determines the rendered HTML tag when no explicit tag prop is given.',
            ],
            [
              <Code key="tag-n">tag</Code>,
              <Type key="tag-t">{`'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'`}</Type>,
              <Code key="tag-d">undefined</Code>,
              'Override the rendered HTML tag. If omitted, the tag is inferred from the size prop. Use to decouple visual size from semantic heading level.',
            ],
            [
              <Code key="weight-n">weight</Code>,
              <Type key="weight-t">{`'semibold' | 'bold'`}</Type>,
              <Code key="weight-d">'bold'</Code>,
              'Font weight.',
            ],
            [
              <Code key="align-n">align</Code>,
              <Type key="align-t">{`'start' | 'center' | 'end'`}</Type>,
              <Code key="align-d">'start'</Code>,
              'Horizontal text alignment. start and end are RTL-aware.',
            ],
            [
              <Code key="color-n">color</Code>,
              <Type key="color-t">{`'primary' | 'secondary' | 'inherit'`}</Type>,
              <Code key="color-d">'primary'</Code>,
              'Colour alias. inherit passes through the surrounding text colour unchanged — useful inside styled containers.',
            ],
            [
              <Code key="ellipsis-n">ellipsis</Code>,
              <Type key="ellipsis-t">boolean</Type>,
              <Code key="ellipsis-d">false</Code>,
              'Clips overflow text to a single line with a trailing ellipsis. The host element must have a defined width.',
            ],
            [
              <Code key="theme-n">theme</Code>,
              <Type key="theme-t">{`'dark' | 'light'`}</Type>,
              <Code key="theme-d">'dark'</Code>,
              'Per-component theme override. Sets data-theme on the host so token overrides cascade into the shadow DOM.',
            ],
          ]}
        />
      </Section>

      <Section title="Events">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          <Code>diwa-heading</Code> is a non-interactive display component and emits no events.
        </p>
      </Section>

      <Section title="Slots">
        <Table
          columns={['Slot', 'Description']}
          rows={[
            [
              <Code key="default-slot">default</Code>,
              'Heading text content. Inline elements (strong, em, span) are permitted. Do not slot block-level elements — the heading element cannot contain block-level children.',
            ],
          ]}
        />
      </Section>

      <Section title="CSS custom properties">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          These properties can be set on the <Code>diwa-heading</Code> host element to override styles at the component level
          without modifying global design tokens.
        </p>
        <Table
          columns={['Property', 'Default', 'Description']}
          rows={[
            [
              <Code key="fs">--diwa-heading-font-size</Code>,
              <span key="fs-d" className="text-[var(--diwa-text-secondary)] text-sm italic">From size prop</span>,
              'Overrides the computed fluid font size. Accepts any valid CSS length or font-size value.',
            ],
            [
              <Code key="ls">--diwa-heading-letter-spacing</Code>,
              <span key="ls-d" className="text-[var(--diwa-text-secondary)] text-sm italic">From size prop</span>,
              'Overrides the letter-spacing. Default is -0.03em for display/h1, -0.015em for h2/h3, and 0 for h4–h6.',
            ],
            [
              <Code key="lh">--diwa-heading-line-height</Code>,
              <Code key="lh-d">var(--diwa-line-height-tight)</Code>,
              'Overrides the line-height. Defaults to the tight token (1.1) for compact heading stacks.',
            ],
            [
              <Code key="c">--diwa-heading-color</Code>,
              <span key="c-d" className="text-[var(--diwa-text-secondary)] text-sm italic">From color prop</span>,
              'Overrides the text colour. Accepts any valid CSS colour value or token reference. Ensure the override meets WCAG contrast requirements.',
            ],
          ]}
        />
      </Section>

      <Section title="Auto-tag behaviour">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          The component resolves the HTML tag to render using the following priority order:
        </p>
        <Table
          columns={['Condition', 'Rendered tag']}
          rows={[
            ['A direct child of the slot is an h1–h6 element', <Code key="at1">div</Code>],
            ['The tag prop is explicitly set', <span key="at2" className="text-sm text-[var(--diwa-text-secondary)]">Value of tag prop</span>],
            ['size is display', <Code key="at3">h1</Code>],
            ['size is h1–h6', <span key="at4" className="text-sm text-[var(--diwa-text-secondary)]">Matching h1–h6 element</span>],
            ['size is inherit', <Code key="at5">h2</Code>],
          ]}
        />
      </Section>

    </div>
  );
}
