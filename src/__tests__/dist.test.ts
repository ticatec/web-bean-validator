import { describe, it, expect } from 'vitest';
import beanValidator, {
    BaseValidator,
    NestValidator,
    BeanValidator,
    StringValidator,
    NumberValidator,
    DateValidator,
    BooleanValidator,
    EnumValidator,
    ArrayValidator,
    ObjectValidator,
    ValidationResult
} from '../../dist/index.js';

describe('Built Dist Package', () => {
    it('should export all validators and classes properly', () => {
        expect(beanValidator).toBeDefined();
        expect(beanValidator.validate).toBeTypeOf('function');
        expect(BeanValidator).toBeDefined();
        expect(BaseValidator).toBeDefined();
        expect(NestValidator).toBeDefined();
        expect(StringValidator).toBeDefined();
        expect(NumberValidator).toBeDefined();
        expect(DateValidator).toBeDefined();
        expect(BooleanValidator).toBeDefined();
        expect(EnumValidator).toBeDefined();
        expect(ArrayValidator).toBeDefined();
        expect(ObjectValidator).toBeDefined();
        expect(ValidationResult).toBeDefined();
    });

    it('should execute validation successfully from built dist', () => {
        const rules = [
            new StringValidator('name', { required: true, minLen: 2 }),
            new NumberValidator('score', { required: true, minValue: 0, maxValue: 100 })
        ];

        const validResult = BeanValidator.validate({ name: 'Alice', score: 95 }, rules);
        expect(validResult.valid).toBe(true);

        const invalidResult = BeanValidator.validate({ name: 'A', score: 105 }, rules);
        expect(invalidResult.valid).toBe(false);
        expect(invalidResult.hasError('name')).toBe(true);
        expect(invalidResult.hasError('score')).toBe(true);
    });
});
