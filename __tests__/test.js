// test.js
import LottoPurchase from './LottoPurchase';
import LottoTicket from './LottoTicket';
import NumberGenerator from './NumberGenerator';

describe('LottoPurchase',() => {
    let purchase;

    beforeEach(() => {
        purchase = new LottoPurchase();
    });

    // 구매 금액 관련 예외 케이스
    test('invalid purchase amount -below minimum', () => {
        expect(()=> purchase.checkPurchase(500)).toThrow('최소 금액은 1000원입니다.');
    });
    
    // 사용자 번호 관련 예외 케이스
    // 배열 길이 
     test('invalid purchase number - incorrect count', () => {
        expect(()=> purchase.checkUserNumbers([1,2])).toThrow('로또 번호는 반드시 6개여야 합니다.');
    });
    // 번호 범위
    test('invalid user number -out of range', () => {
        expect(()=> purchase.checkUserNumbers([0,1,2,3,4,5,7])).toThrow('1부터 45사이의 번호를 입력 해주세요.');
    });
    test('invalid user number -out of range', () => {
        expect(()=> purchase.checkUserNumbers([1,2,3,4,5,48])).toThrow('1부터 45사이의 번호를 입력 해주세요.');
    });
    // 번호 이외
    test('invalid user number-non numeric input', () => {
        expect(()=> purchase.checkUserNumbers(['a',2,3,4,5,6])).toThrow('숫자만 입력 해주세요.');
    });
    test('invalid user number-non numeric input', () => {
        expect(() => purchase.checkUserNumbers(['',2,6,7,8,9])).toThrow('숫자만 입력 해주세요.');
    });
    test('invalid user number-non numeric input', () => {
        expect(()=> purchase.checkUserNumbers(['%',4,5,6,7,10])).toThrow('숫자만 입력 해주세요.');
    });
   
})