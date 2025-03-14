import BaseValidator, {ValidatorOptions} from "./BaseValidator";
import type ValidationResult from "./ValidationResult";
import NestValidator from "./NestValidator";
import i18n from "@ticatec/i18n";
import langRes from "../i18n_resource";

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
            result.setError(this.field, i18n.getText('ticatec.validation.arrayShortage', {length: this.minLen}, langRes.ticatec.validation.arrayShortage));
            return false;
        } else if (this.maxLen != null && arr.length > this.maxLen) {
            result.setError(this.field, i18n.getText('ticatec.validation.arrayShortage', {length: this.maxLen}, langRes.ticatec.validation.arrayExceed));
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