import { vi } from 'vitest';
import { DiwaToast } from './diwa-toast';

describe('diwa-toast component', () => {
  it('addMessage adds a message and removeMessage removes it', async () => {
    const t = new DiwaToast();
    expect(t.messages).toHaveLength(0);

    // Add a message with duration 0 to avoid timeout removal
    await (t as any).addMessage({ text: 'Hi', state: 'neutral', duration: 0 });
    expect(t.messages).toHaveLength(1);
    const id = t.messages[0].id;

    // Call private removeMessage and ensure it is removed
    (t as any).removeMessage(id);
    expect(t.messages).toHaveLength(0);
  });
});
