import { Dice } from "./Dice";
const diceExpression = "10s4t5l4";

const testDice = new Dice(diceExpression);

let total = testDice.roll();

console.log(testDice.diceParameters);
console.log(`${diceExpression} TOTAL:  ${testDice.total}`);
console.log(`${diceExpression} FORMAT:  ${testDice.format}`);
