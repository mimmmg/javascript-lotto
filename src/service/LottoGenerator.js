// LottoGenerator.js
class LottoGenerator {
    static generateNumbers() {
      const numbers = new Set();
  
      while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
      }
  
      return Array.from(numbers).sort((a, b) => a - b);
    }
  }
  
  export default LottoGenerator;
  