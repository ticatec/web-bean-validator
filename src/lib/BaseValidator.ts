/**
 * 自定义检查
 */
import ValidationResult from "./ValidationResult";
import langRes from "../i18n_resource";
import i18n from "@ticatec/i18n";

export type CustomCheck = (value: any, data: any) => any;

/**
 * 忽略条件
 */
export type IgnoreWhen = (data: any) => boolean;

export interface ValidatorOptions {
    name?: string,
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
     * @param options
     * @protected
     */
    protected constructor(field: string, options: ValidatorOptions) {
        this.field = field;
        this.required = options.required == true;
        this.name = options.name ?? field;
        this.checkFun = options.check;
        this.ignoreWhen = options.ignoreWhen;
    }

    validate(data: any, result: ValidationResult, obj: any) {
        let ignore = this.ignoreWhen != null && this.ignoreWhen(obj);
        if (!ignore) {
            let value = this.extractFieldValue(data);
            if (this.checkNullValue(value)) {
                if (this.required) {
                    result.setError(this.field, i18n.getText('ticatec.validation.required', {field: this.name}, langRes.ticatec.validation.required));
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

}
