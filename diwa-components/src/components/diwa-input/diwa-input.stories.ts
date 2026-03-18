/**
 * diwa-input.stories.ts — Components / Input
 * ============================================
 * Interactive Storybook stories for <diwa-input>.
 * Covers all input types, validation states, prefix/suffix slots,
 * and disabled/readonly states.
 *
 * Uses @storybook/web-components-vite (lit html templates, NOT React JSX).
 * The global app.css is injected by .storybook/preview.ts — tokens resolve
 * automatically in the canvas.
 *
 * Reference pattern: Diwa text-field wrapper stories.
 */

import type { Meta, StoryObj } from '@storybook/web-components';
import { html, type TemplateResult } from 'lit';

// ─────────────────────────────────────────────────────────────────────────────
// Meta
// ─────────────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Components/Input',
  tags: ['autodocs'],
  component: 'diwa-input',

  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'url', 'number', 'tel'],
      description: 'Native input type. Controls keyboard, validation, and autocomplete behaviour.',
      table: {
        defaultValue: { summary: 'text' },
        type: { summary: '"text" | "email" | "password" | "search" | "url" | "number" | "tel"' },
      },
    },
    label: {
      control: 'text',
      description: 'Visible label text. Linked to the inner input via htmlFor/id.',
      table: { type: { summary: 'string' } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when the field is empty.',
      table: { type: { summary: 'string' } },
    },
    value: {
      control: 'text',
      description: 'Controlled value.',
      table: { type: { summary: 'string' } },
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Validation state. Controls border colour and hint text colour.',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: '"default" | "error" | "success"' },
      },
    },
    hint: {
      control: 'text',
      description: 'Helper / hint text rendered below the input.',
      table: { type: { summary: 'string' } },
    },
    required: {
      control: 'boolean',
      description: 'Marks the field as required.',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input.',
      table: { defaultValue: { summary: 'false' } },
    },
    readonly: {
      control: 'boolean',
      description: 'Makes the input read-only.',
      table: { defaultValue: { summary: 'false' } },
    },
  },

  args: {
    type: 'text',
    label: 'Label',
    placeholder: 'Enter value…',
    state: 'default',
    required: false,
    disabled: false,
    readonly: false,
  },

  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Input** — \`<diwa-input>\`

A fully encapsulated, accessible text input primitive.
Supports all common text-based HTML input types and three validation states.

Uses \`shadow: { delegatesFocus: true }\` so \`.focus()\` on the host element
forwards to the inner \`<input>\`.

Labels are linked to the inner input via a module-level unique ID counter.

### Usage

\`\`\`html
<diwa-input label="Email" type="email" placeholder="you@example.com"></diwa-input>
<diwa-input label="Password" type="password" required></diwa-input>
<diwa-input label="Search" type="search" state="error" hint="No results found."></diwa-input>

<!-- With prefix icon -->
<diwa-input label="Search" type="search">
  <svg slot="prefix" width="16" height="16" aria-hidden="true">…</svg>
</diwa-input>
\`\`\`

### Events

| Event | Payload | When |
|---|---|---|
| \`diwaInput\` | \`string\` | On every keystroke |
| \`diwaChange\` | \`string\` | On blur / committed value |
| \`diwaFocus\` | \`FocusEvent\` | On focus |
| \`diwaBlur\` | \`FocusEvent\` | On blur |

### CSS Custom Property override API

| Property | Description |
|---|---|
| \`--diwa-input-height\` | Height (default 42px) |
| \`--diwa-input-padding-x\` | Horizontal padding |
| \`--diwa-input-radius\` | Border radius |
| \`--diwa-input-border\` | Default border colour |
| \`--diwa-input-bg\` | Background colour |
| \`--diwa-input-color\` | Text colour |
| \`--diwa-input-placeholder-color\` | Placeholder text colour |
| \`--diwa-input-font-size\` | Font size |
| \`--diwa-input-border-focus\` | Border colour when focused |
| \`--diwa-input-border-error\` | Border colour in error state |
| \`--diwa-input-border-success\` | Border colour in success state |

### \`::part()\` override hooks

| Part | Element |
|---|---|
| \`::part(label)\` | Label \`<label>\` |
| \`::part(wrapper)\` | Input wrapper \`<div>\` |
| \`::part(input)\` | Native \`<input>\` |
| \`::part(prefix)\` | Prefix slot \`<span>\` |
| \`::part(suffix)\` | Suffix slot \`<span>\` |
| \`::part(hint)\` | Hint text \`<span>\` |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ─────────────────────────────────────────────────────────────────────────────
// Inline SVG helpers
// ─────────────────────────────────────────────────────────────────────────────

/** 16×16 search icon */
const iconSearch: TemplateResult = html`
  <svg
    slot="prefix"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="6.5" cy="6.5" r="4"/>
    <line x1="9.5" y1="9.5" x2="14" y2="14"/>
  </svg>
`;

/** 16×16 email/envelope icon */
const iconEnvelope: TemplateResult = html`
  <svg
    slot="prefix"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 3h14v10H1V3zm1 1v8h12V4L8 9 2 4zm0 0l6 5 6-5H2z"/>
  </svg>
`;

/** 16×16 lock icon */
const iconLock: TemplateResult = html`
  <svg
    slot="prefix"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 1a3 3 0 0 0-3 3v2H3v9h10V6h-2V4a3 3 0 0 0-3-3zm0 1a2 2 0 0 1 2 2v2H6V4a2 2 0 0 1 2-2zm0 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </svg>
