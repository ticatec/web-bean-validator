import BaseValidator, {ValidatorOptions} from "./BaseValidator";
import ValidationResult from "./ValidationResult";
import {getMessage} from "./Locale";

interface StringFormat {
    regex: RegExp, //正则表达式
    message: string
}

export interface StringValidatorOptions extends ValidatorOptions {
    minLen?: number,  //最小长度
    maxLen?: number,  //最大长度
    format?: StringFormat
}

export default class StringValidator extends BaseValidator {

    protected maxLen: number;
    protected minLen: number;
    protected format: StringFormat;

    constructor(field: string, name: string,  options: StringValidatorOptions = null) {
        super(field, name, options?.required == true, options.ignoreWhen, options.check);
        this.minLen = options?.minLen;
        this.maxLen = options?.maxLen;
        this.format = options?.format;
    }

    protected checkType(value: any): any {
        return this.isValidString(value) ? value.toString().trim() : null;
    }

    protected getErrorType(): string {
        return getMessage().INVALID_STRING;
    }

    protected checkField(value: any, result: ValidationResult, prefix: string): boolean {
        if (this.required && value.length == 0) {
            result.appendError(this.formatMessage(getMessage().REQUIRED, prefix));
        }
        if (this.minLen != null && value.length < this.minLen) {
            result.appendError(this.formatMessage(getMessage().STRING_LENGTH_SHORTAGE, prefix, this.minLen));
            return false;
        }
        if (this.maxLen != null && value.length > this.maxLen) {
            result.appendError(this.formatMessage(getMessage().STRING_LENGTH_EXCEED, prefix, this.maxLen));
            return false;
        }
        if (this.format != null && this.format.regex != null && value.match(this.format.regex)==null) {
            let p = prefix == null ? '' : `${prefix} - `;
            result.appendError(`${p}${this.format.message}`);
            return false;
        }
        return true;
    }

    /**
     * 是不是一个有效的字符串
     * @param value
     * @protected
     */
    protected isValidString(value: any): boolean {
        let t = typeof value;
        return t == 'number' || t == 'string';
    }


}