/**
 * diwa-toast — Public TypeScript types
 */

export type ToastState = 'neutral' | 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  text: string;
  state?: ToastState;
  duration?: number; // ms, default 5000
}
