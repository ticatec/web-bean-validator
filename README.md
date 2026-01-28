# @ticatec/web-bean-validator

[![npm version](https://badge.fury.io/js/%40ticatec%2Fweb-bean-validator.svg)](https://badge.fury.io/js/%40ticatec%2Fweb-bean-validator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful TypeScript/JavaScript library for rule-based entity validation with comprehensive boundary checking. Perfect for form validation, API data validation, and any scenario requiring robust data integrity checks.

[中文文档](./README_CN.md) | [English Documentation](./README.md)

## Features

- ✨ **Type-Safe**: Full TypeScript support with comprehensive type definitions
- 🎯 **Rule-Based**: Define validation rules declaratively
- 🌐 **I18n Ready**: Built-in internationalization support
- 🔧 **Extensible**: Easy to create custom validators
- 📦 **Lightweight**: Minimal dependencies
- 🎨 **Flexible**: Support for conditional validation and custom checks

## Supported Validators

| Validator | Description | Options |
|-----------|-------------|---------|
| `StringValidator` | String validation with length and format checks | `minLen`, `format` |
| `NumberValidator` | Number validation with range checks | `minValue`, `maxValue` |
| `DateValidator` | Date validation with range and relative date checks | `from`, `to`, `maxDaysBefore`, `maxDaysAfter` |
| `BooleanValidator` | Boolean validation with type conversion | - |
| `EnumValidator` | Enumeration validation | `values` |
| `ArrayValidator` | Array validation with length and item validation | `minLen`, `maxLen`, `rules` |
| `ObjectValidator` | Object validation with nested rules | `rules` |

## Installation

```bash
npm install @ticatec/web-bean-validator
```

## Dependencies

This package requires the following peer dependencies:

```bash
npm install @ticatec/i18n dayjs
```

## Quick Start

### Basic Usage

```typescript
import BeanValidator from '@ticatec/web-bean-validator';
import { StringValidator, NumberValidator } from '@ticatec/web-bean-validator';

// Define validation rules
const rules = [
  new StringValidator('name', { 
    required: true, 
    minLen: 2,
    name: 'Full Name'
  }),
  new NumberValidator('age', { 
    required: true, 
    minValue: 0, 
    maxValue: 120,
    name: 'Age'
  })
];

// Validate data
const data = { name: 'John', age: 25 };
const result = BeanValidator.validate(data, rules);

if (result.valid) {
  console.log('Validation passed!');
} else {
  console.log('Validation errors:', result.errors);
}
```

### Advanced Examples

#### String Validation with Format

```typescript
import { StringValidator } from '@ticatec/web-bean-validator';

const emailValidator = new StringValidator('email', {
  required: true,
  name: 'Email Address',
  format: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  }
});
```

#### Date Validation

```typescript
import { DateValidator } from '@ticatec/web-bean-validator';

const birthdateValidator = new DateValidator('birthdate', {
  required: true,
  name: 'Birth Date',
  maxDaysBefore: 36500, // 100 years ago
  to: new Date() // Cannot be in the future
});
```

#### Array Validation

```typescript
import { ArrayValidator, StringValidator } from '@ticatec/web-bean-validator';

const tagsValidator = new ArrayValidator('tags', {
  required: true,
  minLen: 1,
  maxLen: 5,
  name: 'Tags',
  rules: [
    new StringValidator('tag', { 
      required: true, 
      minLen: 2,
      name: 'Tag'
    })
  ]
});
```

#### Object Validation

```typescript
import { ObjectValidator, StringValidator, NumberValidator } from '@ticatec/web-bean-validator';

const addressValidator = new ObjectValidator('address', {
  required: true,
  name: 'Address',
  rules: [
    new StringValidator('street', { required: true, name: 'Street' }),
    new StringValidator('city', { required: true, name: 'City' }),
    new StringValidator('zipCode', { required: true, name: 'ZIP Code' })
  ]
});
```

#### Conditional Validation

```typescript
import { StringValidator } from '@ticatec/web-bean-validator';

const phoneValidator = new StringValidator('phone', {
  name: 'Phone Number',
  required: (data) => data.contactMethod === 'phone', // Required only if contact method is phone
  ignoreWhen: (data) => data.contactMethod === 'email' // Ignore if contact method is email
});
```

#### Custom Validation

```typescript
import { StringValidator } from '@ticatec/web-bean-validator';

const passwordValidator = new StringValidator('password', {
  required: true,
  minLen: 8,
  name: 'Password',
  check: (value, data) => {
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    return null; // No error
  }
});
```

#### Complete Form Example

```typescript
import BeanValidator from '@ticatec/web-bean-validator';
import { 
  StringValidator, 
  NumberValidator, 
  DateValidator, 
  EnumValidator,
  BooleanValidator 
} from '@ticatec/web-bean-validator';

// User registration form validation
const userRegistrationRules = [
  new StringValidator('username', {
    required: true,
    minLen: 3,
    name: 'Username',
    format: {
      regex: /^[a-zA-Z0-9_]+$/,
      message: 'Username can only contain letters, numbers, and underscores'
    }
  }),
  
  new StringValidator('email', {
    required: true,
    name: 'Email',
    format: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address'
    }
  }),
  
  new StringValidator('password', {
    required: true,
    minLen: 8,
    name: 'Password',
    check: (value) => {
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        return 'Password must contain uppercase, lowercase, and number';
      }
      return null;
    }
  }),
  
  new NumberValidator('age', {
    required: true,
    minValue: 13,
    maxValue: 120,
    name: 'Age'
  }),
  
  new EnumValidator('country', {
    required: true,
    name: 'Country',
    values: ['US', 'CA', 'UK', 'AU', 'DE', 'FR', 'JP', 'CN']
  }),
  
  new BooleanValidator('agreeToTerms', {
    required: true,
    name: 'Terms Agreement',
    check: (value) => value === true ? null : 'You must agree to the terms'
  })
];

// Validate user data
const userData = {
  username: 'john_doe',
  email: 'john@example.com',
  password: 'SecurePass123',
  age: 25,
  country: 'US',
  agreeToTerms: true
};

const validationResult = BeanValidator.validate(userData, userRegistrationRules);

if (validationResult.valid) {
  console.log('User registration data is valid!');
  // Proceed with registration...
} else {
  console.log('Validation errors:', validationResult.errors);
  // Display errors to user...
}
```

## API Reference

### BaseValidator Options

All validators inherit from `BaseValidator` and support these common options:

```typescript
interface ValidatorOptions {
  name?: string;                    // Display name for error messages
  required?: boolean | RequiredCheck; // Whether field is required
  check?: CustomCheck;              // Custom validation function
  ignoreWhen?: IgnoreWhen;         // Condition to skip validation
}

type RequiredCheck = (data: any) => boolean;
type CustomCheck = (value: any, data: any) => string | null;
type IgnoreWhen = (data: any) => boolean;
```

### ValidationResult

```typescript
class ValidationResult {
  valid: boolean;     // Whether validation passed
  errors: any;        // Object containing field errors
}
```

## Error Messages & Internationalization

The library includes built-in error messages that support internationalization through the `@ticatec/i18n` package. You can customize error messages by providing your own i18n resources.

### Resource json file

```json
{
  "ticatec": {
    "validation": {
      "required": "Please enter a value",
      "stringShortage": "The value must be at least {{length}} characters long",
      "earliestDate": "The value cannot be earlier than {{date}}",
      "finalDate": "The value cannot be later than {{date}}",
      "numberExceed": "The value cannot exceed {{max}}",
      "numberShortage": "The value cannot be less than {{min}}",
      "arrayExceed": "The value cannot contain more than {{length}} records",
      "arrayShortage": "The value must contain at least {{length}} records"
    }
  }
}
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📄 [Documentation](https://github.com/ticatec/web-bean-validator#readme)
- 🐛 [Report Issues](https://github.com/ticatec/web-bean-validator/issues)
- 💬 [Discussions](https://github.com/ticatec/web-bean-validator/discussions)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for details about changes in each version.