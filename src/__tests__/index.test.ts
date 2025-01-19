import { checkType } from "../index";

describe("checkType with TypeScript types", () => {
  test("should return correct TypeScript types for primitives", () => {
    expect(checkType(42)).toEqual({ jsType: "number", tsType: "number" });
    expect(checkType("hello")).toEqual({ jsType: "string", tsType: "string" });
    expect(checkType(true)).toEqual({ jsType: "boolean", tsType: "boolean" });
    expect(checkType(null)).toEqual({ jsType: "null", tsType: "null" });
  });

  test("should return correct TypeScript types for arrays", () => {
    expect(checkType([1, 2, 3])).toEqual({
      jsType: "array",
      tsType: "Array<number>",
    });
    expect(checkType(["a", "b"])).toEqual({
      jsType: "array",
      tsType: "Array<string>",
    });
    expect(checkType([1, "a", true])).toEqual({
      jsType: "array",
      tsType: "Array<number | string | boolean>",
    });
  });

  test("should return correct TypeScript types for objects", () => {
    expect(checkType({})).toEqual({
      jsType: "object",
      tsType: "Record<string, any>",
    });
    expect(checkType(new Date())).toEqual({ jsType: "date", tsType: "Date" });
    expect(checkType(new Map())).toEqual({
      jsType: "map",
      tsType: "Map<any, any>",
    });
    expect(checkType(new Set())).toEqual({ jsType: "set", tsType: "Set<any>" });
  });
});
