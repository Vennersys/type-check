import { checkJsType } from "./check-js-type";
import { SupportedType } from "./supported-types";

export type DataValidations = {
  validEmail: () => boolean;
  validUkPostcode: () => boolean;
  validPhoneNumber: () => boolean;
};

export function checkDataType<T>(value: T): DataValidations {
  const dataValidationFunctions = {
    validEmail: () => {
      if (value === null) return false;
      if (checkJsType(value) !== SupportedType.STRING) return false;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value as string);
    },
    validUkPostcode: () => {
      if (value === null) return false;
      if (checkJsType(value) !== SupportedType.STRING) return false;
      const postcodeRegex =
        /^(?:[A-Z]{1,2}\d{1,2}[A-Z]? ?\d[A-Z]{2}|GIR ?0AA)$/i;
      return postcodeRegex.test(value as string);
    },
    validPhoneNumber: () => {
      if (value === null) return false;
      if (checkJsType(value) !== SupportedType.STRING) return false;
      const phoneRegex = /^\+?\d{10,15}$/; // Supports optional '+' and 10-15 digits
      return phoneRegex.test(value as string);
    },
  };

  return dataValidationFunctions;
}
