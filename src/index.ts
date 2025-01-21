import { checkJsType } from "./check-js-type";
import { checkTsType } from "./check-ts-type";

type TypeAnalysis = {
  jsType: string;
  tsType: string;
};

export function checkType<T>(value: T): TypeAnalysis {
  return { jsType: checkJsType(value), tsType: checkTsType(value) };
}
