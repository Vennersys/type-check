import { checkDataType } from "../check-data-type";

describe("checkDataType", () => {
  test("validEmail - valid email", () => {
    const result = checkDataType("test@example.com");
    expect(result.validEmail()).toBe(true);
  });

  test("validEmail - invalid email", () => {
    const result = checkDataType("invalid-email");
    expect(result.validEmail()).toBe(false);
  });

  test("validUkPostcode - valid postcode", () => {
    const result = checkDataType("SW1A 1AA");
    expect(result.validUkPostcode()).toBe(true);
  });

  test("validUkPostcode - short valid postcode", () => {
    const result = checkDataType("CV3 3HT");
    expect(result.validUkPostcode()).toBe(true);
  });

  test("validUkPostcode - invalid postcode", () => {
    const result = checkDataType("INVALID1");
    expect(result.validUkPostcode()).toBe(false);
  });

  test("validPhoneNumber - valid phone number", () => {
    const result = checkDataType("+447911123456");
    expect(result.validPhoneNumber()).toBe(true);
  });

  test("validPhoneNumber - invalid phone number", () => {
    const result = checkDataType("123-456-789");
    expect(result.validPhoneNumber()).toBe(false);
  });

  test("validPhoneNumber - null value", () => {
    const result = checkDataType(null);
    expect(result.validPhoneNumber()).toBe(false);
  });

  test("validEmail - null value", () => {
    const result = checkDataType(null);
    expect(result.validEmail()).toBe(false);
  });

  test("validUkPostcode - null value", () => {
    const result = checkDataType(null);
    expect(result.validUkPostcode()).toBe(false);
  });
});
