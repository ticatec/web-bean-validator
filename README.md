# WebBean Validation Tool

This is a tool class that automatically validates entities (boundary checking) by defining rules.

[中文文档](./README_CN.md)

---
## Usage

```shell
npm i @ticatec/web-bean-validator
```

```typescript
import beanValidator from "@ticatec/web-bean-validator";
import { BaseValidator, StringValidator, NumberValidator, DateValidator, EnumValidator, ObjectValidator, ArrayValidator } from "@ticatec/entity-validator";

let rules: Array<BaseValidator> = [
    // Define validation rules here
];

let data = {};

let result = beanValidator.validate(data, rules);
```

## Validators

### Common Validation Options

```typescript
interface ValidatorOptions {
    required?: boolean,
    check?: CustomCheck, // Custom validation function
    ignoreWhen?: IgnoreWhen  // Ignore validation when condition is met
}
```

### String Type Validator

#### Constructor

```typescript
interface StringValidatorOptions extends ValidatorOptions {
    minLen?: number,  // Minimum length
    format?: {
        regex: RegExp, // Regular expression
        message: string // Message for failed match
    }
}

new StringValidator(field, options);
```

### Number Type Validator

#### Constructor

```typescript
interface NumberValidatorOptions extends ValidatorOptions {
    minValue?: number,  // Minimum value
    maxValue?: number,  // Maximum value
}

new NumberValidator(field, options);
```

### Date/Time Type Validator

#### Constructor

```typescript
interface DateValidatorOptions extends ValidatorOptions {
    from?: Date, // Earliest date
    to?: Date,  // Latest date
    maxDaysBefore?: number,  // Maximum days before, 0 means starting from today
    maxDaysAfter?: number,  // Maximum days after, 0 means the latest date is today
}

new DateValidator(field, options);
```

### Enum Type Validator

#### Constructor

```typescript
interface EnumValidatorOptions extends ValidatorOptions {
    values: Array<any>; // Enum values
    check?: CustomCheck, // Custom validation function
}

new EnumValidator(field, options);
```

### Boolean Type Validator

#### Constructor

```typescript
interface BooleanValidatorOptions extends ValidatorOptions {
}

new BooleanValidator(field, options);
```

### Object Type Validator

#### Constructor

```typescript
interface ObjectValidatorOptions extends ValidatorOptions {
    rules: Array<BaseValidator>;
}

new ObjectValidator(field, options);
```

### Array Type Validator

#### Constructor

```typescript
interface ArrayValidatorOptions extends ValidatorOptions {
    rules: Array<BaseValidator>;
    minLen?: number;
    maxLen?: number;
}

new ArrayValidator(field, options);
```

## Custom Check Methods

When special validation methods are needed that the above cannot cover, you can define a programmatic check by passing a `check` function.

```ts
/**
 * value: The value of the current field
 * data: The value of the current object
 */
type CustomCheck = (value: any, data: any) => string | null;

// Check that the start time must be earlier than the end time
let checkDate = (value: any, data: any) => {
    if (data.finished != null && value > data.finished) {
        return "End time cannot be earlier than start time";
    }
};

// Check for unique codes in an array
let checkDuplicatedCode = (arr: any, data: any) => {
    if (new Set(arr.map(item => item.code)).size != arr.length) {
        return "There are duplicate codes in the devices";
    }
};
```
---
## I18N Support

Error messages support internationalization through `@ticatec/i18n`. For more information, please refer to [i18n Internationalization](https://github.com/ticatec/i18n).

### Built-in Resources

```ts
import {cn_resource, en_resource} from "@ticatec/web-bean-validator"
```

* English resources

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


* Chinese resources

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
## Example

Validate user data

```ts
import StringValidator from "./StringValidator";
import DateValidator from "./DateValidator";

let eduRules = [
    new DateValidator('start', { required: true, maxDaysAfter: 0, check: (value: any, obj: any) => {
        // TODO: Check that the start date is earlier than the end date
    }}),
    new DateValidator('end', { required: false, maxDaysAfter: 0 }),
    new StringValidator('name', { required: true })
];

let userRules = [
    new StringValidator('name', { minLen: 2, required: true }),
    new StringValidator('username', { required: true, format: { regex: /^[a-zA-Z0-9_-]{4,}$/, message: 'Invalid username' } }),
    new DateValidator('birthday', { required: false, maxDaysAfter: 0 }),
    new ArrayValidator('education', { required: true, minLen: 1, rules: eduRules })
];
```
---
## Copyright Information

Copyright © 2023 Ticatec. All rights reserved.

This library is released under the MIT License. For more details about the license, please refer to the [LICENSE](LICENSE) file.

---
## Contact Information

huili.f@gmail.com

https://github.com/ticatec/web-bean-validator

