// NumberGenerator.js

class NumberGenerator{
    generateNumbers(count, max){  // count: 생성 개수, max: 생성 숫자의 최대범위
    const numbers = [];
    while(numbers.length< count) {
        const num = Math.floor(Math.random() * max) + 1;
        if(!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers,sort((a,b) => a-b); // 정렬된 배열을 메서드의 결과로 반환
    }
}

export default NumberGenerator;
