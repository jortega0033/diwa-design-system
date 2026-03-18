/**
 * diwa-multi-select — Public TypeScript types
 */

export type MultiSelectState = 'none' | 'error' | 'success';
export type MultiSelectDropdownDirection = 'up' | 'down' | 'auto';
export type MultiSelectTheme = 'light' | 'dark';

export type MultiSelectChangeEventDetail = {
  name: string;
  value: string[];
};

export type MultiSelectToggleEventDetail = {
  open: boolean;
};
