import { describe, it, expect } from 'vitest';
import { DiwaIcon } from './diwa-icon';

describe('diwa-icon interactions', () => {
  it('updates size property when changed', () => {
    const ic = new DiwaIcon();
    expect(ic.size).toBe(24);
    ic.size = 16;
    expect(ic.size).toBe(16);
  });

  it('componentDidRender keeps svgEl reference when present', () => {
    const ic = new DiwaIcon();
    const svg = { innerHTML: '<svg></svg>' } as unknown as SVGSVGElement;
    (ic as any).svgEl = svg;
    (ic as any).componentDidRender();
    expect((ic as any).svgEl).toBe(svg);
  });
});
