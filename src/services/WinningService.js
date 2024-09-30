// WinningService.js
import WinningNumbers from "../domains/WinnigNumbers.js";

class WinningService{
    constructor() {
        this.WinningNumbers = new WinningNumbers(); // WinningNumbers 클래스의 인스턴스 생성
    }

    // 당첨 번호와 사용자 로또 번호 비교, 당첨 확인
    checkWinning(userTickets)   {
        return userTickets.map(ticket => {
            const matchedNumbers = ticket.filter(num => 
                this.WinningNumbers.numbers.includes(num)
        );
            const matchedCount = matchedNumbers.length; // 일치하는 번호의 개수 계산
            return matchedCount; // 일치하는 개수 반환
        });
    }

    // 등수와 당첨금 계산
    calculatePrizes(matchedCounts) {
        const prizeMoney = {
            6: 200000000,
            5: 3000000,
            4: 50000,
            3: 5000,
            2: 500,
            0: 0
        };

        return matchedCounts.map(count => ({
            count,
            prize: prizeMoney[count] || 0 // 일치하는 개수에 따른 당첨금 반환
        }));
    }
};

export default WinningService;

