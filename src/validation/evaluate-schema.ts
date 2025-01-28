import { Validator } from "./validator/validator";
import { RuleType } from "./validation-types";

export function evaluateSchema(
  schema: Record<string, Validator<unknown>>,
  model: Record<string, unknown>
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const field in schema) {
    const validator = schema[field];
    const value = model[field];
    const rules = validator.getRules();

    const fieldRules = Object.values(RuleType).reduce(
      (acc: Record<string, unknown>, ruleType) => {
        const rule = rules.find(r => r.type === ruleType);

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
      },
      {}
    );

    result[field] = fieldRules;
  }

  // Include fields in the model that are not in the schema
  for (const field in model) {
    if (!(field in result)) {
      result[field] = Object.values(RuleType).reduce(
        (acc: Record<string, unknown>, ruleType) => {
          acc[ruleType] = null; // No rules applied
          return acc;
        },
        {}
      );
    }
  }

  return result;
}
