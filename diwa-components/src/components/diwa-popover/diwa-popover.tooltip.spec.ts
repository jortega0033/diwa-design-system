import { h } from '@stencil/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DiwaPopover } from './diwa-popover';

// Verify tooltip panel reflects open/closed state via render props.
describe('diwa-popover (tooltip) - panel role & visibility', () => {
  beforeEach(() => {
    // The test environment aliases @stencil/core to decorator mocks.
    // Provide a minimal vnode shape so render() trees can be traversed.
    vi.mocked(h).mockImplementation((tag: unknown, props?: Record<string, unknown>, ...children: unknown[]) => {
      const normalizedChildren = children.flat();
      return {
        tag,
        props: {
          ...(props ?? {}),
          children: normalizedChildren,
        },
        children: normalizedChildren,
      };
    });
  });

  const findPanel = (node: any): any => {
    if (node == null) return undefined;

    if (Array.isArray(node)) {
      for (const n of node) {
        const f = findPanel(n);
        if (f) return f;
      }
      return undefined;
    }

    if (typeof node === 'object') {
      const props = node.props || {};
      const cls = props.class || props.className || '';
      if (props.role === 'tooltip' || (typeof cls === 'string' && cls.includes('panel'))) return node;

      const children = props.children || node.children;
      if (children) return findPanel(children);
    }

    return undefined;
  };

  it('panel role is tooltip and aria-hidden updates when toggled', () => {
    const p = new DiwaPopover();

    (p as any).isOpen = false;
    const vnodeClosed = (p as any).render();
    const panelClosed = findPanel(vnodeClosed);

    expect(panelClosed).toBeDefined();
    expect(panelClosed.props.role).toBe('tooltip');
    expect(panelClosed.props['aria-hidden']).toBe('true');

    (p as any).isOpen = true;
    const vnodeOpen = (p as any).render();
    const panelOpen = findPanel(vnodeOpen);

    expect(panelOpen).toBeDefined();
    expect(panelOpen.props['aria-hidden']).toBe('false');
  });
});
