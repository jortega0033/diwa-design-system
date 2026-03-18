import { vi } from 'vitest';
import { DiwaToast } from './diwa-toast';

describe('diwa-toast — add/remove messages', () => {
  it('adds a message and auto-removes after duration', async () => {
    vi.useFakeTimers();

    const toast = new DiwaToast();
    expect((toast as any).messages.length).toBe(0);

    // add a message with 1000ms duration
    await (toast as any).addMessage({ text: 'Hello', state: 'success', duration: 1000 });
    expect((toast as any).messages.length).toBe(1);
    const id = (toast as any).messages[0].id;

    // advance timers to trigger auto-remove
    vi.advanceTimersByTime(1000);
    // await microtask queue so setTimeout handlers run
    await Promise.resolve();

    expect((toast as any).messages.find((m: any) => m.id === id)).toBeUndefined();

    vi.useRealTimers();
  });
});
