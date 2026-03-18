/**
 * diwa-radio-group — Public TypeScript types
 */

export type RadioGroupDirection = 'row' | 'column';
export type RadioGroupState = 'none' | 'error' | 'success';
export interface RadioGroupUpdateEventDetail {
  value: string;
}
