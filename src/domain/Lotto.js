class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    this.#validateLength(numbers);
    this.#validateUnique(numbers);
    this.#validateRange(numbers);
  }

  #validateLength(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  #validateUnique(numbers) {
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      throw new Error("[ERROR] 로또 번호는 중복될 수 없습니다.");
    }
  }

  #validateRange(numbers) {
    numbers.forEach(num => {
      if (num < 1 || num > 45) {
        throw new Error(`[ERROR] 로또 번호 ${num}는 1에서 45 사이의 숫자여야 합니다.`);
      }
    });
  }

  getNumbers() {
    return [...this.#numbers]; // 배열의 복사본 반환
  }
}

export default Lotto;
