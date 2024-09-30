// server.js
import express from 'express';
import bodyParser from 'body-parser';
import LottoPurchase from './src/domains/LottoPurchase.js';
import LottoPurchaseService from './src/services/PurchaseService.js';
import WinningService from './src/services/winningService.js';
import cors from 'cors';


const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors()); // CORS 설정

app.get('/', (req, res) => {
    res.send('Welcome to the Lotto API!'); // 기본 메시지 응답
});


// 로또 구매 API
app.post('/purchase', (req, res) => {
    console.log(req.body)
    const { amount } = req.body;

    try {
        const purchase = new LottoPurchase();
        const count = purchase.checkPurchase(amount);
        const purchaseService = new LottoPurchaseService();
        const tickets = purchaseService.handlePurchase(amount);
        res.json({ count, tickets });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 로또 번호 검증 API
app.post('/check-numbers', (req, res) => {
    const { userNumbers } = req.body;

    try {
        const purchase = new LottoPurchase();
        purchase.checkUserNumbers(userNumbers);
        res.json({ message: '유효한 번호입니다.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});

