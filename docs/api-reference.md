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

#### `custom(fn: (value: T, model: Record<string, any>) => boolean, message: string): Validator<T>`

Adds a custom validation rule.

---

### `validateSchema(schema: Record<string, Validator<any>>, model: Record<string, any>): Record<string, any>`

Validates the given data model against the schema.

- **Parameters**:

  - `schema`: The validation schema.
  - `model`: The data model to validate.

- **Returns**: A detailed validation result for each field.
