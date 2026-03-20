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

describe('diwa-toast — interactions', () => {
  let toast: DiwaToast;

  beforeEach(() => {
    toast = new DiwaToast();
    vi.clearAllMocks();
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
