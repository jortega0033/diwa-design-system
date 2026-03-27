import type { Theme } from '../../utils/styles';

export type { Theme };

export type DropdownPlacement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end';

export type DropdownStrategy = 'absolute' | 'fixed';

export type DropdownToggleEventDetail = { open: boolean };

export type DropdownSelectEventDetail = {
  value?: string;
  label?: string;
};
