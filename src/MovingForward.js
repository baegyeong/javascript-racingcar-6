import { Console } from "@woowacourse/mission-utils";
import { GAME_HELP } from "../constants/GAME_HELP.js";
// 여기에서는 Car을 쓰지 않지만 들어가 있습니다. (최종적으로 제출할때에는 빼내는 것이 좋습니다
// import Car from "./Car.js";
import RandomNumber from "./RandomNumber.js";
import { Input, Output } from "./Input.js";

class MovingForward {
  // car에 대한 의존성을 끊었습니다. 대신 필요한 시점인 createRacingArray()일 때 주입하도록 하겠습니다.
  constructor() {
    this.racingArray = [];
  }

  #forwardOrStop() {
    return RandomNumber.getRandomNumber() > 3
      ? GAME_HELP.FORWARD
      : GAME_HELP.STOP;
  }

  createRacingArray(carNames) {
    // racing에 대한 결과 값으로서 ""만 저장하는 것보다 name도 같이 저장하면 좋을 것 같습니다.
    // racingArray라는 이름은 사실 Array의 관념적인 의미라서 racingStatus를 추천합니다.
    this.racingArray = carNames.map((name) => ({ name, racing: "" }));
    // 오 의미를 넣어서 잘 사용한 것 같습니다!!
    return this.racingArray;
  }

  #updateRacing(carIndex) {
    return (this.racingArray[carIndex].racing += this.#forwardOrStop());
  }

  async doOneCycleRacing() {
    this.racingArray.forEach((curStatus, i) => {
      this.#updateRacing(i);
      // 모두 Output으로 빼냈습니다.
      Output.carRacingStatus(curStatus);
    });
    Output.space();
    return this.racingArray;
  }
}

export default MovingForward;
