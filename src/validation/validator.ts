import { RuleType, ValidationResult } from "./validation-types";

export class Validator<T> {
  private rules: {
    type: RuleType;
    params?: Record<string, any>;
    message: string;
    customFn?: (value: T, model: Record<string, any>) => boolean;
  }[] = [];

  required(message: string): this {
    this.rules.push({ type: RuleType.REQUIRED, message });
    return this;
  }

  minLength(length: number, message: string): this {
    this.rules.push({ type: RuleType.MIN_LENGTH, params: { length }, message });
    return this;
  }

  maxLength(length: number, message: string): this {
    this.rules.push({ type: RuleType.MAX_LENGTH, params: { length }, message });
    return this;
  }

  custom(
    customFn: (value: T, model: Record<string, any>) => boolean,
    message: string
  ): this {
    this.rules.push({ type: RuleType.CUSTOM, customFn, message });
    return this;
  }

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
    let isValid = true;

    if (type === RuleType.CUSTOM && customFn) {
      isValid = customFn(value, model);
    } else if (type === RuleType.REQUIRED) {
      isValid = value != null && value !== "" && value !== undefined;
    } else if (type === RuleType.MIN_LENGTH && value != null) {
      isValid = (value as string).length >= params?.length;
    } else if (type === RuleType.MAX_LENGTH && value != null) {
      isValid = (value as string).length <= params?.length;
    }

    return {
      valid: isValid,
      validationMessages: isValid ? [] : [message],
    };
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
