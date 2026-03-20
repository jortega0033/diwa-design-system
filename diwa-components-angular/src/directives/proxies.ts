/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@diwacopilot/components';


@ProxyCmp({
  inputs: ['compact', 'heading', 'headingTag', 'open', 'theme']
})
@Component({
  selector: 'diwa-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['compact', 'heading', 'headingTag', 'open', 'theme'],
})
export class DiwaAccordion {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['update']);
  }
}


export declare interface DiwaAccordion extends Components.DiwaAccordion {
  /**
   * Emitted when the user clicks the header toggle button.

`event.detail.open` is the **requested** next state.
The consumer must set the `open` prop accordingly:

```html
<diwa-accordion onUpdate={e => this.open = e.detail.open} />
```
   */
  update: EventEmitter<CustomEvent<{ open: boolean }>>;
}


@ProxyCmp({
  inputs: ['label', 'size', 'theme', 'variant']
})
@Component({
  selector: 'diwa-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['label', 'size', 'theme', 'variant'],
})
export class DiwaBadge {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaBadge extends Components.DiwaBadge {}


@ProxyCmp({
  inputs: ['disabled', 'hideLabel', 'href', 'icon', 'label', 'loading', 'name', 'size', 'target', 'theme', 'type', 'value', 'variant']
})
@Component({
  selector: 'diwa-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'hideLabel', 'href', 'icon', 'label', 'loading', 'name', 'size', 'target', 'theme', 'type', 'value', 'variant'],
})
export class DiwaButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaButton extends Components.DiwaButton {}


@ProxyCmp({
  inputs: ['active', 'alignLabel', 'disabled', 'hideLabel', 'href', 'icon', 'label', 'loading', 'name', 'size', 'stretch', 'target', 'theme', 'type', 'underline', 'value']
})
@Component({
  selector: 'diwa-button-pure',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', 'alignLabel', 'disabled', 'hideLabel', 'href', 'icon', 'label', 'loading', 'name', 'size', 'stretch', 'target', 'theme', 'type', 'underline', 'value'],
})
export class DiwaButtonPure {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaButtonPure extends Components.DiwaButtonPure {}


@ProxyCmp({
  inputs: ['checked', 'compact', 'disabled', 'hideLabel', 'indeterminate', 'label', 'message', 'name', 'required', 'state', 'theme', 'value']
})
@Component({
  selector: 'diwa-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'compact', 'disabled', 'hideLabel', 'indeterminate', 'label', 'message', 'name', 'required', 'state', 'theme', 'value'],
})
export class DiwaCheckbox {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['update']);
  }
}


export declare interface DiwaCheckbox extends Components.DiwaCheckbox {
  /**
   * Emitted when the user toggles the checkbox.
`event.detail.checked` is the new checked state.

React consumers: use the lowercase `onupdate` prop:
```jsx
<diwa-checkbox onupdate={e => setChecked(e.detail.checked)} />
```
   */
  update: EventEmitter<CustomEvent<{ checked: boolean; name: string; value: string }>>;
}


@ProxyCmp({
  inputs: ['orientation', 'theme']
})
@Component({
  selector: 'diwa-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['orientation', 'theme'],
})
export class DiwaDivider {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaDivider extends Components.DiwaDivider {}


@ProxyCmp({
  inputs: ['backdrop', 'heading', 'open', 'position', 'theme']
})
@Component({
  selector: 'diwa-flyout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['backdrop', 'heading', 'open', 'position', 'theme'],
})
export class DiwaFlyout {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dismiss']);
  }
}


