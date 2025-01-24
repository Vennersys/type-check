import { checkJsType } from "@/type-checking";
import { checkTsType } from "@/type-checking";
import { type DataValidations, checkDataType } from "@/type-checking";

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
