import beanValidator from "./lib/BeanValidator";
import BaseValidator from './lib/BaseValidator';
import NestValidator from './lib/NestValidator';
import BeanValidator from './lib/BeanValidator';
import StringValidator, {StringValidatorOptions} from './lib/StringValidator';
import NumberValidator, {NumberValidatorOptions} from './lib/NumberValidator';
import DateValidator, {DateValidatorOptions} from './lib/DateValidator';
import BooleanValidator from './lib/BooleanValidator';
import EnumValidator, {EnumValidatorOptions} from './lib/EnumValidator';
import ArrayValidator, {ArrayValidatorOptions} from './lib/ArrayValidator';
import ObjectValidator, {ObjectValidatorOptions} from './lib/ObjectValidator';
import ValidationResult from './lib/ValidationResult';

export type {ValidatorOptions, CustomCheck, IgnoreWhen, RequiredCheck} from './lib/BaseValidator';
export type {StringValidatorOptions} from './lib/StringValidator';
export type {NumberValidatorOptions} from './lib/NumberValidator';
export type {DateValidatorOptions} from './lib/DateValidator';
export type {EnumValidatorOptions} from './lib/EnumValidator';
export type {ArrayValidatorOptions} from './lib/ArrayValidator';
export type {ObjectValidatorOptions} from './lib/ObjectValidator';

export type ValidationRules = Array<BaseValidator>;

export {
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
}
export default beanValidator;