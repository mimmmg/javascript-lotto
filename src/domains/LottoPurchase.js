// LottoPurchase.js 

class LottoPurchase{
    constructor() {
        this.ticketPrice = 1000;  // 로또 한장 가격 설정 
    }

    // 구입 금액 확인 검증 
    #validatePurchaseAmount(amount) {
        if (amount < this.ticketPrice) {
            throw new Error(`최소 금액은 ${this.ticketPrice}원입니다.`);
        }
        return Math.floor(amount/ this.ticketPrice); // 총 구매 장수 반환
    }
    
    // 사용자 입력 번호 범위 검증
    #validateUserNumbers(number){ 
        if (number < 1 || number > 45) { 
            throw new Error(`1부터 45사이의 번호를 입력 해주세요.`);
        }
        return true; 
    }

    // 사용자 입력 형식 검증(번호 이외 입력)
    #validateInputFormat(input){
        if(isNaN(input) || input.trim() === '' || !/^\d+$/.test(input.trim())){
            throw new Error(`숫자만 입력 해주세요.`);
        }
        return true;
    }

    // 공용 메서드: 금액 확인 검증
    checkPurchase(amount) {
        return this.#validatePurchaseAmount(amount); 
    }

    // 공용 메서드: 사용자 입력 번호 배열의 유효성 검증
    checkUserNumbers(userNumbers) {
        // 6개의 번호가 입력되었는지 검증
        if (userNumbers.length !== 6) {
            throw new Error('로또 번호는 반드시 6개여야 합니다.');
        }
        
        // 각 번호 검증
        userNumbers.forEach(input => {
            this.checkInputFormat(input); // 입력 형식 검증 (공용 메서드 호출) 
            const number = Number(input); // 입력을 숫자로 변환   
            // 변환 후 NaN인 경우 에러 처리
           this.#validateUserNumbers(number); // 범위 검증 (프라이빗 메서드 호출)
        });
        return userNumbers; // 유효한 번호 배열 반환
    }

    // 공용 메서드: 입력 형식 검증
    checkInputFormat(input){
        return this.#validateInputFormat(input); // 번호 이외 입력 검증
    }
}

export default LottoPurchase;