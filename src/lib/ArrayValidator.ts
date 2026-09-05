import BaseValidator, {ValidatorOptions} from "./BaseValidator";
import type ValidationResult from "./ValidationResult";
import NestValidator from "./NestValidator";
import i18nRes from "../i18nRes";

export interface ArrayValidatorOptions extends ValidatorOptions {
    rules?: Array<BaseValidator>;
    minLen?: number;
    maxLen?: number;
}

export default class ArrayValidator extends NestValidator {

    protected rules?: Array<BaseValidator>;
    protected minLen?: number;
    protected maxLen?: number;

    constructor(field: string, options?: ArrayValidatorOptions) {
        super(field, options);
        this.rules = options?.rules;
        this.minLen = options?.minLen;
        this.maxLen = options?.maxLen;
    }

    protected checkField(arr: Array<any>, result: ValidationResult, data: any): boolean {
        if (this.minLen != null && arr.length < this.minLen) {
            result.setError(this.field, i18nRes.validation.arrayShortage({length: this.minLen}));
            return false;
        } else if (this.maxLen != null && arr.length > this.maxLen) {
            result.setError(this.field, i18nRes.validation.arrayExceed({length: this.maxLen}));
            return false;
        }
        if (this.rules && arr.length > 0) {
            let valid = true;
            let errList: any[] = [];
            arr.forEach((item) => {
                let vr = this.validateObj(item, this.rules, data);
                valid = valid && vr.valid;
                errList.push(vr.errors);
            });
            if (!valid) {
                result.setError(this.field, errList);
                return false;
            }
        }
        return true;
    }

    protected checkType(value: any): any {
        return Array.isArray(value) ? value : null;
    }

}