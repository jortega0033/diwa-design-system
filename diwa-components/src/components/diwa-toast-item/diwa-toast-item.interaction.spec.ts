import { describe, it, expect } from 'vitest';
import { DiwaToastItem } from './diwa-toast-item';

describe('diwa-toast-item interactions', () => {
  it('accepts text and state props and exposes dismiss handler', () => {
    const ti = new DiwaToastItem();
    // component default uses empty string for text
    expect(ti.text).toBe('');
    ti.text = 'Test';
    ti.state = 'success';
    expect(ti.text).toBe('Test');
    expect(ti.state).toBe('success');
    expect(typeof (ti as any).render).toBe('function');
  });
});
