# WebBean校验工具

这是通过定义规则，自动完成实体的校验（边界检查的工具类）


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
    maxLen?: number,  //最大长度
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
    maxDaysBefore?: number,  //最早开始的天数
    maxDaysAfter?: number,  //最后开始的天数
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
