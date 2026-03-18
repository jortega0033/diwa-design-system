import { getFocusableElements, trapFocus } from './diwa-modal-utils';

describe('diwa-modal utils', () => {
  it('getFocusableElements returns expected elements', () => {
    const root = document.createElement('div');
    const btn = document.createElement('button');
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    const input = document.createElement('input');
    root.appendChild(btn);
    root.appendChild(a);
    root.appendChild(input);
    const list = getFocusableElements(root as any);
    expect(list.length).toBeGreaterThanOrEqual(3);
  });

  it('trapFocus wraps focus when Tab on last', () => {
    const root = document.createElement('div');
    const first = document.createElement('button');
    const last = document.createElement('button');
    root.appendChild(first);
    root.appendChild(last);
    document.body.appendChild(root);
    // simulate focusable array
    const focusable = [first as HTMLElement, last as HTMLElement];
    // spy on focus
    const spy = vi.spyOn(first, 'focus');
    // simulate Tab key on last element
    const e = new KeyboardEvent('keydown', { key: 'Tab' });
    Object.defineProperty(e, 'target', { value: last, writable: false });
    trapFocus(e as any, focusable, last as any);
    expect(spy).toHaveBeenCalled();
    root.remove();
  });
});
