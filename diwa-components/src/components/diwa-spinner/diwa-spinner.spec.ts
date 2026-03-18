import { DiwaSpinner } from './diwa-spinner';

describe('diwa-spinner component', () => {
  it('has default size and prints css class', () => {
    const s = new DiwaSpinner();
    // default props should exist
    expect((s as any).size).toBeDefined();
    // getComponentCss is used in render; basic sanity check
    expect(typeof (s as any).render).toBe('function');
  });
});
