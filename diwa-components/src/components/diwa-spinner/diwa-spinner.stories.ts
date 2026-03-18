/**
 * diwa-spinner.stories.ts — Components / Spinner
 * =================================================
 * Interactive Storybook stories for <diwa-spinner>.
 * Covers all size tiers and accessibility patterns.
 *
 * Uses @storybook/web-components-vite (lit html templates, NOT React JSX).
 * The global app.css is injected by .storybook/preview.ts — tokens resolve
 * automatically in the canvas.
 *
 * Reference pattern: Diwa spinner docs and parity stories.
 */

import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

// ─────────────────────────────────────────────────────────────────────────────
// Meta
// ─────────────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Components/Spinner',
  tags: ['autodocs'],
  component: 'diwa-spinner',

  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size tier — controls the diameter of the spinner ring.',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: '"sm" | "md" | "lg"' },
      },
    },
    label: {
      control: 'text',
      description:
        'Accessible label announced by screen readers. Defaults to "Loading" when omitted.',
      table: {
        defaultValue: { summary: 'Loading' },
        type: { summary: 'string' },
      },
    },
  },

  args: {
    size: 'md',
    label: 'Loading',
  },

  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Spinner** — \`<diwa-spinner>\`

A CSS-only animated loading indicator.
Communicates asynchronous activity to both sighted users and screen readers
via \`role="status"\` and an accessible label.

Supports three size tiers driven by \`--diwa-spinner-size-*\` tokens.
Respects \`prefers-reduced-motion\` per WCAG 2.1 2.3.3.

### Usage

\`\`\`html
<diwa-spinner></diwa-spinner>
<diwa-spinner size="lg" label="Saving changes…"></diwa-spinner>
<diwa-spinner size="sm" label="Uploading file"></diwa-spinner>
\`\`\`

### CSS Custom Property override API

| Property | Description |
|---|---|
| \`--diwa-spinner-size-sm\` | Diameter for the sm tier (default 14px) |
| \`--diwa-spinner-size-md\` | Diameter for the md tier (default 16px) |
| \`--diwa-spinner-size-lg\` | Diameter for the lg tier (default 20px) |
| \`--diwa-spinner-color\` | Spinner stroke colour (defaults to \`currentColor\`) |
| \`--diwa-spinner-duration\` | Animation duration (default 0.7s) |

### \`::part()\` override hooks

| Part | Element |
|---|---|
| \`::part(ring)\` | The animated ring \`<span>\` |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ─────────────────────────────────────────────────────────────────────────────
// Stories
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Default story — all props wired to the Controls panel.
 */
export const Default: Story = {
  name: 'Default',
  args: { size: 'md', label: 'Loading' },
  render: ({ size, label }) => html`
    <diwa-spinner size=${size} label=${label}></diwa-spinner>
  `,
};

/**
 * All three size tiers side by side.
 * - **sm** — 14px; suits inline text or compact table cells.
 * - **md** — 16px (default); general-purpose.
 * - **lg** — 20px; prominent loading state in cards or full-page.
 */
export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <diwa-spinner size="sm" label="Loading (small)"></diwa-spinner>
      <diwa-spinner size="md" label="Loading (medium)"></diwa-spinner>
      <diwa-spinner size="lg" label="Loading (large)"></diwa-spinner>
    </div>
  `,
};

/**
 * Inline usage — spinner alongside text, matching the button loading pattern.
 */
export const InlineWithText: Story = {
  name: 'Inline with Text',
  render: () => html`
    <div
      style="
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: var(--diwa-font-family-base);
        font-size: 14px;
        color: var(--diwa-text-secondary);
      "
    >
      <diwa-spinner size="sm" label="Saving changes"></diwa-spinner>
      <span aria-hidden="true">Saving changes…</span>
    </div>
  `,
};

/**
 * Colour inheritance — the spinner ring uses `currentColor` by default,
 * so it adapts to any text colour context.
 */
export const ColourInheritance: Story = {
  name: 'Colour Inheritance',
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: center;">
      <div
        style="
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--diwa-accent);
          font-family: var(--diwa-font-family-base);
          font-size: 14px;
        "
      >
        <diwa-spinner size="md" label="Loading (accent)"></diwa-spinner>
        <span>Accent</span>
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--diwa-danger-text);
          font-family: var(--diwa-font-family-base);
          font-size: 14px;
        "
      >
        <diwa-spinner size="md" label="Loading (danger)"></diwa-spinner>
        <span>Danger</span>
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--diwa-text-muted);
          font-family: var(--diwa-font-family-base);
          font-size: 14px;
        "
      >
        <diwa-spinner size="md" label="Loading (muted)"></diwa-spinner>
        <span>Muted</span>
      </div>
    </div>
  `,
};

/**
 * Full-page loading overlay pattern — spinner centred over a content area.
 */
export const FullPageOverlay: Story = {
  name: 'Full Page Overlay',
  parameters: { layout: 'fullscreen' },
  render: () => html`
    <div
      style="
        position: relative;
        width: 100%;
        height: 200px;
        background: var(--diwa-bg-content);
        border-radius: var(--diwa-radius-lg);
        overflow: hidden;
      "
    >
      <!-- Simulated background content -->
      <div
        style="
          padding: 24px;
          font-family: var(--diwa-font-family-base);
          color: var(--diwa-text-primary);
          opacity: 0.3;
        "
      >
        <h3 style="margin: 0 0 8px; font-size: 16px;">Dashboard</h3>
        <p style="margin: 0; font-size: 14px; color: var(--diwa-text-secondary);">Content loading…</p>
      </div>

      <!-- Loading overlay -->
      <div
        style="
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: var(--diwa-bg-glass);
        "
      >
        <diwa-spinner size="lg" label="Loading dashboard…"></diwa-spinner>
        <span
          style="
            font-family: var(--diwa-font-family-base);
            font-size: 13px;
            color: var(--diwa-text-secondary);
          "
          aria-hidden="true"
        >
          Loading dashboard…
        </span>
      </div>
    </div>
  `,
};
