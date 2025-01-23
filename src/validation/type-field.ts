import { Validator } from "./validator";
import { supportedTypes, SupportedType } from "../supported-types";

export function typeField<T>(typeName: string): Validator<T> {
  if (!typeName) {
    if (typeof (null as T) === SupportedType.STRING)
      typeName = SupportedType.STRING;
    else if (typeof (null as T) === SupportedType.NUMBER)
      typeName = SupportedType.NUMBER;
    else if (typeof (null as T) === SupportedType.BOOLEAN)
      typeName = SupportedType.BOOLEAN;
    else if ((null as T) instanceof Date) typeName = SupportedType.DATE;
    else if (Array.isArray(null as T)) typeName = SupportedType.ARRAY;
    else throw new Error("Cannot infer type name from T");
  }

  if (!typeName) throw new Error("Type name is required");

  if (!supportedTypes.includes(typeName.toLowerCase())) {
    throw new Error(`Unsupported type: ${typeName}`);
  }

  return new Validator<T>();
}
