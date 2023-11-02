// import { Console } from "@woowacourse/mission-utils";
// import { GAME_HELP } from "../constants/GAME_HELP.js";
import { CAR_VALIDATION } from "../constants/VALIDATION.js";
import {
  isDuplicate,
  isCorrectNameLength,
  isBlank,
  isSpecialSymbol,
} from "../utils/validation.js";
import { removeWhiteSpace } from "../utils/string.js";

// 이 함수도 결국 validate와 carNameList만을 저장하고 있습니다. 역활이라기 보다는 함수로 빼낼 수 있어 보입니다.
class Car {
  #carNameList = [];
  constructor(names) {
    // _의 의미로서 private를 하는 것임을 알고 있지만 #을 사용하는 것이 javascript에서는 좋습니다.
    this.#carNameList = names;
  }

  set carNameList(car) {
    // 여기와 같은 경우에도 car의 string을 replace하는 곳으로 사실 의미를 부여하여 함수로 만드는 것이 좋습니다.
    // 또한 validate의 과정으로서 이를 만드는 것이 좋은 것 같습니다.
    // car = car.map((carName) => carName.replace(/\s/g, ""));
    Car.validateCarNameList(car);
    this.#carNameList = car;
  }

  get carNameList() {
    return this.#carNameList;
  }

  static validateCarNameList(car) {
    car = removeWhiteSpace(car);
    if (isDuplicate(car)) {
      throw new Error(CAR_VALIDATION.DUPLICATE);
    }

    if (isCorrectNameLength(car)) {
      throw new Error(CAR_VALIDATION.LENGTH);
    }

    if (isBlank(car)) {
      throw new Error(CAR_VALIDATION.BLANK);
    }

    if (isSpecialSymbol(car)) {
      throw new Error(CAR_VALIDATION.SPECIAL_SYMBOL);
    }
  }
}

export default Car;
