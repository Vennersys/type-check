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

export class Validator<T> {
  private rules: {
    type: string;
    params?: Record<string, any>;
    message: string;
    customFn?: (value: T, model: Record<string, any>) => boolean;
  }[] = [];

  required(message: string): this {
    this.rules.push({ type: "required", message });
    return this;
  }

  minLength(length: number, message: string): this {
    this.rules.push({ type: "minLength", params: { length }, message });
    return this;
  }

  maxLength(length: number, message: string): this {
    this.rules.push({ type: "maxLength", params: { length }, message });
    return this;
  }

  custom(
    customFn: (value: T, model: Record<string, any>) => boolean,
    message: string,
  ): this {
    this.rules.push({ type: "custom", customFn, message });
    return this;
  }

  public evaluateRule(
    rule: {
      type: string;
      params?: Record<string, any>;
      message: string;
      customFn?: (value: T, model: Record<string, any>) => boolean;
    },
    value: T,
    model: Record<string, any>,
  ): { valid: boolean; validationMessages: string[] } {
    const { type, params, customFn, message } = rule;
    let isValid = true;

    if (type === "custom" && customFn) {
      isValid = customFn(value, model);
    } else if (type === "required") {
      isValid = value != null && value !== "" && value !== undefined;
    } else if (type === "minLength" && value != null) {
      isValid = (value as string).length >= params?.length;
    } else if (type === "maxLength" && value != null) {
      isValid = (value as string).length <= params?.length;
    }

    return {
      valid: isValid,
      validationMessages: isValid ? [] : [message],
    };
  }

  validate(value: T, model: Record<string, any>): ValidationResult {
    return this.rules.reduce(
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
      { valid: true as boolean, validationMessages: [] as string[] },
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

    const unmetRules = rules.reduce((acc: any, rule) => {
      const { valid, validationMessages } = validator.evaluateRule(
        rule,
        value,
        model,
      );

      if (!valid) {
        acc[rule.type] = {
          ...rule.params,
          validationMessages: validationMessages[0], // Assuming one message per rule
        };
      }

      return acc;
    }, {});

    if (Object.keys(unmetRules).length > 0) {
      result[field] = unmetRules;
    }
  }

  return result;
}

export function typeField<T>(typeName: string): Validator<T> {
  return new Validator<T>();
}
