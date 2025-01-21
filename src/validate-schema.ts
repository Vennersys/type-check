export type ValidationResult = {
  valid: boolean;
  validationMessages: string[];
};

export type FieldValidator<T> = {
  validate: (value: T, model: Record<string, any>) => ValidationResult;
};

export type ValidationSchema = Record<string, FieldValidator<any>>;

export class Validator<T> {
  private rules: ((
    value: T,
    model: Record<string, any>,
  ) => ValidationResult)[] = [];

  required(message: string): this {
    this.rules.push((value) => ({
      valid: value != null && value !== "",
      validationMessages: value == null || value === "" ? [message] : [],
    }));
    return this;
  }

  minLength(min: number, message: string): this {
    this.rules.push((value: T) => {
      const strValue = value as string;
      return {
        valid: strValue.length >= min,
        validationMessages: strValue.length < min ? [message] : [],
      };
    });
    return this;
  }

  maxLength(max: number, message: string): this {
    this.rules.push((value: T) => {
      const strValue = value as string;
      return {
        valid: strValue.length <= max,
        validationMessages: strValue.length > max ? [message] : [],
      };
    });
    return this;
  }

  custom(
    customFn: (value: T, model: Record<string, any>) => boolean,
    message: string,
  ): this {
    this.rules.push((value, model) => ({
      valid: customFn(value, model),
      validationMessages: customFn(value, model) ? [] : [message],
    }));
    return this;
  }

  validate(value: T, model: Record<string, any>): ValidationResult {
    return this.rules.reduce(
      (result, rule) => {
        const validation = rule(value, model);
        return {
          valid: result.valid && validation.valid,
          validationMessages: [
            ...result.validationMessages,
            ...validation.validationMessages,
          ],
        };
      },
      { valid: true, validationMessages: [] } as ValidationResult,
    );
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

export function typeField<T>(typeName: string): Validator<T> {
  return new Validator<T>();
}
