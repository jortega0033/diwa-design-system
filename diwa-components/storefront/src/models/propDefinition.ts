/**
 * PropDefinition — describes a single prop that ConfiguratorControls can render.
 * For v1 these are authored by hand alongside each component's stories file.
 * Future: auto-generate from Stencil component-meta.
 */
type PropBase = {
  name: string;
  /** Short description shown below the control. */
  description?: string;
  /** Group label for accordion sections (ungrouped → "Properties"). */
  group?: string;
};

export type PropDefinition =
  | (PropBase & { type: 'boolean'; defaultValue?: boolean })
  | (PropBase & { type: 'number'; defaultValue?: number; min?: number; max?: number; step?: number })
  | (PropBase & { type: 'string'; defaultValue?: string })
  | (PropBase & { type: 'select'; options: string[]; defaultValue?: string })
  | (PropBase & { type: 'color'; defaultValue?: string })
  | (PropBase & { type: 'range'; min: number; max: number; step?: number; defaultValue?: number });
