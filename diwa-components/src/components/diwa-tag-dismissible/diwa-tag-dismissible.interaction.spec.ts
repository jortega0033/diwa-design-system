import { describe, it, expect } from 'vitest';
import { DiwaTagDismissible } from './diwa-tag-dismissible';

describe('diwa-tag-dismissible interactions', () => {
  it('can be dismissed via private handler', () => {
    const td = new DiwaTagDismissible();
    (td as any).dismiss = { emit: () => { (td as any)._emitted = true; } };
    (td as any).handleDismiss();
    expect((td as any)._emitted).toBe(true);
  });
});
