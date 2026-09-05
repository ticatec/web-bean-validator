import BaseValidator, {ValidatorOptions} from "./BaseValidator";
import type ValidationResult from "./ValidationResult";
import dayjs from "dayjs";
import i18nRes from "../i18nRes";


export interface DateValidatorOptions extends ValidatorOptions {
    from?: Date,
    to?: Date,
    maxDaysBefore?: number,  //最早开始的天数
    maxDaysAfter?: number,  //最后开始的天数
}

const formatDate = (d: string | Date, dateFmt: string = 'YYYY-MM-DD') => {
    return dayjs(d).format(dateFmt)
}


export default class DateValidator extends BaseValidator {

    protected from: Date;
    protected to: Date;
    protected maxDaysBefore: number;
    protected maxDaysAfter: number;

    constructor(field: string, options?: DateValidatorOptions) {
        super(field, options);
        this.from = options?.from;
        this.to = options?.to;
        this.maxDaysAfter = options?.maxDaysAfter;
        this.maxDaysBefore = options?.maxDaysBefore;
    }

    protected checkField(value: any, result: ValidationResult): boolean {
        let now = (new Date()).getTime();
        let latestDate = this.maxDaysAfter != null ? new Date(now + (this.maxDaysAfter + 1) * 86400000) : this.to;
        let earliestDate = this.maxDaysBefore != null ? new Date(now - this.maxDaysBefore * 86400000) : this.from;
        if (earliestDate && earliestDate > value) {
            result.setError(this.field, i18nRes.validation.earliestDate({date: formatDate(earliestDate)}));
            return false;
        }
        if (latestDate && latestDate < value) {
            result.setError(this.field, i18nRes.validation.finalDate({date: formatDate(latestDate)}));
            return false;
        }
        return true;
    }

    protected checkType(value: any): any {
        if (value instanceof Date) {
            return isNaN(value.getTime()) ? null : value;
        }
        if (typeof value === "string" || typeof value === "number") {
            const d = new Date(value);
            return isNaN(d.getTime()) ? null : d;
        }
        return null;
    }


}