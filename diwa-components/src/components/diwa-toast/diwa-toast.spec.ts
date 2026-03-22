import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let DiwaToast: any;
let toastManager: any;

// Use spies on the real toastManager to allow assertions while preserving
// existing module load order in the test environment.

describe('diwa-toast component', () => {
  let toast: DiwaToast;

  beforeEach(async () => {
    toastManager = (await import('./diwa-toast-manager')).toastManager;
    DiwaToast = (await import('./diwa-toast')).DiwaToast;
    // Spy on manager methods so expectations like toHaveBeenCalled work
    vi.spyOn(toastManager, 'addMessage');
    vi.spyOn(toastManager, 'register');
    vi.spyOn(toastManager, 'unregister');
    vi.spyOn(toastManager, 'dismiss');
    vi.spyOn(toastManager, 'getCurrent').mockReturnValue(null);
    toast = new DiwaToast();
    // keep spies intact for assertions; clear handled in afterEach
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
