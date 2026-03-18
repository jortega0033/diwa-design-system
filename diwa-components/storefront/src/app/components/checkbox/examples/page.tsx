'use client';

import React, { useState } from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';

// ── Individual story definitions ──────────────────────────────────────────

const defaultStory: Story<'diwa-checkbox'> = {
  state: { properties: { label: 'Subscribe to newsletter', theme: 'dark' } },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-checkbox' as const, properties: properties ?? {} },
  ],
};

const checkedStory: Story<'diwa-checkbox'> = {
  state: { properties: { label: 'Remember me', checked: true, theme: 'dark' } },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-checkbox' as const, properties: properties ?? {} },
  ],
};

const indeterminateStory: Story<'diwa-checkbox'> = {
  state: {
    properties: {
      label: 'Select all items',
      indeterminate: true,
      theme: 'dark',
    },
  },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-checkbox' as const, properties: properties ?? {} },
  ],
};

const disabledStory: Story<'diwa-checkbox'> = {
  state: {
    properties: { label: 'Option unavailable', disabled: true, theme: 'dark' },
  },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-checkbox' as const, properties: properties ?? {} },
  ],
};

const disabledCheckedStory: Story<'diwa-checkbox'> = {
  state: {
    properties: {
      label: 'Pre-selected (read-only)',
      checked: true,
      disabled: true,
      theme: 'dark',
    },
  },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-checkbox' as const, properties: properties ?? {} },
  ],
};

const errorStory: Story<'diwa-checkbox'> = {
  state: {
    properties: {
      label: 'Accept terms and conditions',
      required: true,
      state: 'error',
      message: 'You must accept the terms to continue.',
      theme: 'dark',
    },
  },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-checkbox' as const, properties: properties ?? {} },
  ],
};

const successStory: Story<'diwa-checkbox'> = {
  state: {
    properties: {
      label: 'Email verified',
      checked: true,
      state: 'success',
      message: 'Your email address has been verified.',
      theme: 'dark',
    },
  },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-checkbox' as const, properties: properties ?? {} },
  ],
};

const compactStory: Story<'diwa-checkbox'> = {
  state: {
    properties: { label: 'Compact density', compact: true, theme: 'dark' },
  },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-checkbox' as const, properties: properties ?? {} },
  ],
};

const requiredStory: Story<'diwa-checkbox'> = {
  state: {
    properties: {
      label: 'I agree to the privacy policy',
      required: true,
      theme: 'dark',
    },
  },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-checkbox' as const, properties: properties ?? {} },
  ],
};

const lightStory: Story<'diwa-checkbox'> = {
  state: {
    properties: { label: 'Light theme checkbox', theme: 'light' },
  },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-checkbox' as const, properties: properties ?? {} },
  ],
};

// ── Select-all live demo ───────────────────────────────────────────────────

const OPTIONS = [
  { id: 'opt-a', label: 'Analytics cookies' },
  { id: 'opt-b', label: 'Marketing cookies' },
  { id: 'opt-c', label: 'Preference cookies' },
];

function SelectAllDemo() {
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);

  const allChecked = checked.every(Boolean);
  const someChecked = checked.some(Boolean);
  const parentIndeterminate = someChecked && !allChecked;

  const handleParent = (e: CustomEvent<{ checked: boolean }>) => {
    if (e.detail.checked || parentIndeterminate) {
      setChecked([true, true, true]);
    } else {
      setChecked([false, false, false]);
    }
  };

  const handleChild = (i: number) => (e: CustomEvent<{ checked: boolean }>) => {
    const next = [...checked];
    next[i] = e.detail.checked;
    setChecked(next);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Parent "Select all" */}
      <diwa-checkbox
        label="Select all"
        checked={allChecked}
        indeterminate={parentIndeterminate}
        onupdate={handleParent}
      />
      {/* Indented sub-options */}
      <div className="flex flex-col gap-2 pl-8 border-l border-[var(--diwa-border)] ml-2.5">
        {OPTIONS.map((opt, i) => (
          <diwa-checkbox
            key={opt.id}
            label={opt.label}
            checked={checked[i]}
            onupdate={handleChild(i)}
          />
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

function ExampleSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold text-[var(--diwa-text-primary)] mb-1">{title}</h2>
      {description && (
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">{description}</p>
      )}
      {children}
    </section>
  );
}

export default function CheckboxExamplesPage() {
  return (
    <div className="space-y-2">
      <ExampleSection title="Default">
        <ComponentStory story={defaultStory} />
      </ExampleSection>

      <ExampleSection title="Checked">
        <ComponentStory story={checkedStory} />
      </ExampleSection>

      <ExampleSection
        title="Indeterminate"
        description="Shown when only a subset of child options are selected. Renders a dash icon and sets aria-checked=&quot;mixed&quot;."
      >
        <ComponentStory story={indeterminateStory} />
      </ExampleSection>

      <ExampleSection title="Disabled">
        <ComponentStory story={disabledStory} />
      </ExampleSection>

      <ExampleSection title="Disabled + Checked">
        <ComponentStory story={disabledCheckedStory} />
      </ExampleSection>

      <ExampleSection
        title="Error state"
        description="Shows a colored border and message when validation fails. Set state=&quot;error&quot; and provide a message."
      >
        <ComponentStory story={errorStory} />
      </ExampleSection>

      <ExampleSection
        title="Success state"
        description="Confirms a valid selection. Set state=&quot;success&quot; with an optional confirmation message."
      >
        <ComponentStory story={successStory} />
      </ExampleSection>

      <ExampleSection
        title="Required"
        description="Adds a visual asterisk to the label. Combine with error state for form validation feedback."
      >
        <ComponentStory story={requiredStory} />
      </ExampleSection>

      <ExampleSection
        title="Compact"
        description="Enables dense mode. Reduces checkbox size from 20 px to 14 px for dense layouts such as data tables or sidebars."
      >
        <ComponentStory story={compactStory} />
      </ExampleSection>

      <ExampleSection
        title="Light theme"
        description="Per-component theme override — sets data-theme=&quot;light&quot; on the host element."
      >
        <ComponentStory story={lightStory} />
      </ExampleSection>

      <ExampleSection
        title="Select All — indeterminate group"
        description='Live example of the "Select All" pattern. The parent checkbox shows an indeterminate dash when only some children are selected. Clicking it toggles all children.'
      >
        <div className="rounded-lg overflow-hidden border border-[var(--diwa-border)] mb-8">
          <div className="p-8 flex items-start justify-center min-h-[140px] bg-[var(--diwa-bg-surface)]">
            <SelectAllDemo />
          </div>
        </div>
      </ExampleSection>
    </div>
  );
}
