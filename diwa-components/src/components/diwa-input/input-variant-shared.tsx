import { Host, h } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';
import type { InputFieldState } from './types';
import type { Theme } from '../../utils/styles';
import { createInputInstanceId } from './id';

type InputAttrs = Record<string, string | number | boolean | undefined>;

const instanceIds = new WeakMap<object, string>();

export interface InputVariantHost {
  el: HTMLElement;
  _hasStart: boolean;
  _hasEnd: boolean;
  label: string;
  description: string;
  message: string;
  state: InputFieldState;
  name: string;
  value: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
  readonly: boolean;
  hideLabel: boolean;
  compact: boolean;
  autoComplete?: string;
  theme: Theme;
  input: EventEmitter<string>;
  change: EventEmitter<string>;
  blur: EventEmitter<FocusEvent>;
  focus: EventEmitter<FocusEvent>;
}

export interface InputVariantIds {
  inputId: string;
  descId: string;
  msgId: string;
}

export interface InputVariantRenderOptions {
  ids: InputVariantIds;
  type: string;
  styleText: string;
  inputAttrs?: InputAttrs;
  suffix?: any;
  onInput: (e: Event) => void;
  onChange: (e: Event) => void;
  onBlur: (e: FocusEvent) => void;
  onFocus: (e: FocusEvent) => void;
}

export const getInputVariantIds = (host: object, tag: string): InputVariantIds => {
  let instanceId = instanceIds.get(host);
  if (!instanceId) {
    instanceId = createInputInstanceId(tag);
    instanceIds.set(host, instanceId);
  }

  return {
    inputId: `${instanceId}-input`,
    descId: `${instanceId}-desc`,
    msgId: `${instanceId}-msg`,
  };
};

export const initializeInputVariantSlots = (host: Pick<InputVariantHost, 'el' | '_hasStart' | '_hasEnd'>): void => {
  host._hasStart = !!host.el.querySelector('[slot="start"]');
  host._hasEnd = !!host.el.querySelector('[slot="end"]');
};

export const handleInputEvent = (host: Pick<InputVariantHost, 'value' | 'input'>, e: Event): void => {
  host.value = (e.target as HTMLInputElement).value;
  host.input.emit(host.value);
};

export const handleChangeEvent = (host: Pick<InputVariantHost, 'value' | 'change'>, e: Event): void => {
  host.value = (e.target as HTMLInputElement).value;
  host.change.emit(host.value);
};

export const handleBlurEvent = (host: Pick<InputVariantHost, 'blur'>, e: FocusEvent): void => {
  host.blur.emit(e);
};

export const handleFocusEvent = (host: Pick<InputVariantHost, 'focus'>, e: FocusEvent): void => {
  host.focus.emit(e);
};

export const emitInputAndChange = (host: Pick<InputVariantHost, 'value' | 'input' | 'change'>, value: string): void => {
  host.value = value;
  host.input.emit(value);
  host.change.emit(value);
};

export const getSharedInputAttrs = (host: InputVariantHost, ids: InputVariantIds): InputAttrs => ({
  name: host.name || undefined,
  value: host.value,
  placeholder: host.placeholder || undefined,
  disabled: host.disabled,
  required: host.required,
  readOnly: host.readonly,
  autocomplete: host.autoComplete,
  'aria-label': host.hideLabel && host.label ? host.label : undefined,
  'aria-invalid': host.state === 'error' ? 'true' : undefined,
  'aria-required': host.required ? 'true' : undefined,
  'aria-describedby': host.message ? ids.msgId : host.description ? ids.descId : undefined,
});

export const renderInputVariantShell = (
  host: InputVariantHost,
  { ids, type, styleText, inputAttrs = {}, suffix = null, onInput, onChange, onBlur, onFocus }: InputVariantRenderOptions,
) => (
  <Host data-theme={host.theme}>
    <style innerHTML={styleText} />
    <div class="root">
      {!host.hideLabel && host.label && (
        <div class="label-row">
          <label class="label" htmlFor={ids.inputId}>
            {host.label}
            {host.required && <span class="required" aria-hidden="true"> *</span>}
          </label>
          <slot name="label-after" />
        </div>
      )}
      <div class="input-wrapper">
        {host._hasStart && <div class="slot-start"><slot name="start" /></div>}
        <input
          id={ids.inputId}
          class="input"
          type={type}
          {...inputAttrs as any}
          onInput={onInput}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        {host._hasEnd && <div class="slot-end"><slot name="end" /></div>}
        {suffix}
      </div>
      {!host.message && host.description && (
        <p id={ids.descId} class="description">{host.description}</p>
      )}
      {host.message && (
        <p id={ids.msgId} class="message">{host.message}</p>
      )}
    </div>
  </Host>
);