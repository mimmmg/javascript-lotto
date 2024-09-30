// WinningNumbersInput.test.js

import WinningNumbersInput from './WinningNumbersInput.js';
import Console from '@woowacourse/mission-utils';

jest.mock('@woowacourse/mission-utils');

describe('WinningNumbersInput 클래스 예외 테스트', () => {
  let winningNumbersInput;

  beforeEach(() => {
    winningNumbersInput = new WinningNumbersInput();
  });

  test('당첨 번호가 6개가 아닐 경우 에러 발생', async () => {
    Console.readLineAsync.mockResolvedValueOnce("1, 2, 3"); // 3개 숫자

    await expect(winningNumbersInput.getWinningNumbers()).rejects.toThrow("❗️ 당첨 번호는 정확히 6개만 입력해 주세요!❗️");
  });

  test('입력값에 쉼표가 없을 경우 에러 발생', async () => {
    Console.readLineAsync.mockResolvedValueOnce("123456"); // 쉼표 없는 입력

    await expect(winningNumbersInput.getWinningNumbers()).rejects.toThrow("❗️ 쉼표를 사용하여 숫자를 구분해 주세요!");
  });

  test('당첨 번호에 숫자가 아닌 값이 포함될 경우 에러 발생', async () => {
    Console.readLineAsync.mockResolvedValueOnce("1, 2, a, 4, 5, 6"); // 숫자가 아닌 값 포함

    await expect(winningNumbersInput.getWinningNumbers()).rejects.toThrow("❌ 숫자는 1에서 45 사이여야 해요! 다시 한 번 확인해주세요.");
  });

  test('당첨 번호가 1~45 범위를 벗어날 경우 에러 발생', async () => {
    Console.readLineAsync.mockResolvedValueOnce("1, 2, 3, 4, 5, 50"); // 유효하지 않은 숫자

    await expect(winningNumbersInput.getWinningNumbers()).rejects.toThrow("🌟 모든 숫자는 1~45 사이의 양수만 입력해 주세요!");
  });

  test('당첨 번호에 중복된 숫자가 있을 경우 에러 발생', async () => {
    Console.readLineAsync.mockResolvedValueOnce("1, 2, 3, 4, 5, 5"); // 중복된 숫자

    await expect(winningNumbersInput.getWinningNumbers()).rejects.toThrow("🔁 중복된 숫자가 있네요! 중복 없이 6개 입력해보세요.");
  });

  test('보너스 번호가 1~45 범위를 벗어날 경우 에러 발생', async () => {
    Console.readLineAsync
      .mockResolvedValueOnce("1, 2, 3, 4, 5, 6") // 당첨 번호
      .mockResolvedValueOnce("0"); // 유효하지 않은 보너스 번호

    await expect(winningNumbersInput.getWinningNumbers()).rejects.toThrow("⚠️ 보너스 번호는 1 ~ 45 사이의 숫자여야 해요!");
  });

  test('보너스 번호가 당첨 번호와 중복될 경우 에러 발생', async () => {
    Console.readLineAsync
      .mockResolvedValueOnce("1, 2, 3, 4, 5, 6") // 당첨 번호
      .mockResolvedValueOnce("6"); // 중복된 보너스 번호

    await expect(winningNumbersInput.getWinningNumbers()).rejects.toThrow("🚫 보너스 번호는 당첨 번호와 중복되면 안 돼요!");
  });
});
