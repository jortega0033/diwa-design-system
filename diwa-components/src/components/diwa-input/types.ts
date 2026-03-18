/**
 * diwa-input — Public TypeScript interfaces
 * ==========================================
 * Exported so framework wrapper packages and consumers can share these types.
 */

/** Native input type subset that this component supports. */
export type InputType =
  | "text"
  | "email"
  | "password"
  | "search"
  | "url"
  | "number"
  | "tel";

/** Validation state rendered on the input (legacy diwa-input generic component). */
export type InputState = "default" | "error" | "success";

/**
 * Validation state for the individual diwa-input-* components.
 * Aligns with other diwa components (diwa-checkbox, etc.) that use 'none'.
 */
export type InputFieldState = 'none' | 'error' | 'success';