export declare interface DiwaFlyout extends Components.DiwaFlyout {
  /**
   * Emitted when the user requests the flyout to close (backdrop click,
Escape key press, or dismiss button click).

The consumer must set `open={false}` in response:
```html
<diwa-flyout onDismiss={() => this.open = false} />
```
Not bubbles, not composed.
   */
  dismiss: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['align', 'color', 'ellipsis', 'size', 'tag', 'theme', 'weight']
})
@Component({
  selector: 'diwa-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['align', 'color', 'ellipsis', 'size', 'tag', 'theme', 'weight'],
})
export class DiwaHeading {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaHeading extends Components.DiwaHeading {}


@ProxyCmp({
  inputs: ['color', 'label', 'name', 'size', 'theme']
})
@Component({
  selector: 'diwa-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'label', 'name', 'size', 'theme'],
})
export class DiwaIcon {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaIcon extends Components.DiwaIcon {}


@ProxyCmp({
  inputs: ['actionLabel', 'actionLoading', 'description', 'dismissButton', 'heading', 'state', 'theme']
})
@Component({
  selector: 'diwa-inline-notification',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['actionLabel', 'actionLoading', 'description', 'dismissButton', 'heading', 'state', 'theme'],
})
export class DiwaInlineNotification {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dismiss', 'action']);
  }
}


export declare interface DiwaInlineNotification extends Components.DiwaInlineNotification {
  /**
   * Emitted when the dismiss (×) button is clicked.
The consumer is responsible for removing or hiding the notification in response.
   */
  dismiss: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the action button is clicked.
Only fired when `actionLabel` is set and the button is not in a loading state.
   */
  action: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['autocomplete', 'disabled', 'hint', 'inputId', 'label', 'name', 'placeholder', 'readonly', 'required', 'state', 'theme', 'type', 'value']
})
@Component({
  selector: 'diwa-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autocomplete', 'disabled', 'hint', 'inputId', 'label', 'name', 'placeholder', 'readonly', 'required', 'state', 'theme', 'type', 'value'],
})
export class DiwaInput {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['diwaInput', 'diwaChange', 'diwaFocus', 'diwaBlur']);
  }
}


export declare interface DiwaInput extends Components.DiwaInput {
  /**
   * Emitted on every keystroke (mirrors native `input` event).
Payload is the current string value.
   */
  diwaInput: EventEmitter<CustomEvent<string>>;
  /**
   * Emitted when the input loses focus (mirrors native `change` event).
Payload is the committed string value.
   */
  diwaChange: EventEmitter<CustomEvent<string>>;
  /**
   * Emitted when the input receives focus.
   */
  diwaFocus: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Emitted when the input loses focus.
   */
  diwaBlur: EventEmitter<CustomEvent<FocusEvent>>;
}


@ProxyCmp({
  inputs: ['autoComplete', 'compact', 'description', 'disabled', 'hideLabel', 'label', 'max', 'message', 'min', 'name', 'placeholder', 'readonly', 'required', 'state', 'theme', 'value']
})
@Component({
  selector: 'diwa-input-date',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoComplete', 'compact', 'description', 'disabled', 'hideLabel', 'label', 'max', 'message', 'min', 'name', 'placeholder', 'readonly', 'required', 'state', 'theme', 'value'],
})
export class DiwaInputDate {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['change', 'input', 'blur', 'focus']);
  }
}


export declare interface DiwaInputDate extends Components.DiwaInputDate {

  change: EventEmitter<CustomEvent<string>>;

  input: EventEmitter<CustomEvent<string>>;

  blur: EventEmitter<CustomEvent<FocusEvent>>;

  focus: EventEmitter<CustomEvent<FocusEvent>>;
}


@ProxyCmp({
  inputs: ['autoComplete', 'compact', 'description', 'disabled', 'hideLabel', 'label', 'message', 'name', 'placeholder', 'readonly', 'required', 'state', 'theme', 'value']
})
@Component({
  selector: 'diwa-input-email',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoComplete', 'compact', 'description', 'disabled', 'hideLabel', 'label', 'message', 'name', 'placeholder', 'readonly', 'required', 'state', 'theme', 'value'],
})
export class DiwaInputEmail {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['change', 'input', 'blur', 'focus']);
  }
}


export declare interface DiwaInputEmail extends Components.DiwaInputEmail {

  change: EventEmitter<CustomEvent<string>>;

  input: EventEmitter<CustomEvent<string>>;

  blur: EventEmitter<CustomEvent<FocusEvent>>;

  focus: EventEmitter<CustomEvent<FocusEvent>>;
}


@ProxyCmp({
  inputs: ['autoComplete', 'compact', 'description', 'disabled', 'hideLabel', 'label', 'max', 'message', 'min', 'name', 'placeholder', 'readonly', 'required', 'state', 'theme', 'value']
})
@Component({
  selector: 'diwa-input-month',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoComplete', 'compact', 'description', 'disabled', 'hideLabel', 'label', 'max', 'message', 'min', 'name', 'placeholder', 'readonly', 'required', 'state', 'theme', 'value'],
})
export class DiwaInputMonth {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['change', 'input', 'blur', 'focus']);
  }
}


export declare interface DiwaInputMonth extends Components.DiwaInputMonth {

  change: EventEmitter<CustomEvent<string>>;

  input: EventEmitter<CustomEvent<string>>;

  blur: EventEmitter<CustomEvent<FocusEvent>>;

