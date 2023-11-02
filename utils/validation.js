import { CAR_NAME_MAX_LENGTH } from "../constants/NUMBER.js";
import {
  CAR_VALIDATION,
  TRY_COUNT_VALIDATION,
} from "../constants/VALIDATION.js";
import { removeWhiteSpace } from "./string.js";

const reg = /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

export const isDuplicate = (arr) => {
  return arr.some(
    (element) => arr.indexOf(element) !== arr.lastIndexOf(element)
  );
};

export const isCorrectNameLength = (arr) => {
  return arr.some((element) => element.length > CAR_NAME_MAX_LENGTH + 1);
};

export const isBlank = (arr) => {
  return arr.some((element) => element === "");
};

export const isSpecialSymbol = (arr) => {
  return arr.some((element) => reg.test(element));
};

export const isZero = (value) => {
  return value < 1;
};

export const isNumber = (value) => {
  return isNaN(value);
};

export const validateTryCount = (tryValue) => {
  if (isZero(tryValue)) {
    return { value: tryValue, error: TRY_COUNT_VALIDATION.NOT_ZERO };
    // throw new Error(TRY_COUNT_VALIDATION.NOT_ZERO);
  }

  if (isNumber(tryValue)) {
    return { value: tryValue, error: TRY_COUNT_VALIDATION.IS_NAN };
    // throw new Error(TRY_COUNT_VALIDATION.IS_NAN);
  }
  return { value: Number(tryValue), error: null };
};

export const validateCarNameList = (car) => {
  car = removeWhiteSpace(car);
  if (isDuplicate(car)) {
    return { value: car, error: CAR_VALIDATION.DUPLICATE };
    // throw new Error(CAR_VALIDATION.DUPLICATE);
  }

  if (isCorrectNameLength(car)) {
    return { value: car, error: CAR_VALIDATION.LENGTH };
    // throw new Error(CAR_VALIDATION.LENGTH);
  }

  if (isBlank(car)) {
    return { value: car, error: CAR_VALIDATION.BLANK };
    // throw new Error(CAR_VALIDATION.BLANK);
  }

  if (isSpecialSymbol(car)) {
    return { value: car, error: CAR_VALIDATION.SPECIAL_SYMBOL };
    // throw new Error(CAR_VALIDATION.SPECIAL_SYMBOL);
  }
  return { value: car, error: null };
};
