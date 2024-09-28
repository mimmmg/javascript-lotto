// WinningService.js
import WinningNumbers from "../domains/WinnigNumbers";

class WinningService{
    constructor() {
        this.WinningNumbers = new WinningNumbers(); // WinningNumbers 클래스의 인스턴스 생성
    }

    // 당첨 번호와 사용자 로또 번호 비교, 당첨 확인
    checkWinning(userTickets)   {
        return userTickets.map(ticket => {
            const matchedNumbers = ticket.filter(num => 
                this.winningNumbers.numbers.includes(num)
        );
            const matchedCount = matchedNumbers.length; // 일치하는 번호의 개수 계산
            return matchedCount; // 일치하는 개수 반환
        });
    }
};

export default WinningService;

