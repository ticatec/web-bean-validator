import { describe, it, expect } from 'vitest';
import BeanValidator, {
    StringValidator,
    NumberValidator,
    DateValidator,
    BooleanValidator,
    EnumValidator,
    ArrayValidator,
    ObjectValidator,
    ValidationResult
} from '../index';

describe('BeanValidator', () => {
    it('should validate a complex object successfully', () => {
        const rules = [
            new StringValidator('username', {
                required: true,
                minLen: 3,
                format: {
                    regex: /^[a-zA-Z0-9_]+$/,
                    message: 'Username can only contain alphanumeric and underscore'
                }
            }),
            new StringValidator('email', {
                required: true,
                format: {
                    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email'
                }
            }),
            new NumberValidator('age', {
                required: true,
                minValue: 18,
                maxValue: 100
            }),
            new DateValidator('birthDate', {
                required: true,
                to: new Date()
            }),
            new EnumValidator('role', {
                required: true,
                values: ['ADMIN', 'USER', 'GUEST']
            }),
            new BooleanValidator('agreed', {
                required: true,
                check: (val) => val === true ? null : 'Must agree to terms'
            }),
            new ArrayValidator('skills', {
                required: true,
                minLen: 1,
                rules: [
                    new StringValidator('name', { required: true }),
                    new NumberValidator('level', { required: true, minValue: 1, maxValue: 10 })
                ]
            }),
            new ObjectValidator('profile', {
                required: true,
                rules: [
                    new StringValidator('bio', { required: true, minLen: 5 })
                ]
            })
        ];

        const validData = {
            username: 'john_doe',
            email: 'john@example.com',
            age: 28,
            birthDate: '1996-05-15',
            role: 'USER',
            agreed: true,
            skills: [
                { name: 'TypeScript', level: 8 },
                { name: 'Vue', level: 7 }
            ],
            profile: {
                bio: 'Software Engineer'
            }
        };

        const result = BeanValidator.validate(validData, rules);
        expect(result.valid).toBe(true);
        expect(result.errors).toEqual({});
    });

    it('should catch multiple errors across different fields', () => {
        const rules = [
            new StringValidator('username', { required: true, minLen: 3 }),
            new NumberValidator('age', { required: true, minValue: 18 }),
            new BooleanValidator('agreed', { required: true, check: (v) => v === true ? null : 'Must agree' })
        ];

        const invalidData = {
            username: 'ab',
            age: 12,
            agreed: false
        };

        const result = BeanValidator.validate(invalidData, rules);
        expect(result.valid).toBe(false);
        expect(result.hasError('username')).toBe(true);
        expect(result.hasError('age')).toBe(true);
        expect(result.hasError('agreed')).toBe(true);
        expect(result.getError('agreed')).toBe('Must agree');
    });

    it('should handle null/empty data or rules gracefully', () => {
        const r1 = BeanValidator.validate(null, []);
        expect(r1.valid).toBe(true);

        const r2 = BeanValidator.validate({}, null as any);
        expect(r2.valid).toBe(true);
    });
});
