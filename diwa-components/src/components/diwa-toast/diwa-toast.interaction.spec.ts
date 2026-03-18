import { describe, it, expect } from 'vitest';
import { DiwaToast } from './diwa-toast';

describe('diwa-toast interactions', () => {
  it('addMessage appends message and removeMessage works', async () => {
    const t = new DiwaToast();
    expect((t as any).messages.length).toBe(0);
    await t.addMessage({ text: 'Hello', state: 'neutral', duration: 0 });
    expect((t as any).messages.length).toBe(1);
    // call private removeMessage to remove by id
    const id = (t as any).messages[0].id;
    (t as any).removeMessage(id);
    expect((t as any).messages.find((m: any) => m.id === id)).toBeUndefined();
  });
});
