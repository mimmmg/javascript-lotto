// LottoPurchase.js
import Lotto from './Lotto.js';
import Console from '@woowacourse/mission-utils'; // Console API

class LottoPurchase {
  constructor() {
    this.purchaseAmount = 0; // 구매 금액 초기화
    this.ticketPrice = 1000; // 로또 1장 가격 설정
    this.lottoCount = 0; // 발행된 로또 장수 초기화
    this.lottoNumbers = []; // 생성된 로또 번호를 저장할 배열
  }

  // 구매 금액 설정 및 로또 번호 생성
  setPurchaseAmount(amount) {
    this.purchaseAmount = this.#validatePurchaseAmount(amount);
    this.lottoCount = this.#calculateLottoCount();
    this.lottoNumbers = this.#generateLottoNumbers();
  }

  // 구매 금액 유효성 검사
  #validatePurchaseAmount(amount) {
    if (isNaN(amount) || amount < this.ticketPrice || amount % this.ticketPrice !== 0) {
      throw new Error("💰 구매 금액은 1,000원 이상이어야 하며, 1,000원 단위로 입력해 주세요.");
    }
    return amount; // 유효한 금액 반환
  }

  // 로또 장수 계산
  #calculateLottoCount() {
    return this.purchaseAmount / this.ticketPrice; // 로또 장수 계산
  }

  // 로또 번호 생성
  #generateLottoNumbers() {
    return Array.from({ length: this.lottoCount }, () => Lotto.generateNumbers());
  }

  // 구매 금액 및 로또 장수 출력
  displayPurchaseAmount() {
    Console.print(`💰 구매하신 로또 금액은 ${this.purchaseAmount}원입니다!`);
    Console.print(`🎟️ 총 발행된 로또 장수는 ${this.lottoCount}장입니다!`);
    Console.print(`🎉 생성된 로또 번호: ${JSON.stringify(this.lottoNumbers)}`);
  }
}

export default LottoPurchase;



