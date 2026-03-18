/**
 * Global React JSX type declarations for diwa-* custom elements.
 * Allows all diwa web components to be used as JSX without TS errors.
 * Custom props and event handlers are accepted via the index signature.
 */

type DiwaElement = React.HTMLAttributes<HTMLElement> & { [key: string]: unknown };

declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      'diwa-accordion': DiwaElement;
      'diwa-badge': DiwaElement;
      'diwa-button': DiwaElement;
      'diwa-button-pure': DiwaElement;
      'diwa-checkbox': DiwaElement;
      'diwa-divider': DiwaElement;
      'diwa-flyout': DiwaElement;
      'diwa-icon': DiwaElement;
      'diwa-inline-notification': DiwaElement;
      'diwa-input': DiwaElement;
      'diwa-input-date': DiwaElement;
      'diwa-input-email': DiwaElement;
      'diwa-input-month': DiwaElement;
      'diwa-input-number': DiwaElement;
      'diwa-input-password': DiwaElement;
      'diwa-input-search': DiwaElement;
      'diwa-input-tel': DiwaElement;
      'diwa-input-text': DiwaElement;
      'diwa-input-time': DiwaElement;
      'diwa-input-url': DiwaElement;
      'diwa-input-week': DiwaElement;
      'diwa-link': DiwaElement;
      'diwa-link-pure': DiwaElement;
      'diwa-modal': DiwaElement;
      'diwa-multi-select': DiwaElement;
      'diwa-multi-select-option': DiwaElement;
      'diwa-pagination': DiwaElement;
      'diwa-pin-code': DiwaElement;
      'diwa-popover': DiwaElement;
      'diwa-scroller': DiwaElement;
      'diwa-select': DiwaElement;
      'diwa-select-option': DiwaElement;
      'diwa-spinner': DiwaElement;
      'diwa-switch': DiwaElement;
      'diwa-tag': DiwaElement;
      'diwa-tag-dismissible': DiwaElement;
      'diwa-text': DiwaElement;
      'diwa-text-list': DiwaElement;
      'diwa-text-list-item': DiwaElement;
      'diwa-radio-group': DiwaElement;
      'diwa-radio-group-item': DiwaElement;
      'diwa-segmented-control': DiwaElement;
      'diwa-segmented-control-item': DiwaElement;
      'diwa-stepper-horizontal': DiwaElement;
      'diwa-stepper-horizontal-item': DiwaElement;
      'diwa-table': DiwaElement;
      'diwa-table-body': DiwaElement;
      'diwa-table-cell': DiwaElement;
      'diwa-table-head': DiwaElement;
      'diwa-table-head-cell': DiwaElement;
      'diwa-table-row': DiwaElement;
      'diwa-tabs': DiwaElement;
      'diwa-tabs-bar': DiwaElement;
      'diwa-tabs-item': DiwaElement;
      'diwa-textarea': DiwaElement;
      'diwa-toast': DiwaElement;
      'diwa-toast-item': DiwaElement;
    }
  }
}
