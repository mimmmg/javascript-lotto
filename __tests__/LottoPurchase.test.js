import LottoPurchaseService from './LottoPurchaseService.js';

describe('LottoPurchase 클래스 예외 테스트', () => {
  let lottoPurchase;

  beforeEach(() => {
    lottoPurchase = new LottoPurchase();
  });

  test('구매 금액이 1,000원 미만일 경우 에러 발생', () => {
    const amount = 500; // 1,000원 미만

    expect(() => lottoPurchase.setPurchaseAmount(amount)).toThrow("💰 구매 금액은 1,000원 이상이어야 하며, 1,000원 단위로 입력해 주세요.");
  });

  test('구매 금액이 1,000원 단위가 아닐 경우 에러 발생', () => {
    const amount = 1500; // 1,000원 단위 아님

    expect(() => lottoPurchase.setPurchaseAmount(amount)).toThrow("💰 구매 금액은 1,000원 이상이어야 하며, 1,000원 단위로 입력해 주세요.");
  });

  test('구매 금액이 숫자가 아닐 경우 에러 발생', () => {
    const amount = '천'; // 숫자가 아님

    expect(() => lottoPurchase.setPurchaseAmount(amount)).toThrow("💰 구매 금액은 1,000원 이상이어야 하며, 1,000원 단위로 입력해 주세요.");
  });
});
