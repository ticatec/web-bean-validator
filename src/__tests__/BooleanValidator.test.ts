import { describe, it, expect } from 'vitest';
import BooleanValidator from '../lib/BooleanValidator';
import ValidationResult from '../lib/ValidationResult';
import i18nRes from '../i18nRes';

describe('BooleanValidator', () => {
    it('should validate boolean values', () => {
        const validator = new BooleanValidator('agreed', { required: true, name: 'Terms' });

        const r1 = new ValidationResult();
        validator.validate({ agreed: true }, r1);
        expect(r1.valid).toBe(true);

        const r2 = new ValidationResult();
        validator.validate({ agreed: false }, r2);
        expect(r2.valid).toBe(true);

        const r3 = new ValidationResult();
        validator.validate({}, r3);
        expect(r3.valid).toBe(false);
        expect(r3.errors.agreed).toBe(i18nRes.validation.required({ field: 'Terms' }));
    });

    it('should convert numbers to boolean', () => {
        const validator = new BooleanValidator('flag', { required: true });

        const r1 = new ValidationResult();
        validator.validate({ flag: 1 }, r1);
        expect(r1.valid).toBe(true);

        const r2 = new ValidationResult();
        validator.validate({ flag: 0 }, r2);
        expect(r2.valid).toBe(true);
    });

    it('should convert strings "true"/"false"/"1"/"0" to boolean', () => {
        const validator = new BooleanValidator('flag', { required: true });

        const r1 = new ValidationResult();
        validator.validate({ flag: 'true' }, r1);
        expect(r1.valid).toBe(true);

        const r2 = new ValidationResult();
        validator.validate({ flag: '1' }, r2);
        expect(r2.valid).toBe(true);

        const r3 = new ValidationResult();
        validator.validate({ flag: 'false' }, r3);
        expect(r3.valid).toBe(true);

        const r4 = new ValidationResult();
        validator.validate({ flag: '0' }, r4);
        expect(r4.valid).toBe(true);

        const r5 = new ValidationResult();
        validator.validate({ flag: 'not-a-bool' }, r5);
        expect(r5.valid).toBe(false);
    });

    it('should support custom check for boolean value', () => {
        const validator = new BooleanValidator('agreed', {
            required: true,
            check: (val) => val === true ? null : 'Must agree to terms'
        });

        const r1 = new ValidationResult();
        validator.validate({ agreed: true }, r1);
        expect(r1.valid).toBe(true);

        const r2 = new ValidationResult();
        validator.validate({ agreed: false }, r2);
        expect(r2.valid).toBe(false);
        expect(r2.errors.agreed).toBe('Must agree to terms');
    });
});
