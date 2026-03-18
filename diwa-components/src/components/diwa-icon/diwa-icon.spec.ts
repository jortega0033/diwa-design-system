import { DiwaIcon } from './diwa-icon';

describe('diwa-icon', () => {
  it('defaults and renders svg element', () => {
    const ic = new DiwaIcon();
    expect(ic.name).toBe('circle');
    expect(ic.size).toBe(24);
    // componentDidRender depends on lucide icons; ensure svgEl exists after render call
    const svg = { innerHTML: '' } as unknown as SVGSVGElement;
    (ic as any).svgEl = svg;
    (ic as any).componentDidRender();
    expect((ic as any).svgEl).toBe(svg);
  });
});
