# Component Implementation Baseline Analysis

## Ticket: #314 - Implementation Baseline Documentation

This document captures the architectural patterns, conventions, and technical contracts observed in #114, #115, and existing Diwa Design System component implementations. It serves as the definitive baseline for implementing new components and features.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Component Structure](#component-structure)
3. [Styling & Theming](#styling--theming)
4. [Keyboard Navigation](#keyboard-navigation)
5. [Accessibility](#accessibility)
6. [Event System](#event-system)
7. [Testing Patterns](#testing-patterns)
8. [Naming Conventions](#naming-conventions)
9. [Common Patterns](#common-patterns)
10. [Deprecation & Migration](#deprecation--migration)

---

## Architecture Overview

### Source of Truth: Stencil Components

- **Primary Location**: `diwa-components/src/components/` (Stencil)
- **Generated Outputs**:
  - `diwa-components/dist/` (bundle format)
  - `diwa-components/dist-custom-elements/` (ES module single-file per component)
  - `diwa-components/loader/` (Stencil lazy loader)
- **Framework Wrappers** (auto-generated, do NOT hand-edit):
  - `diwa-components-react/src/components.ts`
  - `diwa-components-vue/src/components.ts`
  - `diwa-components-angular/src/directives/proxies.ts`

### Shadow DOM & Composition

- **Shadow DOM v1**: All components use Shadow DOM for style encapsulation
- **Slot-Based**: Content projection via named `<slot>` elements
- **Prop-First**: Behavior and theming controlled via `@Prop()` decorators
- **Example**: `diwa-button.tsx` uses icon slot + variant/size props

---

## Component Structure

### Stencil Component Template

```typescript
// diwa-components/src/components/diwa-button/diwa-button.tsx
import { Component, h, Host, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'diwa-button',
  styleUrl: 'diwa-button.css',
  shadow: true, // All components use Shadow DOM
})
export class DiwaNormalButton {
  /**
   * Variant of the button.
   * @default 'primary'
   */
  @Prop() variant: 'primary' | 'secondary' | 'tertiary' = 'primary';

  /**
   * Size of the button.
   * @default 'md'
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Whether button is disabled.
   */
  @Prop() disabled: boolean = false;

  /**
   * Fired when button is activated.
   */
  @Event() buttonClick: EventEmitter<MouseEvent>;

  private handleClick = (e: MouseEvent) => {
    if (!this.disabled) {
      this.buttonClick.emit(e);
    }
  };

  render() {
    return (
      <Host role="button" tabindex="0">
        <button
          class={{
            button: true,
            [`button--${this.variant}`]: true,
            [`button--${this.size}`]: true,
          }}
          disabled={this.disabled}
          onClick={this.handleClick}
        >
          <slot></slot>
          <slot name="icon"></slot>
        </button>
      </Host>
    );
  }
}
```

### Directory Layout per Component

```
diwa-components/src/components/diwa-button/
  ├── diwa-button.tsx          # Main component
  ├── diwa-button.css          # Styles
  ├── diwa-button.spec.tsx     # Unit tests
  ├── test/                    # E2E test files
  └── README.md                # Component docs
```

---

## Styling & Theming

### Token-First Architecture

All colors, spacing, typography use `--diwa-*` CSS variables.

**Rule**: Do NOT hardcode colors in component styles unless explicitly justified via comment.

### Theme Support

Components respond to data-attributes on `<html>` or parent elements:

```css
/* Light theme (default) */
:host {
  --button-bg: var(--diwa-color-primary);
  --button-text: var(--diwa-color-on-primary);
}

/* Dark theme */
:host([data-theme="dark"]) {
  --button-bg: var(--diwa-color-primary-dark);
  --button-text: var(--diwa-color-on-primary-dark);
}

/* High-contrast theme */
:host([data-theme="high-contrast"]) {
  --button-bg: var(--diwa-color-primary-hc);
  --button-text: var(--diwa-color-on-primary-hc);
}
```

### Example Token Variables

From `diwa-components/src/global/`:

```scss
// Color scales
--diwa-color-primary
--diwa-color-primary-dark
--diwa-color-primary-hc
--diwa-color-secondary
--diwa-color-neutral-0 through --diwa-color-neutral-100

// Spacing scale
--diwa-space-xs (4px)
--diwa-space-sm (8px)
--diwa-space-md (16px)
--diwa-space-lg (32px)
--diwa-space-xl (64px)

// Typography
--diwa-font-size-sm
--diwa-font-size-md
--diwa-font-size-lg
--diwa-line-height-compact
--diwa-line-height-normal
```

---

## Keyboard Navigation

### Universal Requirements

Every interactive component must support:

| Key(s) | Behavior |
|--------|----------|
| **Tab** | Move focus to next focusable element |
| **Shift+Tab** | Move focus to previous focusable element |
| **Enter** | Activate/submit focused element (buttons, forms) |
| **Space** | Toggle focused element (checkboxes, radio buttons, buttons in some contexts) |
| **Escape** | Close/dismiss modals, dropdowns, flyouts |
| **Arrow Keys** | Navigate within lists, menus, tab panels, carousels |

### Reduced Motion

All animated transitions must respect `prefers-reduced-motion: reduce`:

```css
@media (prefers-reduced-motion: reduce) {
  :host * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus Visibility

- Use `:focus-visible` for keyboard focus (visible outline)
- Use `:focus:not(:focus-visible)` for mouse focus (subtle or none)

```css
button {
  outline: none;
}

button:focus-visible {
  outline: 2px solid var(--diwa-color-focus);
  outline-offset: 2px;
}
```

---

## Accessibility

### WCAG 2.1 Level AA Baseline

All components must meet WCAG 2.1 Level AA minimum.

### Semantic HTML

- Use native elements (`<button>`, `<input>`, `<label>`, `<nav>`) when possible
- Never use `<div role="button">` if `<button>` is available
- Preserve semantic meaning in Shadow DOM

### ARIA Best Practices

```typescript
// Button with aria-label for icon-only buttons
<Host
  role="button"
  aria-label={this.ariaLabel}
  tabindex={this.disabled ? -1 : 0}
>
```

### Required Tests

All components MUST have:

1. **Semantic Tests**: Verify correct HTML tags, roles, ARIA attributes
2. **Keyboard Tests**: Tab, Enter, Escape, Arrow navigation
3. **Focus Tests**: Visible focus indicator, focus trap in modals
4. **Screen Reader Tests**: Tested with at least one SR (NVDA, JAWS, VoiceOver)
5. **Visual Regression**: Test light/dark/high-contrast themes

### Example a11y Test

```typescript
describe('diwa-button a11y', () => {
  it('should have accessible name', async () => {
    const page = await newSpecPage({
      components: [DiwaNormalButton],
      html: '<diwa-button>Click me</diwa-button>',
    });
    const button = page.doc.querySelector('button');
    expect(button.textContent).toContain('Click me');
  });

  it('should be keyboard navigable', async () => {
    const page = await newSpecPage({
      components: [DiwaNormalButton],
      html: '<diwa-button></diwa-button>',
    });
    const button = page.doc.querySelector('diwa-button');
    expect(button.getAttribute('tabindex')).toEqual('0');
  });

  it('should respect prefers-reduced-motion', async () => {
    const page = await newSpecPage({
      components: [DiwaNormalButton],
      html: '<diwa-button></diwa-button>',
    });
    // Verify CSS media query applied
  });
});
```

---

## Event System

### Naming Convention: No Prefixes

**User Preference** (from workspace): Custom events use NO prefixes.

❌ **WRONG**: `didOpen`, `didClose`, `onSubmit`, `onDismiss`

✅ **CORRECT**: `open`, `close`, `submit`, `dismiss`, `search`, `filter`

### Event Pattern

```typescript
/**
 * Fired when dropdown is opened.
 * @type {CustomEvent<void>}
 */
@Event() open: EventEmitter<void>;

/**
 * Fired when selection changes.
 * @type {CustomEvent<SelectionDetail>}
 */
@Event() change: EventEmitter<SelectionDetail>;

private handleToggle = () => {
  this.isOpen = !this.isOpen;
  this.open.emit();
};
```

### Usage in HTML/React/Vue

```html
<!-- HTML -->
<diwa-dropdown @open="console.log('opened')">
  <button slot="trigger">Open</button>
</diwa-dropdown>

<!-- React (auto-proxy) -->
<DiwDropdown onOpen={() => console.log('opened')}>
  <button slot="trigger">Open</button>
</DiwDropdown>

<!-- Vue (auto-proxy) -->
<diwa-dropdown @open="onOpen">
  <button slot="trigger">Open</button>
</diwa-dropdown>
```

---

## Testing Patterns

### Test File Location

```
diwa-components/src/components/diwa-button/
  ├── diwa-button.spec.tsx    # Unit tests (Vitest)
  └── test/
      ├── button.e2e.ts       # E2E tests (optional)
      └── README.md           # Test docs
```

### Unit Test Template

```typescript
// diwa-button.spec.tsx
import { newSpecPage } from '@stencil/core/testing';
import { DiwaNormalButton } from './diwa-button';

describe('diwa-button', () => {
  describe('Rendering', () => {
    it('should render', async () => {
      const page = await newSpecPage({
        components: [DiwaNormalButton],
        html: '<diwa-button>Click me</diwa-button>',
      });
      expect(page.root).toEqualHtml(`
        <diwa-button>
          <mock:shadow-root>
            <button class="button button--primary button--md">
              <slot></slot>
              <slot name="icon"></slot>
            </button>
          </mock:shadow-root>
          Click me
        </diwa-button>
      `);
    });

    it('should apply variant class', async () => {
      const page = await newSpecPage({
        components: [DiwaNormalButton],
        html: '<diwa-button variant="secondary">Click</diwa-button>',
      });
      const button = page.root.shadowRoot.querySelector('button');
      expect(button.classList.contains('button--secondary')).toBe(true);
    });
  });

  describe('Events', () => {
    it('should emit click event', async () => {
      const page = await newSpecPage({
        components: [DiwaNormalButton],
        html: '<diwa-button></diwa-button>',
      });
      const clickSpy = jest.fn();
      page.root.addEventListener('buttonClick', clickSpy);

      const button = page.root.shadowRoot.querySelector('button');
      button.click();

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should not emit click when disabled', async () => {
      const page = await newSpecPage({
        components: [DiwaNormalButton],
        html: '<diwa-button disabled></diwa-button>',
      });
      const clickSpy = jest.fn();
      page.root.addEventListener('buttonClick', clickSpy);

      const button = page.root.shadowRoot.querySelector('button');
      button.click();

      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible', async () => {
      const page = await newSpecPage({
        components: [DiwaNormalButton],
        html: '<diwa-button></diwa-button>',
      });
      expect(page.root.getAttribute('tabindex')).toEqual('0');
    });

    it('should have proper role', async () => {
      const page = await newSpecPage({
        components: [DiwaNormalButton],
        html: '<diwa-button></diwa-button>',
      });
      expect(page.root.getAttribute('role')).toEqual('button');
    });
  });
});
```

### Running Tests

```bash
# Unit tests (Vitest)
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# UX visual/a11y regression (via Storybook/Percy)
npm run test:ux
```

---

## Naming Conventions

### Component Names

- **File**: kebab-case (lowercase with hyphens)
  - `diwa-button.tsx`
  - `diwa-multi-select.tsx`
  
- **Class Name**: PascalCase matching component tag
  - `export class DiwaNormalButton { }`
  - `export class DiwaMultiSelect { }`

- **Component Tag**: kebab-case (lowercase with hyphens)
  - `<diwa-button></diwa-button>`
  - `<diwa-multi-select></diwa-multi-select>`

### Props

- **Naming**: camelCase, no prefixes
  - ✅ `variant`, `size`, `disabled`, `ariaLabel`
  - ❌ `buttonVariant`, `isDisabled`, `dataVariant`

### Events

- **Naming**: camelCase, no prefixes (established preference)
  - ✅ `click`, `open`, `close`, `change`, `search`, `dismiss`
  - ❌ `onClick`, `onOpen`, `didOpen`, `buttonClick`

### Methods/Handlers

- **Public Methods**: camelCase
  - `async open() { }`
  - `async close() { }`

- **Private Handlers**: camelCase with suffix
  - `private handleClick = () => { }`
  - `private handleKeyDown = () => { }`

### CSS Classes (Shadow DOM)

- **BEM Pattern**: block__element--modifier
  - `.button`
  - `.button__icon`
  - `.button--primary`
  - `.button--disabled`

---

## Common Patterns

### State Management Pattern

```typescript
export class DiwaDropdown {
  @State() isOpen: boolean = false;
  @State() focusedIndex: number = 0;

  private handleToggle = () => {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.open.emit();
    } else {
      this.close.emit();
    }
  };
}
```

### Lifecycle Pattern

```typescript
export class DiwaComponent {
  componentWillLoad() {
    // Initialize before first render
  }

  componentDidLoad() {
    // Set up event listeners, focus management
  }

  componentShouldUpdate(newVal, oldVal, propName) {
    // Return false to skip update
    return newVal !== oldVal;
  }

  componentDidUpdate() {
    // Update dependent state
  }

  disconnectedCallback() {
    // Clean up listeners
  }
}
```

### Slot Detection Pattern

```typescript
componentDidLoad() {
  const hasIcon = !!this.el.querySelector('[slot="icon"]');
  const hasLabel = !!this.el.textContent?.trim();

  this.hasContent = hasLabel || hasIcon;
}
```

### Focus Trap Pattern (Modals)

```typescript
private handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    this.close.emit();
    return;
  }

  if (e.key === 'Tab') {
    const focusableElements = this.el.shadowRoot.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusableElements[0] as HTMLElement;
    const last = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (document.activeElement === last && !e.shiftKey) {
      e.preventDefault();
      first.focus();
    }
    if (document.activeElement === first && e.shiftKey) {
      e.preventDefault();
      last.focus();
    }
  }
};
```

### Data Binding Pattern (Form Controls)

```typescript
export class DiwaInput {
  @Prop({ mutable: true }) value: string = '';
  @Event() change: EventEmitter<string>;

  private handleInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.change.emit(this.value);
  };
}
```

### Theme Attribute Pattern

```typescript
export class DiwaComponent {
  @Prop() theme: 'light' | 'dark' | 'high-contrast' = 'light';

  render() {
    return (
      <Host
        data-theme={this.theme}
        // Mirrors to assist external CSS selectors
        theme={this.theme}
      >
        {/* content */}
      </Host>
    );
  }
}
```

---

## Deprecation & Migration

### Marking Props as Deprecated

```typescript
/**
 * @deprecated Use `variant` instead. Will be removed in v4.0.0.
 */
@Prop() type: string;
```

### Deprecation Timeline

- **Major version bump**: Breaking changes allowed
- **Minor version bump**: New features, backward compatible
- **Patch version bump**: Bug fixes only
- **Deprecation period**: Minimum 1 major version (e.g., deprecated in v3.0, removed in v4.0)

### Slot Deprecation Pattern

```typescript
componentDidLoad() {
  const oldSlot = this.el.querySelector('[slot="old-name"]');
  if (oldSlot) {
    console.warn(
      'slot="old-name" is deprecated. Use slot="new-name" instead.'
    );
  }
}
```

### Migration Guide Template

Include in component README:

```markdown
## Migration

### v3.0 → v4.0

#### Prop Changes

- `type` → `variant` (string → enum)
- `onSubmit` → `submit` (event naming)

#### Slot Changes

- `icon-slot` → `icon` (simpler naming)

### Upgrade Guide

```html
<!-- Before (v3) -->
<diwa-input type="text" (onSubmit)="handleSubmit()">
  <div slot="icon-slot">icon</div>
</diwa-input>

<!-- After (v4) -->
<diwa-input variant="primary" @submit="handleSubmit()">
  <div slot="icon">icon</div>
</diwa-input>
```
```

---

## Quality Gates (from AGENTS.md)

### Pre-Submission Checklist

- [ ] Component compiles without TypeScript errors
- [ ] All tests pass (`npm run test`)
- [ ] Visual/a11y regression tests pass (`npm run test:ux`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Storefront documentation works (`npm run build:storefront`)
- [ ] No unused imports or dead code
- [ ] Control height contract validated (`npm run agency:validate:control-heights`)

### PR Checklist

- [ ] Component behavior isolated in `diwa-components/src/components/`
- [ ] Global tokens/styles in `diwa-components/src/global/`
- [ ] NO hand-edits to wrapper proxy files
- [ ] NO direct edits to `dist/`, `dist-custom-elements/`, `loader/`
- [ ] Accessibility contract preserved (focus, keyboard, SR)
- [ ] Token-first styling (all colors via `--diwa-*` variables)
- [ ] Events use no prefix naming
- [ ] README updated with usage examples
- [ ] CHANGELOG.md updated with migration notes (if breaking)

---

## Summary

This analysis captures the foundational patterns for implementing Diwa Design System components. Key takeaways:

1. **Source of Truth**: Stencil components in `diwa-components/src/components/`
2. **Never Hand-Edit**: Generated wrappers, dist artifacts, loader files
3. **Token-First**: All styling via `--diwa-*` variables
4. **Accessibility**: WCAG 2.1 AA minimum, semantic HTML, keyboard + SR support
5. **Events**: No prefixes (`open`, `close`, `change`, not `onOpen`, `didClose`)
6. **Naming**: kebab-case tags, PascalCase classes, camelCase props
7. **Testing**: Vitest units + visual/a11y regression via UX tests
8. **Quality Gates**: Build, test, type-check, visual regression, control heights, storefront

Use this document as the definitive reference when implementing new components or features.

---

**Document Version**: 1.0  
**Last Updated**: [Date generated]  
**Contributing**: See CONTRIBUTING.md
