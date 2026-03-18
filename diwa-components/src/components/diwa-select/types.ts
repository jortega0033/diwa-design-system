/**
 * diwa-select — Public TypeScript types
 */

export type SelectState = 'none' | 'error' | 'success';
export type SelectDropdownDirection = 'up' | 'down' | 'auto';
export type SelectTheme = 'light' | 'dark';

export type SelectChangeEventDetail = {
  name: string;
  value: string;
};

export type SelectToggleEventDetail = {
  open: boolean;
};
