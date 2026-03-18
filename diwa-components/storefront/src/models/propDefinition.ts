/**
 * PropDefinition — describes a single prop that ConfiguratorControls can render.
 * For v1 these are authored by hand alongside each component's stories file.
 * Future: auto-generate from Stencil component-meta.
 */
export type PropDefinition =
  | { name: string; type: 'boolean'; defaultValue?: boolean }
  | { name: string; type: 'number'; defaultValue?: number }
  | { name: string; type: 'string'; defaultValue?: string }
  | { name: string; type: 'select'; options: string[]; defaultValue?: string };
