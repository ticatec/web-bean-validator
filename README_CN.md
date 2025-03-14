# WebBean 校验工具

这是通过定义规则，自动完成实体的校验（边界检查的工具类）

[English](./README.md)

---

## 使用方法

```shell
npm i @ticatec/web-bean-validator
```

```typescript
import beanValidator from "@ticatec/web-bean-validator";
import {BaseValidator, StringValidator, NumberValidator, DateValidator, EnumValidator, ObjectValidator, ArrayValidator} from "@ticatec/entity-validator";

let rules: Array<BaseValidator> = [
    ]

let data = {}

let result = beanValidator.validate(data, rules);

```

---

## 校验器

### 通用的校验选项

```typescript

interface ValidatorOptions {
    required?: boolean,
    check?: CustomCheck, //自定义的校验函数,
    ignoreWhen?: IgnoreWhen  //条件成立时忽略
}
```

### 字符类型校验器

#### 构造方法

```typescript

interface StringValidatorOptions extends ValidatorOptions {
    minLen?: number,  //最小长度
    format?: {
        regex: RegExp, //正则表达式
        message: string //匹配失败信息
    }
}

new StringValidator(field, options);
```

### 数字类型校验器

#### 构造方法

```typescript
interface NumberValidatorOptions extends ValidatorOptions {
    minValue?: number,  //最小值
    maxValue?: number,  //最大值
}

new NumberValidator(field, options);
```


### 日期时间类型校验器

#### 构造方法

```typescript
interface DateValidatorOptions extends ValidatorOptions{
    from?: Date, //最早日期
    to?: Date,  //最迟日期
    maxDaysBefore?: number,  //往前最多的天数，0代表从今天开始
    maxDaysAfter?: number,  //往后最多的天数，0代表最后的日期是今天
}

new DateValidator(field, options);
```


### 枚举类型校验器

#### 构造方法

```typescript
interface EnumValidatorOptions extends ValidatorOptions {
    values: Array<any>; //枚举值
    check?: CustomCheck, //自定义的校验函数
}

new EnumValidator(field, options);
```


### 布尔类型校验器

#### 构造方法

```typescript
interface BooleanValidatorOptions extends ValidatorOptions {
}

new BooleanValidator(field, options);
```


### 对象类型校验器

#### 构造方法

```typescript
interface ObjectValidatorOptions extends ValidatorOptions {
    rules: Array<BaseValidator>;
}

new ObjectValidator(field, options);
```


### 数组类型校验器

#### 构造方法

```typescript
interface ArrayValidatorOptions extends ValidatorOptions {
    rules: Array<BaseValidator>;
    minLen?: number;
    maxLen?: number;
}

new ArrayValidator(field, options);
```

## 自定义检查方法

当需要特殊的检查方法，以上无法覆盖的时候，可以通过传入 check定义一个程序校验。

```ts
/**
 * value: 当前字段的值
 * data: 当前对象的值
 */
type CustomCheck = (value: any, data: any) => string | null;

//检查开始时间必须早于结束时间

let checkDate = (value: any, data: any) => {
    if (data.finished != null && value > data.finished) {
        return "结束时间不能早于开始时间"
    }
}

//检查一个数组中的编码唯一

let checkDuplicatedCode = (arr: any, data: any) => {
    if (new Set(arr.map(item => item.code)).size != arr.length) {
        return "设备中有重复的编码"
    }
}

```

---

## I18N支持

错误消息通过`@ticatec/i18n`支持国际化，更多信息请参考[i18n国际化](https://github.com/ticatec/i18n)

### 内置资源

```ts
import {cn_resource, en_resource} from "@ticatec/web-bean-validator"
```

* 英文资源

```ts
const en_resource = {
    ticatec: {
        validation: {
            required: `Please enter a value`,
            stringShortage: `Length must be at least {{length}} characters`,
            earliestDate: "Time cannot be earlier than {{date}}",
            finalDate: "The latest time cannot be later than {{date}}",
            numberExceed: `Value cannot exceed {{max}}`,
            numberShortage: `Value cannot be less than {{min}}`,
            arrayExceed: `Content exceeds {{length}} records`,
            arrayShortage: `Content cannot be less than {{length}} records`
        }
    }
}

export default en_resource;
```

* 中文资源
```ts
const cn_resource = {
    ticatec: {
        validation: {
            required: `请输入数值`,
            stringShortage: `长度至少{{length}}个字符`,
            earliestDate: "时间不能早于{{date}}",
            finalDate: "最后时间不能晚于{{date}}",
            numberExceed: `数值不能超过{{max}}`,
            numberShortage: `数值不能低于{{min}}`,
            arrayExceed: `内容超过了{{length}}个记录`,
            arrayShortage: `内容不能少于{{length}}个记录`
        }
    }
}

export default cn_resource;
```

---

## 示例

检查一个用户数据验证

```ts
import StringValidator from "./StringValidator";
import DateValidator from "./DateValidator";

let eduRules = [
    new DateValidator('start', {required: true,  maxDaysAfter: 0, check: (value: any, obj: any) => {
        //TODO 检查开始日期要遭遇结束日期
        }}),
    new DateValidator('end', {required: false, maxDaysAfter: 0 }),
    new StringValidator('name', {requried: true})
]

let userRules = [
    new StringValidator('name', {minLen: 2, required: true}),
    new StringValidator('username', {required: true, format: {regex: /^[a-zA-Z0-9_-]{4,}$/, message: '无效的用户名'}}),
    new DateValidator('birthday', {required: false, maxDaysAfter: 0}),
    new ArrayValidator('education', {required: true, minLen: 1, eduRules})
]
```

---

## 版权信息

Copyright © 2023 Ticatec。保留所有权利。

本类库遵循 MIT 许可证发布。有关许可证的详细信息，请参阅 [LICENSE](LICENSE) 文件。

## 联系方式

huili.f@gmail.com

https://github.com/ticatec/web-bean-validator