import { ApplicationCommandType, ChatInputCommandInteraction, Client, CommandInteraction } from "discord.js";
import { Dice } from "../dice/Dice";
import { Command } from "../Command";


export const Roll: Command = {
    name: "r",
    description: "Returns a greeting",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    
        const diceExpression = interaction.options.getString("diceexpression") || "1d100"


        const dice = new Dice(diceExpression);

        dice.roll();

        const content = `${diceExpression} = ${dice.total}      ${dice.format}`;

        await interaction.followUp({
            ephemeral: true,
            content: content
        });
    }
};