import { RuleType, ValidationResult } from "./validation-types";

function requiredCheck(value: any) {
  return value != null && value !== "" && value !== undefined;
}

function minLengthCheck(value: any, params?: Record<string, any>) {
  return (value as string).length >= params?.length;
}

function maxLengthCheck(value: any, params?: Record<string, any>) {
  return (value as string).length <= params?.length;
}

function minValueCheck(value: any, params?: Record<string, any>) {
  return (value as number) >= params?.size;
}

function maxValueCheck(value: any, params?: Record<string, any>) {
  return (value as number) <= params?.size;
}

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

  minValue(size: number, message: string): this {
    this.rules.push({
      type: RuleType.MIN_VALUE,
      params: { size },
      message,
    });
    return this;
  }

  maxValue(size: number, message: string): this {
    this.rules.push({
      type: RuleType.MAX_VALUE,
      params: { size },
      message,
    });
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

    switch (type) {
      case RuleType.CUSTOM:
        if (customFn) {
          isValid = customFn(value, model);
        }
        break;
      case RuleType.REQUIRED:
        isValid = requiredCheck(value);
        break;
      case RuleType.MIN_LENGTH:
        if (value != null) {
          isValid = minLengthCheck(value, params);
        }
        break;
      case RuleType.MAX_LENGTH:
        if (value != null) {
          isValid = maxLengthCheck(value, params);
        }
        break;
      case RuleType.MIN_VALUE:
        if (value != null) {
          isValid = minValueCheck(value, params);
        }
        break;
      case RuleType.MAX_VALUE:
        if (value != null) {
          isValid = maxValueCheck(value, params);
        }
        break;
      default:
        isValid = true;
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
