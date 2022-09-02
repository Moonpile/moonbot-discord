import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ChatInputCommandInteraction,
  Client,
} from "discord.js";
import { Dice } from "../dice/Dice";
import { Command } from "../Command";

export const PhaseCommand: Command = {
  name: "phase",
  description: `Gives a random phase of the moon.`,
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.Integer,
      name: "phasenum",
      description: `A number from 1 to 8 corresponding to a phase of the moon.`,
      required: false,
    },
  ],
  run: async (client: Client, interaction: ChatInputCommandInteraction) => {

    let phasenum = interaction.options.getInteger("phasenum") ;

    if (!phasenum) {
    const dice = new Dice("1d8");
    dice.roll();
      phasenum = dice.total || 2; 
    }

    const phases = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
    const phaseNames = ["New", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full", "Waning Gibbous", "Last Quarter", "Waning Crescent"]

    const content = `${phases[phasenum]}  ${phaseNames[phasenum]}`;

    await interaction.followUp({
      ephemeral: true,
      content: content,
    });
  },
};
