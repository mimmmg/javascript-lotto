// WinningNumbers.js 
// 당첨 번호 생성
import NumberGenerator from "../utils/NumberGenerator";

class WinningNumbers extends NumberGenerator {
    constructor(){
        super(); // 부모 클래스의 생성자 호출
        this.numbers = this.generateNumbers(6,45); 
    }
}

export default WinningNumbers;