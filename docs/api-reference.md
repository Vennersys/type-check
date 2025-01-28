## API Reference

### `typeField<T>(typeName: string): Validator<T>`

Creates a new validator for the specified type.

- **Parameters**:

  - `typeName`: A string representing the type (e.g., 'string', 'number', 'object', 'array', 'function', 'symbol').

- **Returns**: `Validator<T>`

---

### Validator Methods

#### `required(message: string): Validator<T>`

Marks the field as required.

#### `minLength(length: number, message: string): Validator<T>`

Sets a minimum length for the field (for strings, arrays, etc.).

#### `maxLength(length: number, message: string): Validator<T>`

Sets a maximum length for the field (for strings, arrays, etc.).

#### `minValue(value: number, message: string): Validator<T>`

Sets a minimum value for the field (for numbers).

#### `maxValue(value: number, message: string): Validator<T>`

Sets a maximum value for the field (for numbers).

#### `isEmail(message: string): Validator<T>`

Validates that the field is a valid email address.

#### `isPostcode(message: string): Validator<T>`

Validates that the field is a valid UK postcode.

#### `isPhoneNumber(message: string): Validator<T>`

Validates that the field is a valid phone number.

#### `custom(fn: (value: T, model: Record<string, any>) => boolean, message: string): Validator<T>`

Adds a custom validation rule.
