/**
 * diwa-button-pure-utils.ts
 * ==========================
 * ARIA helpers for <diwa-button-pure>.
 */

export interface ButtonPureAriaAttributes {
  'aria-label'?: string;
  'aria-busy'?: 'true';
  'aria-disabled'?: 'true';
}

export const getButtonPureAriaAttributes = (
  disabled: boolean,
  loading: boolean,
  label: string | undefined,
  isLink: boolean,
): ButtonPureAriaAttributes => {
  const attrs: ButtonPureAriaAttributes = {};

  if (label) {
    attrs['aria-label'] = label;
  }

  if (loading) {
    attrs['aria-busy'] = 'true';
  }

  if (isLink && (disabled || loading)) {
    attrs['aria-disabled'] = 'true';
  }

  return attrs;
};
