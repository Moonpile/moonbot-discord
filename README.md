# moonbot-discord
A Discord bot for various things.
# Slash Commands
* /d - Displays a "dice tray" of buttons which you can click to roll the preset dice.
* /phase `phase number (optional)` - Displays a random phase of the moon, or the phase associated with the optional phase number.
* /r `dice  expression` - Rolls the dice described in the expression.
## Dice Syntax
### Dice Expression Examples
* 3d6 - sum three six-sided dice.
* 3e6 - sum three exploding six-sided dice.
* 3eu6 - sum three upward exploding six-sided dice.
* 3ed6 - sum three downward exploding six-sided dice.
* 3s6 - sum three smoothly exploding six-sided dice.
* 3su6 - sum three upward smoothly exploding six-sided dice.
* 3sd6 - sum three downward smoothly exploding six-sided dice.
* d100 - roll one one hundred-sided die.
* d1000 - roll one one thousand-sided die.
* 1d20 - roll one twenty-sided die.
* 1d20+10 - roll one twenty-sided die and add ten.
* 1d20-10 - roll one twenty-sided die and subtract ten.
* 10d10t7 - roll ten ten-sided dice, and count those that result in seven or more.
* 10e3f0 - sum ten exploding ten sided dice and change any result below zero to zero.
* 10e3c50 - sum ten exploding ten sided dice and change any result above fifty to fifty.
### Dice Expression Details
The regex used to parse Dice Expressions, accepts values that meet these requirements:
* (optional) Number of Dice to roll. If absent, one die is assumed.
* Dice Type:
	* "d" or "D": Normal dice.
	* "e" or "E": Exploding Dice. If the roll of one die is "1", roll another die and subtract that from 1. If the roll equals the number of sides (maximum result), roll another die and add that to the 1. In either case, if the "exploded" die is the maximum result, continue rolling another exploded die. An exploding d6 will never roll a 1 or a 6.
	* "eu" or "EU": Exploding Dice, Up: As Exploding Dice, but dice only "explode" on a maximum roll.
	* "ed" or "ED": Exploding Dice, Down: As Exploding Dice, but dice only "explode" on a 1.
	* "s" or "S": Smoothly Exploding Dice: similar to Exploding Dice, but the die rolled has two more sides than the number of sides specified in the dice expression. One result indicates subtracting a die roll from 1 and the other indicates adding a die roll to the maximum result (number of sides). A smoothly exploding d6 may roll a 1 or a 6.
	* "su" or "SU": Smoothly Exploding Dice, Up: As Smoothly Exploding Dice, but the die only has one extra side and only explodes up on that result.
	* "sd" or "SD": Smoothly Exploding Dice, Down: As Smoothly Exploding Dice, but the die only has one extra side and only explodes down on that result.
* Number of sides
* (optional) "t" or "T" and digits: Threshold: roll the specified number of dice, but instead of summing them up, add one for every die with a result equal to or greater than the specified number (next).
* (optional) "+" or "-" and digits: Modifier sign indicating whether or add or subtract from the final result.
* (optional) "f" or "F", (optional) "+" or "-", and digits: Floor: Any result below this value will be returned as this value.
* (optional) "c" or "C", (optional) "+" or "-", and digits: Ceiling: Any result above this value will be returned as this value.