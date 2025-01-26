# Validate Schema

## `validateSchema(schema: ValidationSchema, model: Record<string, unknown>): Record<string, ValidationResult>`

Validates a data model against a provided schema and returns a detailed result for each field.

---

### Parameters

- **`schema`**: `ValidationSchema`  
  An object where each key is a field name and each value is a `Validator` instance that defines validation rules for that field.

- **`model`**: `Record<string, unknown>`  
  The data model containing field values to validate.

---

### Returns

- **`Record<string, ValidationResult>`**:  
  A mapping of field names to their validation results. Each `ValidationResult` contains detailed information about the validation outcome for that field. It's intended to give an overall result for each field if valid or not.

---

### Validation Flow

1. Each field in the schema is validated against the corresponding value in the model using the `Validator` instance's `validate` method.
2. The result for each field is stored in the output object, keyed by the field name.
3. Fields present in the schema but not in the model will be evaluated with `undefined` as their value.

---

### Example

#### Schema Definition

```typescript
const schema: ValidationSchema = {
  field1: typeField<number>(SupportedType.NUMBER)
    .minValue(10, "Minimum value is 10.")
    .maxValue(20, "Maximum value is 20."),
};

const modelTooSmall = { field1: 5 };
const modelValid = { field1: 15 };
const modelTooLarge = { field1: 25 };

expect(validateSchema(schema, modelTooSmall).field1).toEqual({
  valid: false,
  validationMessages: ["Minimum value is 10."],
});

expect(validateSchema(schema, modelValid).field1).toEqual({
  valid: true,
  validationMessages: [],
});

expect(validateSchema(schema, modelTooLarge).field1).toEqual({
  valid: false,
  validationMessages: ["Maximum value is 20."],
});
```
