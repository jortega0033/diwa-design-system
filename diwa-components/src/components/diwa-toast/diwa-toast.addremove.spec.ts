import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let DiwaToast: any;
let toastManager: any;

// Use spies on the real toastManager to allow assertions while preserving
// existing module load order in the test environment.

describe('diwa-toast — add/remove messages', () => {
  let toast: DiwaToast;

  beforeEach(async () => {
    toastManager = (await import('./diwa-toast-manager')).toastManager;
    DiwaToast = (await import('./diwa-toast')).DiwaToast;
    toast = new DiwaToast();
    // Spy on manager methods so expectations like toHaveBeenCalled work
    vi.spyOn(toastManager, 'addMessage');
    vi.spyOn(toastManager, 'register');
    vi.spyOn(toastManager, 'unregister');
    vi.spyOn(toastManager, 'dismiss');
    vi.spyOn(toastManager, 'getCurrent').mockReturnValue(null);
    // keep spies intact for assertions; clear handled in afterEach
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('delegates addMessage with a timed message to toastManager', async () => {
    const msg = { text: 'Hello', state: 'success' as const, duration: 1000 };
    await toast.addMessage(msg);
    expect(toastManager.addMessage).toHaveBeenCalledOnce();
    expect(toastManager.addMessage).toHaveBeenCalledWith(msg);
  });

  it('delegates addMessage with duration 0 (sticky) to toastManager', async () => {
    const msg = { text: 'Sticky', state: 'warning' as const, duration: 0 };
    await toast.addMessage(msg);
    expect(toastManager.addMessage).toHaveBeenCalledWith(msg);
  });

  it('delegates multiple addMessage calls in sequence', async () => {
    await toast.addMessage({ text: 'First' });
    await toast.addMessage({ text: 'Second' });
    await toast.addMessage({ text: 'Third' });
    expect(toastManager.addMessage).toHaveBeenCalledTimes(3);
  });

  it('registers on connect and unregisters on disconnect', () => {
    toast.connectedCallback();
    expect(toastManager.register).toHaveBeenCalledOnce();
    toast.disconnectedCallback();
    expect(toastManager.unregister).toHaveBeenCalledOnce();
  });
});
