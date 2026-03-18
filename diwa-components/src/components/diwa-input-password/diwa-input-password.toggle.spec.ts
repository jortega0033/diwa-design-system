import { describe, it, expect } from 'vitest';
import { DiwaInputPassword } from './diwa-input-password';

describe('diwa-input-password — toggle visibility', () => {
  it('toggles `showPassword` when handleToggle is called', () => {
    const comp = new DiwaInputPassword();
    expect((comp as any).showPassword).toBe(false);
    (comp as any).handleToggle();
    expect((comp as any).showPassword).toBe(true);
    (comp as any).handleToggle();
    expect((comp as any).showPassword).toBe(false);
  });
});
