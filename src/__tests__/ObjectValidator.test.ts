import { describe, it, expect } from 'vitest';
import ObjectValidator from '../lib/ObjectValidator';
import StringValidator from '../lib/StringValidator';
import NumberValidator from '../lib/NumberValidator';
import ValidationResult from '../lib/ValidationResult';
import i18nRes from '../i18nRes';

describe('ObjectValidator', () => {
    it('should validate required object and nested rules', () => {
        const validator = new ObjectValidator('address', {
            required: true,
            name: 'Address',
            rules: [
                new StringValidator('street', { required: true, name: 'Street' }),
                new StringValidator('city', { required: true, name: 'City' }),
                new NumberValidator('zipCode', { required: true, minValue: 1000 })
            ]
        });

        const r1 = new ValidationResult();
        validator.validate({}, r1);
        expect(r1.valid).toBe(false);
        expect(r1.errors.address).toBe(i18nRes.validation.required({ field: 'Address' }));

        const r2 = new ValidationResult();
        validator.validate({
            address: {
                street: '',
                city: 'Auckland',
                zipCode: 500
            }
        }, r2);
        expect(r2.valid).toBe(false);
        expect(r2.errors.address.street).toBe(i18nRes.validation.required({ field: 'Street' }));
        expect(r2.errors.address.zipCode).toBe(i18nRes.validation.numberShortage({ min: 1000 }));

        const r3 = new ValidationResult();
        validator.validate({
            address: {
                street: 'Queen St',
                city: 'Auckland',
                zipCode: 1010
            }
        }, r3);
        expect(r3.valid).toBe(true);
    });

    it('should handle optional empty object', () => {
        const validator = new ObjectValidator('profile', {
            required: false,
            rules: [
                new StringValidator('bio', { required: true })
            ]
        });

        const result = new ValidationResult();
        validator.validate({}, result);
        expect(result.valid).toBe(true);
    });

    it('should reject non-object values', () => {
        const validator = new ObjectValidator('meta', { required: true });
        const result = new ValidationResult();
        validator.validate({ meta: 'not-an-object' }, result);
        expect(result.valid).toBe(false);
    });
});
