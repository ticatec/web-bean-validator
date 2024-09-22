import BaseValidator, {ValidatorOptions} from "./BaseValidator";
import type ValidationResult from "./ValidationResult";
import {getMessage} from "./Locale";

interface StringFormat {
    regex: RegExp, //正则表达式
    message: string
}

export interface StringValidatorOptions extends ValidatorOptions {
    minLen?: number,  //最小长度
    format?: StringFormat
}

export default class StringValidator extends BaseValidator {

    protected minLen: number;
    protected format: StringFormat;

    constructor(field: string, options: StringValidatorOptions = null) {
        super(field, options?.required == true, options.ignoreWhen, options.check);
        this.minLen = options?.minLen;
        this.format = options?.format;
    }

    protected checkType(value: any): any {
        return typeof value == 'string' ? value.toString().trim() : null;
    }

    protected checkField(value: any, result: ValidationResult): boolean {
        if (this.minLen != null && value.length < this.minLen) {
            result.setError(this.field, this.formatMessage(getMessage().STRING_LENGTH_SHORTAGE, this.minLen));
            return false;
        }
        if (this.format != null && this.format.regex != null && value.match(this.format.regex)==null) {
            result.setError(this.field, this.format.message);
            return false;
        }
        return true;
    }

}