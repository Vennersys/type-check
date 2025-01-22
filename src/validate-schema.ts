export type ValidationResult = {
  valid: boolean;
  validationMessages: string[];
};

export type FieldValidator<T> = {
  validate: (value: T, model: Record<string, any>) => ValidationResult;
  getRules: () => {
    type: string;
    params?: Record<string, any>;
    message: string;
  }[];
};

export type ValidationSchema = Record<string, FieldValidator<any>>;

export enum RuleType {
  REQUIRED = "required",
  MIN_LENGTH = "minLength",
  MAX_LENGTH = "maxLength",
  CUSTOM = "custom",
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

  custom(
    customFn: (value: T, model: Record<string, any>) => boolean,
    message: string,
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
    model: Record<string, any>,
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
          model,
        );
        return {
          valid: result.valid && valid,
          validationMessages: [
            ...result.validationMessages,
            ...validationMessages,
          ],
        };
      },
      { valid: true, validationMessages: [] } as ValidationResult,
    );
  }

  getRules() {
    return this.rules;
  }
}

export function validateSchema(
  schema: ValidationSchema,
  model: Record<string, any>,
): Record<string, ValidationResult> {
  const result: Record<string, ValidationResult> = {};
  for (const field in schema) {
    const validator = schema[field];
    const value = model[field];
    result[field] = validator.validate(value, model);
  }
  return result;
}

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

export function typeField<T>(typeName: string): Validator<T> {
  return new Validator<T>();
}
