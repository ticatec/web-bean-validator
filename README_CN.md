# @ticatec/web-bean-validator

[![npm version](https://badge.fury.io/js/%40ticatec%2Fweb-bean-validator.svg)](https://badge.fury.io/js/%40ticatec%2Fweb-bean-validator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个功能强大的 TypeScript/JavaScript 基于规则的实体验证库，提供全面的边界检查功能。适用于表单验证、API 数据验证以及任何需要强大数据完整性检查的场景。

[中文文档](./README_CN.md) | [English Documentation](./README.md)

## 特性

- ✨ **类型安全**: 完整的 TypeScript 支持，包含全面的类型定义
- 🎯 **基于规则**: 声明式定义验证规则
- 🌐 **国际化**: 内置国际化支持
- 🔧 **可扩展**: 轻松创建自定义验证器
- 📦 **轻量级**: 最小化依赖
- 🎨 **灵活**: 支持条件验证和自定义检查

## 支持的验证器

| 验证器 | 描述 | 选项 |
|--------|------|------|
| `StringValidator` | 字符串验证，支持长度和格式检查 | `minLen`, `format` |
| `NumberValidator` | 数字验证，支持范围检查 | `minValue`, `maxValue` |
| `DateValidator` | 日期验证，支持范围和相对日期检查 | `from`, `to`, `maxDaysBefore`, `maxDaysAfter` |
| `BooleanValidator` | 布尔值验证，支持类型转换 | - |
| `EnumValidator` | 枚举验证 | `values` |
| `ArrayValidator` | 数组验证，支持长度和项目验证 | `minLen`, `maxLen`, `rules` |
| `ObjectValidator` | 对象验证，支持嵌套规则 | `rules` |

## 安装

```bash
npm install @ticatec/web-bean-validator
```

## 依赖

此包需要以下对等依赖：

```bash
npm install @ticatec/i18n dayjs
```

## 快速开始

### 基本用法

```typescript
import BeanValidator from '@ticatec/web-bean-validator';
import { StringValidator, NumberValidator } from '@ticatec/web-bean-validator';

// 定义验证规则
const rules = [
  new StringValidator('name', { 
    required: true, 
    minLen: 2,
    name: '姓名'
  }),
  new NumberValidator('age', { 
    required: true, 
    minValue: 0, 
    maxValue: 120,
    name: '年龄'
  })
];

// 验证数据
const data = { name: '张三', age: 25 };
const result = BeanValidator.validate(data, rules);

if (result.valid) {
  console.log('验证通过！');
} else {
  console.log('验证错误：', result.errors);
}
```

### 高级示例

#### 带格式的字符串验证

```typescript
import { StringValidator } from '@ticatec/web-bean-validator';

const emailValidator = new StringValidator('email', {
  required: true,
  name: '邮箱地址',
  format: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: '请输入有效的邮箱地址'
  }
});
```

#### 日期验证

```typescript
import { DateValidator } from '@ticatec/web-bean-validator';

const birthdateValidator = new DateValidator('birthdate', {
  required: true,
  name: '出生日期',
  maxDaysBefore: 36500, // 100年前
  to: new Date() // 不能是未来日期
});
```

#### 数组验证

```typescript
import { ArrayValidator, StringValidator } from '@ticatec/web-bean-validator';

const tagsValidator = new ArrayValidator('tags', {
  required: true,
  minLen: 1,
  maxLen: 5,
  name: '标签',
  rules: [
    new StringValidator('tag', { 
      required: true, 
      minLen: 2,
      name: '标签'
    })
  ]
});
```

#### 对象验证

```typescript
import { ObjectValidator, StringValidator, NumberValidator } from '@ticatec/web-bean-validator';

const addressValidator = new ObjectValidator('address', {
  required: true,
  name: '地址',
  rules: [
    new StringValidator('street', { required: true, name: '街道' }),
    new StringValidator('city', { required: true, name: '城市' }),
    new StringValidator('zipCode', { required: true, name: '邮政编码' })
  ]
});
```

#### 条件验证

```typescript
import { StringValidator } from '@ticatec/web-bean-validator';

const phoneValidator = new StringValidator('phone', {
  name: '电话号码',
  required: (data) => data.contactMethod === 'phone', // 仅当联系方式为电话时必填
  ignoreWhen: (data) => data.contactMethod === 'email' // 当联系方式为邮箱时忽略
});
```

#### 自定义验证

```typescript
import { StringValidator } from '@ticatec/web-bean-validator';

const passwordValidator = new StringValidator('password', {
  required: true,
  minLen: 8,
  name: '密码',
  check: (value, data) => {
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return '密码必须包含至少一个大写字母、一个小写字母和一个数字';
    }
    return null; // 无错误
  }
});
```

#### 完整表单示例

```typescript
import BeanValidator from '@ticatec/web-bean-validator';
import { 
  StringValidator, 
  NumberValidator, 
  DateValidator, 
  EnumValidator,
  BooleanValidator 
} from '@ticatec/web-bean-validator';

// 用户注册表单验证
const userRegistrationRules = [
  new StringValidator('username', {
    required: true,
    minLen: 3,
    name: '用户名',
    format: {
      regex: /^[a-zA-Z0-9_]+$/,
      message: '用户名只能包含字母、数字和下划线'
    }
  }),
  
  new StringValidator('email', {
    required: true,
    name: '邮箱',
    format: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '请输入有效的邮箱地址'
    }
  }),
  
  new StringValidator('password', {
    required: true,
    minLen: 8,
    name: '密码',
    check: (value) => {
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        return '密码必须包含大写字母、小写字母和数字';
      }
      return null;
    }
  }),
  
  new NumberValidator('age', {
    required: true,
    minValue: 13,
    maxValue: 120,
    name: '年龄'
  }),
  
  new EnumValidator('country', {
    required: true,
    name: '国家',
    values: ['CN', 'US', 'CA', 'UK', 'AU', 'DE', 'FR', 'JP']
  }),
  
  new BooleanValidator('agreeToTerms', {
    required: true,
    name: '同意条款',
    check: (value) => value === true ? null : '您必须同意使用条款'
  })
];

// 验证用户数据
const userData = {
  username: 'zhang_san',
  email: 'zhang@example.com',
  password: 'SecurePass123',
  age: 25,
  country: 'CN',
  agreeToTerms: true
};

const validationResult = BeanValidator.validate(userData, userRegistrationRules);

if (validationResult.valid) {
  console.log('用户注册数据验证通过！');
  // 继续注册流程...
} else {
  console.log('验证错误：', validationResult.errors);
  // 向用户显示错误...
}
```

## API 参考

### BaseValidator 选项

所有验证器都继承自 `BaseValidator` 并支持以下通用选项：

```typescript
interface ValidatorOptions {
  name?: string;                    // 错误消息中显示的名称
  required?: boolean | RequiredCheck; // 字段是否必填
  check?: CustomCheck;              // 自定义验证函数
  ignoreWhen?: IgnoreWhen;         // 跳过验证的条件
}

type RequiredCheck = (data: any) => boolean;
type CustomCheck = (value: any, data: any) => string | null;
type IgnoreWhen = (data: any) => boolean;
```

### ValidationResult

```typescript
class ValidationResult {
  valid: boolean;     // 验证是否通过
  errors: any;        // 包含字段错误的对象
}
```

## 错误消息和国际化

该库包含内置的错误消息，通过 `@ticatec/i18n` 包支持国际化。您可以通过提供自己的 i18n 资源来自定义错误消息。


### 语言包

```json
{
  "ticatec": {
    "validation": {
      "required": "请输入值",
      "stringShortage": "该值至少需要 {{length}} 个字符",
      "earliestDate": "该值不能早于 {{date}}",
      "finalDate": "该值不能晚于 {{date}}",
      "numberExceed": "该值不能超过 {{max}}",
      "numberShortage": "该值不能小于 {{min}}",
      "arrayExceed": "该值不能包含超过 {{length}} 条记录",
      "arrayShortage": "该值必须包含至少 {{length}} 条记录"
    }
  }
}
```

## 贡献

我们欢迎贡献！请查看我们的[贡献指南](CONTRIBUTING.md)了解详情。

## 许可证

此项目根据 MIT 许可证授权 - 请查看 [LICENSE](LICENSE) 文件了解详情。

## 支持

- 📄 [文档](https://github.com/ticatec/web-bean-validator#readme)
- 🐛 [报告问题](https://github.com/ticatec/web-bean-validator/issues)
- 💬 [讨论](https://github.com/ticatec/web-bean-validator/discussions)

## 更新日志

查看 [CHANGELOG.md](CHANGELOG.md) 了解每个版本的更改详情。