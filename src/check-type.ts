import { checkJsType } from "./check-js-type";
import { checkTsType } from "./check-ts-type";
import { type DataValidations, checkDataType } from "./check-data-type";

type TypeAnalysis = {
  jsType: string;
  tsType: string;
  dataType: DataValidations;
};

export function checkType<T>(value: T): TypeAnalysis {
  return {
    jsType: checkJsType(value),
    tsType: checkTsType(value),
    dataType: checkDataType(value),
  };
}
