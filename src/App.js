// import { Console } from "@woowacourse/mission-utils";
// import { GAME_HELP } from "../constants/GAME_HELP.js";
// import Car from "./Car.js";
// import TryCount from "./TryCount.js";
import RandomNumber from "./RandomNumber.js";
import MovingForward from "./MovingForward.js";
import Winner, { getWinnerName } from "./Winner.js";
import { Input, Output } from "./Input.js";
import { validateCarNameList, validateTryCount } from "../utils/validation.js";

// 추상화를 잘 해두어서 무슨 코드인지 한번에 확인할 수 있었던 것 같습니다.
// 특히 모든 로직을 App에서 제거하여 App이 무엇을 하는지 한눈에 알 수 있었던 것 같습니다.
// 그리고 이렇게 추상화를 잘 해두면 테스트하기도 좋습니다.
// 다만 아쉬운 것은 class를 너무 강제적으로 많이 사용하였고, Domain에 대해 조금 더 고민해보면 좋을 것 같습니다.
// 예를 들면 movingForward와 winner은 게임에서 Domain이라기에는 너무 기능적인 요소입니다. Game으로 합치면 어떨지 고민을 해봅니다.
// car와 tryCount에서 input의 경우에는 같은 레이어에 존재합니다. 이 레이러를 다양한 방법으로 나누지만, 여기서는 한 객체로 빼서 사용하는 것을 추천합니다.
// 여기서 문제! 이 바뀐 코드에서 DTO를 만들어 낼 수 있습니다!! 어디서 만들면 좋고, 어떻게 쓰면 좋을까요?
class App {
  tryNumber = 0;
  carNames = [];
  //요구사항이기 때문에 어쩔 수 없지만 이렇게 짜신 것은 이해합니다. 다만 아쉬운 점은 이렇게 짜면 테스트하기가 어렵습니다.
  //그 이유는 주입을 할 수 없기 때문입니다. 그래서 DI에 대해서 공부해보시면 좋을 것 같습니다.
  constructor() {
    // this.car = new Car();
    // this.tryCount = new TryCount();
    // this.randomNumber = new RandomNumber();
    this.movingForward = new MovingForward();
    // this.winner = new Winner(this.car, this.movingForward);
  }

  async play() {
    // get이라는 것은 개발자에 있어서 무언가를 원하기 때문에 사용하는 prefix로 사용합니다.
    // 그래서 이를 사용하고 싶다면 getInputCar에서 Car을 출력하던지 여기서는 carNames를 출력하는 것이 좋아 보입니다.
    const carNamesString = await Input.getInputCar();
    const { error: carNameError, value: carNames } =
      validateCarNameList(carNamesString);
    if (carNameError) {
      throw new Error(carNameError);
    }
    // 마찬가지로 Try을 받기 때문에 이를 받을 때 number또는 string을 받으면 좋을 것 같습니다.
    const tryString = await Input.getInputTry();
    const { error: gameTryError, value: tryNumber } =
      validateTryCount(tryString);
    if (gameTryError) {
      throw new Error(gameTryError);
    }

    // 의미론적으로 잘 나눈 것 같습니다.
    await this.playRacing(carNames, tryNumber);
  }

  async playRacing(carNames, tryNumber) {
    // 역활을 하나로 합쳤습니다
    Output.result();

    // createRacingArray는 async함수가 아닙니다. 물론 적어도 큰 차이는 없겠지만 가독성을 해칠 수 있으니 조심해서 사용하면 좋습니다.
    let racingArray = this.movingForward.createRacingArray(carNames);

    // 이 코드도 충분히 좋지만 가독성을 위해서 forEach로 변환하면 좋습니다.
    // 사실 lodash였으면 _.range()를 사용하는 것도 좋았을 것 같습니다.
    Array.from({ length: tryNumber }).forEach(async () => {
      racingArray = await this.movingForward.doOneCycleRacing();
    });

    // showWinner()은 또한 마찬가지로 async함수가 아닙니다.
    const winner = getWinnerName(racingArray);
    Output.winner(winner);
    // this.winner.showWinner();
  }
}

export default App;
