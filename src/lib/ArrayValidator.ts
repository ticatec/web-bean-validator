import BaseValidator, {ValidatorOptions} from "./BaseValidator";
import type ValidationResult from "./ValidationResult";
import {getMessage} from "./Locale";
import beanValidator from "./BeanValidator";
import NestValidator from "./NestValidator";


export interface ArrayValidatorOptions extends ValidatorOptions {
    rules?: Array<BaseValidator>;
    minLen?: number;
    maxLen?: number;
}

export default class ArrayValidator extends NestValidator {

    protected rules: Array<BaseValidator>;
    protected minLen: number;
    protected maxLen: number;

    constructor(field: string, options: ArrayValidatorOptions) {
        super(field, options?.required == true, options.ignoreWhen, options.check);
        this.rules = options?.rules;
        this.minLen = options?.minLen;
        this.maxLen = options?.maxLen;
    }

    protected checkField(arr: Array<any>, result: ValidationResult, data: any): boolean {
        if (this.minLen != null && arr.length < this.minLen) {
            result.setError(this.field, this.formatMessage(getMessage().ARRAY_SHORTAGE, this.minLen));
            return false;
        } else if (this.maxLen != null && arr.length > this.maxLen) {
            result.setError(this.field, this.formatMessage(getMessage().ARRAY_EXCEED, this.maxLen));
            return  false;
        }
        if (this.rules && arr.length > 0) {
            let valid = true;
            let errList = [];
            arr.forEach((item, idx) => {
                let vr = this.validateObj(item, this.rules, data);
                valid = valid && vr.valid;
                errList.push(vr.errors);
            });
            if (!valid) {
                result.setError(this.field, errList);
            }
        }
    }

    protected checkType(value: any): any {
        return Array.isArray(value) ? value : null;
    }

}