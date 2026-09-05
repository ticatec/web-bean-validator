import { describe, it, expect } from 'vitest';
import EnumValidator from '../lib/EnumValidator';
import ValidationResult from '../lib/ValidationResult';
import i18nRes from '../i18nRes';

describe('EnumValidator', () => {
    it('should initialize with default options', () => {
        const validator = new EnumValidator('status');
        const result = new ValidationResult();
        validator.validate({ status: 'ACTIVE' }, result);
        expect(result.valid).toBe(true);
    });

    it('should validate value against enum list', () => {
        const validator = new EnumValidator('status', {
            required: true,
            name: 'Status',
            values: ['PENDING', 'APPROVED', 'REJECTED']
        });

        const r1 = new ValidationResult();
        validator.validate({ status: 'APPROVED' }, r1);
        expect(r1.valid).toBe(true);

        const r2 = new ValidationResult();
        validator.validate({ status: 'UNKNOWN' }, r2);
        expect(r2.valid).toBe(false);
        expect(r2.errors.status).toBe(i18nRes.validation.required({ field: 'Status' }));
    });

    it('should support numeric enums', () => {
        const validator = new EnumValidator('code', {
            required: true,
            values: [100, 200, 300]
        });

        const r1 = new ValidationResult();
        validator.validate({ code: 200 }, r1);
        expect(r1.valid).toBe(true);

        const r2 = new ValidationResult();
        validator.validate({ code: 404 }, r2);
        expect(r2.valid).toBe(false);
    });

    it('should handle optional enum with null values', () => {
        const validator = new EnumValidator('category', {
            required: false,
            values: ['A', 'B']
        });

        const result = new ValidationResult();
        validator.validate({}, result);
        expect(result.valid).toBe(true);
    });
});
