import { describe, it, expect } from 'vitest';
import { DiwaTagDismissible } from './diwa-tag-dismissible';

describe('diwa-tag-dismissible', () => {
  it('has default label Remove and neutral variant', () => {
    const c = new DiwaTagDismissible();
    expect(c.label).toBe('Remove');
    expect(c.variant).toBe('neutral');
  });
});
