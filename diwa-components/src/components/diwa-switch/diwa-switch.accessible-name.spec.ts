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

  const makeHost = (idAttr: string | null = null) => ({
    getAttribute: vi.fn().mockReturnValue(idAttr),
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

  it('generates a stable labelId in componentWillLoad (sequential counter)', () => {
    const sw = new DiwaSwitch();
    (sw as any).host = makeHost(null);
    (sw as any).componentWillLoad();
    expect(typeof (sw as any).labelId).toBe('string');
    expect((sw as any).labelId).toMatch(/^diwa-sw-label-\d+$/);
  });

  it('uses host id attribute as labelId base when host has id', () => {
    const sw = new DiwaSwitch();
    (sw as any).host = makeHost('my-switch');
    (sw as any).componentWillLoad();
    expect((sw as any).labelId).toBe('my-switch-label');
  });

  it('two instances receive distinct labelIds when no host id', () => {
    const sw1 = new DiwaSwitch();
    (sw1 as any).host = makeHost(null);
    (sw1 as any).componentWillLoad();

    const sw2 = new DiwaSwitch();
    (sw2 as any).host = makeHost(null);
    (sw2 as any).componentWillLoad();

    expect((sw1 as any).labelId).not.toBe((sw2 as any).labelId);
  });

  it('label span has id matching labelId', () => {
    const sw = new DiwaSwitch();
    (sw as any).host = makeHost(null);
    (sw as any).componentWillLoad();
    const vnode = (sw as any).render();
    const labelSpan = findByClass(vnode, 'label');
    expect((sw as any).labelId).toBeTruthy();
    expect(labelSpan?.props?.id).toBe((sw as any).labelId);
  });

  it('track element has aria-labelledby matching labelId', () => {
    const sw = new DiwaSwitch();
    (sw as any).host = makeHost(null);
    (sw as any).componentWillLoad();
    const vnode = (sw as any).render();
    const track = findByClass(vnode, 'track');
    expect((sw as any).labelId).toBeTruthy();
    expect(track?.props?.['aria-labelledby']).toBe((sw as any).labelId);
  });

  it('aria-checked reflects checked prop', () => {
    const sw = new DiwaSwitch();
    (sw as any).host = makeHost(null);
    (sw as any).componentWillLoad();

    sw.checked = true;
    const vnode = (sw as any).render();
    const track = findByClass(vnode, 'track');
    expect(track?.props?.['aria-checked']).toBe('true');

    sw.checked = false;
    const vnode2 = (sw as any).render();
    const track2 = findByClass(vnode2, 'track');
    expect(track2?.props?.['aria-checked']).toBe('false');
  });

  it('componentDidLoad emits console.error when host has no child nodes and no aria-label', () => {
    const sw = new DiwaSwitch();
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    (sw as any).host = { childNodes: [], hasAttribute: vi.fn().mockReturnValue(false) };

    (sw as any).componentDidLoad();

    expect(errorSpy).toHaveBeenCalledWith(
      '[diwa-switch] An accessible label is required. Use slot content or aria-label.',
    );
    errorSpy.mockRestore();
  });

  it('componentDidLoad does not emit console.error when host has a slotted text node', () => {
    const sw = new DiwaSwitch();
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const textNode = document.createTextNode('Email notifications');
    (sw as any).host = { childNodes: [textNode], hasAttribute: vi.fn().mockReturnValue(false) };

    (sw as any).componentDidLoad();

    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('componentDidLoad does not emit console.error when host has a slotted element child', () => {
    const sw = new DiwaSwitch();
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const labelEl = document.createElement('span');
    (sw as any).host = { childNodes: [labelEl], hasAttribute: vi.fn().mockReturnValue(false) };

    (sw as any).componentDidLoad();

    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('componentDidLoad does not emit console.error when host has aria-label attribute', () => {
    const sw = new DiwaSwitch();
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    (sw as any).host = { childNodes: [], hasAttribute: vi.fn().mockReturnValue(true) };

    (sw as any).componentDidLoad();

    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