  focus: EventEmitter<CustomEvent<FocusEvent>>;
}


@ProxyCmp({
  inputs: ['autoComplete', 'compact', 'description', 'disabled', 'hideLabel', 'label', 'max', 'message', 'min', 'name', 'placeholder', 'readonly', 'required', 'state', 'step', 'theme', 'value']
})
@Component({
  selector: 'diwa-input-number',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoComplete', 'compact', 'description', 'disabled', 'hideLabel', 'label', 'max', 'message', 'min', 'name', 'placeholder', 'readonly', 'required', 'state', 'step', 'theme', 'value'],
})
export class DiwaInputNumber {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['change', 'input', 'blur', 'focus']);
  }
}


export declare interface DiwaInputNumber extends Components.DiwaInputNumber {

  change: EventEmitter<CustomEvent<string>>;

  input: EventEmitter<CustomEvent<string>>;

  blur: EventEmitter<CustomEvent<FocusEvent>>;

  focus: EventEmitter<CustomEvent<FocusEvent>>;
}


@ProxyCmp({
  inputs: ['autoComplete', 'compact', 'description', 'disabled', 'hideLabel', 'label', 'message', 'name', 'placeholder', 'readonly', 'required', 'showToggle', 'state', 'theme', 'value']
})
@Component({
  selector: 'diwa-input-password',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoComplete', 'compact', 'description', 'disabled', 'hideLabel', 'label', 'message', 'name', 'placeholder', 'readonly', 'required', 'showToggle', 'state', 'theme', 'value'],
})
export class DiwaInputPassword {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['change', 'input', 'blur', 'focus']);
  }
}


export declare interface DiwaInputPassword extends Components.DiwaInputPassword {

  change: EventEmitter<CustomEvent<string>>;

  input: EventEmitter<CustomEvent<string>>;

  blur: EventEmitter<CustomEvent<FocusEvent>>;

  focus: EventEmitter<CustomEvent<FocusEvent>>;
}


@ProxyCmp({
  inputs: ['autoComplete', 'compact', 'description', 'disabled', 'hideLabel', 'label', 'message', 'name', 'placeholder', 'readonly', 'required', 'showClearButton', 'state', 'theme', 'value']
})
@Component({
  selector: 'diwa-input-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoComplete', 'compact', 'description', 'disabled', 'hideLabel', 'label', 'message', 'name', 'placeholder', 'readonly', 'required', 'showClearButton', 'state', 'theme', 'value'],
})
export class DiwaInputSearch {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['change', 'input', 'blur', 'focus']);
  }
}


export declare interface DiwaInputSearch extends Components.DiwaInputSearch {

  change: EventEmitter<CustomEvent<string>>;

  input: EventEmitter<CustomEvent<string>>;

  blur: EventEmitter<CustomEvent<FocusEvent>>;

  focus: EventEmitter<CustomEvent<FocusEvent>>;
}


@ProxyCmp({
  inputs: ['autoComplete', 'compact', 'description', 'disabled', 'hideLabel', 'label', 'message', 'name', 'placeholder', 'readonly', 'required', 'state', 'theme', 'value']
})
@Component({
  selector: 'diwa-input-tel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoComplete', 'compact', 'description', 'disabled', 'hideLabel', 'label', 'message', 'name', 'placeholder', 'readonly', 'required', 'state', 'theme', 'value'],
})
export class DiwaInputTel {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['change', 'input', 'blur', 'focus']);
  }
}


export declare interface DiwaInputTel extends Components.DiwaInputTel {

  change: EventEmitter<CustomEvent<string>>;

  input: EventEmitter<CustomEvent<string>>;

  blur: EventEmitter<CustomEvent<FocusEvent>>;

  focus: EventEmitter<CustomEvent<FocusEvent>>;
}


@ProxyCmp({
  inputs: ['autoComplete', 'compact', 'description', 'disabled', 'hideLabel', 'label', 'maxLength', 'message', 'minLength', 'name', 'placeholder', 'readonly', 'required', 'spellCheck', 'state', 'theme', 'value']
})
@Component({
  selector: 'diwa-input-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoComplete', 'compact', 'description', 'disabled', 'hideLabel', 'label', 'maxLength', 'message', 'minLength', 'name', 'placeholder', 'readonly', 'required', 'spellCheck', 'state', 'theme', 'value'],
})
export class DiwaInputText {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['change', 'input', 'blur', 'focus']);
  }
}


export declare interface DiwaInputText extends Components.DiwaInputText {

