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

    constructor(field: string, options: NumberValidatorOptions = null) {
        super(field, options);
        this.minValue = options?.minValue;
        this.maxValue = options?.maxValue;
    }

    protected checkField(value: any, result: ValidationResult): boolean {
        if (this.minValue != null && value < this.minValue) {
            result.setError(this.field, this.formatErrorMessage(i18nRes.validation.numberShortage, {
                field: this.name,
                min: this.minValue
            }));
            return false;
        }
        if (this.maxValue != null && value > this.maxValue) {
            result.setError(this.field, this.formatErrorMessage(i18nRes.validation.numberExceed, {
                field: this.name,
                max: this.maxValue
            }));
            return false;
        }
        return true;
    }

    protected checkType(value: any): any {
        if (!isNaN(value) && typeof value == "string") {
            value = parseFloat(value);
        }
        return isNaN(value) ? null : value;
    }
}