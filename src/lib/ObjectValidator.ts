import BaseValidator, {ValidatorOptions} from "./BaseValidator";
import type ValidationResult from "./ValidationResult";
import NestValidator from "./NestValidator";


export interface ObjectValidatorOptions extends ValidatorOptions {
    rules?: Array<BaseValidator>;
}


export default class ObjectValidator extends NestValidator {

    protected rules?: Array<BaseValidator>;

    constructor(field: string, options?: ObjectValidatorOptions) {
        super(field, options);
        this.rules = options?.rules;
    }

    protected checkField(value: any, result: ValidationResult, obj: any): boolean {
        if (this.rules && this.rules.length > 0) {
            let r1 = this.validateObj(value, this.rules, obj);
            if (!r1.valid) {
                result.setError(this.field, r1.errors);
                return false;
            }
        }
        return true;
    }

    protected checkType(value: any): any {
        return typeof value === 'object' && value !== null && !Array.isArray(value) ? value : null;
    }

}