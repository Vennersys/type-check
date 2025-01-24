import { describe, expect, it } from "vitest";
import { checkTsType } from "../check-ts-type";
import { SupportedType } from "../supported-types";

describe("checkTsType", () => {
  describe("Primitive types", () => {
    it("should return 'null' for null values", () => {
      expect(checkTsType(null)).toBe(SupportedType.NULL);
    });

    it("should return 'string' for string values", () => {
      expect(checkTsType("hello")).toBe(SupportedType.STRING);
      expect(checkTsType("")).toBe(SupportedType.STRING);
    });

    it("should return 'number' for number values", () => {
      expect(checkTsType(42)).toBe(SupportedType.NUMBER);
      expect(checkTsType(-42)).toBe(SupportedType.NUMBER);
      expect(checkTsType(0)).toBe(SupportedType.NUMBER);
    });

    it("should return 'boolean' for boolean values", () => {
      expect(checkTsType(true)).toBe(SupportedType.BOOLEAN);
      expect(checkTsType(false)).toBe(SupportedType.BOOLEAN);
    });

    it("should return 'undefined' for undefined values", () => {
      expect(checkTsType(undefined)).toBe(SupportedType.UNDEFINED);
    });

    it("should return 'Function' for functions", () => {
      expect(checkTsType(() => {})).toBe("Function");
      expect(checkTsType(function test() {})).toBe("Function");
    });

    it("should return 'symbol' for symbols", () => {
      expect(checkTsType(Symbol())).toBe(SupportedType.SYMBOL);
    });
  });

  describe("Array handling", () => {
    it("should return 'Array<any>' for empty arrays", () => {
      expect(checkTsType([])).toBe("Array<any>");
    });

    it("should return 'Array<string>' for arrays of strings", () => {
      expect(checkTsType(["hello", "world"])).toBe("Array<string>");
    });

    it("should return 'Array<number>' for arrays of numbers", () => {
      expect(checkTsType([1, 2, 3])).toBe("Array<number>");
    });

    it("should return 'Array<string | number>' for mixed arrays", () => {
      expect(checkTsType(["hello", 42])).toBe("Array<string | number>");
    });

    it("should return 'Array<null>' for arrays of null", () => {
      expect(checkTsType([null, null])).toBe("Array<null>");
    });

    it("should return 'Array<any>' for arrays with mixed types", () => {
      expect(checkTsType([null, "test", 42, true])).toBe(
        "Array<null | string | number | boolean>"
      );
    });
  });

  describe("Special objects", () => {
    it("should return 'Date' for Date objects", () => {
      expect(checkTsType(new Date())).toBe("Date");
    });

    it("should return 'RegExp' for RegExp objects", () => {
      expect(checkTsType(/test/)).toBe("RegExp");
      expect(checkTsType(new RegExp("test"))).toBe("RegExp");
    });

    it("should return 'Map<any, any>' for Map objects", () => {
      expect(checkTsType(new Map())).toBe("Map<any, any>");
    });

    it("should return 'Set<any>' for Set objects", () => {
      expect(checkTsType(new Set())).toBe("Set<any>");
    });
  });

  describe("Plain objects", () => {
    it("should return 'Record<string, any>' for plain objects", () => {
      expect(checkTsType({})).toBe("Record<string, any>");
      expect(checkTsType({ key: "value" })).toBe("Record<string, any>");
    });

    it("should return 'Record<string, any>' for objects with custom prototypes", () => {
      class CustomObject {}
      expect(checkTsType(new CustomObject())).toBe("Record<string, any>");
    });
  });

  describe("Edge cases", () => {
    it("should return 'unknown' for unsupported types", () => {
      const obj = Object.create(null); // Object without prototype
      expect(checkTsType(obj)).toBe("Record<string, any>");
    });
  });
});