  change: EventEmitter<CustomEvent<string>>;

  input: EventEmitter<CustomEvent<string>>;

  blur: EventEmitter<CustomEvent<FocusEvent>>;

  focus: EventEmitter<CustomEvent<FocusEvent>>;
}


@ProxyCmp({
  inputs: ['autoComplete', 'compact', 'description', 'disabled', 'hideLabel', 'label', 'max', 'message', 'min', 'name', 'placeholder', 'readonly', 'required', 'state', 'step', 'theme', 'value']
})
@Component({
  selector: 'diwa-input-time',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoComplete', 'compact', 'description', 'disabled', 'hideLabel', 'label', 'max', 'message', 'min', 'name', 'placeholder', 'readonly', 'required', 'state', 'step', 'theme', 'value'],
})
export class DiwaInputTime {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['change', 'input', 'blur', 'focus']);
  }
}


export declare interface DiwaInputTime extends Components.DiwaInputTime {

  change: EventEmitter<CustomEvent<string>>;

  input: EventEmitter<CustomEvent<string>>;

  blur: EventEmitter<CustomEvent<FocusEvent>>;

  focus: EventEmitter<CustomEvent<FocusEvent>>;
}


@ProxyCmp({
  inputs: ['autoComplete', 'compact', 'description', 'disabled', 'hideLabel', 'label', 'message', 'name', 'placeholder', 'readonly', 'required', 'state', 'theme', 'value']
})
@Component({
  selector: 'diwa-input-url',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoComplete', 'compact', 'description', 'disabled', 'hideLabel', 'label', 'message', 'name', 'placeholder', 'readonly', 'required', 'state', 'theme', 'value'],
})
export class DiwaInputUrl {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['change', 'input', 'blur', 'focus']);
  }
}


export declare interface DiwaInputUrl extends Components.DiwaInputUrl {

  change: EventEmitter<CustomEvent<string>>;

  input: EventEmitter<CustomEvent<string>>;

  blur: EventEmitter<CustomEvent<FocusEvent>>;

  focus: EventEmitter<CustomEvent<FocusEvent>>;
}


@ProxyCmp({
  inputs: ['autoComplete', 'compact', 'description', 'disabled', 'hideLabel', 'label', 'max', 'message', 'min', 'name', 'placeholder', 'readonly', 'required', 'state', 'theme', 'value']
})
@Component({
  selector: 'diwa-input-week',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoComplete', 'compact', 'description', 'disabled', 'hideLabel', 'label', 'max', 'message', 'min', 'name', 'placeholder', 'readonly', 'required', 'state', 'theme', 'value'],
})
export class DiwaInputWeek {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['change', 'input', 'blur', 'focus']);
  }
}


export declare interface DiwaInputWeek extends Components.DiwaInputWeek {

  change: EventEmitter<CustomEvent<string>>;

  input: EventEmitter<CustomEvent<string>>;

  blur: EventEmitter<CustomEvent<FocusEvent>>;

  focus: EventEmitter<CustomEvent<FocusEvent>>;
}


@ProxyCmp({
  inputs: ['compact', 'disabled', 'download', 'hideLabel', 'href', 'icon', 'label', 'rel', 'target', 'theme', 'variant']
})
@Component({
  selector: 'diwa-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['compact', 'disabled', 'download', 'hideLabel', 'href', 'icon', 'label', 'rel', 'target', 'theme', 'variant'],
})
export class DiwaLink {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaLink extends Components.DiwaLink {}


@ProxyCmp({
  inputs: ['active', 'alignLabel', 'download', 'hideLabel', 'href', 'icon', 'label', 'rel', 'size', 'stretch', 'target', 'theme', 'underline']
})
@Component({
  selector: 'diwa-link-pure',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', 'alignLabel', 'download', 'hideLabel', 'href', 'icon', 'label', 'rel', 'size', 'stretch', 'target', 'theme', 'underline'],
})
export class DiwaLinkPure {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaLinkPure extends Components.DiwaLinkPure {}


@ProxyCmp({
  inputs: ['backdrop', 'disableBackdropClick', 'dismissButton', 'heading', 'open', 'theme']
})
@Component({
  selector: 'diwa-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['backdrop', 'disableBackdropClick', 'dismissButton', 'heading', 'open', 'theme'],
})
export class DiwaModal {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dismiss']);
  }
}


export declare interface DiwaModal extends Components.DiwaModal {
  /**
   * Emitted when the user requests the modal to close:
  - Clicking the backdrop (unless `disableBackdropClick` is true)
  - Pressing the Escape key
  - Clicking the dismiss (×) button

The consumer MUST set `open={false}` in response:
```html
<diwa-modal open ondismiss={() => (this.open = false)} />
```
   */
  dismiss: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['compact', 'description', 'disabled', 'dropdownDirection', 'hideLabel', 'label', 'message', 'name', 'required', 'state', 'theme', 'value'],
  methods: ['open', 'close']
})
@Component({
  selector: 'diwa-multi-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['compact', 'description', 'disabled', 'dropdownDirection', 'hideLabel', 'label', 'message', 'name', 'required', 'state', 'theme', 'value'],
})
export class DiwaMultiSelect {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['change', 'toggle', 'blur']);
  }
}


