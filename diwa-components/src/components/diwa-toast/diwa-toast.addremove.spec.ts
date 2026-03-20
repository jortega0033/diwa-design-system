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

describe('diwa-toast — add/remove messages', () => {
  let toast: DiwaToast;

  beforeEach(() => {
    toast = new DiwaToast();
    vi.clearAllMocks();
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
