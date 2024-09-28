/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import LottoPurchase from '../domains/LottoPurchase';
import LottoTicket from '../domains/LottoTicket'; 
import WinningNumbers from './domains/WinningNumbers';
import LottoPurchaseService from './services/LottoPurchaseService';
import WinningService from './services/winningService';
import readline from 'readline';

const readline = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

 // 구입 금액 입력하기
readline.question('구입 금액을 입력해주세요: ', (amount) => {
    try{ 
        const purchase = new LottoPurchase(); // LottoPurchase 인스턴스 생성
        const count = purchase.checkPurchase(amount); // 공용 메서드 호출해서 총 티켓 수 확인
        console.log(`${count}장 구매 가능합니다: `);
        
        // 총 티켓 수 생성
        const purchaseService = new LottoPurchaseService(); // LottoPurchaseService  인스턴스 생성
        const tickets = purchaseService.handlePurchase(amount); 
        console.log(`생성된 로또 번호: `);
        tickets.forEach(ticket => console.log(ticket.numbers)); 
        
        // 로또 번호 입력하기
        readline.question('로또 번호를 입력해주세요 (예: 1,2,3,4,5,6): ', (input) => {
            const userNumbers = input.split(',').map(Number); // 입력 값을 분리하고 숫자로 변환
            
            // 당첨 번호와 비교(당첨 확인) 
            const winningService = new WinningService(); // 인스턴스 생성
            const matchedCounts = winningService.checkWinning(tickets.map(ticket => ticket.numbers));

            console.log(`당첨 결과: `);
            matchedCounts.forEach((count, index) => {
                console.log(`티켓 ${index + 1}: ${count}개 일치`);
            });
            
            readline.close();
        });
    } catch (error) {
        console.error('유효하지 않은 금액입니다. 다시 시도해주세요.');
        readline.close(); 
    }
})

// 각 단계에서 입력, 객체 생성, 필터링, 조건 체크, 결과 출력의 흐름
        