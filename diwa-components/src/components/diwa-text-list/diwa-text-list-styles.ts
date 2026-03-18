import type { TextListType } from './types';

export const getComponentCss = (type: TextListType): string => `
  :host {
    display: block;
    font-family: var(--diwa-font-family-base);
  }

  :host([hidden]) {
    display: none;
  }

  .list {
    margin: 0;
    padding: 0;
    color: var(--diwa-text-primary);
    font-size: var(--diwa-font-size-base);
    line-height: var(--diwa-line-height-normal);
    ${type === 'inline' ? '' : 'padding-inline-start: 1.25em;'}
    ${type === 'inline' ? 'list-style: none; display: flex; flex-wrap: wrap; gap: 0.25em 1em;' : ''}
  }
`;
