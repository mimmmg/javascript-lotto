/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

// index.js (사용자 입력 및 프로그램 실행)
import LottoPurchaseService from './src/service/LottoPurchaseService.js';
import CommandInputView from './src/view/inputview/CommandInputView.js';
import WinningResultCalculator from './src/service/WinningResultCalculator.js';
import promptSync from 'prompt-sync';

const prompt = promptSync();

const runLottoGame = async () => {
  const lottoPurchase = new LottoPurchaseService();
  const winningNumbersInput = new CommandInputView();

  // 1. 구매 금액 입력
  const purchaseAmount = prompt("💰 로또 구매 금액을 입력해 주세요: ");
  lottoPurchase.setPurchaseAmount(parseInt(purchaseAmount)); // 구매 금액 설정

  // 2. 생성된 로또 번호 출력
  lottoPurchase.displayPurchaseAmount();

  // 3. 당첨 번호 및 보너스 번호 입력
  await winningNumbersInput.getWinningNumbers();
  winningNumbersInput.displayWinningNumbers();

  // 4. 당첨 내역 계산 및 출력
  const winnings = lottoPurchase.lottoNumbers; // Lotto 클래스 사용 없이 로또 번호 가져오기
  const winningCalculator = new WinningResultCalculator(
    winnings,
    winningNumbersInput.winningNumbers,
    winningNumbersInput.bonusNumber,
    lottoPurchase.ticketPrice
  );

  const results = winningCalculator.calculateResults();
  winningCalculator.displayResults(results);
};

// 프로그램 실행
runLottoGame();
