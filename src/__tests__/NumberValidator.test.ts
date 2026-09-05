import { describe, it, expect } from 'vitest';
import NumberValidator from '../lib/NumberValidator';
import ValidationResult from '../lib/ValidationResult';
import i18nRes from '../i18nRes';

describe('NumberValidator', () => {
    it('should validate required number', () => {
        const validator = new NumberValidator('age', { required: true, name: 'Age' });

        const r1 = new ValidationResult();
        validator.validate({ age: null }, r1);
        expect(r1.valid).toBe(false);
        expect(r1.errors.age).toBe(i18nRes.validation.required({ field: 'Age' }));

        const r2 = new ValidationResult();
        validator.validate({ age: 0 }, r2);
        expect(r2.valid).toBe(true);

        const r3 = new ValidationResult();
        validator.validate({ age: 25 }, r3);
        expect(r3.valid).toBe(true);
    });

    it('should convert numeric string to number', () => {
        const validator = new NumberValidator('age', { required: true, minValue: 18 });
        const result = new ValidationResult();
        validator.validate({ age: '20' }, result);
        expect(result.valid).toBe(true);
    });

    it('should reject non-numeric string and non-number objects when required', () => {
        const validator = new NumberValidator('age', { required: true });
        const r1 = new ValidationResult();
        validator.validate({ age: 'abc' }, r1);
        expect(r1.valid).toBe(false);

        const r2 = new ValidationResult();
        validator.validate({ age: {} }, r2);
        expect(r2.valid).toBe(false);

        const r3 = new ValidationResult();
        validator.validate({ age: NaN }, r3);
        expect(r3.valid).toBe(false);
    });

    it('should validate minValue', () => {
        const validator = new NumberValidator('score', { minValue: 10 });

        const r1 = new ValidationResult();
        validator.validate({ score: 5 }, r1);
        expect(r1.valid).toBe(false);
        expect(r1.errors.score).toBe(i18nRes.validation.numberShortage({ min: 10 }));

        const r2 = new ValidationResult();
        validator.validate({ score: 10 }, r2);
        expect(r2.valid).toBe(true);
    });

    it('should validate maxValue', () => {
        const validator = new NumberValidator('score', { maxValue: 100 });

        const r1 = new ValidationResult();
        validator.validate({ score: 105 }, r1);
        expect(r1.valid).toBe(false);
        expect(r1.errors.score).toBe(i18nRes.validation.numberExceed({ max: 100 }));

        const r2 = new ValidationResult();
        validator.validate({ score: 100 }, r2);
        expect(r2.valid).toBe(true);
    });

    it('should skip optional empty number', () => {
        const validator = new NumberValidator('discount', { required: false, minValue: 5 });
        const result = new ValidationResult();
        validator.validate({}, result);
        expect(result.valid).toBe(true);
    });
});
