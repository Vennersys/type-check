import { SupportedType } from "./supported-types";

export function checkJsType<T>(value: T): string {
  // Handle special cases explicitly
  if (value === null) return SupportedType.NULL;
  if (Array.isArray(value)) return SupportedType.ARRAY;

  // Use typeof for primitive types
  const type = typeof value;
  if (type !== SupportedType.OBJECT) return type;

  // Handle objects and special objects
  const objectType = Object.prototype.toString
    .call(value)
    .slice(8, -1)
    .toLowerCase();
  const specialObjects = new Set([
    SupportedType.DATE,
    SupportedType.REGEXP,
    SupportedType.MAP,
    SupportedType.SET,
  ]);

  return specialObjects.has(objectType) ? objectType : SupportedType.OBJECT;
}
