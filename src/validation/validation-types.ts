export type ValidationResult = {
  valid: boolean;
  validationMessages: string[];
};

export type FieldValidator<T> = {
  validate: (value: T, model: Record<string, unknown>) => ValidationResult;
  getRules: () => {
    type: string;
    params?: Record<string, unknown>;
    message: string;
  }[];
};

export type ValidationSchema = Record<string, FieldValidator<unknown>>;

export enum RuleType {
  REQUIRED = "required",
  MIN_LENGTH = "minLength",
  MAX_LENGTH = "maxLength",
  MIN_VALUE = "minValue",
  MAX_VALUE = "maxValue",
  CUSTOM = "custom",
  IS_EMAIL = "isEmail",
  IS_POSTCODE = "isPostcode",
  IS_PHONE_NUMBER = "isPhoneNumber",
}
