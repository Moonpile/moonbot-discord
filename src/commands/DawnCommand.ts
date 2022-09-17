import {
  ActionRowBuilder,
  ApplicationCommandType,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  Client,
} from "discord.js";
import { Command } from "../Command";

export const DawnCommand: Command = {
  name: "dawn",
  description: `Provides common dice as buttons.`,
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const row1 = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dawn-race-class")
          .setLabel("Roll Race/Class and Bonus Feat")
          .setStyle(ButtonStyle.Primary)
      );
    await interaction.followUp({
      content: "Dice Presets",
      components: [row1],
    });
  },
};
