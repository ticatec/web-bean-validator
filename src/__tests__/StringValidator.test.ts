import { describe, it, expect } from 'vitest';
import StringValidator from '../lib/StringValidator';
import ValidationResult from '../lib/ValidationResult';
import i18nRes from '../i18nRes';

describe('StringValidator', () => {
    it('should validate required string', () => {
        const validator = new StringValidator('username', { required: true, name: 'Username' });

        const r1 = new ValidationResult();
        validator.validate({ username: '' }, r1);
        expect(r1.valid).toBe(false);
        expect(r1.errors.username).toBe(i18nRes.validation.required({ field: 'Username' }));

        const r2 = new ValidationResult();
        validator.validate({ username: '   ' }, r2);
        expect(r2.valid).toBe(false);

        const r3 = new ValidationResult();
        validator.validate({ username: 'john' }, r3);
        expect(r3.valid).toBe(true);
    });

    it('should validate minLen', () => {
        const validator = new StringValidator('pwd', { minLen: 6 });

        const r1 = new ValidationResult();
        validator.validate({ pwd: 'abc' }, r1);
        expect(r1.valid).toBe(false);
        expect(r1.errors.pwd).toBe(i18nRes.validation.stringShortage({ length: 6 }));

        const r2 = new ValidationResult();
        validator.validate({ pwd: 'abcdef' }, r2);
        expect(r2.valid).toBe(true);
    });

    it('should validate regex format', () => {
        const validator = new StringValidator('email', {
            format: {
                regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address'
            }
        });

        const r1 = new ValidationResult();
        validator.validate({ email: 'not-an-email' }, r1);
        expect(r1.valid).toBe(false);
        expect(r1.errors.email).toBe('Invalid email address');

        const r2 = new ValidationResult();
        validator.validate({ email: 'test@example.com' }, r2);
        expect(r2.valid).toBe(true);
    });

    it('should skip validation if optional and not provided', () => {
        const validator = new StringValidator('bio', { required: false, minLen: 10 });
        const result = new ValidationResult();
        validator.validate({}, result);
        expect(result.valid).toBe(true);
    });

    it('should handle non-string values gracefully', () => {
        const validator = new StringValidator('str', { required: true });
        const result = new ValidationResult();
        validator.validate({ str: 123 }, result);
        expect(result.valid).toBe(false);
    });
});
