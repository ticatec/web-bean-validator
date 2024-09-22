import BaseValidator, {ValidatorOptions} from "./BaseValidator";
import {getMessage} from "./Locale";

export interface EnumValidatorOptions extends ValidatorOptions {
    values: Array<any>;
}


export default class EnumValidator extends BaseValidator {

    protected values: Array<any>;

    constructor(field: string, name: string,  options: EnumValidatorOptions) {
        super(field, name, options?.required == true, options.ignoreWhen, options.check);
        this.values = options.values;
    }

    protected checkType(value: any): any {
        return this.values.includes(value) ? value : null;
    }

    protected getErrorType(): string {
        return getMessage().INVALID_ENUM;
    }

}