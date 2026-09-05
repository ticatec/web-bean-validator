import BaseValidator, {ValidatorOptions} from "./BaseValidator";
import ValidationResult from "./ValidationResult";

import i18nRes from "../i18nRes";

export interface NumberValidatorOptions extends ValidatorOptions {
    minValue?: number,  //最小值
    maxValue?: number,  //最大值
}


export default class NumberValidator extends BaseValidator {

    protected minValue: number;
    protected maxValue: number;

    constructor(field: string, options?: NumberValidatorOptions) {
        super(field, options);
        this.minValue = options?.minValue;
        this.maxValue = options?.maxValue;
    }

    protected checkField(value: any, result: ValidationResult): boolean {
        if (this.minValue != null && value < this.minValue) {
            result.setError(this.field, i18nRes.validation.numberShortage({min: this.minValue}));
            return false;
        }
        if (this.maxValue != null && value > this.maxValue) {
            result.setError(this.field, i18nRes.validation.numberExceed({max: this.maxValue}));
            return false;
        }
        return true;
    }

    protected checkType(value: any): any {
        if (typeof value === 'number') {
            return isNaN(value) ? null : value;
        }
        if (typeof value === 'string' && value.trim() !== '') {
            const num = Number(value.trim());
            return isNaN(num) ? null : num;
        }
        return null;
    }
}