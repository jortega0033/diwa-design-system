import { beforeEach, describe, expect, it, vi } from 'vitest';
import { h } from '@stencil/core';
import { DiwaSwitch } from './diwa-switch';

// WCAG 4.1.2 — diwa-switch accessible name (#106)
// The label <span> must have a stable id; the role="switch" track must have aria-labelledby.

describe('diwa-switch — accessible name (WCAG 4.1.2)', () => {
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

  const findByClass = (node: any, cls: string): any => {
    if (node == null) return undefined;
    if (Array.isArray(node)) {
      for (const n of node) {
        const found = findByClass(n, cls);
        if (found) return found;
      }
      return undefined;
    }
    if (typeof node === 'object') {
      const props = node.props || {};
      const nodeClass = props.class || '';
      if (typeof nodeClass === 'string' && nodeClass.includes(cls)) return node;
      const children = props.children || node.children;
      if (children) return findByClass(children, cls);
    }
    return undefined;
  };

  it('generates a stable labelId at class instantiation', () => {
    const sw = new DiwaSwitch();
    expect(typeof (sw as any).labelId).toBe('string');
    expect((sw as any).labelId).toMatch(/^diwa-sw-label-\d+$/);
  });

  it('two instances receive distinct labelIds', () => {
    const sw1 = new DiwaSwitch();
    const sw2 = new DiwaSwitch();
    expect((sw1 as any).labelId).not.toBe((sw2 as any).labelId);
  });

  it('label span has id matching labelId', () => {
    const sw = new DiwaSwitch();
    const vnode = (sw as any).render();
    const labelSpan = findByClass(vnode, 'label');
    expect(labelSpan?.props?.id).toBe((sw as any).labelId);
  });

  it('track element has aria-labelledby matching labelId', () => {
    const sw = new DiwaSwitch();
    const vnode = (sw as any).render();
    const track = findByClass(vnode, 'track');
    expect(track?.props?.['aria-labelledby']).toBe((sw as any).labelId);
  });

  it('aria-checked reflects checked prop', () => {
    const sw = new DiwaSwitch();
    sw.checked = true;
    const vnode = (sw as any).render();
    const track = findByClass(vnode, 'track');
    expect(track?.props?.['aria-checked']).toBe('true');

    sw.checked = false;
    const vnode2 = (sw as any).render();
    const track2 = findByClass(vnode2, 'track');
    expect(track2?.props?.['aria-checked']).toBe('false');
  });

  it('componentDidLoad emits console.error when host has no text and no aria-label', () => {
    const sw = new DiwaSwitch();
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    (sw as any).host = { textContent: '', hasAttribute: vi.fn().mockReturnValue(false) };

    (sw as any).componentDidLoad();

    expect(errorSpy).toHaveBeenCalledWith(
      '[diwa-switch] An accessible label is required. Use slot content or aria-label.',
    );
    errorSpy.mockRestore();
  });

  it('componentDidLoad does not emit console.error when host has slotted text', () => {
    const sw = new DiwaSwitch();
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    (sw as any).host = { textContent: 'Email notifications', hasAttribute: vi.fn().mockReturnValue(false) };

    (sw as any).componentDidLoad();

    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('componentDidLoad does not emit console.error when host has aria-label attribute', () => {
    const sw = new DiwaSwitch();
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    (sw as any).host = { textContent: '', hasAttribute: vi.fn().mockReturnValue(true) };

    (sw as any).componentDidLoad();

    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
