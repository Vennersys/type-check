import { RuleType, ValidationResult } from "../validation-types";
import { mapRule } from "./rules";

export class ValidatorBase<T> {
  rules: {
    type: RuleType;
    params?: Record<string, any>;
    message: string;
    customFn?: (value: T, model: Record<string, any>) => boolean;
  }[] = [];

  public evaluateRule(
    rule: {
      type: RuleType;
      params?: Record<string, any>;
      message: string;
      customFn?: (value: T, model: Record<string, any>) => boolean;
    },
    value: T,
    model: Record<string, any>
  ): { valid: boolean; validationMessages: string[] } {
    const { type, params, customFn, message } = rule;
    return mapRule(type, message, value, model, params, customFn);
  }

  validate(value: T, model: Record<string, any>): ValidationResult {
    return this.rules.reduce<ValidationResult>(
      (result, rule) => {
        const { valid, validationMessages } = this.evaluateRule(
          rule,
          value,
          model
        );
        return {
          valid: result.valid && valid,
          validationMessages: [
            ...result.validationMessages,
            ...validationMessages,
          ],
        };
      },
      { valid: true, validationMessages: [] } as ValidationResult
    );
  }

  getRules() {
    return this.rules;
  }
}
