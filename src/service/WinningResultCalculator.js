// WinningResultCalculator.js
class WinningResultCalculator {
  constructor(purchasedNumbers, winningNumbers, bonusNumber, ticketPrice) {
    this.purchasedNumbers = purchasedNumbers;
    this.winningNumbers = winningNumbers  || [];
    this.bonusNumber = bonusNumber;
    this.ticketPrice = ticketPrice;
    this.prizes = {
      3: 5000,
      4: 50000,
      5: 1500000,
      6: 2000000000
    };
  }

  calculateResults() {
    return this.purchasedNumbers.map(ticket => this.#calculateWinning(ticket));
  }

  #calculateWinning(ticket) {
    const matchedNumbers = ticket.filter(num => this.winningNumbers.includes(num));
    const matchedCount = matchedNumbers.length;

    let prize = 0;
    if (matchedCount === 6) {
      prize = this.prizes[6]; // 1등
    } else if (matchedCount === 5 && ticket.includes(this.bonusNumber)) {
      prize = this.prizes[5]; // 2등
    } else if (matchedCount === 5) {
      prize = this.prizes[4]; // 3등
    } else if (matchedCount === 4) {
      prize = this.prizes[3]; // 4등
    } else if (matchedCount === 3) {
      prize = this.prizes[2]; // 5등
    }

    return { ticket, matchedCount, prize };
  }

  displayResults(winnings) {
    const prizeCounts = {
      3: 0,
      4: 0,
      5: 0,
      '5Bonus': 0,
      6: 0,
    };

    winnings.forEach(result => {
      const { matchedCount, prize } = result;
      if (matchedCount === 3) prizeCounts[3]++;
      else if (matchedCount === 4) prizeCounts[4]++;
      else if (matchedCount === 5 && !result.ticket.includes(this.bonusNumber)) prizeCounts[5]++;
      else if (matchedCount === 5 && result.ticket.includes(this.bonusNumber)) prizeCounts['5Bonus']++;
      else if (matchedCount === 6) prizeCounts[6]++;
    });

    console.log(`🏆 당신의 당첨 내역:`);
    console.log(`${prizeCounts[3]}개 일치 (5,000원) - ${prizeCounts[3]}개`);
    console.log(`${prizeCounts[4]}개 일치 (50,000원) - ${prizeCounts[4]}개`);
    console.log(`${prizeCounts[5]}개 일치 (1,500,000원) - ${prizeCounts[5]}개`);
    console.log(`${prizeCounts['5Bonus']}개 일치, 보너스 볼 일치 (30,000,000원) - ${prizeCounts['5Bonus']}개`);
    console.log(`${prizeCounts[6]}개 일치 (2,000,000,000원) - ${prizeCounts[6]}개`);

    const totalPrize = winnings.reduce((sum, result) => sum + result.prize, 0);
    console.log(`💰 총 상금: ${totalPrize}원`);

    const totalSpent = this.purchasedNumbers.length * this.ticketPrice;
    const profit = totalPrize - totalSpent;
    const returnRate = ((profit / totalSpent) * 100).toFixed(2);
    console.log(`📈 수익률: ${parseFloat(returnRate)}%`);
  }
}

export default WinningResultCalculator;

