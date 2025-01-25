import { RuleType, ValidationResult } from "../validation-types";

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

export function mapRule<T>(
  type: RuleType,
  message: string,
  value: T,
  model: Record<string, any>,
  params?: Record<string, any>,
  customFn?: (value: any, model: Record<string, any>) => boolean
): ValidationResult {
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
