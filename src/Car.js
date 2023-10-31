import { Console } from "@woowacourse/mission-utils";
import { GAME_HELP } from "../constants/GAME_HELP.js";
import { CAR_VALIDATION } from "../constants/VALIDATION.js";
import { CAR_NAME_MAX_LENGTH } from "../constants/NUMBER.js";

const reg = /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

class Car {
  constructor() {
    this._carNameList = [];
  }

  async getInputCar() {
    const carName = await Console.readLineAsync(GAME_HELP.INPUT_CAR);
    this.carNameList = carName.split(",");
  }

  set carNameList(car) {
    car = car.map((carName) => carName.replace(/\s/g, ""));

    if (car.some((carName) => carName.length > CAR_NAME_MAX_LENGTH + 1)) {
      throw new Error(CAR_VALIDATION.LENGTH);
    }

    if (car.some((x) => x === "")) {
      throw new Error(CAR_VALIDATION.BLANK);
    }

    if (car.some((x) => reg.test(x))) {
      throw new Error(CAR_VALIDATION.SPECIAL_SYMBOL);
    }

    this._carNameList = car;
  }

  get carNameList() {
    return this._carNameList;
  }
}

export default Car;
