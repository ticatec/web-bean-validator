import BaseValidator, {ValidatorOptions} from "./BaseValidator";
import ValidationResult from "./ValidationResult";
import {getMessage} from "./Locale";
import beanValidator from "./BeanValidator";


export interface ArrayValidatorOptions extends ValidatorOptions {
    rules?: Array<BaseValidator>;
    minLen?: number;
    maxLen?: number;
}

export default class ArrayValidator extends BaseValidator {

    protected rules: Array<BaseValidator>;
    protected minLen: number;
    protected maxLen: number;

    constructor(field: string, name: string,  options: ArrayValidatorOptions) {
        super(field, name, options?.required == true, options.ignoreWhen, options.check);
        this.rules = options?.rules;
        this.minLen = options?.minLen;
        this.maxLen = options?.maxLen;
    }

    protected checkField(arr: Array<any>, result: ValidationResult, prefix: string): boolean {
        let valid = true;
        if (this.minLen != null && arr.length < this.minLen) {
            result.appendError(this.formatMessage(getMessage().ARRAY_SHORTAGE, prefix, this.minLen));
            valid = false;
        } else if (this.maxLen != null && arr.length > this.maxLen) {
            result.appendError(this.formatMessage(getMessage().ARRAY_EXCEED, prefix, this.maxLen));
            valid = false;
        }
        if (this.rules && arr.length > 0) {
            arr.forEach((item, idx) => {
                let label = `${this.getFieldLabel(prefix)}`;
                let vr = beanValidator.validate(item, this.rules, `${label}[${idx}]`);
                result.combine(vr);
                valid = vr.valid && valid;
            });
        }
        return valid;
    }

    protected checkType(value: any): any {
        return Array.isArray(value) ? value : null;
    }

    protected getErrorType(): string {
        return getMessage().INVALID_ARRAY;
    }

}