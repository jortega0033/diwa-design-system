'use client';

import React, { type Dispatch, type ReactNode, type SetStateAction } from 'react';
import type { StoryState } from '@/models/story';

// ---------------------------------------------------------------------------
// Tag union — extend as more diwa-* components are added
// ---------------------------------------------------------------------------

/** All diwa component tag names. Extend this union as new components are built. */
export type DiwaTagNames = 'diwa-accordion' | 'diwa-badge' | 'diwa-button' | 'diwa-button-pure' | 'diwa-checkbox' | 'diwa-divider' | 'diwa-flyout' | 'diwa-icon' | 'diwa-inline-notification' | 'diwa-input-date' | 'diwa-input-email' | 'diwa-input-month' | 'diwa-input-number' | 'diwa-input-password' | 'diwa-input-search' | 'diwa-input-tel' | 'diwa-input-text' | 'diwa-input-time' | 'diwa-input-url' | 'diwa-input-week' | 'diwa-link' | 'diwa-link-pure' | 'diwa-modal' | 'diwa-multi-select' | 'diwa-multi-select-option' | 'diwa-pagination' | 'diwa-pin-code' | 'diwa-popover' | 'diwa-radio-group' | 'diwa-radio-group-item' | 'diwa-scroller' | 'diwa-segmented-control' | 'diwa-segmented-control-item' | 'diwa-select' | 'diwa-select-option' | 'diwa-spinner' | 'diwa-stepper-horizontal' | 'diwa-stepper-horizontal-item' | 'diwa-switch' | 'diwa-table' | 'diwa-table-body' | 'diwa-table-cell' | 'diwa-table-head' | 'diwa-table-head-cell' | 'diwa-table-row' | 'diwa-tabs' | 'diwa-tabs-bar' | 'diwa-tabs-item' | 'diwa-tag' | 'diwa-tag-dismissible' | 'diwa-text' | 'diwa-text-list' | 'diwa-text-list-item' | 'diwa-textarea' | 'diwa-toast' | 'diwa-toast-item';

/** All HTML intrinsic + diwa component tags that a story can reference. */
export type HTMLTagOrComponent = DiwaTagNames | keyof React.JSX.IntrinsicElements;

// ---------------------------------------------------------------------------
// ElementConfig — describes a single node in a story element tree
// ---------------------------------------------------------------------------

export type ElementConfig<T extends HTMLTagOrComponent> = {
  tag: T;
  /** Props/attributes; use JSX key conventions (className, htmlFor, …). */
  properties?: Record<string, unknown>;
  /** Stencil custom event handlers: key is the JSX event name (e.g. onClick). */
  events?: Record<string, EventConfig>;
  children?: (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
};

/** Describes a state update triggered by a component event. */
export type EventConfig = {
  /** Tag name of the element whose state should be updated. */
  target: string;
  /** Property key to update on that element's state. */
  prop: string;
  /** Static value to set (mutually exclusive with eventValueKey). */
  value?: unknown;
  /** Key to read from `event.detail` (e.g. 'open'). */
  eventValueKey?: string;
  /** Negate the incoming value before setting (useful for toggles). */
  negateValue?: boolean;
};

// ---------------------------------------------------------------------------
// createElements — render an ElementConfig tree as React nodes
// ---------------------------------------------------------------------------

type SetState = Dispatch<SetStateAction<StoryState<HTMLTagOrComponent>>>;

let _keyCounter = 0;

/**
 * Converts an array of `ElementConfig` objects into React elements.
 * All `diwa-*` tags are rendered as native custom elements — React 19
 * supports custom elements with full attribute/event pass-through without
 * any wrapper component.
 *
 * @param nodes   - output of story.generator()
 * @param setState - Configurator's state setter (wired to EventConfig handlers)
 */
export function createElements(
  nodes: (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
  setState: SetState,
): ReactNode {
  _keyCounter = 0;
  return nodes.map((node) => createElement(node, setState));
}

function createElement(
  node: string | ElementConfig<HTMLTagOrComponent> | undefined,
  setState: SetState,
  parentIsCustomEl = false,
): ReactNode {
  if (node === undefined) return null;
  if (typeof node === 'string') return node;

  const { tag, properties = {}, events = {}, children = [] } = node;

  // Build event handler props from EventConfig
  const eventProps: Record<string, (e: CustomEvent) => void> = {};
  for (const [eventName, config] of Object.entries(events)) {
    eventProps[eventName] = (e: CustomEvent) => {
      setState((prev) => {
        const current = prev.properties ?? {};
        let newValue: unknown;
        if (config.eventValueKey !== undefined) {
          newValue = (e.detail as Record<string, unknown>)[config.eventValueKey];
        } else {
          newValue = config.value;
        }
        if (config.negateValue) newValue = !newValue;
        return {
          ...prev,
          properties: { ...current, [config.prop]: newValue },
        };
      });
    };
  }

  const key = `el-${_keyCounter++}`;

  // React 19 custom element support: pass all props directly.
  // For diwa-* tags, boolean props are serialised to attributes automatically.
  // suppressHydrationWarning: React SSR converts camelCase props to kebab-case
  // attributes for custom elements, but client-side React does not, causing
  // a hydration mismatch. Suppress the warning since Stencil manages its own
  // attribute reflection after hydration.
  // Also suppress for direct children of custom elements — Stencil lifecycle
  // hooks (componentDidLoad / syncTabs etc.) mutate slotted child elements
  // (aria-selected, tabindex, data-active) after React hydration begins,
  // causing a false-positive mismatch warning.
  const isCustomEl = typeof tag === 'string' && tag.includes('-');
  const suppressHydration = isCustomEl || parentIsCustomEl;
  return React.createElement(
    tag as string,
    { key, ...(suppressHydration ? { suppressHydrationWarning: true } : {}), ...properties, ...eventProps },
    ...children.map((child) => createElement(child, setState, isCustomEl)),
  );
}
