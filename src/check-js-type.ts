export function checkJsType(value: any): string {
  // Handle special cases explicitly
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";

  // Use typeof for primitive types
  const type = typeof value;
  if (type !== "object") return type;

  // Handle objects and special objects
  const objectType = Object.prototype.toString
    .call(value)
    .slice(8, -1)
    .toLowerCase();
  const specialObjects = new Set(["date", "regexp", "map", "set"]);

  return specialObjects.has(objectType) ? objectType : "object";
}
