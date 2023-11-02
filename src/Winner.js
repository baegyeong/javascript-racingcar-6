import { Console } from "@woowacourse/mission-utils";
import { GAME_HELP } from "../constants/GAME_HELP.js";
// import Car from "./Car.js";
// import MovingForward from "./MovingForward.js";

// 이 위너는 너무 작습니다. 그래서 Game이라는 요소로 바꾸어서 하는 것이 좋을 것 같습니다.
// 여기서는 함수로 바꾸어서 표현하겠습니다.
export const getWinnerName = (racingArray) => {
  const racingScore = racingArray.map((value) => value.racing.length);
  const maxRacingScore = Math.max(...racingScore);
  const winnerNames = racingArray
    .filter((value) => value.racing.length === maxRacingScore)
    .map((value) => value.name);

  return winnerNames.join(", ");
};

class Winner {
  constructor(car, movingForward) {
    this.car = car;
    this.movingForward = movingForward;
  }

  #getWinner() {
    const racingScore = this.movingForward.racingArray.map(
      (hyphen) => hyphen.length
    );
    const maxRacingScore = Math.max(...racingScore);
    const winnerRacers = [];

    racingScore.forEach((length, index) => {
      if (length === maxRacingScore) {
        winnerRacers.push(index);
      }
    });

    const winnerRacersName = [
      ...winnerRacers.map((index) => this.car.carNameList[index]),
    ];

    return winnerRacersName.join(", ");
  }

  showWinner() {
    Console.print(`${GAME_HELP.WINNER}${this.#getWinner()}`);
  }
}

export default Winner;
