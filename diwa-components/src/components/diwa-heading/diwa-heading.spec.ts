import { describe, it, expect } from 'vitest';
import { DiwaHeading } from './diwa-heading';
import { getHeadingTag } from './diwa-heading-utils';

describe('diwa-heading', () => {
  it('has correct default props', () => {
    const c = new DiwaHeading();
    expect(c.size).toBe('h2');
    expect(c.weight).toBe('bold');
    expect(c.align).toBe('start');
    expect(c.color).toBe('primary');
    expect(c.ellipsis).toBe(false);
    expect(c.theme).toBe('dark');
    expect(c.tag).toBeUndefined();
  });
});

describe('getHeadingTag', () => {
  it('infers tag from size when no explicit tag is provided', () => {
    expect(getHeadingTag(null, 'display', undefined)).toBe('h1');
    expect(getHeadingTag(null, 'h1',      undefined)).toBe('h1');
    expect(getHeadingTag(null, 'h2',      undefined)).toBe('h2');
    expect(getHeadingTag(null, 'h3',      undefined)).toBe('h3');
    expect(getHeadingTag(null, 'h4',      undefined)).toBe('h4');
    expect(getHeadingTag(null, 'h5',      undefined)).toBe('h5');
    expect(getHeadingTag(null, 'h6',      undefined)).toBe('h6');
    expect(getHeadingTag(null, 'inherit', undefined)).toBe('h2');
  });

  it('uses an explicit tag override over the size-inferred tag', () => {
    expect(getHeadingTag(null, 'h1', 'h3')).toBe('h3');
    expect(getHeadingTag(null, 'display', 'div')).toBe('div');
  });

  it('returns div when a direct child is a heading element (prevents invalid nesting)', () => {
    const host = document.createElement('div');
    const child = document.createElement('h2');
    host.appendChild(child);
    expect(getHeadingTag(host, 'h2', undefined)).toBe('div');
  });

  it('slotted h-tag check takes precedence over an explicit tag prop', () => {
    const host = document.createElement('div');
    host.appendChild(document.createElement('h3'));
    expect(getHeadingTag(host, 'h1', 'h1')).toBe('div');
  });
});
