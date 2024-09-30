// Lotto.js
class Lotto {
    constructor() {
        this.numbers = []; // 생성된 로또 번호를 저장할 배열
    }

    generateNumbers(count) {
        for (let i = 0; i < count; i++) { // 로또 장수만큼 반복하여 중복되지 않는 6개의 숫자 생성
            const lottoSet = new Set();  // 중복 방지를 위한 Set, 완성된 숫자들은 정렬하여 this.lottoNumbers 배열에 저장
            
            // 6개의 중복되지 않는 숫자 생성
            while (lottoSet.size < 6) {
                const randomNumber = Math.floor(Math.random() * 45) + 1; // 1~45 사이의 랜덤 숫자
                lottoSet.add(randomNumber); // Set에 숫자를 추가
            }

            // Set을 배열로 변환하고 정렬하여 numbers 배열에 추가
            this.numbers.push(Array.from(lottoSet).sort((a, b) => a - b)); 
        }
    }

    getNumbers() {
        return this.numbers; // 생성된 로또 번호 반환
    }
}

export default Lotto;

