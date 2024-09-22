/**
 * 自定义检查
 */
import ValidationResult from "./ValidationResult";
import {sprintf} from "sprintf-js";
import {getMessage} from "./Locale";

export type CustomCheck = (value: any, data: any) => any;

/**
 * 忽略条件
 */
export type IgnoreWhen = (data: any) => boolean;

export interface ValidatorOptions {
    required?: boolean | null,
    check?: CustomCheck | null,
    ignoreWhen?: IgnoreWhen
}


export default abstract class BaseValidator {

    protected field: string;
    protected checkFun: CustomCheck;
    protected name: string;
    protected required: boolean;
    protected ignoreWhen: IgnoreWhen;

    /**
     * 构建基础校验器
     * @param field
     * @param required
     * @param ignoreWhen
     * @param checkFun
     * @protected
     */
    protected constructor(field: string, required: boolean, ignoreWhen: IgnoreWhen = null, checkFun: CustomCheck = null) {
        this.field = field;
        this.required = required == true;
        this.checkFun = checkFun;
        this.ignoreWhen = ignoreWhen;
    }

    validate(data: any, result: ValidationResult, obj: any) {
        let ignore = this.ignoreWhen != null && this.ignoreWhen(obj);
        if (!ignore) {
            let value = this.extractFieldValue(data);
            if (value == null) {
                if (this.required) {
                    result.setError(this.field, this.formatMessage(getMessage().REQUIRED));
                }
            } else if (this.checkField(value, result, obj)) {
                if (this.checkFun != null) {
                    let checkError = this.checkFun(value, obj);
                    if (checkError != null) {
                        result.setError(this.field, checkError);
                    }
                }
            }
        }
    }

    /**
     *
     * @param message
     * @param params
     * @protected
     */
    protected formatMessage(message: string, ...params): string {
        return sprintf(message, params);
    }

    /**
     * 检查字段的值
     * @param value
     * @param result
     * @param data
     * @protected
     */
    protected checkField(value: any, result: ValidationResult, data: any): boolean {
        return true;
    }

    /**
     * 检查字段的类型并转换成对应的值
     * @param value
     * @protected
     */
    protected checkType(value: any): any {
        return value;
    }

    /**
     * 获取字段的名称
     * @protected
     */
    protected getFieldLabel(): string {
        return this.name ?? this.field;
    }

    /**
     * 从数据中提前字段值
     * @param data
     * @private
     */
    private extractFieldValue(data: any): any {
        let value = data[this.field];
        if (value != null) {
            value = this.checkType(value);
        }
        return value;
    }

}
