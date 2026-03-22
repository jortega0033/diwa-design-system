import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let DiwaToast: any;
let toastManager: any;

// Use spies on the real toastManager to allow assertions while preserving
// existing module load order in the test environment.

describe('diwa-toast — connect / disconnect lifecycle', () => {
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

  it('registers with the manager on connectedCallback', () => {
    toast.connectedCallback();
    expect(toastManager.register).toHaveBeenCalledOnce();
  });

  it('unregisters from the manager on disconnectedCallback', () => {
    toast.disconnectedCallback();
    expect(toastManager.unregister).toHaveBeenCalledOnce();
  });

  it('connect → disconnect → connect re-registers each time', () => {
    toast.connectedCallback();
    toast.disconnectedCallback();
    toast.connectedCallback();
    expect(toastManager.register).toHaveBeenCalledTimes(2);
    expect(toastManager.unregister).toHaveBeenCalledTimes(1);
  });

  it('refreshFn passed on connect can set currentMsg to null (dismiss clear)', () => {
    let capturedFn: ((m: any) => void) | null = null;
    vi.mocked(toastManager.register).mockImplementation((_h, fn) => {
      capturedFn = fn;
    });
    toast.connectedCallback();

    const entry = { id: 0, text: 'Hi', state: 'neutral' as const };
    capturedFn!(entry);
    expect((toast as any).currentMsg).toEqual(entry);
    capturedFn!(null);
    expect((toast as any).currentMsg).toBeNull();
  });
});
