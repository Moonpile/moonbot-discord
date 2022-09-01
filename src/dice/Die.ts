import { DiceParameters } from "./DiceParameters";

export class Die {
  public rolledValue: number | null = null;
  public totalValue: number = 0;
  public format: string = "";
  public numSides: number;
  public diceParams: DiceParameters;
  public drop: boolean = false;
  public explodeUpDice: Die[] | null = null;
  public explodeDownDice: Die[] | null = null;

  constructor(diceParams: DiceParameters) {
    this.diceParams = diceParams;
    this.numSides = diceParams.numSides;

    let explodeUpOn = this.diceParams.numSides;
    let explodeDownOn = 1;
    let extraSides = 0;

    if (this.diceParams.isSmoothExploding) {
      if (this.diceParams.explodeUp && this.diceParams.explodeDown) {
        explodeUpOn = this.diceParams.numSides + 2;
        explodeDownOn = this.diceParams.numSides + 1;
        extraSides = 2;
      } else if (this.diceParams.explodeUp || this.diceParams.explodeDown) {
        // Even though these values are the same, one won't matter
        //since explodeUp and explodeDown are checked below
        explodeUpOn = this.diceParams.numSides + 1;
        explodeDownOn = this.diceParams.numSides + 1;
        extraSides = 1;
      }
    }
    const adjustedSides = this.numSides + extraSides;
    this.rolledValue = Math.ceil(Math.random() * adjustedSides);

    if (this.diceParams.explodeUp && this.rolledValue === explodeUpOn) {
      if (this.diceParams.isSmoothExploding) {
        this.rolledValue = this.numSides;
      }

      const upParams = new DiceParameters(this.diceParams.diceExpression);

      upParams.explodeDown = false;
      upParams.explodeUp = false;

      const firstExplosion = new Die(upParams);
      this.explodeUpDice = [firstExplosion];
      let currentRoll = firstExplosion.totalValue;

      while (currentRoll === this.diceParams.numSides) {
        const nextExplosion = new Die(upParams);
        this.explodeUpDice.push(nextExplosion);
        currentRoll = nextExplosion.totalValue;
      }
    }

    if (this.diceParams.explodeDown && this.rolledValue === explodeDownOn) {
      if (this.diceParams.isSmoothExploding) {
        this.rolledValue = 1;
      }

      const downParams = new DiceParameters(this.diceParams.diceExpression);

      downParams.explodeDown = false;
      downParams.explodeUp = false;

      const firstExplosion = new Die(downParams);
      this.explodeDownDice = [firstExplosion];
      let currentRoll = firstExplosion.totalValue;

      while (currentRoll === 1) {
        const nextExplosion = new Die(downParams);
        this.explodeDownDice.push(nextExplosion);
        currentRoll = nextExplosion.totalValue;
      }
    }

    this.format = this.rolledValue.toString();

    this.totalValue = this.rolledValue;

    if (this.explodeUpDice) {
      this.totalValue += this.explodeUpDice
        .map((die) => die.totalValue)
        .reduce((a, b) => a + b);
      this.format = `${this.totalValue}:(${
        this.rolledValue
      }>>${this.explodeUpDice.map((die) => die.format).join(">")})`;
    }

    if (this.explodeDownDice) {
      this.totalValue -= this.explodeDownDice
        .map((die) => die.totalValue)
        .reduce((a, b) => a + b);
      this.format = `${this.totalValue}:(${
        this.rolledValue
      }<<${this.explodeDownDice.map((die) => die.format).join("<")})`;
    }
  }

  evaluate(): number {
    if (this.drop) {
      this.totalValue = 0;
      this.format += "*";
      return 0;
    }
    if (this.diceParams.isThreshold && this.rolledValue) {
      if (this.totalValue >= this.diceParams.threshold) {
        this.format = `#${this.format}`;
        this.totalValue = 1;
      } else {
        this.totalValue = 0;
        this.format = `${this.format}`;
      }
    }

    return this.totalValue;
  }
}
