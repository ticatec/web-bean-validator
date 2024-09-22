import BaseValidator from "./BaseValidator";
import ValidationResult from "./ValidationResult";

const validate = (data: any, rules: Array<BaseValidator>, prefix: string = null): ValidationResult => {
    let result = new ValidationResult();
    for (let rule of rules) {
        rule.validate(data, result, prefix);
    }
    return result;
}

export default {
    validate
}