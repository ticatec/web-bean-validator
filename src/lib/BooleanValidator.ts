import BaseValidator, {ValidatorOptions} from "./BaseValidator";

export default class BooleanValidator extends BaseValidator {

    constructor(field: string, options: ValidatorOptions) {
        super(field,options?.required == true, options.ignoreWhen, options.check);
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

}