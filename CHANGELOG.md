# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2026-09-05

### Added
- Integrated `@ticatec/i18n` v0.5.0 with resource proxies.
- Added comprehensive unit test suite using Vitest with 100% test statement coverage.
- Exported `BaseValidator`, `NestValidator`, and specific validator options TypeScript interfaces from main entry.
- Added helper methods `hasError(field)` and `getError(field)` to `ValidationResult`.

### Fixed
- Fixed parameter passing to `stringShortage` error message (`{length: minLen}`).
- Handled null / undefined arguments safely across all validator constructors and validate methods.
- Corrected return value of `ArrayValidator.checkField` and `ObjectValidator.checkField` to ensure proper custom check chaining.
- Improved date type parsing and invalid date detection in `DateValidator`.
- Refined numeric parsing in `NumberValidator` and boolean string parsing in `BooleanValidator`.
