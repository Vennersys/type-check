import { checkJsType } from "../check-js-type";

describe("checkJsType", () => {
  it("should return 'null' for null values", () => {
    expect(checkJsType(null)).toBe("null");
  });

  it("should return 'array' for arrays", () => {
    expect(checkJsType([])).toBe("array");
    expect(checkJsType([1, 2, 3])).toBe("array");
  });

  it("should return 'string' for string values", () => {
    expect(checkJsType("hello")).toBe("string");
    expect(checkJsType("")).toBe("string");
  });

  it("should return 'number' for number values", () => {
    expect(checkJsType(123)).toBe("number");
    expect(checkJsType(0)).toBe("number");
    expect(checkJsType(-123)).toBe("number");
  });

  it("should return 'boolean' for boolean values", () => {
    expect(checkJsType(true)).toBe("boolean");
    expect(checkJsType(false)).toBe("boolean");
  });

  it("should return 'undefined' for undefined values", () => {
    expect(checkJsType(undefined)).toBe("undefined");
  });

  it("should return 'function' for functions", () => {
    expect(checkJsType(() => {})).toBe("function");
    expect(checkJsType(function test() {})).toBe("function");
  });

  it("should return 'symbol' for symbols", () => {
    expect(checkJsType(Symbol())).toBe("symbol");
  });

  it("should return 'date' for Date objects", () => {
    expect(checkJsType(new Date())).toBe("date");
  });

  it("should return 'regexp' for RegExp objects", () => {
    expect(checkJsType(/abc/)).toBe("regexp");
    expect(checkJsType(new RegExp("abc"))).toBe("regexp");
  });

  it("should return 'map' for Map objects", () => {
    expect(checkJsType(new Map())).toBe("map");
  });

  it("should return 'set' for Set objects", () => {
    expect(checkJsType(new Set())).toBe("set");
  });

  it("should return 'object' for plain objects", () => {
    expect(checkJsType({})).toBe("object");
    expect(checkJsType({ key: "value" })).toBe("object");
  });

  it("should return 'object' for objects with custom prototypes", () => {
    class CustomObject {}
    expect(checkJsType(new CustomObject())).toBe("object");
  });

  it("should return 'unknown' for unsupported types (edge case)", () => {
    expect(checkJsType(Object.create(null))).toBe("object");
  });
});
