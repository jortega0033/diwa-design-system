/* eslint-disable */
/**
 * D* Angular wrapper components.
 *
 * These are thin Angular components with `d-*` selectors that forward all
 * props and content-projection to the underlying `diwa-*` web components.
 * CUSTOM_ELEMENTS_SCHEMA allows the inner `<diwa-*>` tag in each template.
 *
 * Usage:
 *   import { DButton } from '@diwacopilot/components-angular';
 *
 *   @Component({
 *     standalone: true,
 *     imports: [DButton],
 *     template: `<d-button variant="primary" (click)="save()">Save</d-button>`,
 *   })
 *   export class MyComponent {}
 */
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

// ─── DBadge ──────────────────────────────────────────────────────────────────

@Component({
  selector: 'd-badge',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<diwa-badge
    [label]="label"
    [size]="size"
    [variant]="variant"
  ></diwa-badge>`,
  inputs: ['label', 'size', 'variant'],
})
export class DBadge {
  @Input() label?: string;
  @Input() size?: string;
  @Input() variant?: string;
}

// ─── DButton ─────────────────────────────────────────────────────────────────

@Component({
  selector: 'd-button',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<diwa-button
    [theme]="theme"
    [variant]="variant"
    [size]="size"
    [type]="type"
    [disabled]="disabled"
    [loading]="loading"
    [href]="href"
    [target]="target"
    [name]="name"
    [value]="value"
    [label]="label"
    [hideLabel]="hideLabel"
  ><ng-content></ng-content></diwa-button>`,
  inputs: ['theme', 'variant', 'size', 'type', 'disabled', 'loading', 'href', 'target', 'name', 'value', 'label', 'hideLabel'],
})
export class DButton {
  @Input() theme?: string;
  @Input() variant?: string;
  @Input() size?: string;
  @Input() type?: string;
  @Input() disabled?: boolean;
  @Input() loading?: boolean;
  @Input() href?: string;
  @Input() target?: string;
  @Input() name?: string;
  @Input() value?: string;
  @Input() label?: string;
  @Input() hideLabel?: boolean;
}

// ─── DInput ──────────────────────────────────────────────────────────────────

@Component({
  selector: 'd-input',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<diwa-input
    [type]="type"
    [label]="label"
    [placeholder]="placeholder"
    [value]="value"
    [required]="required"
    [disabled]="disabled"
    [readonly]="readonly"
    [state]="state"
    [hint]="hint"
    [autocomplete]="autocomplete"
    [name]="name"
    [inputId]="inputId"
    (diwaInput)="diwaInput.emit($event)"
    (diwaChange)="diwaChange.emit($event)"
    (diwaFocus)="diwaFocus.emit($event)"
    (diwaBlur)="diwaBlur.emit($event)"
  ></diwa-input>`,
  inputs: ['type', 'label', 'placeholder', 'value', 'required', 'disabled', 'readonly', 'state', 'hint', 'autocomplete', 'name', 'inputId'],
})
export class DInput {
  @Input() type?: string;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() value?: string;
  @Input() required?: boolean;
  @Input() disabled?: boolean;
  @Input() readonly?: boolean;
  @Input() state?: string;
  @Input() hint?: string;
  @Input() autocomplete?: string;
  @Input() name?: string;
  @Input() inputId?: string;

  @Output() diwaInput = new EventEmitter<CustomEvent<string>>();
  @Output() diwaChange = new EventEmitter<CustomEvent<string>>();
  @Output() diwaFocus = new EventEmitter<CustomEvent<FocusEvent>>();
  @Output() diwaBlur = new EventEmitter<CustomEvent<FocusEvent>>();
}

// ─── DSpinner ────────────────────────────────────────────────────────────────

@Component({
  selector: 'd-spinner',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<diwa-spinner
    [label]="label"
    [size]="size"
  ></diwa-spinner>`,
  inputs: ['label', 'size'],
})
export class DSpinner {
  @Input() label?: string;
  @Input() size?: string;
}
