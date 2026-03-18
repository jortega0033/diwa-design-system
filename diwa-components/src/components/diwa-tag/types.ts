export const TAG_VARIANTS = ['neutral', 'primary', 'info', 'success', 'warning', 'error'] as const;
export type TagVariant = (typeof TAG_VARIANTS)[number];
