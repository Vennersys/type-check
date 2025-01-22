import { Validator } from "./validator";

export function typeField<T>(typeName: string): Validator<T> {
  return new Validator<T>();
}
