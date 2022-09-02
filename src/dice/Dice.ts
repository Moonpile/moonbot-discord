import { DiceParameters } from "./DiceParameters";
import { Die } from "./Die";

export class Dice {
  diceParameters!: DiceParameters;

  dice: Die[] = [];

  total?: number;
  format?: string;

  constructor(diceExpression: string) {
    diceExpression = diceExpression;
    this.diceParameters = new DiceParameters(diceExpression);
  }

  roll(): number {
    this.dice = [];

    for (let i = 0; i < this.diceParameters.numDice; i++) {
      let die = new Die(this.diceParameters);
      this.dice.push(die);
    }

    // Post roll operations on the entire dice pool

    if (this.diceParameters.drop === "lowest") {
      let sortedAsc = [...this.dice].sort((a, b) =>
        a.totalValue > b.totalValue ? 1 : -1
      );
      for (let i = 0; i < this.diceParameters.dropnum; i++) {
        sortedAsc[i].drop = true;
      }
    }

    if (this.diceParameters.drop === "highest") {
      let sortedAsc = [...this.dice].sort((a, b) =>
        a.totalValue > b.totalValue ? -1 : 1
      );
      for (let i = 0; i < this.diceParameters.dropnum; i++) {
        sortedAsc[i].drop = true;
      }
    }

    // Re-evaluate the dice after post-roll operations
    this.dice.forEach((die) => die.evaluate());

    this.format = `(${this.dice.map((die) => die.format).join(",")})`;
    this.total = this.dice.map((die) => die.totalValue).reduce((a, b) => a + b);

    if (this.diceParameters.modifier != 0) {
      this.total += this.diceParameters.modifier;
      let plus = this.diceParameters.modifier <= 0 ? "" : "+";
      this.format = `${this.format}${plus}${this.diceParameters.modifier}`;
    }

    if (this.diceParameters.enforceFloor) {
      if (this.total < this.diceParameters.floor) {
        this.total = this.diceParameters.floor;
        this.format = `floored ${this.format}`;
      }
    }

    if (this.diceParameters.enforceCeiling) {
      if (this.total > this.diceParameters.ceiling) {
        this.total = this.diceParameters.ceiling;
        this.format = `ceilinged ${this.format}`;
      }
    }

    return this.total;
  }
}
