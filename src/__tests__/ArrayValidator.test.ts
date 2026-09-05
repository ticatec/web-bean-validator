import { describe, it, expect } from 'vitest';
import ArrayValidator from '../lib/ArrayValidator';
import StringValidator from '../lib/StringValidator';
import NumberValidator from '../lib/NumberValidator';
import ValidationResult from '../lib/ValidationResult';
import i18nRes from '../i18nRes';

describe('ArrayValidator', () => {
    it('should validate required array', () => {
        const validator = new ArrayValidator('items', { required: true, name: 'Items' });

        const r1 = new ValidationResult();
        validator.validate({}, r1);
        expect(r1.valid).toBe(false);
        expect(r1.errors.items).toBe(i18nRes.validation.required({ field: 'Items' }));

        const r2 = new ValidationResult();
        validator.validate({ items: [] }, r2);
        expect(r2.valid).toBe(true);
    });

    it('should validate minLen', () => {
        const validator = new ArrayValidator('tags', { minLen: 2 });

        const r1 = new ValidationResult();
        validator.validate({ tags: ['a'] }, r1);
        expect(r1.valid).toBe(false);
        expect(r1.errors.tags).toBe(i18nRes.validation.arrayShortage({ length: 2 }));

        const r2 = new ValidationResult();
        validator.validate({ tags: ['a', 'b'] }, r2);
        expect(r2.valid).toBe(true);
    });

    it('should validate maxLen', () => {
        const validator = new ArrayValidator('tags', { maxLen: 3 });

        const r1 = new ValidationResult();
        validator.validate({ tags: ['a', 'b', 'c', 'd'] }, r1);
        expect(r1.valid).toBe(false);
        expect(r1.errors.tags).toBe(i18nRes.validation.arrayExceed({ length: 3 }));

        const r2 = new ValidationResult();
        validator.validate({ tags: ['a', 'b', 'c'] }, r2);
        expect(r2.valid).toBe(true);
    });

    it('should validate items with rules', () => {
        const validator = new ArrayValidator('users', {
            rules: [
                new StringValidator('name', { required: true, minLen: 2 }),
                new NumberValidator('age', { required: true, minValue: 18 })
            ]
        });

        const r1 = new ValidationResult();
        validator.validate({
            users: [
                { name: 'Alice', age: 20 },
                { name: 'B', age: 15 }
            ]
        }, r1);
        expect(r1.valid).toBe(false);
        expect(r1.errors.users).toHaveLength(2);
        expect(r1.errors.users[0]).toEqual({});
        expect(r1.errors.users[1].name).toBe(i18nRes.validation.stringShortage({ length: 2 }));
        expect(r1.errors.users[1].age).toBe(i18nRes.validation.numberShortage({ min: 18 }));

        const r2 = new ValidationResult();
        validator.validate({
            users: [
                { name: 'Alice', age: 20 },
                { name: 'Bob', age: 25 }
            ]
        }, r2);
        expect(r2.valid).toBe(true);
    });

    it('should handle non-array input', () => {
        const validator = new ArrayValidator('items', { required: true });
        const result = new ValidationResult();
        validator.validate({ items: 'not-an-array' }, result);
        expect(result.valid).toBe(false);
    });
});
