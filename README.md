# type-check

![License: MIT](https://img.shields.io/github/license/leewinter/type-check)
![Version](https://img.shields.io/github/package-json/v/leewinter/type-check)
![GitHub last commit](https://img.shields.io/github/last-commit/leewinter/type-check)
![GitHub pull requests](https://img.shields.io/github/issues-pr/leewinter/type-check)

# Validator Library

A lightweight and flexible JavaScript/TypeScript library for validating data structures with support for multiple data types, including strings, numbers, objects, arrays, functions, and symbols. This library provides a unified and extensible API for both runtime and compile-time validation.

---

## Features

- **Supports Multiple Types**: Validate strings, numbers, objects, arrays, functions, symbols, dates, and more.
- **Type Safety**: Full TypeScript support for type-safe validation.
- **Custom Rules**: Easily add custom validation rules.
- **Unified Interface**: A single API for both JavaScript and TypeScript usage.
- **Runtime Checks**: Ensure values conform to expected types during execution.
- **Comprehensive Feedback**: Provides detailed validation messages and statuses.

---

## Installation

Install the library via npm:

```bash
npm install your-validator-library
```

---

## Usage

### Importing the Library

#### JavaScript

```javascript
const { typeField } = require("your-validator-library");
```

#### TypeScript

```typescript
import { typeField } from "your-validator-library";
```

---

### Creating Validators

#### Strings

```typescript
const schema = {
  name: typeField<string>("string").required("Name is required."),
};
```

#### Numbers

```typescript
const schema = {
  age: typeField<number>("number")
    .required("Age is required.")
    .minLength(1, "Age must be at least 1."),
};
```

#### Objects

```typescript
const schema = {
  user: typeField<Record<string, any>>("object").required(
    "User object is required.",
  ),
};
```

#### Arrays

```typescript
const schema = {
  items: typeField<number[]>("array").required("Items are required."),
};
```

#### Functions

```typescript
const schema = {
  callback: typeField<() => void>("function").required(
    "Callback function is required.",
  ),
};
```

#### Symbols

```typescript
const schema = {
  uniqueId: typeField<symbol>("symbol").required("Unique ID is required."),
};
```

---

### Validating Data

Use `validateSchema` to validate your data model against the schema.

```typescript
import { validateSchema } from "your-validator-library";

const schema = {
  name: typeField<string>("string").required("Name is required."),
  age: typeField<number>("number").minLength(1, "Age must be at least 1."),
};

const model = {
  name: "",
  age: 0,
};

const result = validateSchema(schema, model);
console.log(result);
```

### Example Output

```json
{
  "name": {
    "required": {
      "validationMessages": "Name is required.",
      "valid": false
    },
    "minLength": null,
    "maxLength": null,
    "custom": null
  },
  "age": {
    "required": null,
    "minLength": {
      "length": 1,
      "validationMessages": "Age must be at least 1.",
      "valid": false
    },
    "maxLength": null,
    "custom": null
  }
}
```

---

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

#### `custom(fn: (value: T, model: Record<string, any>) => boolean, message: string): Validator<T>`

Adds a custom validation rule.

---

### `validateSchema(schema: Record<string, Validator<any>>, model: Record<string, any>): Record<string, any>`

Validates the given data model against the schema.

- **Parameters**:

  - `schema`: The validation schema.
  - `model`: The data model to validate.

- **Returns**: A detailed validation result for each field.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a pull request.

---

## License

This library is licensed under the [MIT License](LICENSE).

---

## Support

For any questions or issues, feel free to open an issue on [GitHub](https://github.com/your-repo/validator-library).
