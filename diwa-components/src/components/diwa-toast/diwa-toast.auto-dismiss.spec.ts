import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let DiwaToast: any;
let toastManager: any;

// Use spies on the real toastManager to allow assertions while preserving
// existing module load order in the test environment.

describe('diwa-toast — message delegation', () => {
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

  it('delegates addMessage with default options to toastManager', async () => {
    const msg = { text: 'Default' };
    await toast.addMessage(msg);
    expect(toastManager.addMessage).toHaveBeenCalledWith(msg);
  });

  it('delegates addMessage with duration: 0 (no auto-dismiss) to toastManager', async () => {
    const msg = { text: 'Sticky', duration: 0 };
    await toast.addMessage(msg);
    expect(toastManager.addMessage).toHaveBeenCalledWith(msg);
  });

  it('delegates addMessage with a custom duration to toastManager', async () => {
    const msg = { text: 'Quick', duration: 2000 };
    await toast.addMessage(msg);
    expect(toastManager.addMessage).toHaveBeenCalledWith(msg);
  });

  it('starts with currentMsg as null (no visible toast)', () => {
    expect((toast as any).currentMsg).toBeNull();
  });

  it('currentMsg reflects whatever the refreshFn delivers', () => {
    let capturedFn: ((m: any) => void) | null = null;
    vi.mocked(toastManager.register).mockImplementation((_h, fn) => {
      capturedFn = fn;
    });
    toast.connectedCallback();

    const entry = { id: 5, text: 'Success', state: 'success' as const, duration: 3000 };
    capturedFn!(entry);
    expect((toast as any).currentMsg).toEqual(entry);
  });
});
