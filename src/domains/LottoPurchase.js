// LottoPurchase.js 

class LottoPurchase{
    constructor() {
        this.ticketPrice = 1000;  // 로또 한장 가격 설정 
    }

    // 구입 금액 확인하는 검증 
    #validatePurchaseAmount(amount) {
        if (amount < this.ticketPrice) {
            throw new Error(`최소 금액은 ${this.ticketPrice}원입니다.`);
        }
        return Math.floor(amount/ this.ticketPrice); // 총 구매 장수 반환
    }
// 사용자 번호 입력 검증
#validateUserNumbers(userNumbers) {
    if (!Array.isArray(userNumbers) || userNumbers.length !== 6) {
        throw new Error('로또 번호는 6개를 입력해야 합니다.');
    }
    userNumbers.forEach(num => {
        if (isNaN(num) || num < 1 || num > 45) {
            throw new Error('로또 번호는 1부터 45 사이의 숫자여야 합니다.');
        }
    });
}
    // 공용 메서드
    checkPurchase(amount) {
        return this.#validatePurchaseAmount(amount); // 프라이빗 메서드 호출
    }

    // 번호 검증 메서드
    validateUserInput(userNumbers) {
        this.#validateUserNumbers(userNumbers); // 입력 검증 메서드 호출
    }


}

export default LottoPurchase;