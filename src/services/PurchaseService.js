// PurchaseService.js
import LottoTicket from "./src/domains/LottoTicket";
import LottoPurchase from "./src/domains/LottoPurchase";


class PurchaseService {
    constructor() {  
        this.purchase = new LottoPurchase(); // LottoPurchase 클래스의 인스턴스 생성
        }

    // 티켓 생성
    handlePurchase(amount) {
        const count = this.purchase.checkPurchase(amount); // 금액 검증 (메서드 호출)
        const tickets = []; // 여러 장의 로또 번호를 저장할 배열 초기화
        for (let i =0; i < count; i++){
            tickets.push(new LottoTicket()); // 티켓 생성 및 배열에 추가
        }
        return tickets; // 생성된 티켓 배열 반환
    }
};

export default PurchaseService;



