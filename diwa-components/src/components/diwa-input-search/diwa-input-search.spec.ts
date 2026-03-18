import { describe, it, expect } from 'vitest';
import { DiwaInputSearch } from './diwa-input-search';

describe('diwa-input-search', () => {
  it('has default theme dark and empty value', () => {
    const c = new DiwaInputSearch();
    expect(c.theme).toBe('dark');
    expect(c.value).toBe('');
  });
});
