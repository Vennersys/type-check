import { describe, expect, it } from "vitest";
import { checkType } from "../check-type";
import { SupportedType } from "../supported-types";

// Helper for dataType response
const dataType = {
  validEmail: expect.any(Function),
  validPhoneNumber: expect.any(Function),
  validUkPostcode: expect.any(Function),
};

describe("checkType with TypeScript types", () => {
  it("should return correct TypeScript types for primitives", () => {
    expect(checkType(42)).toEqual({
      jsType: SupportedType.NUMBER,
      tsType: SupportedType.NUMBER,
      dataType,
    });
    expect(checkType("hello")).toEqual({
      jsType: SupportedType.STRING,
      tsType: SupportedType.STRING,
      dataType,
    });
    expect(checkType(true)).toEqual({
      jsType: SupportedType.BOOLEAN,
      tsType: SupportedType.BOOLEAN,
      dataType,
    });
    expect(checkType(null)).toEqual({
      jsType: SupportedType.NULL,
      tsType: SupportedType.NULL,
      dataType,
    });
    expect(checkType(new Date())).toEqual({
      jsType: SupportedType.DATE,
      tsType: "Date",
      dataType,
    });
  });

  it("should return correct TypeScript types for arrays", () => {
    expect(checkType([1, 2, 3])).toEqual({
      jsType: SupportedType.ARRAY,
      tsType: "Array<number>",
      dataType,
    });
    expect(checkType(["a", "b"])).toEqual({
      jsType: SupportedType.ARRAY,
      tsType: "Array<string>",
      dataType,
    });
    expect(checkType([1, "a", true])).toEqual({
      jsType: SupportedType.ARRAY,
      tsType: "Array<number | string | boolean>",
      dataType,
    });
    expect(checkType([new Date()])).toEqual({
      jsType: SupportedType.ARRAY,
      tsType: "Array<Date>",
      dataType,
    });
  });

  it("should return correct TypeScript types for objects", () => {
    expect(checkType({})).toEqual({
      jsType: SupportedType.OBJECT,
      tsType: "Record<string, any>",
      dataType,
    });
    expect(checkType(new Date())).toEqual({
      jsType: SupportedType.DATE,
      tsType: "Date",
      dataType,
    });
    expect(checkType(new Map())).toEqual({
      jsType: SupportedType.MAP,
      tsType: "Map<any, any>",
      dataType,
    });
    expect(checkType(new Set())).toEqual({
      jsType: SupportedType.SET,
      tsType: "Set<any>",
      dataType,
    });
  });
});
