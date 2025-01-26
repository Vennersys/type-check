import { ValidatorBase } from "./validator-base";

export class Validator<T> extends ValidatorBase<T> {
  required(message: string): this {
    this.rules.push({
      type: "required",
      message,
      validationFunction: value =>
        value != null && value !== "" && value !== undefined,
    });
    return this;
  }

  minLength(length: number, message: string): this {
    this.rules.push({
      type: "minLength",
      params: { length },
      message,
      validationFunction: value => (value as string).length >= length,
    });
    return this;
  }

  maxLength(length: number, message: string): this {
    this.rules.push({
      type: "maxLength",
      params: { length },
      message,
      validationFunction: value => (value as string).length <= length,
    });
    return this;
  }

  minValue(size: number, message: string): this {
    this.rules.push({
      type: "minValue",
      params: { size },
      message,
      validationFunction: value => (value as number) >= size,
    });
    return this;
  }

  maxValue(size: number, message: string): this {
    this.rules.push({
      type: "maxValue",
      params: { size },
      message,
      validationFunction: value => (value as number) <= size,
    });
    return this;
  }

  custom(
    validationFunction: (value: T, model: Record<string, unknown>) => boolean,
    message: string
  ): this {
    this.rules.push({
      type: "custom",
      validationFunction: validationFunction,
      message,
    });
    return this;
  }
}
