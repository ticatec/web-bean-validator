import { describe, it, expect } from 'vitest';
import DateValidator from '../lib/DateValidator';
import ValidationResult from '../lib/ValidationResult';
import dayjs from 'dayjs';
import i18nRes from '../i18nRes';

describe('DateValidator', () => {
    it('should validate required date', () => {
        const validator = new DateValidator('birthDate', { required: true, name: 'Birth Date' });

        const r1 = new ValidationResult();
        validator.validate({}, r1);
        expect(r1.valid).toBe(false);
        expect(r1.errors.birthDate).toBe(i18nRes.validation.required({ field: 'Birth Date' }));

        const r2 = new ValidationResult();
        validator.validate({ birthDate: new Date() }, r2);
        expect(r2.valid).toBe(true);

        const r3 = new ValidationResult();
        validator.validate({ birthDate: '2023-01-01' }, r3);
        expect(r3.valid).toBe(true);

        const r4 = new ValidationResult();
        validator.validate({ birthDate: Date.now() }, r4);
        expect(r4.valid).toBe(true);
    });

    it('should reject invalid date strings when required', () => {
        const validator = new DateValidator('date', { required: true });
        const result = new ValidationResult();
        validator.validate({ date: 'invalid-date-string' }, result);
        expect(result.valid).toBe(false);

        const r2 = new ValidationResult();
        validator.validate({ date: {} }, r2);
        expect(r2.valid).toBe(false);
    });

    it('should validate from (earliest Date boundary)', () => {
        const fromDate = new Date('2023-01-01T00:00:00.000Z');
        const validator = new DateValidator('eventDate', { from: fromDate });

        const r1 = new ValidationResult();
        validator.validate({ eventDate: '2022-12-31' }, r1);
        expect(r1.valid).toBe(false);
        expect(r1.errors.eventDate).toBe(i18nRes.validation.earliestDate({ date: dayjs(fromDate).format('YYYY-MM-DD') }));

        const r2 = new ValidationResult();
        validator.validate({ eventDate: '2023-01-02' }, r2);
        expect(r2.valid).toBe(true);
    });

    it('should validate to (latest Date boundary)', () => {
        const toDate = new Date('2023-12-31T23:59:59.999Z');
        const validator = new DateValidator('eventDate', { to: toDate });

        const r1 = new ValidationResult();
        validator.validate({ eventDate: '2024-01-01' }, r1);
        expect(r1.valid).toBe(false);
        expect(r1.errors.eventDate).toBe(i18nRes.validation.finalDate({ date: dayjs(toDate).format('YYYY-MM-DD') }));

        const r2 = new ValidationResult();
        validator.validate({ eventDate: '2023-06-01' }, r2);
        expect(r2.valid).toBe(true);
    });

    it('should validate relative maxDaysBefore and maxDaysAfter', () => {
        const validator = new DateValidator('appointment', {
            maxDaysBefore: 1,
            maxDaysAfter: 7
        });

        const today = new Date();
        const r1 = new ValidationResult();
        validator.validate({ appointment: today }, r1);
        expect(r1.valid).toBe(true);

        const farPast = new Date(Date.now() - 30 * 86400000);
        const r2 = new ValidationResult();
        validator.validate({ appointment: farPast }, r2);
        expect(r2.valid).toBe(false);

        const farFuture = new Date(Date.now() + 30 * 86400000);
        const r3 = new ValidationResult();
        validator.validate({ appointment: farFuture }, r3);
        expect(r3.valid).toBe(false);
    });
});
