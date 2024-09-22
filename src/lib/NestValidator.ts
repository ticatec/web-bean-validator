import ValidationResult from "./ValidationResult";
import BaseValidator from "./BaseValidator";

export default abstract class NestValidator extends BaseValidator{

    protected validateObj(data: any, rules: Array<BaseValidator>, obj: any): ValidationResult {
        let result = new ValidationResult();
        for (let rule of rules) {
            rule.validate(data, result, obj);
        }
        return result;
    }
}