import { describe, it, expect } from 'vitest';
import { DiwaStepperHorizontal } from './diwa-stepper-horizontal';

describe('diwa-stepper-horizontal', () => {
  it('defaults to activeStepIndex 0', () => {
    const c = new DiwaStepperHorizontal();
    expect(c.activeStepIndex).toBe(0);
  });
});
