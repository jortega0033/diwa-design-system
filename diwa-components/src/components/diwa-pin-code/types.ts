export type PinCodeType = 'number' | 'password';

export interface PinCodeUpdateEventDetail {
  value: string;
  isComplete: boolean;
}
