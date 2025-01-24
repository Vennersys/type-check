import { describe, it, expect } from "vitest";
import { typeField, Validator } from "../";

describe("typeField", () => {
  it("should return a Validator instance for a supported type", () => {
    const validator = typeField<string>("string");
    expect(validator).toBeInstanceOf(Validator);
  });

  it("should throw an error if typeName is not provided and cannot be inferred", () => {
    expect(() => typeField<any>()).toThrow("Cannot infer type name from T");
    expect(() => typeField<unknown>()).toThrow("Cannot infer type name from T");
    expect(() => typeField<undefined>()).toThrow(
      "Cannot infer type name from T"
    );
  });

  it("should throw an error for unsupported type names", () => {
    expect(() => typeField("unsupportedType")).toThrow(
      "Unsupported type: unsupportedType"
    );
  });

  it("should normalize and validate the type name case-insensitively", () => {
    const validator = typeField<string>("STRING");

    expect(validator).toBeInstanceOf(Validator);
  });
});
