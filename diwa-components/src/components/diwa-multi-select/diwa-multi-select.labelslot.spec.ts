import { beforeEach, describe, expect, it, vi } from 'vitest';
import { h } from '@stencil/core';
import { DiwaMultiSelect } from './diwa-multi-select';

// WCAG 4.1.2 — diwa-multi-select slotted label aria-labelledby (#107)
// aria-labelledby must be set on the combobox trigger when label is provided via slot only.

describe('diwa-multi-select — slotted label aria-labelledby (WCAG 4.1.2)', () => {
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
      if (selector === '[slot="filter"]') return null;
      if (selector === '[slot="selected"]') return null;
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

  it('aria-labelledby is set on combobox trigger when label prop is set', () => {
    const ms = new DiwaMultiSelect();
    ms.label = 'Fruits';
    (ms as any).host = makeHost(null);

    const vnode = (ms as any).render();
    const trigger = findByRole(vnode, 'combobox');
    expect(trigger?.props?.['aria-labelledby']).toBe(`${(ms as any).internalId}-label`);
  });

  it('aria-labelledby is set on combobox trigger when slot label is provided without prop', () => {
    const ms = new DiwaMultiSelect();
    ms.label = undefined;
    const slotEl = document.createElement('span');
    slotEl.textContent = 'Categories';
    (ms as any).host = makeHost(slotEl);

    const vnode = (ms as any).render();
    const trigger = findByRole(vnode, 'combobox');
    expect(trigger?.props?.['aria-labelledby']).toBe(`${(ms as any).internalId}-label`);
  });

  it('aria-labelledby is undefined on combobox trigger when neither prop nor slot label is present', () => {
    const ms = new DiwaMultiSelect();
    ms.label = undefined;
    (ms as any).host = makeHost(null);

    const vnode = (ms as any).render();
    const trigger = findByRole(vnode, 'combobox');
    expect(trigger?.props?.['aria-labelledby']).toBeUndefined();
  });
});
