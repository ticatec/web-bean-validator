import BaseValidator, {ValidatorOptions} from "./BaseValidator";
import ValidationResult from "./ValidationResult";
import {getMessage} from "./Locale";

export interface NumberValidatorOptions extends ValidatorOptions {
    minValue?: number,  //最小值
    maxValue?: number,  //最大值
}


export default class NumberValidator extends BaseValidator {

    protected minValue: number;
    protected maxValue: number;

    constructor(field: string, name: string,  options: NumberValidatorOptions = null) {
        super(field, name, options.required == true, options.ignoreWhen, options.check);
        this.minValue = options?.minValue;
        this.maxValue = options?.maxValue;
    }

    protected checkField(value: any, result: ValidationResult, prefix: string): boolean {
        if (this.minValue != null && value < this.minValue) {
            result.appendError(this.formatMessage(getMessage().NUMBER_SHORTAGE, prefix, this.minValue));
            return false;
        }
        if (this.maxValue != null && value > this.maxValue) {
            result.appendError(this.formatMessage(getMessage().NUMBER_EXCEED, prefix, this.maxValue));
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

    protected getErrorType(): string {
        return getMessage().INVALID_NUMBER;
    }

}