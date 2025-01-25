import { RuleType } from "../validation-types";
import { ValidatorBase } from "./validator-base";

interface IStringValidations {
  minLength(length: number, message: string): this;
  maxLength(length: number, message: string): this;
}

interface IGlobalValidations {
  required(message: string): this;
  custom(
    customFn: (value: any, model: Record<string, any>) => boolean,
    message: string
  ): this;
}

interface INumberValidations {
  minValue(size: number, message: string): this;
  maxValue(size: number, message: string): this;
}

export class Validator<T>
  extends ValidatorBase<T>
  implements IStringValidations, IGlobalValidations, INumberValidations
{
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
}
