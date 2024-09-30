import Console from '@woowacourse/mission-utils';

class InvalidWinningNumberError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidWinningNumberError";
  }
}

class WinningNumbers {
  constructor() {
    this.winningNumbers = [];
    this.bonusNumber = null;
  }

  async getWinningNumbers() {
    this.winningNumbers = await this.#inputWinningNumbers();
    this.bonusNumber = await this.#inputBonusNumber();
  }

  async #inputWinningNumbers() {
    const input = await Console.readLineAsync("🎉 당첨 번호를 입력해 주세요! (쉼표로 구분해서 6개 입력해 주세요): ");

    this.#validateInputFormat(input); // 쉼표 형식 검증

    const numbers = input.split(',').map(num => num.trim());
    this.#validateWinningNumbers(numbers); // 당첨 번호 검증

    return [...new Set(numbers.map(num => parseInt(num)))]; // 중복 제거 후 반환
  }

  async #inputBonusNumber() {
    const input = await Console.readLineAsync("보너스 번호를 입력하세요: ");
    const bonusNumber = parseInt(input.trim());
    this.#validateBonusNumber(bonusNumber);
    return bonusNumber;
  }

  #validateInputFormat(input) {
    // 쉼표가 포함되지 않았는지 체크
    if (!input.includes(',')) {
      throw new InvalidWinningNumberError("❗️ 쉼표를 사용하여 숫자를 구분해 주세요!");
    }
  }

  #validateWinningNumbers(numbers) {
    if (numbers.length !== 6) {
      throw new InvalidWinningNumberError("❗️ 당첨 번호는 정확히 6개만 입력해 주세요!❗️");
    }

    if (numbers.some(num => num === "" || num.includes(' ') || !/^\d+$/.test(num))) {
      throw new InvalidWinningNumberError("❌ 숫자는 1에서 45 사이여야 해요! 다시 한 번 확인해주세요.");
    }

    const parsedNumbers = numbers.map(num => parseInt(num));

    if (parsedNumbers.some(num => isNaN(num) || num < 1 || num > 45)) {
      throw new InvalidWinningNumberError("🌟 모든 숫자는 1~45 사이의 양수만 입력해 주세요!");
    }

    const duplicates = parsedNumbers.filter((num, index) => parsedNumbers.indexOf(num) !== index);
    if (duplicates.length > 0) {
      throw new InvalidWinningNumberError(`🔁 중복된 숫자가 있네요! 중복 없이 6개 입력해보세요.`);
    }
  }

  #validateBonusNumber(bonusNumber) {
    if (bonusNumber < 1 || bonusNumber > 45 || isNaN(bonusNumber)) {
      throw new InvalidWinningNumberError("⚠️ 보너스 번호는 1 ~ 45 사이의 숫자여야 해요!");
    }
    if (this.winningNumbers.includes(bonusNumber)) {
      throw new InvalidWinningNumberError("🚫 보너스 번호는 당첨 번호와 중복되면 안 돼요!");
    }
  }

  displayWinningNumbers() {
    Console.print(`🎉 오늘의 행운 번호는: ${this.winningNumbers.join(', ')} 🎉`);
    Console.print(`💫 보너스 번호는: ${this.bonusNumber} 💫`);
  }
}

export default WinningNumbers;

