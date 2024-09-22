import beanValidator from "./lib/BeanValidator";
import ObjectValidator from "./lib/ObjectValidator";
import StringValidator from "./lib/StringValidator";
import EnumValidator from "./lib/EnumValidator";
import NumberValidator from "./lib/NumberValidator";
import DateValidator from "./lib/DateValidator";
import ArrayValidator from "./lib/ArrayValidator";
import BooleanValidator from "./lib/BooleanValidator";
import BaseValidator from "./lib/BaseValidator";

export type ValidationRules = Array<BaseValidator>;

export {ObjectValidator, StringValidator, EnumValidator, NumberValidator, DateValidator, ArrayValidator, BooleanValidator}

export default beanValidator;