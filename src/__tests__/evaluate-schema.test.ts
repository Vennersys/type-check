import { Validator, evaluateSchema } from "../validate-schema";

describe("evaluateSchema", () => {
  it("returns an empty object for an empty schema", () => {
    const schema = {};
    const result = evaluateSchema(schema);

    expect(result).toEqual({});
  });

  it("introspects required fields", () => {
    const schema = {
      field1: new Validator<string>().required("This field is required."),
    };

    const result = evaluateSchema(schema);

    expect(result).toEqual({
      field1: {
        required: {
          validationMessages: "This field is required.",
        },
      },
    });
  });

  it("introspects minLength and maxLength", () => {
    const schema = {
      field1: new Validator<string>()
        .minLength(3, "Minimum length is 3.")
        .maxLength(5, "Maximum length is 5."),
    };

    const result = evaluateSchema(schema);

    expect(result).toEqual({
      field1: {
        minLength: {
          length: 3,
          validationMessages: "Minimum length is 3.",
        },
        maxLength: {
          length: 5,
          validationMessages: "Maximum length is 5.",
        },
      },
    });
  });

  it("introspects custom rules", () => {
    const schema = {
      field2: new Validator<Date>().custom(
        (value, model) => value > new Date("2023-01-01"),
        "Date must be after 2023-01-01.",
      ),
    };

    const result = evaluateSchema(schema);

    expect(result).toEqual({
      field2: {
        custom: {
          validationMessages: "Date must be after 2023-01-01.",
        },
      },
    });
  });

  it("handles schemas with multiple fields and mixed rules", () => {
    const schema = {
      field1: new Validator<string>()
        .required("This field is required.")
        .minLength(3, "Minimum length is 3.")
        .maxLength(5, "Maximum length is 5."),
      field2: new Validator<Date>().custom(
        (value, model) => value > new Date("2023-01-01"),
        "Date must be after 2023-01-01.",
      ),
    };

    const result = evaluateSchema(schema);

    expect(result).toEqual({
      field1: {
        required: {
          validationMessages: "This field is required.",
        },
        minLength: {
          length: 3,
          validationMessages: "Minimum length is 3.",
        },
        maxLength: {
          length: 5,
          validationMessages: "Maximum length is 5.",
        },
      },
      field2: {
        custom: {
          validationMessages: "Date must be after 2023-01-01.",
        },
      },
    });
  });

  it("handles a schema with no validation rules for a field", () => {
    const schema = {
      field1: new Validator<string>(),
    };

    const result = evaluateSchema(schema);

    expect(result).toEqual({
      field1: {},
    });
  });
});
