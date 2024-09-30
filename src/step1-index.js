/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

//index.js (사용자 입력 및 프로그램 실행)
import Console from '@woowacourse/mission-utils'; // Console API
import LottoPurchase from './LottoPurchase.js';

const startLottoPurchase = async () => {
  const lottoPurchase = new LottoPurchase(); // 로또 구매 마법사 등장!

  const inputAmount = await Console.readLineAsync("💰 로또 구매에 도전하시겠습니까? 원하는 금액을 입력해보세요: "); // 사용자 입력 받기
  try {
    lottoPurchase.setPurchaseAmount(Number(inputAmount)); // 로또 구매 금액 설정
    lottoPurchase.displayPurchaseAmount(); // 로또 구매 정보를 출력하며 축하!
  } catch (error) {
    Console.print(`⚠️ 오우, 뭔가 잘못되었네요! 에러: ${error.message}`); // 에러 메시지 출력
  }
};

startLottoPurchase(); // 로또 구매의 모험을 시작합니다!

        