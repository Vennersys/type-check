import { Validator } from "./validator";

export function typeField<T>(typeName: string): Validator<T> {
  const supportedTypes = [
    "string",
    "number",
    "boolean",
    "date",
    "object",
    "array",
    "function",
    "symbol",
  ];

  if (!supportedTypes.includes(typeName.toLowerCase())) {
    throw new Error(`Unsupported type: ${typeName}`);
  }

  return new Validator<T>();
}
