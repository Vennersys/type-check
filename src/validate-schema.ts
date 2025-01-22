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

  validate(value: T, model: Record<string, any>): ValidationResult {
    return this.rules.reduce(
      (result, rule) => {
        const { type, params, customFn } = rule;
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
          valid: result.valid && isValid,
          validationMessages: !isValid
            ? [...result.validationMessages, rule.message]
            : result.validationMessages,
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

export function evaluateSchema(schema: ValidationSchema): Record<string, any> {
  const result: Record<string, any> = {};

  for (const field in schema) {
    const validator = schema[field];
    const rules = validator.getRules();

    result[field] = rules.reduce((acc: Record<string, any>, rule) => {
      acc[rule.type] = {
        ...rule.params,
        validationMessages: rule.message,
      };
      return acc;
    }, {});
  }

  return result;
}

export function typeField<T>(typeName: string): Validator<T> {
  return new Validator<T>();
}
