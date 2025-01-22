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
