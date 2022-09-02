import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ChatInputCommandInteraction,
  Client,
  MessageComponentInteraction,
} from "discord.js";
import { Dice } from "../dice/Dice";
import { Command } from "../Command";
import { Button } from "../Button";

export const DiceButton: Button = {
  name: "dice",
  run: async (client: Client, interaction: MessageComponentInteraction) => {
    const diceExpression = interaction.customId.replace("dice-","");

    const dice = new Dice(diceExpression);

    dice.roll();

    const content = `${diceExpression} = **${dice.total}**      ${dice.format}`;

    await interaction.reply({
      ephemeral: true,
      content: content,
    });
  },
};
