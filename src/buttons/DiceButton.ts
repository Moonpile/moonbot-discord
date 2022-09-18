import {
  ButtonInteraction,
  Client,
} from "discord.js";
import { Dice } from "../dice/Dice";
import { Command } from "../Command";
import { Button } from "../Button";

export const DiceButton: Button = {
  name: "dice",
  run: async (client: Client, interaction: ButtonInteraction) => {
    const user = interaction.user;

    const diceExpression = interaction.customId.replace("dice-","");

    const dice = new Dice(diceExpression);

    dice.roll();

    if (dice.diceParameters.errorMessage) {
      await interaction.followUp({
        ephemeral: true,
        content: dice.diceParameters.errorMessage,
      });
    } else {
      const content = `${user} rolled ${diceExpression} = **${dice.total}**      ${dice.format}`;

      await interaction.followUp({
        ephemeral: true,
        content: content,
      });
    }
  },
};
