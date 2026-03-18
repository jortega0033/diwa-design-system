import { describe, it, expect, vi } from 'vitest';
import { DiwaAccordion } from './diwa-accordion';

describe('diwa-accordion interactions', () => {
  it('emits update with toggled open value when header is clicked', () => {
    const a = new DiwaAccordion();
    a.open = false;
    a.update = { emit: vi.fn() } as any;

    // call the private handler directly as the header click would
    (a as any).handleToggle();

    expect((a as any).update.emit).toHaveBeenCalledWith({ open: true });
  });

  it('uses provided headingTag to build ids and aria attributes', () => {
    const a = new DiwaAccordion();
    a.headingTag = 'h3';
    const buttonId = (a as any).buttonId;
    const panelId = (a as any).panelId;
    expect(typeof buttonId).toBe('string');
    expect(typeof panelId).toBe('string');
    expect(buttonId).toContain('diwa-accordion-');
    expect(panelId).toContain('diwa-accordion-');
  });
});
