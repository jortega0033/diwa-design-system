import { beforeEach, describe, expect, it, vi } from 'vitest';
import { h } from '@stencil/core';
import { DiwaPopover } from './diwa-popover';

// WCAG 4.1.2 — diwa-popover role=dialog + focus management (#108)

describe('diwa-popover — dialog role and focus management (WCAG 4.1.2)', () => {
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

  it('panel has role="dialog" not role="tooltip"', () => {
    const p = new DiwaPopover();
    const vnode = (p as any).render();
    const panel = findByClass(vnode, 'panel');
    expect(panel?.props?.role).toBe('dialog');
    expect(panel?.props?.role).not.toBe('tooltip');
  });

  it('panel has aria-label', () => {
    const p = new DiwaPopover();
    const vnode = (p as any).render();
    const panel = findByClass(vnode, 'panel');
    expect(panel?.props?.['aria-label']).toBeTruthy();
  });

  it('trigger button has aria-haspopup="dialog"', () => {
    const p = new DiwaPopover();
    const vnode = (p as any).render();
    const trigger = findByClass(vnode, 'trigger');
    expect(trigger?.props?.['aria-haspopup']).toBe('dialog');
  });

  it('panel does NOT have aria-modal attribute', () => {
    const p = new DiwaPopover();
    const vnode = (p as any).render();
    const panel = findByClass(vnode, 'panel');
    expect(panel?.props?.['aria-modal']).toBeUndefined();
  });

  it('closePanel sets isOpen to false and restores trigger focus', () => {
    const p = new DiwaPopover();
    (p as any).isOpen = true;
    const triggerFocus = vi.fn();
    (p as any).triggerRef = { focus: triggerFocus };

    (p as any).closePanel();

    expect((p as any).isOpen).toBe(false);
    expect(triggerFocus).toHaveBeenCalled();
  });

  it('closePanel does not throw when triggerRef is not set', () => {
    const p = new DiwaPopover();
    (p as any).isOpen = true;
    (p as any).triggerRef = undefined;

    expect(() => (p as any).closePanel()).not.toThrow();
    expect((p as any).isOpen).toBe(false);
  });

  it('Escape key closes panel and restores trigger focus', () => {
    const p = new DiwaPopover();
    (p as any).isOpen = true;
    const triggerFocus = vi.fn();
    (p as any).triggerRef = { focus: triggerFocus };

    (p as any).handleGlobalKeydown({ key: 'Escape' } as KeyboardEvent);

    expect((p as any).isOpen).toBe(false);
    expect(triggerFocus).toHaveBeenCalled();
  });

  it('Escape key when panel is closed does nothing', () => {
    const p = new DiwaPopover();
    (p as any).isOpen = false;
    const triggerFocus = vi.fn();
    (p as any).triggerRef = { focus: triggerFocus };

    (p as any).handleGlobalKeydown({ key: 'Escape' } as KeyboardEvent);

    expect((p as any).isOpen).toBe(false);
    expect(triggerFocus).not.toHaveBeenCalled();
  });

  it('outside pointer-down closes panel and restores trigger focus', () => {
    const p = new DiwaPopover();
    (p as any).isOpen = true;
    (p as any).host = { host: true };
    const triggerFocus = vi.fn();
    (p as any).triggerRef = { focus: triggerFocus };

    const fakeEvent = {
      composedPath: vi.fn().mockReturnValue([document.body]),
    } as unknown as PointerEvent;

    (p as any).handleGlobalPointerDown(fakeEvent);

    expect((p as any).isOpen).toBe(false);
    expect(triggerFocus).toHaveBeenCalled();
  });

  it('toggle opens panel (sets isOpen true)', () => {
    const p = new DiwaPopover();
    (p as any).isOpen = false;
    // host.shadowRoot not available in unit test — safe no-op
    (p as any).host = { shadowRoot: null };

    (p as any).toggle();

    expect((p as any).isOpen).toBe(true);
  });

  it('toggle closes panel when already open', () => {
    const p = new DiwaPopover();
    (p as any).isOpen = true;
    const triggerFocus = vi.fn();
    (p as any).triggerRef = { focus: triggerFocus };

    (p as any).toggle();

    expect((p as any).isOpen).toBe(false);
    expect(triggerFocus).toHaveBeenCalled();
  });
});
