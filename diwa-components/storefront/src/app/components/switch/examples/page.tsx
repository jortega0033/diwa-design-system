'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import { Section } from '@/components/docs';
import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

// ── Single toggle ──────────────────────────────────────────────────────────

const basicStory: Story<HTMLTagOrComponent> = {
  state: { properties: { checked: false } },
  generator: ({ properties } = {}): ElementConfig<HTMLTagOrComponent>[] => [
    {
      tag: 'diwa-switch' as const,
      properties: { checked: properties?.checked as boolean },
      events: { onupdate: { target: 'diwa-switch', prop: 'checked', eventValueKey: 'checked' } },
      children: ['Enable notifications'],
    },
  ],
};

// ── Multiple switches ──────────────────────────────────────────────────────

const multipleStory: Story<HTMLTagOrComponent> = {
  state: { properties: { notifications: true, darkMode: false, autoSave: true } },
  generator: ({ properties } = {}): ElementConfig<HTMLTagOrComponent>[] => [
    {
      tag: 'div' as const,
      properties: { className: 'flex flex-col gap-3' },
      children: [
        {
          tag: 'diwa-switch' as const,
          properties: { checked: properties?.notifications as boolean },
          events: { onupdate: { target: 'diwa-switch', prop: 'notifications', eventValueKey: 'checked' } },
          children: ['Push notifications'],
        },
        {
          tag: 'diwa-switch' as const,
          properties: { checked: properties?.darkMode as boolean },
          events: { onupdate: { target: 'diwa-switch', prop: 'darkMode', eventValueKey: 'checked' } },
          children: ['Dark mode'],
        },
        {
          tag: 'diwa-switch' as const,
          properties: { checked: properties?.autoSave as boolean },
          events: { onupdate: { target: 'diwa-switch', prop: 'autoSave', eventValueKey: 'checked' } },
          children: ['Auto-save'],
        },
      ],
    },
  ],
};

// ── Label alignment ────────────────────────────────────────────────────────

const alignmentStory: Story<HTMLTagOrComponent> = {
  state: { properties: { endChecked: true, startChecked: true } },
  generator: ({ properties } = {}): ElementConfig<HTMLTagOrComponent>[] => [
    {
      tag: 'div' as const,
      properties: { className: 'flex flex-col gap-3' },
      children: [
        {
          tag: 'diwa-switch' as const,
          properties: { checked: properties?.endChecked as boolean, 'align-label': 'end' },
          events: { onupdate: { target: 'diwa-switch', prop: 'endChecked', eventValueKey: 'checked' } },
          children: ['Label on end (default)'],
        },
        {
          tag: 'diwa-switch' as const,
          properties: { checked: properties?.startChecked as boolean, 'align-label': 'start' },
          events: { onupdate: { target: 'diwa-switch', prop: 'startChecked', eventValueKey: 'checked' } },
          children: ['Label on start'],
        },
      ],
    },
  ],
};

// ── States ─────────────────────────────────────────────────────────────────

const statesStory: Story<HTMLTagOrComponent> = {
  generator: (): ElementConfig<HTMLTagOrComponent>[] => [
    {
      tag: 'div' as const,
      properties: { className: 'flex flex-col gap-3' },
      children: [
        { tag: 'diwa-switch' as const, properties: {}, children: ['Unchecked'] },
        { tag: 'diwa-switch' as const, properties: { checked: true }, children: ['Checked'] },
        { tag: 'diwa-switch' as const, properties: { disabled: true }, children: ['Disabled (off)'] },
        { tag: 'diwa-switch' as const, properties: { checked: true, disabled: true }, children: ['Disabled (on)'] },
        { tag: 'diwa-switch' as const, properties: { loading: true }, children: ['Loading'] },
      ],
    },
  ],
};

// ── Dense mode (compact) ───────────────────────────────────────────────────────────

const compactStory: Story<HTMLTagOrComponent> = {
  state: { properties: { compactChecked: false, normalChecked: false } },
  generator: ({ properties } = {}): ElementConfig<HTMLTagOrComponent>[] => [
    {
      tag: 'div' as const,
      properties: { className: 'flex flex-col gap-3' },
      children: [
        {
          tag: 'diwa-switch' as const,
          properties: { checked: properties?.normalChecked as boolean },
          events: { onupdate: { target: 'diwa-switch', prop: 'normalChecked', eventValueKey: 'checked' } },
          children: ['Default size'],
        },
        {
          tag: 'diwa-switch' as const,
          properties: { checked: properties?.compactChecked as boolean, compact: true },
          events: { onupdate: { target: 'diwa-switch', prop: 'compactChecked', eventValueKey: 'checked' } },
          children: ['Compact size'],
        },
      ],
    },
  ],
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function SwitchExamplesPage() {
  return (
    <div>
      <Section title="Basic toggle">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          A single switch binding a boolean preference. The host app controls{' '}
          <code className="font-mono text-[var(--diwa-accent)]">checked</code> in response to the{' '}
          <code className="font-mono text-[var(--diwa-accent)]">update</code> event.
        </p>
        <ComponentStory story={basicStory} />
      </Section>

      <Section title="Multiple switches">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Each switch manages an independent boolean. Group related toggles vertically with a
          consistent gap.
        </p>
        <ComponentStory story={multipleStory} />
      </Section>

      <Section title="Label alignment">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Use <code className="font-mono text-[var(--diwa-accent)]">align-label="start"</code> to
          place the label before the track — useful in right-aligned form layouts.
        </p>
        <ComponentStory story={alignmentStory} />
      </Section>

      <Section title="States">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          The full set of visual states: unchecked, checked, disabled off, disabled on, and loading.
        </p>
        <ComponentStory story={statesStory} />
      </Section>

      <Section title="Dense mode (compact)">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Use <code className="font-mono text-[var(--diwa-accent)]">compact</code> to enable dense mode —
          it reduces track and thumb size while keeping label size unchanged.
        </p>
        <ComponentStory story={compactStory} />
      </Section>
    </div>
  );
}
