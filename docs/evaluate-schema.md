# Evaluate Schema

## `evaluateSchema<T>(schema: Record<string, Validator<unknown>>, model: Record<string, unknown>): Record<string, unknown>`

Evaluates a given data model against a validation schema and provides detailed results for each field.

---

### Parameters

- **`schema`**: `Record<string, Validator<unknown>>`  
  The validation schema defining the rules for each field.

- **`model`**: `Record<string, unknown>`  
  The data model containing the fields and their values to validate.

---

### Returns

- **`Record<string, unknown>`**:  
  A structured result where each field in the schema or model is represented. Each field contains validation details for every rule type in the schema. In contrast to the standard validate this allows form fields to indicate field level validation errors and rules such as required, min/max length, regardless of the result.

---

### Evaluation Details

1. **Field Validation**:

   - Each field in the schema is evaluated using its associated rules from the `Validator` instance.
   - For each rule type (e.g., `required`, `minLength`), the following details are returned:
     - **`params`**: Additional parameters defined for the rule (if any).
     - **`validationMessages`**: The validation message for the rule.
     - **`valid`**: A boolean indicating whether the rule passed validation.

2. **Unhandled Fields**:

   - Any fields present in the `model` but not defined in the `schema` are included in the result.
   - For these fields, all rule types are set to `null`.

3. **Rule Defaults**:
   - If a rule type is not explicitly set for a field, its result is marked as `null`.

---

### Example

#### Schema Definition

```typescript
const schema = {
  field1: typeField<string>(SupportedType.STRING)
    .required("This field is required.")
    .minLength(3, "Minimum length is 3.")
    .maxLength(5, "Maximum length is 5."),
  field2: typeField<Date>(SupportedType.DATE).custom(
    value => value > new Date("2023-01-01"),
    "Date must be after 2023-01-01."
  ),
};

const model = {
  field1: "Hi", // Fails `minLength`
  field2: new Date("2022-12-31"), // Fails `custom` rule
};

const result = evaluateSchema(schema, model);

expect(result).toEqual({
  field1: {
    required: {
      validationMessages: "This field is required.",
      valid: true,
    },
    minLength: {
      length: 3,
      validationMessages: "Minimum length is 3.",
      valid: false,
    },
    maxLength: {
      length: 5,
      validationMessages: "Maximum length is 5.",
      valid: true,
    },
    custom: null,
    maxValue: null,
    minValue: null,
    isEmail: null,
    isPhoneNumber: null,
    isPostcode: null,
  },
  field2: {
    required: null,
    minLength: null,
    maxLength: null,
    custom: {
      validationMessages: "Date must be after 2023-01-01.",
      valid: false,
    },
    maxValue: null,
    minValue: null,
    isEmail: null,
    isPhoneNumber: null,
    isPostcode: null,
  },
});
```
