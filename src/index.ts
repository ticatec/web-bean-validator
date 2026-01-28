import beanValidator from "./lib/BeanValidator";
import BaseValidator from './lib/BaseValidator';
import BeanValidator from './lib/BeanValidator';
import StringValidator from './lib/StringValidator';
import NumberValidator from './lib/NumberValidator';
import DateValidator from './lib/DateValidator';
import BooleanValidator from './lib/BooleanValidator';
import EnumValidator from './lib/EnumValidator';
import ArrayValidator from './lib/ArrayValidator';
import ObjectValidator from './lib/ObjectValidator';
import ValidationResult from './lib/ValidationResult';


export type {ValidatorOptions, CustomCheck, IgnoreWhen, RequiredCheck} from './lib/BaseValidator';

export type ValidationRules = Array<BaseValidator>;

export {
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