import type { MultiSelectChangeEventDetail as IDiwaMultiSelectMultiSelectChangeEventDetail } from '@diwacopilot/components';
import type { MultiSelectToggleEventDetail as IDiwaMultiSelectMultiSelectToggleEventDetail } from '@diwacopilot/components';

export declare interface DiwaMultiSelect extends Components.DiwaMultiSelect {
  /**
   * Emitted when the selection changes.
   */
  change: EventEmitter<CustomEvent<IDiwaMultiSelectMultiSelectChangeEventDetail>>;
  /**
   * Emitted when the dropdown opens or closes.
   */
  toggle: EventEmitter<CustomEvent<IDiwaMultiSelectMultiSelectToggleEventDetail>>;
  /**
   * Emitted when the component loses focus (dropdown closes via click-outside).
   */
  blur: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['compact', 'disabled', 'highlighted', 'selected', 'theme', 'value'],
  methods: ['setFocus']
})
@Component({
  selector: 'diwa-multi-select-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['compact', 'disabled', 'highlighted', 'selected', 'theme', 'value'],
})
export class DiwaMultiSelectOption {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['diwaMultiSelectOptionUpdate']);
  }
}


export declare interface DiwaMultiSelectOption extends Components.DiwaMultiSelectOption {
  /**
   * Emitted when the user clicks or presses Enter on the option.
Bubbles and crosses Shadow DOM so the parent can catch it via @Listen .
   */
  diwaMultiSelectOptionUpdate: EventEmitter<CustomEvent<{ value: string; selected: boolean }>>;
}


@ProxyCmp({
  inputs: ['activePage', 'intl', 'itemsPerPage', 'showLastPage', 'theme', 'totalItemsCount']
})
@Component({
  selector: 'diwa-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['activePage', 'intl', 'itemsPerPage', 'showLastPage', 'theme', 'totalItemsCount'],
})
export class DiwaPagination {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['update']);
  }
}


import type { PaginationUpdateEventDetail as IDiwaPaginationPaginationUpdateEventDetail } from '@diwacopilot/components';

export declare interface DiwaPagination extends Components.DiwaPagination {
  /**
   * Emitted when the user navigates to a different page.

React consumers: use the lowercase `onupdate` prop:
```jsx
<diwa-pagination onupdate={e => setPage(e.detail.page)} />
```
   */
  update: EventEmitter<CustomEvent<IDiwaPaginationPaginationUpdateEventDetail>>;
}


@ProxyCmp({
  inputs: ['compact', 'description', 'disabled', 'hideLabel', 'label', 'length', 'message', 'required', 'state', 'theme', 'type', 'value']
})
@Component({
  selector: 'diwa-pin-code',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['compact', 'description', 'disabled', 'hideLabel', 'label', 'length', 'message', 'required', 'state', 'theme', 'type', 'value'],
})
export class DiwaPinCode {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['update']);
  }
}


import type { PinCodeUpdateEventDetail as IDiwaPinCodePinCodeUpdateEventDetail } from '@diwacopilot/components';

export declare interface DiwaPinCode extends Components.DiwaPinCode {
  /**
   * Emitted when any box value changes.
   */
  update: EventEmitter<CustomEvent<IDiwaPinCodePinCodeUpdateEventDetail>>;
}


@ProxyCmp({
  inputs: ['description', 'direction', 'theme']
})
@Component({
  selector: 'diwa-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['description', 'direction', 'theme'],
})
export class DiwaPopover {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaPopover extends Components.DiwaPopover {}


@ProxyCmp({
  inputs: ['compact', 'description', 'direction', 'disabled', 'hideLabel', 'label', 'message', 'name', 'required', 'state', 'theme', 'value']
})
@Component({
  selector: 'diwa-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['compact', 'description', 'direction', 'disabled', 'hideLabel', 'label', 'message', 'name', 'required', 'state', 'theme', 'value'],
})
export class DiwaRadioGroup {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['update']);
  }
}


