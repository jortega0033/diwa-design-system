import { beforeEach, describe, expect, it, vi } from 'vitest';
import { h } from '@stencil/core';
import { DiwaSelect } from './diwa-select';

// WCAG 4.1.2 — diwa-select slotted label aria-labelledby (#107)
// aria-labelledby must be set on the combobox trigger when label is provided via slot only.

describe('diwa-select — slotted label aria-labelledby (WCAG 4.1.2)', () => {
  beforeEach(() => {
    vi.mocked(h).mockImplementation((tag: unknown, props?: Record<string, unknown>, ...children: unknown[]) => {
      const normalizedChildren = children.flat();
      return {
        tag,
        props: { ...(props ?? {}), children: normalizedChildren },
        children: normalizedChildren,
      };
    });
  });

  const makeHost = (slotLabel: Element | null = null) => ({
    querySelector: vi.fn((selector: string) => {
      if (selector === '[slot="label"]') return slotLabel;
      if (selector === '[slot="description"]') return null;
      return null;
    }),
    querySelectorAll: vi.fn().mockReturnValue([]),
  });

  const findByRole = (node: any, role: string): any => {
    if (node == null) return undefined;
    if (Array.isArray(node)) {
      for (const n of node) {
        const found = findByRole(n, role);
        if (found) return found;
      }
      return undefined;
    }
    if (typeof node === 'object') {
      const props = node.props || {};
      if (props.role === role) return node;
      const children = props.children || node.children;
      if (children) return findByRole(children, role);
    }
    return undefined;
  };

  it('aria-labelledby is set on combobox trigger when label is provided via prop', () => {
    const s = new DiwaSelect();
    s.label = 'Favourite fruit';
    (s as any).host = makeHost(null);

    const vnode = (s as any).render();
    const trigger = findByRole(vnode, 'combobox');
    expect(trigger?.props?.['aria-labelledby']).toBe(`${(s as any).internalId}-label`);
  });

  it('aria-labelledby is set on combobox trigger when label is provided via slot only', () => {
    const s = new DiwaSelect();
    s.label = undefined;
    const slotEl = document.createElement('span');
    slotEl.textContent = 'Category';
    (s as any).host = makeHost(slotEl);

    const vnode = (s as any).render();
    const trigger = findByRole(vnode, 'combobox');
    expect(trigger?.props?.['aria-labelledby']).toBe(`${(s as any).internalId}-label`);
  });

  it('aria-labelledby is undefined on combobox trigger when neither prop nor slot label is present', () => {
    const s = new DiwaSelect();
    s.label = undefined;
    (s as any).host = makeHost(null);

    const vnode = (s as any).render();
    const trigger = findByRole(vnode, 'combobox');
    expect(trigger?.props?.['aria-labelledby']).toBeUndefined();
  });

  it('aria-labelledby is set when both slot and prop are present', () => {
    const s = new DiwaSelect();
    s.label = 'Prop label';
    const slotEl = document.createElement('span');
    slotEl.textContent = 'Slot label';
    (s as any).host = makeHost(slotEl);

    const vnode = (s as any).render();
    const trigger = findByRole(vnode, 'combobox');
    expect(trigger?.props?.['aria-labelledby']).toBe(`${(s as any).internalId}-label`);
  });
});
