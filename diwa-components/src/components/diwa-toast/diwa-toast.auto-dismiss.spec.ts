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

describe('diwa-toast — message delegation', () => {
  let toast: DiwaToast;

  beforeEach(() => {
    toast = new DiwaToast();
    vi.clearAllMocks();
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