import type { RadioGroupUpdateEventDetail as IDiwaRadioGroupRadioGroupUpdateEventDetail } from '@diwacopilot/components';

export declare interface DiwaRadioGroup extends Components.DiwaRadioGroup {
  /**
   * Emitted when the selected value changes.
`event.detail.value` is the newly selected value.
   */
  update: EventEmitter<CustomEvent<IDiwaRadioGroupRadioGroupUpdateEventDetail>>;
}


@ProxyCmp({
  inputs: ['checked', 'compact', 'disabled', 'name', 'theme', 'value']
})
@Component({
  selector: 'diwa-radio-group-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'compact', 'disabled', 'name', 'theme', 'value'],
})
export class DiwaRadioGroupItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['diwa-radio-select']);
  }
}


export declare interface DiwaRadioGroupItem extends Components.DiwaRadioGroupItem {
  /**
   * Internal event dispatched to the parent group when the user selects this item.
Consumers should listen to the parent group's `update` event instead.
   */
  'diwa-radio-select': EventEmitter<CustomEvent<{ value: string }>>;
}


@ProxyCmp({
  inputs: ['alignScrollIndicator', 'scrollbar', 'theme']
})
@Component({
  selector: 'diwa-scroller',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alignScrollIndicator', 'scrollbar', 'theme'],
})
export class DiwaScroller {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaScroller extends Components.DiwaScroller {}


@ProxyCmp({
  inputs: ['compact', 'disabled', 'theme', 'value']
})
@Component({
  selector: 'diwa-segmented-control',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['compact', 'disabled', 'theme', 'value'],
})
export class DiwaSegmentedControl {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['update']);
  }
}


import type { SegmentedControlUpdateEventDetail as IDiwaSegmentedControlSegmentedControlUpdateEventDetail } from '@diwacopilot/components';

export declare interface DiwaSegmentedControl extends Components.DiwaSegmentedControl {
  /**
   * Emitted when the active item changes.
   */
  update: EventEmitter<CustomEvent<IDiwaSegmentedControlSegmentedControlUpdateEventDetail>>;
}


@ProxyCmp({
  inputs: ['compact', 'disabled', 'selected', 'theme', 'value']
})
@Component({
  selector: 'diwa-segmented-control-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['compact', 'disabled', 'selected', 'theme', 'value'],
})
export class DiwaSegmentedControlItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['diwa-segment-select']);
  }
}


export declare interface DiwaSegmentedControlItem extends Components.DiwaSegmentedControlItem {
  /**
   * Internal event — dispatched to the parent control when clicked.
Consumers should listen to the parent's `update` event.
   */
  'diwa-segment-select': EventEmitter<CustomEvent<{ value: string }>>;
}


@ProxyCmp({
  inputs: ['compact', 'description', 'disabled', 'dropdownDirection', 'hideLabel', 'label', 'message', 'name', 'required', 'state', 'theme', 'value'],
  methods: ['open', 'close']
})
@Component({
  selector: 'diwa-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['compact', 'description', 'disabled', 'dropdownDirection', 'hideLabel', 'label', 'message', 'name', 'required', 'state', 'theme', 'value'],
})
export class DiwaSelect {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['change', 'toggle', 'blur']);
  }
}


import type { SelectChangeEventDetail as IDiwaSelectSelectChangeEventDetail } from '@diwacopilot/components';
import type { SelectToggleEventDetail as IDiwaSelectSelectToggleEventDetail } from '@diwacopilot/components';

export declare interface DiwaSelect extends Components.DiwaSelect {
  /**
   * Emitted when the selection changes.
   */
  change: EventEmitter<CustomEvent<IDiwaSelectSelectChangeEventDetail>>;
  /**
   * Emitted when the dropdown opens or closes.
   */
  toggle: EventEmitter<CustomEvent<IDiwaSelectSelectToggleEventDetail>>;
  /**
   * Emitted when the component loses focus (dropdown closes via click-outside).
   */
  blur: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['compact', 'disabled', 'highlighted', 'selected', 'theme', 'value'],
  methods: ['setFocus']
})
@Component({
  selector: 'diwa-select-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['compact', 'disabled', 'highlighted', 'selected', 'theme', 'value'],
})
export class DiwaSelectOption {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['diwaSelectOptionUpdate']);
  }
}


