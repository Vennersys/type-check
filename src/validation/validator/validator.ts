import { ValidatorBase } from "./validator-base";
import { checkDataType } from "@/type-checking/check-data-type";
import { RuleType } from "@/validation/validation-types";

export class Validator<T> extends ValidatorBase<T> {
  required(message: string): this {
    this.rules.push({
      type: RuleType.REQUIRED,
      message,
      validationFunction: value =>
        value != null && value !== "" && value !== undefined,
    });
    return this;
  }

  minLength(length: number, message: string): this {
    this.rules.push({
      type: RuleType.MIN_LENGTH,
      params: { length },
      message,
      validationFunction: value => (value as string).length >= length,
    });
    return this;
  }

  maxLength(length: number, message: string): this {
    this.rules.push({
      type: RuleType.MAX_LENGTH,
      params: { length },
      message,
      validationFunction: value => (value as string).length <= length,
    });
    return this;
  }

  minValue(size: number, message: string): this {
    this.rules.push({
      type: RuleType.MIN_VALUE,
      params: { size },
      message,
      validationFunction: value => (value as number) >= size,
    });
    return this;
  }

  maxValue(size: number, message: string): this {
    this.rules.push({
      type: RuleType.MAX_VALUE,
      params: { size },
      message,
      validationFunction: value => (value as number) <= size,
    });
    return this;
  }

  isEmail(message: string): this {
    this.rules.push({
      type: RuleType.IS_EMAIL,
      message,
      validationFunction: value => checkDataType(value).validEmail(),
    });
    return this;
  }

  isPostcode(message: string): this {
    this.rules.push({
      type: RuleType.IS_POSTCODE,
      message,
      validationFunction: value => checkDataType(value).validUkPostcode(),
    });
    return this;
  }

  isPhoneNumber(message: string): this {
    this.rules.push({
      type: RuleType.IS_PHONE_NUMBER,
      message,
      validationFunction: value => checkDataType(value).validPhoneNumber(),
    });
    return this;
  }

  custom(
    validationFunction: (value: T, model: Record<string, unknown>) => boolean,
    message: string
  ): this {
    this.rules.push({
      type: RuleType.CUSTOM,
      validationFunction: validationFunction,
      message,
    });
    return this;
  }
}
