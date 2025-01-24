import { describe, expect, it } from "vitest";
import { checkJsType } from "../check-js-type";
import { SupportedType } from "../supported-types";

describe("checkJsType", () => {
  it("should return 'null' for null values", () => {
    expect(checkJsType(null)).toBe(SupportedType.NULL);
  });

  it("should return 'array' for arrays", () => {
    expect(checkJsType([])).toBe(SupportedType.ARRAY);
    expect(checkJsType([1, 2, 3])).toBe(SupportedType.ARRAY);
  });

  it("should return 'string' for string values", () => {
    expect(checkJsType("hello")).toBe(SupportedType.STRING);
    expect(checkJsType("")).toBe(SupportedType.STRING);
  });

  it("should return 'number' for number values", () => {
    expect(checkJsType(123)).toBe(SupportedType.NUMBER);
    expect(checkJsType(0)).toBe(SupportedType.NUMBER);
    expect(checkJsType(-123)).toBe(SupportedType.NUMBER);
  });

  it("should return 'boolean' for boolean values", () => {
    expect(checkJsType(true)).toBe(SupportedType.BOOLEAN);
    expect(checkJsType(false)).toBe(SupportedType.BOOLEAN);
  });

  it("should return 'undefined' for undefined values", () => {
    expect(checkJsType(undefined)).toBe(SupportedType.UNDEFINED);
  });

  it("should return 'function' for functions", () => {
    expect(checkJsType(() => {})).toBe(SupportedType.FUNCTION);
    expect(checkJsType(function test() {})).toBe(SupportedType.FUNCTION);
  });

  it("should return 'symbol' for symbols", () => {
    expect(checkJsType(Symbol())).toBe(SupportedType.SYMBOL);
  });

  it("should return 'date' for Date objects", () => {
    expect(checkJsType(new Date())).toBe(SupportedType.DATE);
  });

  it("should return 'regexp' for RegExp objects", () => {
    expect(checkJsType(/abc/)).toBe(SupportedType.REGEXP);
    expect(checkJsType(new RegExp("abc"))).toBe(SupportedType.REGEXP);
  });

  it("should return 'map' for Map objects", () => {
    expect(checkJsType(new Map())).toBe(SupportedType.MAP);
  });

  it("should return 'set' for Set objects", () => {
    expect(checkJsType(new Set())).toBe(SupportedType.SET);
  });

  it("should return 'object' for plain objects", () => {
    expect(checkJsType({})).toBe(SupportedType.OBJECT);
    expect(checkJsType({ key: "value" })).toBe(SupportedType.OBJECT);
  });

  it("should return 'object' for objects with custom prototypes", () => {
    class CustomObject {}
    expect(checkJsType(new CustomObject())).toBe(SupportedType.OBJECT);
  });

  it("should return 'unknown' for unsupported types (edge case)", () => {
    expect(checkJsType(Object.create(null))).toBe(SupportedType.OBJECT);
  });
});
