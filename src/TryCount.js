// import { Console } from "@woowacourse/mission-utils";
// import { GAME_HELP } from "../constants/GAME_HELP.js";
import { TRY_COUNT_VALIDATION } from "../constants/VALIDATION.js";
import { isZero, isNumber } from "../utils/validation.js";

class TryCount {
  #tryNumber = 0;
  constructor(tryNumber) {
    TryCount.validateTryCount(tryValue);
    this.#tryNumber = tryNumber;
  }

  // 만약 이렇게 tryNumber을 주입을 통해서 진행한다면 set은 필요없게 됩니다.
  // 이렇게 동작하게 된다면 TryCount는 사실상 validater만 사용하기 때문에 TryCount라는 역활은 사실 validater로 병합이 가능해집니다.
  // set tryNumber(tryValue) {
  //   this.#tryNumber = tryValue;
  // }

  get tryNumber() {
    return this.#tryNumber;
  }

  static validateTryCount(tryValue) {
    tryValue = Number(tryValue);

    if (isZero(tryValue)) {
      throw new Error(TRY_COUNT_VALIDATION.NOT_ZERO);
    }

    if (isNumber(tryValue)) {
      throw new Error(TRY_COUNT_VALIDATION.IS_NAN);
    }
  }
}

export default TryCount;
