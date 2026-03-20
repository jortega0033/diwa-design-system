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

describe('diwa-toast — connect / disconnect lifecycle', () => {
  let toast: DiwaToast;

  beforeEach(() => {
    toast = new DiwaToast();
    vi.clearAllMocks();
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
