import { describe, it, expect } from 'vitest';
import { DiwaButton } from './diwa-button';

describe('diwa-button disabled prop', () => {
  it('stores disabled prop value', () => {
    const b = new DiwaButton();
    (b as any).disabled = true;
    expect((b as any).disabled).toBe(true);
  });
});
