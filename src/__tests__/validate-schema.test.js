import { describe, expect, it } from "vitest";
import { validateSchema } from "../validation/validate-schema";
import { typeField } from "../validation/type-field";

describe("validateSchema with JavaScript types", () => {
  it("validates required fields", () => {
    const schema = {
      field1: typeField("string").required("This field is required."),
    };

    const model = {
      field1: "",
    };

    const result = validateSchema(schema, model);

    expect(result.field1).toEqual({
      valid: false,
      validationMessages: ["This field is required."],
    });
  });

  it("validates minLength and maxLength", () => {
    const schema = {
      field1: typeField("string")
        .minLength(3, "Minimum length is 3.")
        .maxLength(5, "Maximum length is 5."),
    };

    const modelTooShort = { field1: "ab" };
    const modelValid = { field1: "abc" };
    const modelTooLong = { field1: "abcdef" };

    expect(validateSchema(schema, modelTooShort).field1).toEqual({
      valid: false,
      validationMessages: ["Minimum length is 3."],
    });

    expect(validateSchema(schema, modelValid).field1).toEqual({
      valid: true,
      validationMessages: [],
    });

    expect(validateSchema(schema, modelTooLong).field1).toEqual({
      valid: false,
      validationMessages: ["Maximum length is 5."],
    });
  });

  it("validates custom rules", () => {
    const schema = {
      field2: typeField("date"),
      field4: typeField("date").custom(
        (value, model) => model.field2 >= value,
        "field2 must be more recent than field4"
      ),
    };

    const modelValid = {
      field2: new Date("2024-01-01"),
      field4: new Date("2023-12-31"),
    };

    const modelInvalid = {
      field2: new Date("2023-12-31"),
      field4: new Date("2024-01-01"),
    };

    expect(validateSchema(schema, modelValid).field4).toEqual({
      valid: true,
      validationMessages: [],
    });

    expect(validateSchema(schema, modelInvalid).field4).toEqual({
      valid: false,
      validationMessages: ["field2 must be more recent than field4"],
    });
  });

  it("validates multiple fields with mixed results", () => {
    const schema = {
      field1: typeField("string")
        .required("This field is required.")
        .maxLength(10, "Maximum length is 10."),
      field2: typeField("date").custom(
        (value, model) => value <= new Date(),
        "Date cannot be in the future."
      ),
    };

    const model = {
      field1: "TooLongStringHere",
      field2: new Date("2100-01-01"),
    };

    const result = validateSchema(schema, model);

    expect(result.field1).toEqual({
      valid: false,
      validationMessages: ["Maximum length is 10."],
    });

    expect(result.field2).toEqual({
      valid: false,
      validationMessages: ["Date cannot be in the future."],
    });
  });

  it("handles valid models", () => {
    const schema = {
      field1: typeField("string").required("This field is required."),
      field2: typeField("date"),
    };

    const model = {
      field1: "Valid",
      field2: new Date(),
    };

    const result = validateSchema(schema, model);

    expect(result.field1).toEqual({
      valid: true,
      validationMessages: [],
    });

    expect(result.field2).toEqual({
      valid: true,
      validationMessages: [],
    });
  });

  it("handles empty schema and model", () => {
    const schema = {};
    const model = {};

    const result = validateSchema(schema, model);

    expect(result).toEqual({});
  });

  it("handles a model with no matching schema", () => {
    const schema = {};
    const model = { field1: "Unused" };

    const result = validateSchema(schema, model);

    expect(result).toEqual({});
  });

  it("handles schema with no corresponding model fields", () => {
    const schema = {
      field1: typeField("string").required("This field is required."),
    };

    const model = {};

    const result = validateSchema(schema, model);

    expect(result.field1).toEqual({
      valid: false,
      validationMessages: ["This field is required."],
    });
  });
});
