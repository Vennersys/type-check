import { ValidationResult } from "../validation-types";

export class ValidatorBase<T> {
  rules: {
    type: string;
    params?: Record<string, unknown>;
    message: string;
    validationFunction?: (value: T, model: Record<string, unknown>) => boolean;
  }[] = [];

  public evaluateRule(
    rule: {
      type: string;
      params?: Record<string, unknown>;
      message: string;
      validationFunction?: (
        value: T,
        model: Record<string, unknown>
      ) => boolean;
    },
    value: T,
    model: Record<string, unknown>
  ): { valid: boolean; validationMessages: string[] } {
    const { validationFunction, message } = rule;
    const isValid = validationFunction
      ? validationFunction(value, model)
      : true;
    return {
      valid: isValid,
      validationMessages: isValid ? [] : [message],
    };
  }

  public validate(value: T, model: Record<string, unknown>): ValidationResult {
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

  public getRules() {
    return this.rules;
  }
}
