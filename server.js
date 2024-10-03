// // server.js
// import express from 'express';
// import bodyParser from 'body-parser';
// import LottoPurchaseService from './src/service/LottoPurchaseService.js';
// import WinningResultCalculator from './src/service/WinningResultCalculator.js';

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Endpoint to handle lotto game requests
// app.get('/', (req, res) => {
//   res.sendFile(new URL('../index.html', import.meta.url).pathname);
// });

// app.post('/api/lotto', async (req, res) => {
//   try {
//     const { purchaseAmount, winningNumbers, bonusNumber } = req.body;

//     // 1. 로또 구매 처리
//     const lottoPurchase = new LottoPurchaseService();
//     lottoPurchase.setPurchaseAmount(parseInt(purchaseAmount));

//     // 2. 당첨 내역 계산
//     const winnings = lottoPurchase.lottoNumbers;
//     const winningCalculator = new WinningResultCalculator(winnings, winningNumbers, bonusNumber, lottoPurchase.ticketPrice);

//     const results = winningCalculator.calculateResults();

//     // 3. 결과 반환
//     res.status(200).json({
//       message: '로또 결과',
//       results: results,
//       lottoNumbers: winnings,
//     });
//   } catch (error) {
//     res.status(500).json({ error: '서버 오류 발생' });
// //   }
// });

// // 서버 시작
// app.listen(PORT, () => {
//   console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
// });


import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import LottoPurchaseService from './src/service/LottoPurchaseService.js';
import WinningResultCalculator from './src/service/WinningResultCalculator.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// 서버에 CORS 미들웨어 추가
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static file serving
app.use(express.static(path.join(path.resolve(), '..'))); // index.html이 src 밖에 있을 때

// 기본 경로에 대한 GET 요청 처리 (로그인화면)
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./view/login.html')); // 로그인 화면 파일 경로
});

// 로그인 엔드포인트 처리
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 여기에서 사용자 인증 로직을 추가합니다.
  
  // 예: 데이터베이스에서 사용자 정보를 확인하고, 세션 설정 등

  // 인증이 성공한 경우 로또 게임 화면으로 리다이렉트
  
  res.redirect('/lotto'); // 게임 화면 엔드포인트로 리다이렉트
});

// 로또 게임 화면 (별도의 GET 요청 핸들러 추가)
app.get('/lotto', (req, res) => {
  res.sendFile(path.resolve('./index.html')); // 로또 게임 화면
});

// Endpoint to handle lotto game requests
app.post('/api/lotto', async (req, res) => {
  try {
    const { purchaseAmount, winningNumbers, bonusNumber } = req.body;
    
    // 로또 구매 서비스 인스턴스 생성 및 금액 설정
    const lottoPurchase = new LottoPurchaseService();
    lottoPurchase.setPurchaseAmount(parseInt(purchaseAmount));

    // 생성된 로또 번호
    const winnings = lottoPurchase.lottoNumbers;

    // 당첨 결과 계산기 인스턴스 생성
    const winningCalculator = new WinningResultCalculator(
      winnings,
      winningNumbers,
      bonusNumber,
      lottoPurchase.ticketPrice
    );

    // 결과 계산
    const results = winningCalculator.calculateResults();
    
    // 성공적인 응답 반환
    res.status(200).json({
      message: '로또 결과',
      results: results,
      lottoNumbers: winnings,
    });
  } catch (error) {
    // 오류 발생 시 응답
    console.error(error);
    res.status(500).json({ error: '서버 오류 발생' });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
