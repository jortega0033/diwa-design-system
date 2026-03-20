import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { DiwaToast } from './diwa-toast';
import { toastManager } from './diwa-toast-manager';

vi.mock('./diwa-toast-manager', () => ({
  toastManager: {
    register: vi.fn(),
    unregister: vi.fn(),
    addMessage: vi.fn(),
    dismiss: vi.fn(),
    getCurrent: vi.fn().mockReturnValue(null),
  },
}));

describe('diwa-toast component', () => {
  let toast: DiwaToast;

  beforeEach(() => {
    toast = new DiwaToast();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('registers with toastManager on connectedCallback', () => {
    toast.connectedCallback();
    expect(toastManager.register).toHaveBeenCalledOnce();
    // In unit tests @Element() host is not injected by Stencil, so we only
    // assert the second arg (the refreshFn callback) shape.
    const [, refreshArg] = vi.mocked(toastManager.register).mock.calls[0];
    expect(typeof refreshArg).toBe('function');
  });

  it('unregisters from toastManager on disconnectedCallback', () => {
    toast.disconnectedCallback();
    expect(toastManager.unregister).toHaveBeenCalledOnce();
  });

  it('delegates addMessage to toastManager', async () => {
    const msg = { text: 'Hello', state: 'success' as const, duration: 0 };
    await toast.addMessage(msg);
    expect(toastManager.addMessage).toHaveBeenCalledOnce();
    expect(toastManager.addMessage).toHaveBeenCalledWith(msg);
  });

  it('passes a refreshFn that updates currentMsg state', () => {
    let capturedRefreshFn: ((msg: any) => void) | null = null;
    vi.mocked(toastManager.register).mockImplementation((_host, fn) => {
      capturedRefreshFn = fn;
    });

    toast.connectedCallback();
    expect(capturedRefreshFn).not.toBeNull();

    const entry = { id: 0, text: 'Test', state: 'neutral' as const };
    capturedRefreshFn!(entry);
    // After calling refreshFn the component's internal currentMsg should be set.
    // We verify indirectly via the same reference used by render.
    expect((toast as any).currentMsg).toEqual(entry);
  });
});
