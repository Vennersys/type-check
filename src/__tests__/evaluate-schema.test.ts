import { describe, expect, it } from "vitest";
import { evaluateSchema, typeField } from "../validation";
import { SupportedType } from "../supported-types";

describe("evaluateSchema", () => {
  it("returns an object with null values for all rules for an empty schema", () => {
    const schema = {};
    const model = {};

    const result = evaluateSchema(schema, model);

    expect(result).toEqual({});
  });

  it("includes satisfied required rules as valid: true", () => {
    const schema = {
      field1: typeField<string>(SupportedType.STRING).required(
        "This field is required."
      ),
    };

    const model = { field1: "Valid" }; // Field satisfies the `required` rule
    const result = evaluateSchema(schema, model);

    expect(result).toEqual({
      field1: {
        required: {
          validationMessages: "This field is required.",
          valid: true,
        },
        minLength: null,
        maxLength: null,
        custom: null,
      },
    });
  });

  it("includes unmet required rules as valid: false", () => {
    const schema = {
      field1: typeField<string>(SupportedType.STRING).required(
        "This field is required."
      ),
    };

    const model = { field1: "" }; // Field does not satisfy the `required` rule
    const result = evaluateSchema(schema, model);

    expect(result).toEqual({
      field1: {
        required: {
          validationMessages: "This field is required.",
          valid: false,
        },
        minLength: null,
        maxLength: null,
        custom: null,
      },
    });
  });

  it("includes satisfied minLength and maxLength rules as valid: true", () => {
    const schema = {
      field1: typeField<string>(SupportedType.STRING)
        .minLength(3, "Minimum length is 3.")
        .maxLength(5, "Maximum length is 5."),
    };

    const model = { field1: "Valid" }; // Field satisfies both rules
    const result = evaluateSchema(schema, model);

    expect(result).toEqual({
      field1: {
        required: null,
        minLength: {
          length: 3,
          validationMessages: "Minimum length is 3.",
          valid: true,
        },
        maxLength: {
          length: 5,
          validationMessages: "Maximum length is 5.",
          valid: true,
        },
        custom: null,
      },
    });
  });

  it("includes unmet minLength rules as valid: false and satisfied maxLength rules as valid: true", () => {
    const schema = {
      field1: typeField<string>(SupportedType.STRING)
        .minLength(3, "Minimum length is 3.")
        .maxLength(5, "Maximum length is 5."),
    };

    const model = { field1: "Hi" }; // Field satisfies maxLength but not minLength
    const result = evaluateSchema(schema, model);

    expect(result).toEqual({
      field1: {
        required: null,
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
      },
    });
  });

  it("includes satisfied custom rules as valid: true", () => {
    const schema = {
      field2: typeField<Date>(SupportedType.DATE).custom(
        (value, model) => value > new Date("2023-01-01"),
        "Date must be after 2023-01-01."
      ),
    };

    const model = { field2: new Date("2024-01-01") }; // Field satisfies the `custom` rule
    const result = evaluateSchema(schema, model);

    expect(result).toEqual({
      field2: {
        required: null,
        minLength: null,
        maxLength: null,
        custom: {
          validationMessages: "Date must be after 2023-01-01.",
          valid: true,
        },
      },
    });
  });

  it("includes unmet custom rules as valid: false", () => {
    const schema = {
      field2: typeField<Date>(SupportedType.DATE).custom(
        (value, model) => value > new Date("2023-01-01"),
        "Date must be after 2023-01-01."
      ),
    };

    const model = { field2: new Date("2022-12-31") }; // Field does not satisfy the `custom` rule
    const result = evaluateSchema(schema, model);

    expect(result).toEqual({
      field2: {
        required: null,
        minLength: null,
        maxLength: null,
        custom: {
          validationMessages: "Date must be after 2023-01-01.",
          valid: false,
        },
      },
    });
  });

  it("handles schemas with multiple fields and mixed results", () => {
    const schema = {
      field1: typeField<string>(SupportedType.STRING)
        .required("This field is required.")
        .minLength(3, "Minimum length is 3.")
        .maxLength(5, "Maximum length is 5."),
      field2: typeField<Date>(SupportedType.DATE).custom(
        (value, model) => value > new Date("2023-01-01"),
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
      },
      field2: {
        required: null,
        minLength: null,
        maxLength: null,
        custom: {
          validationMessages: "Date must be after 2023-01-01.",
          valid: false,
        },
      },
    });
  });

  it("handles a schema with no validation rules for a field", () => {
    const schema = {
      field1: typeField<string>(SupportedType.STRING),
    };

    const model = { field1: "Any value" }; // No rules to check
    const result = evaluateSchema(schema, model);

    expect(result).toEqual({
      field1: {
        required: null,
        minLength: null,
        maxLength: null,
        custom: null,
      },
    });
  });
});
