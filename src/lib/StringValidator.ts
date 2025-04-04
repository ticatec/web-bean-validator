import BaseValidator, {ValidatorOptions} from "./BaseValidator";
import ValidationResult from "./ValidationResult";
import i18n from "@ticatec/i18n";
import langRes from "../i18n_resource"

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
        super(field, options);
        this.minLen = options?.minLen;
        this.format = options?.format;
    }

    /**
     * 同时检查字符串是否为空
     * @param value
     * @protected
     */
    protected checkNullValue(value: string): boolean {
        return super.checkNullValue(value) || value.length == 0;
    }

    protected checkType(value: any): any {
        return typeof value == 'string' ? value.toString().trim() : null;
    }

    protected checkField(value: any, result: ValidationResult): boolean {
        if (this.minLen != null && value.length < this.minLen) {
            result.setError(this.field, i18n.getText('ticatec.validator.stringShortage', {
                field: this.name,
                length: value.length
            }, langRes.ticatec.validation.stringShortage));
            return false;
        }
        if (this.format != null && this.format.regex != null && value.match(this.format.regex) == null) {
            result.setError(this.field, this.format.message);
            return false;
        }
        return true;
    }

}