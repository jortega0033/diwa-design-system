import React from 'react';
import { Section, Table, Code } from '@/components/docs';




export default function ButtonApiPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [
              <Code key="theme">theme</Code>,
              <Code key="t">&#39;light&#39; | &#39;dark&#39;</Code>,
              <Code key="d">&#39;dark&#39;</Code>,
              'Per-component theme override. Overrides the global theme for this button instance.',
            ],
            [
              <Code key="variant">variant</Code>,
              <Code key="t">&#39;primary&#39; | &#39;secondary&#39; | &#39;ghost&#39; | &#39;danger&#39;</Code>,
              <Code key="d">&#39;primary&#39;</Code>,
              'Visual style variant of the button.',
            ],
            [
              <Code key="size">size</Code>,
              <Code key="t">&#39;sm&#39; | &#39;md&#39; | &#39;lg&#39;</Code>,
              <Code key="d">&#39;md&#39;</Code>,
              'Size tier. Controls height, padding, and font size.',
            ],
            [
              <Code key="type">type</Code>,
              <Code key="t">&#39;button&#39; | &#39;submit&#39; | &#39;reset&#39;</Code>,
              <Code key="d">&#39;button&#39;</Code>,
              'Native button type. Relevant when the button is inside a <form>.',
            ],
            [
              <Code key="disabled">disabled</Code>,
              <Code key="t">boolean</Code>,
              <Code key="d">false</Code>,
              'Puts the button in a disabled state. Blocks interaction and lowers opacity.',
            ],
            [
              <Code key="loading">loading</Code>,
              <Code key="t">boolean</Code>,
              <Code key="d">false</Code>,
              'Replaces button content with a spinner and sets aria-busy. Blocks interaction.',
            ],
            [
              <Code key="href">href</Code>,
              <Code key="t">string</Code>,
              '—',
              'When provided, the button renders as an <a> anchor element instead of <button>.',
            ],
            [
              <Code key="target">target</Code>,
              <Code key="t">&#39;_blank&#39; | &#39;_self&#39; | &#39;_parent&#39; | &#39;_top&#39;</Code>,
              '—',
              'Link target. Only applicable when href is set.',
            ],
            [
              <Code key="name">name</Code>,
              <Code key="t">string</Code>,
              '—',
              'Native name attribute for form submission. Only relevant for button type.',
            ],
            [
              <Code key="value">value</Code>,
              <Code key="t">string</Code>,
              '—',
              'Native value attribute for form submission. Only relevant for button type.',
            ],
            [
              <Code key="label">label</Code>,
              <Code key="t">string</Code>,
              '—',
              'Accessible label. Use for icon-only buttons to provide a screen-reader-accessible name.',
            ],
            [
              <Code key="hideLabel">hideLabel</Code>,
              <Code key="t">boolean</Code>,
              <Code key="d">false</Code>,
              'Hides the slotted label visually. Used together with label to create icon-only buttons.',
            ],
          ]}
        />
      </Section>

      <Section title="Events">
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={[
            [
              <Code key="e">click</Code>,
              <Code key="p">MouseEvent</Code>,
              'Yes',
              'Native DOM click event. Suppressed (preventDefault + stopPropagation) when disabled or loading. Use onClick (React), @click (Vue), or (click) (Angular).',
            ],
          ]}
        />
      </Section>

      <Section title="Slots">
        <Table
          columns={['Name', 'Description']}
          rows={[
            [
              '(default)',
              'Button label text. Accepts plain text, icons, or mixed inline content.',
            ],
            [
              <Code key="is">icon-start</Code>,
              'Icon placed before the label. Use with a 16 × 16 px SVG icon component.',
            ],
          ]}
        />
      </Section>

      <Section title="CSS custom properties">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Override these tokens on the host element or a parent selector to customise the button's
          appearance without modifying source styles.
        </p>
        <Table
          columns={['Property', 'Fallback', 'Description']}
          rows={[
            [<Code key="1">--diwa-button-bg</Code>, <Code key="f">--diwa-accent</Code>, 'Background colour.'],
            [
              <Code key="2">--diwa-button-bg-hover</Code>,
              <Code key="f">--diwa-accent-hover</Code>,
              'Background colour on hover.',
            ],
            [
              <Code key="3">--diwa-button-color</Code>,
              <Code key="f">--diwa-text-inverse</Code>,
              'Foreground (text and icon) colour.',
            ],
            [
              <Code key="4">--diwa-button-radius</Code>,
              <Code key="f">--diwa-radius-md</Code>,
              'Border radius.',
            ],
            [<Code key="5">--diwa-button-height</Code>, <Code key="f">40px</Code>, 'Height for the md size.'],
            [<Code key="6">--diwa-button-height-sm</Code>, <Code key="f">32px</Code>, 'Height for the sm size.'],
            [<Code key="7">--diwa-button-height-lg</Code>, <Code key="f">44px</Code>, 'Height for the lg size.'],
            [
              <Code key="8">--diwa-button-padding-x</Code>,
              <Code key="f">16px</Code>,
              'Horizontal padding for md and lg sizes.',
            ],
            [
              <Code key="9">--diwa-button-padding-x-sm</Code>,
              <Code key="f">10px</Code>,
              'Horizontal padding for the sm size.',
            ],
            [
              <Code key="10">--diwa-button-font-size</Code>,
              <Code key="f">--diwa-font-size-base</Code>,
              'Font size.',
            ],
            [
              <Code key="11">--diwa-button-font-weight</Code>,
              <Code key="f">--diwa-font-weight-medium</Code>,
              'Font weight.',
            ],
          ]}
        />
      </Section>
    </div>
  );
}
