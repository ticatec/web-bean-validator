import { describe, it, expect } from 'vitest';
import BaseValidator from '../lib/BaseValidator';
import ValidationResult from '../lib/ValidationResult';
import i18nRes from '../i18nRes';

class TestValidator extends BaseValidator {
    constructor(field: string, options?: any) {
        super(field, options);
    }

    public exposedGetFieldLabel() {
        return this.getFieldLabel();
    }

    public exposedFormatErrorMessage(message: string, params?: any) {
        return this.formatErrorMessage(message, params);
    }
}

describe('BaseValidator', () => {
    it('should initialize with default options', () => {
        const validator = new TestValidator('title');
        expect(validator.field).toBe('title');
        expect(validator.exposedGetFieldLabel()).toBe('title');
    });

    it('should initialize with custom name and required flag', () => {
        const validator = new TestValidator('title', { name: 'Title Label', required: true });
        expect(validator.field).toBe('title');
        expect(validator.exposedGetFieldLabel()).toBe('Title Label');
    });

    it('should fail when required is true and value is missing/null/undefined', () => {
        const validator = new TestValidator('title', { name: 'Title', required: true });
        const result = new ValidationResult();
        validator.validate({}, result);
        expect(result.valid).toBe(false);
        expect(result.errors.title).toBe(i18nRes.validation.required({ field: 'Title' }));
    });

    it('should support dynamic required function', () => {
        const validator = new TestValidator('address', {
            name: 'Address',
            required: (data) => data.needsDelivery === true
        });

        const result1 = new ValidationResult();
        validator.validate({ needsDelivery: false }, result1);
        expect(result1.valid).toBe(true);

        const result2 = new ValidationResult();
        validator.validate({ needsDelivery: true }, result2);
        expect(result2.valid).toBe(false);
        expect(result2.errors.address).toBe(i18nRes.validation.required({ field: 'Address' }));
    });

    it('should ignore validation when ignoreWhen returns true', () => {
        const validator = new TestValidator('creditCard', {
            required: true,
            ignoreWhen: (data) => data.paymentType === 'cash'
        });

        const result = new ValidationResult();
        validator.validate({ paymentType: 'cash' }, result);
        expect(result.valid).toBe(true);
    });

    it('should run custom check when value is present', () => {
        const validator = new TestValidator('code', {
            check: (value, data) => {
                if (value !== 'SECRET') {
                    return 'Code is not secret';
                }
                return null;
            }
        });

        const result1 = new ValidationResult();
        validator.validate({ code: 'SECRET' }, result1);
        expect(result1.valid).toBe(true);

        const result2 = new ValidationResult();
        validator.validate({ code: 'WRONG' }, result2);
        expect(result2.valid).toBe(false);
        expect(result2.errors.code).toBe('Code is not secret');
    });

    it('should support clone with overriding options', () => {
        const original = new TestValidator('username', { required: false, name: 'User' });
        const cloned = original.clone({ required: true, name: 'New User' });

        expect(cloned.field).toBe('username');
        expect(cloned.exposedGetFieldLabel()).toBe('New User');

        const result = new ValidationResult();
        cloned.validate({}, result);
        expect(result.valid).toBe(false);
    });

    it('should handle null/undefined data safely', () => {
        const validator = new TestValidator('test', { required: true });
        const result = new ValidationResult();
        expect(() => validator.validate(null, result)).not.toThrow();
        expect(result.valid).toBe(false);
    });

    it('should format error message correctly', () => {
        const validator = new TestValidator('msg');
        const formatted = validator.exposedFormatErrorMessage('Hello {{name}}', { name: 'World' });
        expect(formatted).toBe('Hello World');

        const unformatted = validator.exposedFormatErrorMessage('Simple text');
        expect(unformatted).toBe('Simple text');
    });
});
