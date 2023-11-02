import { Console } from "@woowacourse/mission-utils";
import { GAME_HELP } from "../constants/GAME_HELP.js";

export const Input = {
  async getInputCar() {
    const carName = await Console.readLineAsync(GAME_HELP.INPUT_CAR);
    return carName.split(",");
  },

  async getInputTry() {
    const tryNumber = await Console.readLineAsync(GAME_HELP.INPUT_TRY);
    return tryNumber;
  },
};

export const Output = {
  result() {
    Console.print(GAME_HELP.GAME_RESULT);
  },
  carRacingStatus(carStatus) {
    Console.print(`${carStatus.name} : ${carStatus.racing}`);
  },
  space() {
    Console.print(" ");
  },
  winner(winner) {
    Console.print(`${GAME_HELP.WINNER}${winner}`);
  },
};
