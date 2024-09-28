// LottoTicket.js
import NumberGenerator from "../utils/NumberGenerator";

class LottoTicket extends NumberGenerator{
    constructor() {
        super(); // 부모 클래스의 생성자 호출
        this.numbers = this.generateNumbers(6,45); // 6개의 번호 생성, 1부터45까지
    }      
};

export default LottoTicket; 

