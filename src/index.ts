type TypeAnalysis = {
  jsType: string;
  tsType: string;
};

export function checkType<T>(value: T): TypeAnalysis {
  // Handle null explicitly
  if (value === null) {
    return { jsType: "null", tsType: "null" };
  }

  // Handle arrays explicitly
  if (Array.isArray(value)) {
    return { jsType: "array", tsType: `Array<${checkArrayType(value)}>` };
  }

  // Use typeof for primitive types
  const type = typeof value;

  if (type === "object") {
    const objectType = Object.prototype.toString
      .call(value)
      .slice(8, -1)
      .toLowerCase();

    // Handle special objects
    switch (objectType) {
      case "date":
        return { jsType: "date", tsType: "Date" };
      case "regexp":
        return { jsType: "regexp", tsType: "RegExp" };
      case "map":
        return { jsType: "map", tsType: "Map<any, any>" };
      case "set":
        return { jsType: "set", tsType: "Set<any>" };
      default:
        return { jsType: "object", tsType: "Record<string, any>" };
    }
  }

  // For primitive types
  switch (type) {
    case "string":
      return { jsType: "string", tsType: "string" };
    case "number":
      return { jsType: "number", tsType: "number" };
    case "boolean":
      return { jsType: "boolean", tsType: "boolean" };
    case "undefined":
      return { jsType: "undefined", tsType: "undefined" };
    case "function":
      return { jsType: "function", tsType: "Function" };
    case "symbol":
      return { jsType: "symbol", tsType: "symbol" };
    default:
      return { jsType: "unknown", tsType: "unknown" };
  }
}

// Helper function to determine array element types
function checkArrayType(array: any[]): string {
  if (array.length === 0) {
    return "any"; // Empty arrays have no specific type
  }

  const elementTypes = new Set(array.map((item) => checkType(item).tsType));
  const unionType = [...elementTypes].join(" | "); // Join without extra parentheses
  return unionType; // Return the inferred type as a string
}
