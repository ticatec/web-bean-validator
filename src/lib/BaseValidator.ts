/**
 * 自定义检查
 */
import ValidationResult from "./ValidationResult";
import {i18nUtils} from "@ticatec/i18n";
import i18nRes from "../i18nRes";

export type CustomCheck = (value: any, data: any) => any;

/**
 * 忽略条件
 */
export type IgnoreWhen = (data: any) => boolean;

/**
 * 根据条件检查是否为必须
 */
export type RequiredCheck = (data: any) => boolean;

export interface ValidatorOptions {
    name?: string,
    required?: boolean | RequiredCheck | null,
    check?: CustomCheck | null,
    ignoreWhen?: IgnoreWhen
}


export default abstract class BaseValidator {

    readonly field: string;
    protected options: ValidatorOptions;
    protected name: string;
    protected required: boolean | RequiredCheck;

    /**
     * 构建基础校验器
     * @param field
     * @param options
     * @protected
     */
    protected constructor(field: string, options: ValidatorOptions) {
        this.field = field;
        this.required = typeof options.required == 'function' ? options.required : options.required == true;
        this.name = options.name ?? field;
        this.options = options;
    }

    clone(options: ValidatorOptions) {
        const ctor = this.constructor as new (field: string, options: ValidatorOptions) => this;
        return new ctor(this.field, {...this.options, ...options});
    }

    validate(data: any, result: ValidationResult, obj: any) {
        if (this.options?.ignoreWhen?.(obj) != true) {
            let value = this.extractFieldValue(data);
            if (this.checkNullValue(value)) {
                let required = typeof this.required == "function" ? this.required(data) : this.required;
                if (required) {
                    result.setError(this.field, this.formatErrorMessage(i18nRes.validation.required, {field: this.name}));
                }
            } else {
                if (this.checkField(value, result, obj)) {
                    let checkError = this.options.check?.(value, obj);
                    if (checkError != null) {
                        result.setError(this.field, checkError);
                    }
                }
            }

        }
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
     * 检查是否为空
     * @protected
     */
    protected checkNullValue(value: string): boolean {
        return value == null;
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

    protected formatErrorMessage(message: string, params?: any) {
        return params ? i18nUtils.formatText(message, params) : message;
    }

}
