

// class InvalidWinningNumberError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = "InvalidWinningNumberError";
//   }
// }
// CommandInputView .js
import promptSync from 'prompt-sync';

const prompt = promptSync();

class InvalidInputError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidInputError";
  }
}

class CommandInputView {
  constructor() {
    this.winningNumbers = [];
    this.bonusNumber = null;
  }

  getWinningNumbers() {
    try {
      this.winningNumbers = this.#inputWinningNumbers();
      this.bonusNumber = this.#inputBonusNumber();
    } catch (error) {
      if (error instanceof InvalidInputError) {
        console.log(error.message); // 커스텀 에러 메시지 출력
      } else {
        console.log("알 수 없는 오류가 발생했습니다.");
      }
    }
  }

  #inputWinningNumbers() {
    const input = prompt("🎉 당첨 번호를 입력해 주세요! (쉼표로 구분해서 6개 입력해 주세요): ");
    
    this.#validateInputFormat(input);
    
    const numbers = input.split(',').map(num => num.trim());
    this.#validateWinningNumbers(numbers);

    return [...new Set(numbers.map(num => parseInt(num)))];
  }

  #inputBonusNumber() {
    const input = prompt("보너스 번호를 입력하세요: ");
    const bonusNumber = parseInt(input.trim());
    this.#validateBonusNumber(bonusNumber);
    return bonusNumber;
  }

  #validateInputFormat(input) {
    if (!input.includes(',')) {
      throw new InvalidInputError("❗️ 쉼표를 사용하여 숫자를 구분해 주세요!");
    }
  }

  #validateWinningNumbers(numbers) {
    if (numbers.length !== 6) {
      throw new InvalidInputError("❗️ 당첨 번호는 정확히 6개만 입력해 주세요!❗️");
    }

    if (numbers.some(num => num === "" || num.includes(' ') || isNaN(num))) {
      throw new InvalidInputError("❌ 숫자는 1에서 45 사이여야 해요! 다시 한 번 확인해주세요.");
    }

    const parsedNumbers = numbers.map(num => parseInt(num));

    if (parsedNumbers.some(num => isNaN(num) || num < 1 || num > 45)) {
      throw new InvalidInputError("🌟 모든 숫자는 1~45 사이의 양수만 입력해 주세요!");
    }

    const duplicates = parsedNumbers.filter((num, index) => parsedNumbers.indexOf(num) !== index);
    if (duplicates.length > 0) {
      throw new InvalidInputError(`🔁 중복된 숫자가 있네요! 중복 없이 6개 입력해보세요.`);
    }
  }

  #validateBonusNumber(bonusNumber) {
    if (bonusNumber < 1 || bonusNumber > 45 || isNaN(bonusNumber)) {
      throw new InvalidInputError("⚠️ 보너스 번호는 1 ~ 45 사이의 숫자여야 해요!");
    }
    if (this.winningNumbers.includes(bonusNumber)) {
      throw new InvalidInputError("🚫 보너스 번호는 당첨 번호와 중복되면 안 돼요!");
    }
  }

  displayWinningNumbers() {
    console.log(`🎉 오늘의 행운 번호는: ${this.winningNumbers.join(', ')} 🎉`);
    console.log(`💫 보너스 번호는: ${this.bonusNumber} 💫`);
  }
}

export default CommandInputView;
