export enum SupportedType {
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
  DATE = "date",
  OBJECT = "object",
  ARRAY = "array",
  FUNCTION = "function",
  SYMBOL = "symbol",
  UNDEFINED = "undefined",
  NULL = "null",
  REGEXP = "regexp",
  MAP = "map",
  SET = "set",
}

export const supportedTypes = Object.values(SupportedType);
