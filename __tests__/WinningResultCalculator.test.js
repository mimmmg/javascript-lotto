// import WinningResultCalculator from './WinningResultCalculator.js';

describe('WinningResultCalculator 클래스 예외 테스트', () => {
    const purchasedNumbers = [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
    ];
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const ticketPrice = 1000;
  
    let calculator;
  
    beforeEach(() => {
      calculator = new WinningResultCalculator(purchasedNumbers, winningNumbers, bonusNumber, ticketPrice);
    });
  
    test('구매한 로또 번호가 비어있을 경우', () => {
      const emptyCalculator = new WinningResultCalculator([], winningNumbers, bonusNumber, ticketPrice);
      const winnings = emptyCalculator.calculateResults();
      expect(winnings).toEqual([]); // 빈 배열 반환
    });
  
    test('당첨 번호와 보너스 번호가 모두 일치하는 경우', () => {
      const winnings = calculator.calculateResults();
      expect(winnings).toEqual([
        { ticket: [1, 2, 3, 4, 5, 6], matchedCount: 6, prize: 2000000000 },
        { ticket: [7, 8, 9, 10, 11, 12], matchedCount: 0, prize: 0 },
        { ticket: [13, 14, 15, 16, 17, 18], matchedCount: 0, prize: 0 },
      ]);
    });
  
    test('보너스 번호가 아닌 번호로 5개 일치한 경우', () => {
      const newWinningNumbers = [1, 2, 3, 4, 5, 8]; // 보너스 번호가 아닌 숫자
      const newCalculator = new WinningResultCalculator(purchasedNumbers, newWinningNumbers, bonusNumber, ticketPrice);
      const winnings = newCalculator.calculateResults();
      expect(winnings[0].matchedCount).toBe(5); // 5개 일치
      expect(winnings[0].prize).toBe(1500000); // 1,500,000원
    });
  
    test('유효하지 않은 티켓 가격이 설정된 경우', () => {
      expect(() => new WinningResultCalculator(purchasedNumbers, winningNumbers, bonusNumber, -1000)).toThrow();
    });
  
    test('보너스 번호가 당첨 번호와 중복된 경우', () => {
      const newBonusNumber = 6; // 중복된 보너스 번호
      expect(() => new WinningResultCalculator(purchasedNumbers, winningNumbers, newBonusNumber, ticketPrice)).toThrow();
    });
  
    test('당첨 번호가 유효하지 않은 경우', () => {
      const newWinningNumbers = [1, 2, 3, 4, 5, 60]; // 유효하지 않은 숫자
      expect(() => new WinningResultCalculator(purchasedNumbers, newWinningNumbers, bonusNumber, ticketPrice)).toThrow();
    });
  });
  