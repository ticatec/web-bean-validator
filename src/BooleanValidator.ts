import BaseValidator, {ValidatorOptions} from "./BaseValidator";
import {getMessage} from "./Locale";

export default class BooleanValidator extends BaseValidator {

    constructor(field: string, name: string,  options: ValidatorOptions) {
        super(field, name, options?.required == true, options.ignoreWhen, options.check);
    }

    protected checkType(value: any): any {
        if (typeof value =="number") {
            return value != 0;
        } else if (typeof value == 'string') {
            let v = value.toLowerCase().trim();
            return v == 'true' || v == '1';
        } else if (typeof value == 'boolean') {
            return value;
        }
        return null;
    }

    protected getErrorType(): string {
        return getMessage().INVALID_BOOLEAN;
    }

}