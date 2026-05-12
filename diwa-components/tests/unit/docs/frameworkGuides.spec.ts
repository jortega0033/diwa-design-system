import { describe, expect, it } from 'vitest';

import { FRAMEWORK_GUIDES } from '../../../storefront/src/app/developing/_shared/frameworkGuides';

describe('frameworkGuides event contracts', () => {
  describe('react guide — diwa-select event (issue #109)', () => {
    it('uses onChange (not onUpdate) for the change event', () => {
      expect(FRAMEWORK_GUIDES.react.eventCode).toContain('onChange');
      expect(FRAMEWORK_GUIDES.react.eventCode).not.toContain('onUpdate');
    });

    it('includes name field in SelectChangeEventDetail shape', () => {
      expect(FRAMEWORK_GUIDES.react.eventCode).toContain('name: string');
    });

    it('includes value field in SelectChangeEventDetail shape (string, not array)', () => {
      expect(FRAMEWORK_GUIDES.react.eventCode).toContain('value: string');
      expect(FRAMEWORK_GUIDES.react.eventCode).not.toContain('value: string[]');
    });
  });

  describe('vue guide — diwa-multi-select event (issue #110)', () => {
    it('uses @change (not @update) for the change event', () => {
      expect(FRAMEWORK_GUIDES.vue.eventCode).toContain('@change');
      expect(FRAMEWORK_GUIDES.vue.eventCode).not.toContain('@update');
    });

    it('uses event.detail.value (not event.detail.values)', () => {
      expect(FRAMEWORK_GUIDES.vue.eventCode).toContain('event.detail.value');
      expect(FRAMEWORK_GUIDES.vue.eventCode).not.toContain('event.detail.values');
    });

    it('includes name field in MultiSelectChangeEventDetail shape', () => {
      expect(FRAMEWORK_GUIDES.vue.eventCode).toContain('name: string');
    });

    it('uses value: string[] in MultiSelectChangeEventDetail shape', () => {
      expect(FRAMEWORK_GUIDES.vue.eventCode).toContain('value: string[]');
    });
  });
});
