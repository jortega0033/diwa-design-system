import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let DiwaToast: any;
let toastManager: any;

// Use spies on the real toastManager to allow assertions while preserving
// existing module load order in the test environment.

describe('diwa-toast — interactions', () => {
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

  it('addMessage delegates to toastManager.addMessage', async () => {
    const msg = { text: 'Hello', state: 'neutral' as const, duration: 0 };
    await toast.addMessage(msg);
    expect(toastManager.addMessage).toHaveBeenCalledOnce();
    expect(toastManager.addMessage).toHaveBeenCalledWith(msg);
  });

  it('connectedCallback registers the component with toastManager', () => {
    toast.connectedCallback();
    expect(toastManager.register).toHaveBeenCalledOnce();
  });

  it('disconnectedCallback unregisters the component from toastManager', () => {
    toast.disconnectedCallback();
    expect(toastManager.unregister).toHaveBeenCalledOnce();
  });

  it('refreshFn passed to register updates the component state', () => {
    let capturedRefreshFn: ((msg: any) => void) | null = null;
    vi.mocked(toastManager.register).mockImplementation((_host, fn) => {
      capturedRefreshFn = fn;
    });

    toast.connectedCallback();
    const entry = { id: 1, text: 'Updated', state: 'info' as const };
    capturedRefreshFn!(entry);
    expect((toast as any).currentMsg).toEqual(entry);

    // Clearing the message (dismiss)
    capturedRefreshFn!(null);
    expect((toast as any).currentMsg).toBeNull();
  });
});
