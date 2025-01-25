import { Validator } from "@/validation/validator/validator";
import { supportedTypes, SupportedType } from "@/type-checking";
import { checkTsType } from "@/type-checking";

export function typeField<T>(typeName?: string): Validator<T> {
  // Attempt to infer type name if not provided
  if (!typeName) {
    typeName = checkTsType(null as T);
    if (
      [SupportedType.UNDEFINED, SupportedType.NULL].includes(
        typeName as SupportedType
      )
    ) {
      throw new Error("Cannot infer type name from T");
    }
  }

  // Validate the type name
  const normalizedType = typeName.toLowerCase() as SupportedType;
  if (!supportedTypes.includes(normalizedType)) {
    throw new Error(`Unsupported type: ${typeName}`);
  }

  // Return the validator instance
  return new Validator<T>();
}
