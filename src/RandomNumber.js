import { MissionUtils } from "@woowacourse/mission-utils";

class RandomNumber {
  getRandomNumber() {
    const randomNumber = MissionUtils.Random.pickNumberInRange(0, 9);
    return randomNumber;
  }
}

export default RandomNumber;