import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ChatInputCommandInteraction,
  Client,
  SelectMenuBuilder,
} from "discord.js";
import { Dice } from "../dice/Dice";
import { Command } from "../Command";

export const NameCommand: Command = {
  name: "name",
  description: `Generate names.`,
  type: ApplicationCommandType.ChatInput,
  options: [],
  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const user = interaction.user;
    const row1 = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
      new SelectMenuBuilder()
        .setCustomId("name-base-select")
        .setPlaceholder("Select a name base")
        .addOptions(
          {
            label: "Corbindian (Southern), Female",
            value: "corbindian-southern-female",
          },
          {
            label: "Corbindian (Southern), Male",
            value: "corbindian-southern-male",
          },
          {
            label: "Corbindian (Northern), Female",
            value: "corbindian-northern-female",
          },
          {
            label: "Corbindian (Northern), Male",
            value: "corbindian-northern-male",
          },
          {
            label: "Oswindingas, Female",
            value: "oswindingas-female",
          },
          {
            label: "Oswindingas, Male",
            value: "oswindingas-male",
          },
          {
            label: "Wala, Female",
            value: "wala-female",
          },
          {
            label: "Wala, Male",
            value: "wala-male",
          },
          {
            label: "Halfling, Female",
            value: "halfling-female",
          },
          {
            label: "Halfling, Male",
            value: "halfling-male",
          }
        )
    );

    await interaction.followUp({
      ephemeral: true,
      content: "Select a name base to generate names:",
      components: [row1],
    });
  },
};
