import {
  ActionRowBuilder,
  ApplicationCommandType,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  Client,
} from "discord.js";
import { Command } from "../Command";

export const DiceCommand: Command = {
  name: "d",
  description: `Provides common dice as buttons.`,
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const row1 = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dice-1d2")
          .setLabel("1d2")
          .setStyle(ButtonStyle.Primary)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dice-1d3")
          .setLabel("1d3")
          .setStyle(ButtonStyle.Primary)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dice-1d4")
          .setLabel("1d4")
          .setStyle(ButtonStyle.Primary)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dice-1d6")
          .setLabel("1d6")
          .setStyle(ButtonStyle.Primary)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dice-1d8")
          .setLabel("1d8")
          .setStyle(ButtonStyle.Primary)
      );
    const row2 = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dice-1d10")
          .setLabel("1d10")
          .setStyle(ButtonStyle.Primary)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dice-1d12")
          .setLabel("1d12")
          .setStyle(ButtonStyle.Primary)
      );
    const row3 = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dice-1d20")
          .setLabel("1d20")
          .setStyle(ButtonStyle.Primary)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dice-2d20l1")
          .setLabel("2d20l1 (Advantage)")
          .setStyle(ButtonStyle.Primary)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dice-2d20h1")
          .setLabel("2d20h1 (Disadvantage)")
          .setStyle(ButtonStyle.Primary)
      );
    await interaction.followUp({
      content: "Dice Presets",
      components: [row1, row2, row3],
    });
  },
};
