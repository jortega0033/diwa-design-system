import { describe, it, expect } from 'vitest';
import { DiwaStepperHorizontal } from './diwa-stepper-horizontal';

describe('diwa-stepper-horizontal interactions', () => {
  it('syncs item states based on activeStepIndex', () => {
    const s = new DiwaStepperHorizontal();
    const items = [
      { state: '', stepNumber: 0, isLast: false },
      { state: '', stepNumber: 0, isLast: false },
      { state: '', stepNumber: 0, isLast: false },
    ];
    (s as any).host = { querySelectorAll: () => items } as any;

    s.activeStepIndex = 1;
    (s as any).handleIndexChange();

    expect(items[0].state).toBe('complete');
    expect(items[1].state).toBe('current');
    expect(items[2].state).toBe('incomplete');
    expect(items[2].isLast).toBe(true);
    expect(items[0].stepNumber).toBe(1);
    expect(items[1].stepNumber).toBe(2);
    expect(items[2].stepNumber).toBe(3);
  });
});