export declare interface DiwaSelectOption extends Components.DiwaSelectOption {
  /**
   * Emitted when the user clicks or presses Enter on the option.
Bubbles and crosses Shadow DOM so the parent can catch it via @Listen .
   */
  diwaSelectOptionUpdate: EventEmitter<CustomEvent<{ value: string | undefined }>>;
}


@ProxyCmp({
  inputs: ['label', 'size', 'theme']
})
@Component({
  selector: 'diwa-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['label', 'size', 'theme'],
})
export class DiwaSpinner {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaSpinner extends Components.DiwaSpinner {}


@ProxyCmp({
  inputs: ['activeStepIndex', 'theme']
})
@Component({
  selector: 'diwa-stepper-horizontal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['activeStepIndex', 'theme'],
})
export class DiwaStepperHorizontal {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['update']);
  }
}


import type { StepperHorizontalUpdateEventDetail as IDiwaStepperHorizontalStepperHorizontalUpdateEventDetail } from '@diwacopilot/components';

export declare interface DiwaStepperHorizontal extends Components.DiwaStepperHorizontal {
  /**
   * Emitted when the active step index changes (e.g. the consumer calls
next/prev). This component does not auto-advance — use this event
to update `activeStepIndex` externally.
   */
  update: EventEmitter<CustomEvent<IDiwaStepperHorizontalStepperHorizontalUpdateEventDetail>>;
}


@ProxyCmp({
  inputs: ['isLast', 'label', 'state', 'stepNumber', 'sublabel', 'theme']
})
@Component({
  selector: 'diwa-stepper-horizontal-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['isLast', 'label', 'state', 'stepNumber', 'sublabel', 'theme'],
})
export class DiwaStepperHorizontalItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaStepperHorizontalItem extends Components.DiwaStepperHorizontalItem {}


@ProxyCmp({
  inputs: ['alignLabel', 'checked', 'compact', 'disabled', 'loading', 'theme']
})
@Component({
  selector: 'diwa-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alignLabel', 'checked', 'compact', 'disabled', 'loading', 'theme'],
})
export class DiwaSwitch {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['update']);
  }
}


import type { SwitchUpdateEventDetail as IDiwaSwitchSwitchUpdateEventDetail } from '@diwacopilot/components';

export declare interface DiwaSwitch extends Components.DiwaSwitch {
  /**
   * Emitted when the checked state changes.
   */
  update: EventEmitter<CustomEvent<IDiwaSwitchSwitchUpdateEventDetail>>;
}


@ProxyCmp({
  inputs: ['bordered', 'caption', 'compact', 'layout', 'striped', 'theme']
})
@Component({
  selector: 'diwa-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['bordered', 'caption', 'compact', 'layout', 'striped', 'theme'],
})
export class DiwaTable {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['update']);
  }
}


import type { TableUpdateEventDetail as IDiwaTableTableUpdateEventDetail } from '@diwacopilot/components';

export declare interface DiwaTable extends Components.DiwaTable {

  update: EventEmitter<CustomEvent<IDiwaTableTableUpdateEventDetail>>;
}


@ProxyCmp({
  inputs: ['theme']
})
@Component({
  selector: 'diwa-table-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['theme'],
})
export class DiwaTableBody {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaTableBody extends Components.DiwaTableBody {}


@ProxyCmp({
  inputs: ['multiline', 'theme']
})
@Component({
  selector: 'diwa-table-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['multiline', 'theme'],
})
export class DiwaTableCell {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaTableCell extends Components.DiwaTableCell {}


@ProxyCmp({
  inputs: ['theme']
})
@Component({
  selector: 'diwa-table-head',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['theme'],
})
export class DiwaTableHead {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaTableHead extends Components.DiwaTableHead {}


@ProxyCmp({
  inputs: ['hideLabel', 'multiline', 'sort', 'theme']
})
@Component({
  selector: 'diwa-table-head-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['hideLabel', 'multiline', 'sort', 'theme'],
})
export class DiwaTableHeadCell {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaTableHeadCell extends Components.DiwaTableHeadCell {}


@ProxyCmp({
  inputs: ['theme']
})
@Component({
  selector: 'diwa-table-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['theme'],
})
export class DiwaTableRow {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaTableRow extends Components.DiwaTableRow {}


@ProxyCmp({
  inputs: ['activeTabIndex', 'theme']
})
@Component({
  selector: 'diwa-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['activeTabIndex', 'theme'],
})
export class DiwaTabs {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['update']);
  }
}


import type { TabsUpdateEventDetail as IDiwaTabsTabsUpdateEventDetail } from '@diwacopilot/components';

export declare interface DiwaTabs extends Components.DiwaTabs {
  /**
   * Emitted when the user selects a different tab.
   */
  update: EventEmitter<CustomEvent<IDiwaTabsTabsUpdateEventDetail>>;
}


@ProxyCmp({
  inputs: ['activeTabIndex', 'theme']
})
@Component({
  selector: 'diwa-tabs-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['activeTabIndex', 'theme'],
})
export class DiwaTabsBar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['update']);
  }
}


