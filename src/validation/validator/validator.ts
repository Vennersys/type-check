import { ValidatorBase } from "./validator-base";

export class Validator<T> extends ValidatorBase<T> {
  required(message: string): this {
    this.rules.push({
      type: "required",
      message,
      customFn: value => value != null && value !== "" && value !== undefined,
    });
    return this;
  }

  minLength(length: number, message: string): this {
    this.rules.push({
      type: "minLength",
      params: { length },
      message,
      customFn: value => (value as string).length >= length,
    });
    return this;
  }

  maxLength(length: number, message: string): this {
    this.rules.push({
      type: "maxLength",
      params: { length },
      message,
      customFn: value => (value as string).length <= length,
    });
    return this;
  }

  minValue(size: number, message: string): this {
    this.rules.push({
      type: "minValue",
      params: { size },
      message,
      customFn: value => (value as number) >= size,
    });
    return this;
  }

  maxValue(size: number, message: string): this {
    this.rules.push({
      type: "maxValue",
      params: { size },
      message,
      customFn: value => (value as number) <= size,
    });
    return this;
  }

  custom(
    customFn: (value: T, model: Record<string, unknown>) => boolean,
    message: string
  ): this {
    this.rules.push({ type: "custom", customFn: customFn, message });
    return this;
  }
}
