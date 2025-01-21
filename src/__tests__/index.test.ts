import { checkType } from "../check-type";

// Helper for dataType response
const dataType = {
  validEmail: expect.any(Function),
  validPhoneNumber: expect.any(Function),
  validUkPostcode: expect.any(Function),
};

describe("checkType with TypeScript types", () => {
  it("should return correct TypeScript types for primitives", () => {
    expect(checkType(42)).toEqual({
      jsType: "number",
      tsType: "number",
      dataType,
    });
    expect(checkType("hello")).toEqual({
      jsType: "string",
      tsType: "string",
      dataType,
    });
    expect(checkType(true)).toEqual({
      jsType: "boolean",
      tsType: "boolean",
      dataType,
    });
    expect(checkType(null)).toEqual({
      jsType: "null",
      tsType: "null",
      dataType,
    });
    expect(checkType(new Date())).toEqual({
      jsType: "date",
      tsType: "Date",
      dataType,
    });
  });

  it("should return correct TypeScript types for arrays", () => {
    expect(checkType([1, 2, 3])).toEqual({
      jsType: "array",
      tsType: "Array<number>",
      dataType,
    });
    expect(checkType(["a", "b"])).toEqual({
      jsType: "array",
      tsType: "Array<string>",
      dataType,
    });
    expect(checkType([1, "a", true])).toEqual({
      jsType: "array",
      tsType: "Array<number | string | boolean>",
      dataType,
    });
    expect(checkType([new Date()])).toEqual({
      jsType: "array",
      tsType: "Array<Date>",
      dataType,
    });
  });

  it("should return correct TypeScript types for objects", () => {
    expect(checkType({})).toEqual({
      jsType: "object",
      tsType: "Record<string, any>",
      dataType,
    });
    expect(checkType(new Date())).toEqual({
      jsType: "date",
      tsType: "Date",
      dataType,
    });
    expect(checkType(new Map())).toEqual({
      jsType: "map",
      tsType: "Map<any, any>",
      dataType,
    });
    expect(checkType(new Set())).toEqual({
      jsType: "set",
      tsType: "Set<any>",
      dataType,
    });
  });
});
