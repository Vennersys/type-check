export function checkTsType(value: any): string {
  if (value === null) return "null"; // Handle null explicitly
  if (Array.isArray(value)) return `Array<${checkArrayType(value)}>`; // Handle arrays explicitly

  const type = typeof value;
  if (type !== "object") return primitiveType(type); // Handle primitive types early

  // Handle objects and special objects
  const objectType = Object.prototype.toString
    .call(value)
    .slice(8, -1)
    .toLowerCase();
  const specialObjects: Record<string, string> = {
    date: "Date",
    regexp: "RegExp",
    map: "Map<any, any>",
    set: "Set<any>",
  };

  return specialObjects[objectType] || "Record<string, any>";
}

// Helper to determine array element types
function checkArrayType(array: any[]): string {
  if (array.length === 0) return "any"; // Empty arrays have no specific type

  const elementTypes = new Set(array.map(checkTsType)); // Infer types of elements
  return [...elementTypes].join(" | "); // Create a union of element types
}

// Helper to map primitive types
function primitiveType(type: string): string {
  const typeMap: Record<string, string> = {
    string: "string",
    number: "number",
    boolean: "boolean",
    undefined: "undefined",
    function: "Function",
    symbol: "symbol",
  };

  return typeMap[type] || "unknown";
}
