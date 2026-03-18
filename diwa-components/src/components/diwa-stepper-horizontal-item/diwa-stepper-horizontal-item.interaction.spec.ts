import { describe, it, expect } from 'vitest';
import { DiwaStepperHorizontalItem } from './diwa-stepper-horizontal-item';

describe('diwa-stepper-horizontal-item interactions', () => {
  it('reflects current state value when set to current', () => {
    const item = new DiwaStepperHorizontalItem();
    item.state = 'current';
    expect(item.state).toBe('current');
  });

  it('maintains stepNumber and state when set to complete', () => {
    const item = new DiwaStepperHorizontalItem();
    item.stepNumber = 3;
    item.state = 'complete';
    expect(item.state).toBe('complete');
    expect(item.stepNumber).toBe(3);
  });
});
