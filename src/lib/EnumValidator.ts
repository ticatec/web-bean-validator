import BaseValidator, {ValidatorOptions} from "./BaseValidator";


export interface EnumValidatorOptions extends ValidatorOptions {
    values: Array<any>;
}


export default class EnumValidator extends BaseValidator {

    protected values: Array<any>;

    constructor(field: string, options: EnumValidatorOptions) {
        super(field, options?.required == true, options.ignoreWhen, options.check);
        this.values = options.values;
    }

    protected checkType(value: any): any {
        return this.values.includes(value) ? value : null;
    }
}