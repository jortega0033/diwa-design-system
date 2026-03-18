/**
 * diwa-badge.stories.ts — Components / Badge
 * ============================================
 * Interactive Storybook stories for <diwa-badge>.
 * Covers all variants, both sizes, and accessibility usage.
 *
 * Uses @storybook/web-components-vite (lit html templates, NOT React JSX).
 * The global app.css is injected by .storybook/preview.ts — tokens resolve
 * automatically in the canvas.
 *
 * Reference pattern: Diwa badge component docs and parity stories.
 */

import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

// ─────────────────────────────────────────────────────────────────────────────
// Meta
// ─────────────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Components/Badge',
  tags: ['autodocs'],
  component: 'diwa-badge',

  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'accent', 'success', 'warning', 'danger'],
      description: 'Semantic colour variant.',
      table: {
        defaultValue: { summary: 'neutral' },
        type: { summary: '"neutral" | "accent" | "success" | "warning" | "danger"' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size tier — controls padding and font-size.',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: '"sm" | "md"' },
      },
    },
    label: {
      control: 'text',
      description:
        'Accessible label — sets `aria-label` and `role="status"` on the badge. Use when slot content alone is not descriptive enough for screen readers.',
      table: { type: { summary: 'string' } },
    },
  },

  args: {
    variant: 'neutral',
    size: 'md',
  },

  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Badge** — \`<diwa-badge>\`

A compact, pill-shaped label used to convey status, counts, or metadata.
Renders as an inline element with full Shadow DOM encapsulation.

Supports five semantic variants and two size tiers.

### Usage

\`\`\`html
<diwa-badge variant="success">Active</diwa-badge>
<diwa-badge variant="danger" size="sm">3 errors</diwa-badge>
<diwa-badge variant="neutral">Draft</diwa-badge>

<!-- With accessible label for screen readers -->
<diwa-badge variant="warning" label="2 warnings">2</diwa-badge>
\`\`\`

### CSS Custom Property override API

| Property | Description |
|---|---|
| \`--diwa-badge-radius\` | Border radius (default: \`--diwa-radius-full\`) |
| \`--diwa-badge-padding-x\` | Horizontal padding for md size |
| \`--diwa-badge-padding-x-sm\` | Horizontal padding for sm size |
| \`--diwa-badge-font-size\` | Font size for md size |
| \`--diwa-badge-font-size-sm\` | Font size for sm size |
| \`--diwa-badge-font-weight\` | Font weight |

### \`::part()\` override hooks

| Part | Element |
|---|---|
| \`::part(base)\` | Inner \`<span>\` containing the slot |
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
  args: { variant: 'neutral', size: 'md' },
  render: ({ variant, size, label }) => html`
    <diwa-badge variant=${variant} size=${size} label=${label || ''}>Badge</diwa-badge>
  `,
};

/**
 * All five semantic variants side by side.
 * - **neutral** — default; low-emphasis metadata.
 * - **accent** — brand highlight; featured or "new" items.
 * - **success** — positive state; active, published, verified.
 * - **warning** — caution; pending, attention needed.
 * - **danger** — critical; error, failed, blocked.
 */
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
      <diwa-badge variant="neutral">Neutral</diwa-badge>
      <diwa-badge variant="accent">Accent</diwa-badge>
      <diwa-badge variant="success">Success</diwa-badge>
      <diwa-badge variant="warning">Warning</diwa-badge>
      <diwa-badge variant="danger">Danger</diwa-badge>
    </div>
  `,
};

/**
 * Both size tiers.
 * - **sm** — compact; ideal for inline text or table cells.
 * - **md** — default; use in cards, headers, and status areas.
 */
export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center;">
      <diwa-badge variant="success" size="sm">Small</diwa-badge>
      <diwa-badge variant="success" size="md">Medium</diwa-badge>
    </div>
  `,
};

/**
 * Variant × Size matrix — visual regression reference.
 */
export const VariantSizeMatrix: Story = {
  name: 'Variant × Size Matrix',
  parameters: { layout: 'padded' },
  render: () => html`
    <style>
      .badge-matrix {
        display: grid;
        grid-template-columns: 80px repeat(2, auto);
        gap: 10px 16px;
        align-items: center;
        font-family: var(--diwa-font-family-base);
        font-size: 11px;
        color: var(--diwa-text-muted);
      }
      .badge-matrix-header { font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }
      .badge-matrix-label { color: var(--diwa-text-secondary); }
    </style>
    <div class="badge-matrix">
      <span class="badge-matrix-header"></span>
      <span class="badge-matrix-header">sm</span>
      <span class="badge-matrix-header">md</span>

      <span class="badge-matrix-label">neutral</span>
      <diwa-badge variant="neutral" size="sm">Neutral</diwa-badge>
      <diwa-badge variant="neutral" size="md">Neutral</diwa-badge>

      <span class="badge-matrix-label">accent</span>
      <diwa-badge variant="accent" size="sm">Accent</diwa-badge>
      <diwa-badge variant="accent" size="md">Accent</diwa-badge>

      <span class="badge-matrix-label">success</span>
      <diwa-badge variant="success" size="sm">Success</diwa-badge>
      <diwa-badge variant="success" size="md">Success</diwa-badge>

      <span class="badge-matrix-label">warning</span>
      <diwa-badge variant="warning" size="sm">Warning</diwa-badge>
      <diwa-badge variant="warning" size="md">Warning</diwa-badge>

      <span class="badge-matrix-label">danger</span>
      <diwa-badge variant="danger" size="sm">Danger</diwa-badge>
      <diwa-badge variant="danger" size="md">Danger</diwa-badge>
    </div>
  `,
};

/**
 * Status usage — badges used next to text, mimicking real-world status labels.
 */
export const StatusUsage: Story = {
  name: 'Status Usage',
  parameters: { layout: 'padded' },
  render: () => html`
    <div
      style="
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-family: var(--diwa-font-family-base);
        font-size: 14px;
        color: var(--diwa-text-primary);
      "
    >
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>Production deployment</span>
        <diwa-badge variant="success" size="sm">Active</diwa-badge>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>Review queue</span>
        <diwa-badge variant="warning" size="sm">Pending</diwa-badge>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>API endpoint</span>
        <diwa-badge variant="danger" size="sm">Degraded</diwa-badge>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>Feature flag</span>
        <diwa-badge variant="neutral" size="sm">Draft</diwa-badge>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>New component</span>
        <diwa-badge variant="accent" size="sm">New</diwa-badge>
      </div>
    </div>
  `,
};

/**
 * Numeric count badges — accessible via the `label` prop.
 */
export const CountBadges: Story = {
  name: 'Count Badges',
  render: () => html`
    <div style="display: flex; gap: 8px; align-items: center;">
      <diwa-badge variant="danger" label="5 unread notifications">5</diwa-badge>
      <diwa-badge variant="warning" label="12 items pending review">12</diwa-badge>
      <diwa-badge variant="accent" label="99 or more unread messages">99+</diwa-badge>
    </div>
  `,
};
