import BaseValidator from "./BaseValidator";
import ValidationResult from "./ValidationResult";

const validate = (data: any, rules: Array<BaseValidator>): ValidationResult => {
    let result = new ValidationResult();
    for (let rule of rules) {
        rule.validate(data, result, data);
    }
    return result;
}

export default {
    validate
}