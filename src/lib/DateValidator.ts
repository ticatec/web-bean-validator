import BaseValidator, {ValidatorOptions} from "./BaseValidator";
import type ValidationResult from "./ValidationResult";
import {getMessage} from "./Locale";

export interface DateValidatorOptions extends ValidatorOptions {
    from?: Date,
    to?: Date,
    maxDaysBefore?: number,  //最早开始的天数
    maxDaysAfter?: number,  //最后开始的天数
}


export default class DateValidator extends BaseValidator {

    protected from: Date;
    protected to: Date;
    protected maxDaysBefore: number;
    protected maxDaysAfter: number;

    constructor(field: string, options: DateValidatorOptions = null) {
        super(field, options.required == true, options.ignoreWhen, options.check);
        this.from = options?.from;
        this.to = options?.to;
        this.maxDaysAfter = options?.maxDaysAfter;
        this.maxDaysBefore = options?.maxDaysBefore;
    }

    protected checkField(value: any, result: ValidationResult): boolean {
        let now = (new Date()).getTime();
        let latestDate = this.maxDaysAfter != null ? new Date(now + this.maxDaysAfter * 86400000) : this.to;
        let earliestDate = this.maxDaysBefore != null ? new Date(now - this.maxDaysBefore * 8640000) : this.from;
        if (earliestDate && earliestDate > value) {
            result.setError(this.field, this.formatMessage(getMessage().EARLIEST_DATE, earliestDate.toDateString()));
            return false;
        }
        if (latestDate && latestDate < value) {
            result.setError(this.field, this.formatMessage(getMessage().FINAL_DATE, latestDate.toDateString()));
            return false;
        }
        return true;
    }

    protected checkType(value: any): any {
        if (typeof value == "string") {
            value = new Date(value);
        } else if (typeof value == "number") {
            value = new Date(value);
        }
        return value instanceof Date ? value : null;
    }


}