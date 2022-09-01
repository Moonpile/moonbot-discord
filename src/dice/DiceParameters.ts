export class DiceParameters {
  diceExpression: string;
  numDice: number;
  diceType: string;
  numSides: number;
  modifier: number;
  errorMessage: string = "";
  isValid: boolean = false;
  isSmoothExploding = false;
  explodeUp: boolean = false;
  explodeDown: boolean = false;
  floor: number = 0;
  enforceFloor: boolean = false;
  ceiling: number = 0;
  enforceCeiling: boolean = false;
  threshold: number = 0;
  isThreshold: boolean = false;
  drop: string = "no";
  dropnum: number = 0;

  constructor(diceExpression: string) {
    // var myRegex =
    //   /^(\d+)?([dDeEsS]|eu|EU|ed|ED|su|SU|sd|SD)(\d+)([+-]\d+)?([fF]([-]?\d+))?([cC]([-]?\d+))?([tT]([-]?\d+))?(([lLhH])([-]?\d+))?$/;
    var match = DiceParametersRegex.exec(diceExpression);

    this.diceExpression = diceExpression;
    this.numDice = 1;
    this.diceType = "";
    this.numSides = 0;
    this.modifier = 0;
    this.errorMessage = "";
    this.isValid = false;
    this.isSmoothExploding = false;
    this.explodeUp = false;
    this.explodeDown = false;
    this.floor = 0;
    this.enforceFloor = false;
    this.ceiling = 0;
    this.enforceCeiling = false;
    this.threshold = 0;
    this.isThreshold = false;
    this.drop = "no";
    this.dropnum = 0;

    if (match === null) {
      this.errorMessage = "Bad Dice Expression '" + diceExpression + "'";
      this.isValid = false;
    } else {
      if (match[1] != undefined) {
        this.numDice = Number(match[1]);
      }
      this.diceType = match[2].toLowerCase();
      this.isSmoothExploding =
        this.diceType == "s" || this.diceType == "su" || this.diceType == "sd";
      this.numSides = Number(match[3]);
      if (match[4] != undefined) {
        this.modifier = parseInt(match[4].replace("+", ""));
      }

      if (this.diceType == "e" || this.diceType == "s") {
        this.explodeUp = true;
        this.explodeDown = true;
      }

      if (this.diceType == "eu" || this.diceType == "su") {
        this.explodeUp = true;
      }

      if (this.diceType == "ed" || this.diceType == "sd") {
        this.explodeDown = true;
      }

      if (match[5] != undefined) {
        this.floor = parseInt(match[6]);
        this.enforceFloor = true;
      }

      if (match[7] != undefined) {
        this.ceiling = parseInt(match[8]);
        this.enforceCeiling = true;
      }

      if (match[9] != undefined) {
        this.threshold = parseInt(match[10]);
        this.isThreshold = true;
      }
      if (match[12] != undefined) {
        if (match[12].toLowerCase() == "l") {
          this.drop = "lowest";
        }
        if (match[12].toLowerCase() == "h") {
          this.drop = "highest";
        }
        if (match[13] != undefined) {
          this.dropnum = parseInt(match[13]);
        }
        if (this.dropnum >= this.numDice) {
          this.isValid = false;
          this.errorMessage = "Cannot drop more dice than you roll";
        }
      }

      this.isValid = true;
    }
  }
}

export const DiceParametersRegex =
  /^(\d+)?([dDeEsS]|eu|EU|ed|ED|su|SU|sd|SD)(\d+)([+-]\d+)?([fF]([-]?\d+))?([cC]([-]?\d+))?([tT]([-]?\d+))?(([lLhH])([-]?\d+))?$/;
