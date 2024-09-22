import BaseValidator, {ValidatorOptions} from "./BaseValidator";
import ValidationResult from "./ValidationResult";
import {getMessage} from "./Locale";
import beanValidator from "./BeanValidator";


export interface ObjectValidatorOptions extends ValidatorOptions {
    rules: Array<BaseValidator>;
}


export default class ObjectValidator extends BaseValidator {

    protected rules: Array<BaseValidator>;

    constructor(field: string, name: string,  options: ObjectValidatorOptions) {
        super(field, name, options?.required == true, options.ignoreWhen, options.check);
        this.rules = options?.rules;
    }

    protected checkField(value: any, result: ValidationResult, prefix: string): boolean {
        let r1 = beanValidator.validate(value, this.rules, this.getFieldLabel(prefix));
        result.combine(r1);
        return r1.valid;
    }

    protected getErrorType(): string {
        return getMessage().INVALID_OBJECT;
    }

}