// Lotto.test.js
import Lotto from './Lotto.js';

describe('Lotto 클래스 예외 테스트', () => {
  test('로또 번호가 6개가 아닐 경우 에러 발생', () => {
    const numbers = [1, 2, 3]; // 3개 숫자

    expect(() => new Lotto(numbers)).toThrow("[ERROR] 로또 번호는 6개여야 합니다.");
  });

  test('로또 번호에 중복된 숫자가 있을 경우 에러 발생', () => {
    const numbers = [1, 2, 2, 4, 5, 6]; // 중복 숫자

    expect(() => new Lotto(numbers)).toThrow("[ERROR] 로또 중복될 수 없습니다."); // 메시지는 예시
  });

  test('숫자가 1에서 45 사이가 아닐 경우 에러 발생', () => {
    const numbers = [0, 46, 1, 2, 3, 4]; // 유효하지 않은 숫자

    expect(() => new Lotto(numbers)).toThrow("[ERROR] 로또 번호는 1에서 45 사이의 숫자여야 합니다."); // 메시지는 예시
  });
});
