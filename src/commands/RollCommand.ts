import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ChatInputCommandInteraction,
  Client,
} from "discord.js";
import { Dice } from "../dice/Dice";
import { Command } from "../Command";

export const RollCommand: Command = {
  name: "r",
  description: `Rolls dice based on the provided dice expression, ie "1d100", "3d6", "4d6l1".`,
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "diceexpression",
      description: `The dice to roll, ie "3d6", "1d100", or "4d6l1"`,
      required: true,
    },
  ],
  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const user = interaction.user;

    const diceExpression =
      interaction.options.getString("diceexpression") || "1d100";

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