import type { TabsBarUpdateEventDetail as IDiwaTabsBarTabsBarUpdateEventDetail } from '@diwacopilot/components';

export declare interface DiwaTabsBar extends Components.DiwaTabsBar {
  /**
   * Emitted when the active tab changes.
   */
  update: EventEmitter<CustomEvent<IDiwaTabsBarTabsBarUpdateEventDetail>>;
}


@ProxyCmp({
  inputs: ['active', 'label', 'theme']
})
@Component({
  selector: 'diwa-tabs-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', 'label', 'theme'],
})
export class DiwaTabsItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaTabsItem extends Components.DiwaTabsItem {}


@ProxyCmp({
  inputs: ['compact', 'icon', 'theme', 'variant']
})
@Component({
  selector: 'diwa-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['compact', 'icon', 'theme', 'variant'],
})
export class DiwaTag {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaTag extends Components.DiwaTag {}


@ProxyCmp({
  inputs: ['compact', 'label', 'theme', 'variant']
})
@Component({
  selector: 'diwa-tag-dismissible',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['compact', 'label', 'theme', 'variant'],
})
export class DiwaTagDismissible {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dismiss']);
  }
}


export declare interface DiwaTagDismissible extends Components.DiwaTagDismissible {
  /**
   * Emitted when the dismiss button is clicked.
   */
  dismiss: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['align', 'color', 'ellipsis', 'size', 'tag', 'theme', 'weight']
})
@Component({
  selector: 'diwa-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['align', 'color', 'ellipsis', 'size', 'tag', 'theme', 'weight'],
})
export class DiwaText {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaText extends Components.DiwaText {}


@ProxyCmp({
  inputs: ['theme', 'type']
})
@Component({
  selector: 'diwa-text-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['theme', 'type'],
})
export class DiwaTextList {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaTextList extends Components.DiwaTextList {}


@ProxyCmp({
  inputs: ['theme']
})
@Component({
  selector: 'diwa-text-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['theme'],
})
export class DiwaTextListItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaTextListItem extends Components.DiwaTextListItem {}


@ProxyCmp({
  inputs: ['compact', 'description', 'disabled', 'hideLabel', 'label', 'maxLength', 'message', 'minLength', 'name', 'placeholder', 'readOnly', 'required', 'resize', 'rows', 'state', 'theme', 'value']
})
@Component({
  selector: 'diwa-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['compact', 'description', 'disabled', 'hideLabel', 'label', 'maxLength', 'message', 'minLength', 'name', 'placeholder', 'readOnly', 'required', 'resize', 'rows', 'state', 'theme', 'value'],
})
export class DiwaTextarea {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['input', 'change', 'blur']);
  }
}


export declare interface DiwaTextarea extends Components.DiwaTextarea {
  /**
   * Emitted on every keystroke. Detail contains the current value string.
   */
  input: EventEmitter<CustomEvent<string>>;
  /**
   * Emitted when the textarea loses focus after value changes.
   */
  change: EventEmitter<CustomEvent<string>>;
  /**
   * Emitted when the textarea loses focus.
   */
  blur: EventEmitter<CustomEvent<FocusEvent>>;
}


@ProxyCmp({
  inputs: ['theme'],
  methods: ['addMessage']
})
@Component({
  selector: 'diwa-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['theme'],
})
export class DiwaToast {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface DiwaToast extends Components.DiwaToast {}


@ProxyCmp({
  inputs: ['state', 'text', 'theme']
})
@Component({
  selector: 'diwa-toast-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['state', 'text', 'theme'],
})
export class DiwaToastItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dismiss']);
  }
}


export declare interface DiwaToastItem extends Components.DiwaToastItem {
  /**
   * Emitted when the user dismisses the toast or the auto-dismiss timer fires.
   */
  dismiss: EventEmitter<CustomEvent<void>>;
}


