import Lotto from './Lotto.js'; // Lotto 클래스를 import합니다.

class InvalidInputError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidInputError";
    }
}

class LottoPurchase {
    constructor() {
        this.purchaseAmount = 0;
        this.ticketPrice = 1000; // 로또 1장 가격 설정
        this.lottoCount = 0; // 발행된 로또 장수
        this.lotto = new Lotto(); // Lotto 클래스의 인스턴스를 생성
    }

    // 구매 금액 설정 및 로또 번호 생성
    setPurchaseAmount(amount) {
        this.purchaseAmount = this.#validatePurchaseAmount(amount);
        this.lottoCount = this.purchaseAmount / this.ticketPrice; // 로또 장수 계산
        this.lotto.generateNumbers(this.lottoCount); // 로또 번호 생성
    }

    // 구입 금액 입력 값 유효성 검사 메서드 (프라이빗)
    #validatePurchaseAmount(amount) {
        if (isNaN(amount) || amount < this.ticketPrice || amount % this.ticketPrice !== 0) {
            throw new InvalidInputError("구매 금액은 1,000원 이상이어야 하며 1,000원의 배수여야 합니다.");
        }
        
        return amount;
    }

    // 구매 금액 및 로또 장수 출력 메서드
    displayPurchaseAmount() {
        console.log(`💰 구매하신 로또 금액은 ${this.purchaseAmount}원입니다!`);
        console.log(`🎟️ 총 발행된 로또 장수는 ${this.lottoCount}장입니다!`);
        console.log(`🎉 생성된 로또 번호: ${this.lotto.getNumbers()}`);
    }
}

export default LottoPurchase;