`;

// ─────────────────────────────────────────────────────────────────────────────
// Stories
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Default story — all props wired to the Controls panel.
 */
export const Default: Story = {
  name: 'Default',
  args: { label: 'Full name', placeholder: 'Enter your name…' },
  render: ({ type, label, placeholder, value, state, hint, required, disabled, readonly }) => html`
    <div style="width: 320px;">
      <diwa-input
        type=${type ?? 'text'}
        label=${label ?? ''}
        placeholder=${placeholder ?? ''}
        value=${value ?? ''}
        state=${state ?? 'default'}
        hint=${hint ?? ''}
        ?required=${required}
        ?disabled=${disabled}
        ?readonly=${readonly}
      ></diwa-input>
    </div>
  `,
};

/**
 * All validation states.
 * - **default** — neutral; no validation message.
 * - **error** — destructive; shows error hint in danger colour.
 * - **success** — positive; shows success hint in success colour.
 */
export const ValidationStates: Story = {
  name: 'Validation States',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; width: 320px;">
      <diwa-input
        label="Default state"
        placeholder="No validation"
        hint="Helper text for additional context."
      ></diwa-input>

      <diwa-input
        label="Error state"
        placeholder="Enter a valid email"
        state="error"
        hint="Please enter a valid email address."
        value="not-an-email"
      ></diwa-input>

      <diwa-input
        label="Success state"
        placeholder="Email"
        state="success"
        hint="Email address verified."
        value="user@example.com"
      ></diwa-input>
    </div>
  `,
};

/**
 * Common input types — demonstrates keyboard and autocomplete differences.
 */
export const InputTypes: Story = {
  name: 'Input Types',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 320px;">
      <diwa-input label="Text" type="text" placeholder="Full name"></diwa-input>
      <diwa-input label="Email" type="email" placeholder="you@example.com"></diwa-input>
      <diwa-input label="Password" type="password" placeholder="••••••••"></diwa-input>
      <diwa-input label="Search" type="search" placeholder="Search…"></diwa-input>
      <diwa-input label="URL" type="url" placeholder="https://example.com"></diwa-input>
      <diwa-input label="Number" type="number" placeholder="0"></diwa-input>
      <diwa-input label="Tel" type="tel" placeholder="+1 (555) 000-0000"></diwa-input>
    </div>
  `,
};

/**
 * With prefix icons — icon placed in the `prefix` slot.
 */
export const WithPrefixIcon: Story = {
  name: 'With Prefix Icon',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 320px;">
      <diwa-input label="Search" type="search" placeholder="Search components…">
        ${iconSearch}
      </diwa-input>

      <diwa-input label="Email" type="email" placeholder="you@example.com">
        ${iconEnvelope}
      </diwa-input>

      <diwa-input label="Password" type="password" placeholder="••••••••">
        ${iconLock}
      </diwa-input>
    </div>
  `,
};

/**
 * Required fields — the `required` attribute adds a `*` indicator and sets
 * `aria-required="true"` on the inner input.
 */
export const RequiredField: Story = {
  name: 'Required Field',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 320px;">
      <diwa-input
        label="Email address"
        type="email"
        placeholder="you@example.com"
        required
        hint="We'll never share your email."
      ></diwa-input>

      <diwa-input
        label="Password"
        type="password"
        placeholder="Min. 8 characters"
        required
      ></diwa-input>
    </div>
  `,
};

/**
 * Disabled and read-only states.
 * - **disabled** — 50% opacity, pointer/keyboard blocked.
 * - **readonly** — secondary background, content is selectable.
 */
export const DisabledAndReadonly: Story = {
  name: 'Disabled & Read-only',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; width: 320px;">
      <diwa-input
        label="Disabled input"
        placeholder="Cannot interact"
        value="Read-only value"
        disabled
      ></diwa-input>

      <diwa-input
        label="Read-only input"
        value="jortega0033"
        readonly
        hint="Username cannot be changed."
      ></diwa-input>
    </div>
  `,
};

/**
 * Full form example — login form demonstrating real-world usage patterns.
 */
export const FormExample: Story = {
  name: 'Form Example',
  parameters: { layout: 'padded' },
  render: () => html`
    <form
      style="
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 360px;
        padding: 32px;
        background: var(--diwa-bg-secondary);
        border-radius: var(--diwa-radius-lg);
        border: 1px solid var(--diwa-border-light);
      "
    >
      <h2
        style="
          margin: 0 0 4px;
          font-family: var(--diwa-font-family-base);
          font-size: 20px;
          font-weight: 600;
          color: var(--diwa-text-primary);
        "
      >
        Sign in
      </h2>
      <p
        style="
          margin: 0;
          font-family: var(--diwa-font-family-base);
          font-size: 14px;
          color: var(--diwa-text-secondary);
        "
      >
        Enter your credentials to continue.
      </p>

      <diwa-input
        label="Email"
        type="email"
        placeholder="you@example.com"
        required
      >
        ${iconEnvelope}
      </diwa-input>

      <diwa-input
        label="Password"
        type="password"
        placeholder="••••••••"
        required
      >
        ${iconLock}
      </diwa-input>

      <diwa-button variant="primary" type="submit" style="width: 100%;">
        Sign in
      </diwa-button>
    </form>
  `,
};
