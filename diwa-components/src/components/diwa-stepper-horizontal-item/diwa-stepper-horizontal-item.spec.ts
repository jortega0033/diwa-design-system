import { describe, it, expect } from 'vitest';
import { DiwaStepperHorizontalItem } from './diwa-stepper-horizontal-item';

describe('diwa-stepper-horizontal-item', () => {
  it('defaults to incomplete state and stepNumber 1', () => {
    const c = new DiwaStepperHorizontalItem();
    expect(c.state).toBe('incomplete');
    expect(c.stepNumber).toBe(1);
  });
});
