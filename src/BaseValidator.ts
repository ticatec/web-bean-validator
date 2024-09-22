/**
 * 自定义检查
 */
import ValidationResult from "./ValidationResult";
import {sprintf} from "sprintf-js";
import {getMessage} from "./Locale";

export type CustomCheck = (value: any, data: any, prefix: string) => any;

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
     * @param name
     * @param required
     * @param ignoreWhen
     * @param checkFun
     * @protected
     */
    protected constructor(field: string, name: string, required: boolean, ignoreWhen: IgnoreWhen = null, checkFun: CustomCheck = null) {
        this.field = field;
        this.name = name;
        this.required = required == true;
        this.checkFun = checkFun;
        this.ignoreWhen = ignoreWhen;
    }

    protected checkMandatory(value: any, result: ValidationResult, prefix) {
        if (this.required) {
            result.appendError(this.formatMessage(getMessage().REQUIRED, prefix));
        }
    }

    validate(data: any, result: ValidationResult, prefix: string = null) {
        let ignore = this.ignoreWhen != null && this.ignoreWhen(data);
        if (!ignore) {
            let value = this.extractFieldValue(data);
            if (value == null) {
                this.checkMandatory(value, result, prefix);
            } else {
                let tv = this.checkType(value);
                if (tv == null) {
                    result.appendError(this.formatMessage(this.getErrorType(), prefix))
                } else {
                    if (tv != value) {
                        value = tv;
                        this.setFieldValue(data, value);
                    }
                    if (this.checkField(value, result, prefix)) {
                        if (this.checkFun != null) {
                            let checkError = this.checkFun(value, data, prefix);
                            if (checkError != null) {
                                result.appendError(checkError);
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     *
     * @param message
     * @param prefix
     * @param params
     * @protected
     */
    protected formatMessage(message, prefix: string, ...params): string {
        let label = this.getFieldLabel(prefix)
        return sprintf(message, label, params);
    }

    /**
     * 检查字段的值
     * @param value
     * @param result
     * @param prefix
     * @protected
     */
    protected checkField(value: any, result: ValidationResult, prefix: string): boolean {
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
     * 获取错误类型
     * @protected
     */
    protected abstract getErrorType(): string;

    /**
     * 获取字段的名称
     * @param prefix
     * @protected
     */
    protected getFieldLabel(prefix: string): string {
        let label = this.name ?? this.field;
        if (prefix != null) {
            label = `${prefix}-${label}`;
        }
        return label;
    }

    /**
     * 从数据中提前字段值
     * @param data
     * @private
     */
    private extractFieldValue(data: any): any {
        let names = this.field.split(".");
        let result = data;
        names.forEach((attr) => {
            result = result == null ? result : result[attr];
        });
        return result;
    }

    /**
     * 设定字段值
     * @param data
     * @param value
     * @private
     */
    private setFieldValue(data: any, value: any) {
        let names = this.field.split(".");
        let current = data;
        for (let i = 0; i < names.length - 1; i++) {
            const key = names[i];
            if (!current[key]) {
                current[key] = {}; // 如果当前字段不存在，则创建一个空对象
            }
            current = current[key]; // 递归进入下一级
        }
        current[names[names.length - 1]] = value; // 设置最终的值
    }
}