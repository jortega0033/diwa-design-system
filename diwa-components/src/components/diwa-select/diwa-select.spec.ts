import { vi } from 'vitest';
import { DiwaSelect } from './diwa-select';

describe('diwa-select component', () => {
  const createOption = (value: string | undefined, text: string, selected = false): HTMLDiwaSelectOptionElement => {
    return {
      value,
      textContent: text,
      selected,
      disabled: false,
      style: { display: '' },
      highlighted: false,
      compact: false,
      theme: 'dark',
    } as unknown as HTMLDiwaSelectOptionElement;
  };

  it('open and close methods toggle isOpen', async () => {
    const s = new DiwaSelect();
    expect((s as any).isOpen).toBe(false);
    await (s as any).open();
    expect((s as any).isOpen).toBe(true);
    await (s as any).close();
    expect((s as any).isOpen).toBe(false);
  });

  it('onTriggerClick toggles unless disabled', () => {
    const s = new DiwaSelect();
    s.disabled = false;
    (s as any).onTriggerClick();
    expect((s as any).isOpen).toBe(true);
    s.disabled = true;
    (s as any).onTriggerClick();
    // remains unchanged because disabled prevents toggling
    expect((s as any).isOpen).toBe(true);
  });

  it('onTriggerKeyDown opens on ArrowDown when closed and closes on Escape when open', () => {
    const s = new DiwaSelect();
    const evOpen = { key: 'ArrowDown', preventDefault: vi.fn() } as unknown as KeyboardEvent;
    (s as any).isOpen = false;
    (s as any).onTriggerKeyDown(evOpen);
    expect((evOpen as any).preventDefault).toHaveBeenCalled();
    expect((s as any).isOpen).toBe(true);

    // test Escape closes and focuses triggerEl
    (s as any).triggerEl = { focus: vi.fn() } as unknown as HTMLDivElement;
    const evClose = { key: 'Escape', preventDefault: vi.fn() } as unknown as KeyboardEvent;
    (s as any).onTriggerKeyDown(evClose);
    expect((evClose as any).preventDefault).toHaveBeenCalled();
    expect((s as any).isOpen).toBe(false);
    expect((s as any).triggerEl.focus).toHaveBeenCalled();
  });

  it('uses selected option label for preselected value on initial lifecycle sync', () => {
    const s = new DiwaSelect();
    s.value = 'apple';

    const options = [
      createOption(undefined, 'Please select...'),
      createOption('apple', 'Apple'),
      createOption('banana', 'Banana'),
    ];

    (s as any).host = {
      querySelectorAll: vi.fn().mockReturnValue(options),
    } as unknown as HTMLElement;

    (s as any).componentWillLoad();

    expect((s as any).getTriggerDisplayLabel()).toBe('Apple');
    expect(options[1].selected).toBe(true);
    expect(options[2].selected).toBe(false);
  });

  it('keeps label undefined until async options arrive, then resolves to option label', () => {
    const s = new DiwaSelect();
    s.value = 'apple';
    (s as any).options = [];

    expect((s as any).getTriggerDisplayLabel()).toBeUndefined();

    const asyncOptions = [createOption('apple', 'Apple')];
    (s as any).host = {
      querySelectorAll: vi.fn().mockReturnValue(asyncOptions),
    } as unknown as HTMLElement;

    (s as any).handleChildrenChanged();

    expect((s as any).getTriggerDisplayLabel()).toBe('Apple');
    expect(asyncOptions[0].selected).toBe(true);
  });

  it('returns undefined display label when there is no preselected value', () => {
    const s = new DiwaSelect();
    (s as any).options = [createOption('apple', 'Apple')];

    expect((s as any).getTriggerDisplayLabel()).toBeUndefined();
  });
});
