import { describe, it, expect } from 'vitest';
import { DiwaAccordion } from './diwa-accordion';

describe('diwa-accordion', () => {
  it('has default open=false', () => {
    const c = new DiwaAccordion();
    expect(c.open).toBe(false);
  });
});
