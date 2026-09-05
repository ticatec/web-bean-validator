import BaseValidator, {ValidatorOptions} from "./BaseValidator";

export default class BooleanValidator extends BaseValidator {

    constructor(field: string, options?: ValidatorOptions) {
        super(field, options);
    }

    protected checkType(value: any): any {
        if (typeof value === 'boolean') {
            return value;
        }
        if (typeof value === "number") {
            return value !== 0;
        }
        if (typeof value === 'string') {
            let v = value.toLowerCase().trim();
            if (v === 'true' || v === '1') {
                return true;
            }
            if (v === 'false' || v === '0') {
                return false;
            }
        }
        return null;
    }

}