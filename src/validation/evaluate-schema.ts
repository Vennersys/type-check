import { Validator } from "./validator";
import { RuleType } from "./validation-types";

export function evaluateSchema(
  schema: Record<string, Validator<any>>,
  model: Record<string, any>,
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const field in schema) {
    const validator = schema[field];
    const value = model[field];
    const rules = validator.getRules();

    const fieldRules = Object.values(RuleType).reduce((acc: any, ruleType) => {
      const rule = rules.find((r) => r.type === ruleType);

      if (rule) {
        const { valid } = validator.evaluateRule(rule, value, model);
        acc[ruleType] = {
          ...(rule.params || null),
          validationMessages: rule.message,
          valid,
        };
      } else {
        acc[ruleType] = null; // Rule not set for this field
      }

      return acc;
    }, {});

    result[field] = fieldRules;
  }

  // Include fields in the model that are not in the schema
  for (const field in model) {
    if (!(field in result)) {
      result[field] = Object.values(RuleType).reduce((acc: any, ruleType) => {
        acc[ruleType] = null; // No rules applied
        return acc;
      }, {});
    }
  }

  return result;
}
